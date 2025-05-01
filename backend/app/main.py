from fastapi import FastAPI, Request
from pydantic import BaseModel
from models.llm_handler import generate_with_llm
from models.benford_checker import follows_benford_law
from models.detect_model import is_adversarial
from models.correct_model import correct_prompt
from typing import Optional


app = FastAPI()

# Request schema
class GenerateRequest(BaseModel):
    prompt: str
    middleware: bool = False  # default to off

# Response schema
class GenerateResponse(BaseModel):
    original_prompt: str
    corrected_prompt: Optional[str]
    response: str
    adversarial_detected: bool

@app.post("/generate", response_model=GenerateResponse)
async def generate_text(req: GenerateRequest):
    prompt = req.prompt
    use_middleware = req.middleware

    if not use_middleware:
        # Direct LLM response (no detection or correction)
        response, _ = generate_with_llm(prompt, return_logits=False)
        return GenerateResponse(
            original_prompt=prompt,
            corrected_prompt=None,
            response=response,
            adversarial_detected=False
        )

    # Step 1: Generate with LLM + logits
    response, logits = generate_with_llm(prompt, return_logits=True)

    # Step 2: Check Benford's Law
    if follows_benford_law(logits):
        return GenerateResponse(
            original_prompt=prompt,
            corrected_prompt=None,
            response=response,
            adversarial_detected=False
        )

    # Step 3: Adversarial Detection
    if is_adversarial(prompt):
        corrected = correct_prompt(prompt)
        corrected_response, _ = generate_with_llm(corrected, return_logits=False)
        return GenerateResponse(
            original_prompt=prompt,
            corrected_prompt=corrected,
            response=corrected_response,
            adversarial_detected=True
        )
    
    # Fallback: Adversarial input, but couldn't fix
    return GenerateResponse(
        original_prompt=prompt,
        corrected_prompt=None,
        response="⚠️ Adversarial input detected, but could not correct.",
        adversarial_detected=True
    )
