from pathlib import Path
from PIL import Image, ImageOps

source = Path('/home/ubuntu/screenshots/webdev-preview-root-1788503422166453568-2957.png')
out = Path('/home/ubuntu/student-performance-dashboard/report/assets')
out.mkdir(parents=True, exist_ok=True)
img = Image.open(source).convert('RGB')

# Full dashboard figure, resized for a clean report layout.
full = img.copy()
full.thumbnail((1500, 1100), Image.Resampling.LANCZOS)
full.save(out / 'dashboard-full.png', optimize=True)

# Top-level hero and snapshot strip.
img.crop((230, 0, 1279, 420)).save(out / 'dashboard-hero.png', optimize=True)

# Predictor and feature bars.
img.crop((235, 385, 1115, 820)).save(out / 'predictor-snip.png', optimize=True)

# Pathways graph and traversal panel.
img.crop((235, 820, 1115, 941)).resize((1760, 242), Image.Resampling.LANCZOS).save(out / 'pathways-snip.png', optimize=True)

# Sidebar identity.
img.crop((0, 0, 230, 941)).save(out / 'sidebar-snip.png', optimize=True)

# QR is already generated for the live website; copy not needed because report can reference it directly.
print('Created report snips in', out)
