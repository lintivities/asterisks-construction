import pypdfium2 as pdfium
from PIL import Image
import os

pdf_path = r"c:\Users\kimushzyyy\Desktop\lindsay_tutorial\docs\1787221943515_Profile 2026.pdf"
doc = pdfium.PdfDocument(pdf_path)

assets_dir = r"c:\Users\kimushzyyy\Desktop\lindsay_tutorial\assets"
os.makedirs(os.path.join(assets_dir, "team"), exist_ok=True)
os.makedirs(os.path.join(assets_dir, "projects"), exist_ok=True)

scale = 3 # High resolution

# Page 1: Logo
p1 = doc[0]
p1_render = p1.render(scale=scale).to_pil()
# Logo badge coordinates: x0=415, top=648, x1=518, bottom=752
logo_crop = p1_render.crop((int(415 * scale), int(648 * scale), int(518 * scale), int(752 * scale)))
logo_crop.save(os.path.join(assets_dir, "logo.png"))

# Hero building crop
hero_crop = p1_render.crop((0, int(220 * scale), int(340 * scale), int(780 * scale)))
hero_crop.save(os.path.join(assets_dir, "hero-building.png"))

# Page 17 Blueprint
p17 = doc[16]
p17_render = p17.render(scale=2).to_pil()
p17_crop = p17_render.crop((0, int(p17_render.height * 0.08), p17_render.width, p17_render.height))
p17_crop.save(os.path.join(assets_dir, "blueprint-sketch.png"))

# Page 4: Team Photos
# Using exact bounding boxes without text
p4 = doc[3]
p4_render = p4.render(scale=scale).to_pil()

team_crops = [
    # Row 0
    {"file": "noel-kamau.png", "box": (88, 75, 215, 205)},
    {"file": "lilian-maruti.png", "box": (238, 66, 360, 205)},
    {"file": "gn-kamau.png", "box": (386, 75, 506, 205)},
    # Row 1
    {"file": "lui-bahati.png", "box": (90, 300, 212, 435)},
    {"file": "ellah-wafula.png", "box": (235, 305, 363, 432)},
    {"file": "jeremy-kiprotich.png", "box": (386, 302, 508, 435)},
    # Row 2
    {"file": "dennis-kimani.png", "box": (90, 538, 212, 678)},
    {"file": "eva-wangui.png", "box": (238, 536, 360, 678)},
    {"file": "michelle-njeri.png", "box": (386, 536, 506, 678)},
]

for t in team_crops:
    x0, y0, x1, y1 = t["box"]
    crop = p4_render.crop((int(x0 * scale), int(y0 * scale), int(x1 * scale), int(y1 * scale)))
    crop.save(os.path.join(assets_dir, "team", t["file"]))

# Project Collages (Pages 5-16)
for page_num in range(5, 17):
    proj_idx = page_num - 4
    p = doc[page_num - 1]
    p_render = p.render(scale=scale).to_pil()
    # Bottom photo gallery section
    proj_crop = p_render.crop((int(72 * scale), int(418 * scale), int(518 * scale), int(762 * scale)))
    filename = f"project-{proj_idx:02d}.png"
    proj_crop.save(os.path.join(assets_dir, "projects", filename))

print("Asset extraction completed cleanly!")

