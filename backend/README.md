# 🧠 Adversarial Middleware Backend for LLMs

This backend powers the **Adversarial Attack Detection and Correction Middleware** for Large Language Models (LLMs). It receives a prompt, optionally detects and corrects adversarial perturbations, and returns an LLM-generated response using open-source models like GPT-Neo.

---

## 📌 Project Goal

To act as a **middleware layer** that:
- Detects adversarial input patterns (character-level, word-level, semantic)
- Validates LLM output token distributions using **Benford's Law**
- Corrects adversarial prompts if needed
- Regenerates responses from a trusted model

---

## 📡 API Endpoint

### POST /generate

**URL:** `http://127.0.0.1:8000/generate`

**Request Body (JSON):**
```json
{
  "prompt": "What is the capitl of Frànce?",
  "middleware": true
}
```

**Response (JSON):**
```json
{
  "original_prompt": "What is the capitl of Frànce?",
  "corrected_prompt": "What is the capital of France?",
  "response": "The capital of France is Paris.",
  "adversarial_detected": true
}
```

Use tools like **Postman** to test this API.

## 🗂 Project Structure

```
backend/
├── app/
│   └── main.py       # FastAPI app and API route
├── models/
│   ├── llm_handler.py      # LLM output + logits using HuggingFace
│   ├── benford_checker.py  # Validates token probabilities
│   ├── detect_model.py     # Detects adversarial patterns
│   └── correct_model.py    # Fixes adversarial prompts
├── requirements.txt        # Python dependency list
└── README.md              # You are here
```

## 📦 Dependencies

Install all required libraries with:

```bash
pip install -r requirements.txt
```

requirements.txt
```txt
fastapi==0.115.2
uvicorn==0.33.0
transformers==4.40.1
torch==2.2.2
accelerate==0.29.3
numpy==1.26.4
pydantic==2.9.2
```

## 🚀 Running the Server

1. Navigate to the backend directory:
```bash
cd backend
```

2. Run the FastAPI server:
```bash
uvicorn app.main:app --reload
```

3. Open API docs in your browser:
```
http://127.0.0.1:8000/docs
```

## 🔍 Notes

* **Base LLM used**: `EleutherAI/gpt-neo-1.3B` (auto-downloaded from HuggingFace)
* **Middleware toggle**: `middleware: true` enables detection and correction logic
* **Logits validation**: Based on Benford's Law to detect abnormal distributions
* **Test frontend**: Currently decoupled. Frontend is served on `http://localhost:3000`

## 👥 Team Roles

| Member | Responsibility |
|--------|----------------|
| Anurag | Detection module (backend) |
| Panshul | Correction module (backend) |
| Aadi | Frontend & integration |

## ✅ Status

✅ API working
✅ Model loaded
✅ Adversarial detection and correction functional
✅ Ready for frontend integration