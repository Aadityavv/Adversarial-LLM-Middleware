import re

# Very basic rule-based correction
def correct_prompt(prompt: str) -> str:
    replacements = {
        "Frànce": "France",
        "capitl": "capital",
        "@": "a",
        "hed": "head",
        "citty": "city",
        "NOT": "",  # Remove negation (can be more sophisticated)
    }

    corrected = prompt
    for wrong, right in replacements.items():
        corrected = re.sub(rf"\b{re.escape(wrong)}\b", right, corrected, flags=re.IGNORECASE)

    return corrected.strip()
