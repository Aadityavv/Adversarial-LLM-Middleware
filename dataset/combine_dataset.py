# File: dataset/combine_dataset.py

import pandas as pd

# Load datasets
clean = pd.read_csv("clean_texts.csv")
adv = pd.read_csv("adversarial_texts.csv")

# Combine them
combined = pd.concat([clean, adv], ignore_index=True)

# Shuffle
combined = combined.sample(frac=1).reset_index(drop=True)

# Save
combined.to_csv("detection_dataset.csv", index=False)

print(f"✅ Dataset created successfully with {len(combined)} samples.")
