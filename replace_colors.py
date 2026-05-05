import os
import glob
import re

files = glob.glob('frontend/src/**/*.jsx', recursive=True)

for file in files:
    with open(file, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Replace bright text
    content = re.sub(r'text-slate-[123]00', 'text-main', content)
    # Replace muted text
    content = re.sub(r'text-slate-[45]00', 'text-muted', content)
    
    with open(file, 'w', encoding='utf-8') as f:
        f.write(content)

print("Done replacing text colors.")
