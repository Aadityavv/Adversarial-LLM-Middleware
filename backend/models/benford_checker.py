import numpy as np

def extract_leading_digits(logits):
    digits = []
    flat = logits.flatten()
    for val in flat:
        if val <= 0:
            continue
        str_val = str(val)
        first_digit = next((char for char in str_val if char.isdigit() and char != "0"), None)
        if first_digit:
            digits.append(int(first_digit))
    return digits


def follows_benford_law(logits, threshold=0.1):
    digits = extract_leading_digits(logits)
    if not digits:
        return True  # fallback: treat as non-adversarial

    actual_dist = np.array([digits.count(d)/len(digits) for d in range(1, 10)])
    expected_dist = np.log10(1 + 1 / np.arange(1, 10))

    deviation = np.sum(np.abs(actual_dist - expected_dist))
    return deviation < threshold


    actual_dist = np.array([digits.count(d)/len(digits) for d in range(1, 10)])
    expected_dist = np.log10(1 + 1/np.arange(1, 10))

    deviation = np.sum(np.abs(actual_dist - expected_dist))
    return deviation < threshold
