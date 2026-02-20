import os

def check_files(directory):
    missing = []
    present = []
    if not os.path.exists(directory):
        return missing, present

    for root, dirs, files in os.walk(directory):
        if 'page.tsx' in files:
            filepath = os.path.join(root, 'page.tsx')
            with open(filepath, 'r') as f:
                content = f.read()
                if 'LocalPathways' in content:
                    present.append(filepath)
                else:
                    missing.append(filepath)
    return missing, present

services_missing, services_present = check_files('app/services')
conditions_missing, conditions_present = check_files('app/conditions')

print("Services Missing LocalPathways:")
for f in services_missing:
    print(f)

print("\nConditions Missing LocalPathways:")
for f in conditions_missing:
    print(f)

print(f"\nTotal Services Present: {len(services_present)}")
print(f"Total Conditions Present: {len(conditions_present)}")
