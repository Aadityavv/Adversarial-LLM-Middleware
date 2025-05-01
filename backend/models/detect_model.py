import re

# Stub detection logic
def is_adversarial(prompt: str) -> bool:
    # Check for homoglyphs, common misspellings or negation
    homoglyphs = ["à", "è", "ì", "ò", "ù"]
    misspellings = ["capitl", "hed", "citty"]
    suspicious_words = ["NOT", "never", "isn't"]

    if any(char in prompt for char in homoglyphs):
        return True
    if any(word in prompt.lower() for word in misspellings):
        return True
    if any(word in prompt for word in suspicious_words):
        return True

    return False
