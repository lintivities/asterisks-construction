import os
import numpy as np
from PIL import Image

def make_seamless_y(arr, blend_h=64):
    """Seamlessly blends top and bottom of an array along axis 0 using smooth cosine crossfade."""
    res = arr.copy()
    H = arr.shape[0]
    for i in range(blend_h):
        t = 0.5 - 0.5 * np.cos(np.pi * i / blend_h) # 0 to 1
        top_val = arr[i]
        bot_val = arr[H - blend_h + i]
        blended = (1.0 - t) * bot_val + t * top_val
        res[i] = blended
        res[H - blend_h + i] = blended
    return res

def generate_textures():
    print("Starting enhanced unified deckle texture generation...")
    os.makedirs("public/assets/textures", exist_ok=True)
    os.makedirs("public", exist_ok=True)

    # 1. Load images.jpg and extract authentic organic torn contours
    img_torn = Image.open("public/images.jpg").convert("RGBA")
    arr_torn = np.array(img_torn).astype(np.float32)
    H_torn, W_torn = arr_torn.shape[:2]

    lum = 0.299 * arr_torn[:, :, 0] + 0.587 * arr_torn[:, :, 1] + 0.114 * arr_torn[:, :, 2]
    paper_mask = lum > 45.0

    crop_top = 40
    crop_h = 384
    crop_bot = crop_top + crop_h

    # Extract edge coordinate sequences from images.jpg
    left_edge_raw = np.array([np.where(paper_mask[y])[0][0] for y in range(crop_top, crop_bot)], dtype=np.float32)
    right_edge_raw = np.array([np.where(paper_mask[y])[0][-1] for y in range(crop_top, crop_bot)], dtype=np.float32)

    # Calculate organic variation curves (centered around 0)
    # Scaling factor 2.2 produces prominent 20px organic deckle teeth clearly visible on all screens
    left_var = (left_edge_raw - np.mean(left_edge_raw)) * 2.2
    right_var = (right_edge_raw - np.mean(right_edge_raw)) * 2.2

    # Synthesize left 48px ribbon alpha:
    # Outer air: x < cx - 1.5 -> alpha = 0.0
    # Torn teeth center: cx = 15.0 + left_var[y] (spans x=5 to x=25)
    # Inner paper: x >= cx + 1.5 -> transitions smoothly to 1.0; x >= 27 is 100% solid
    left_alpha_strip = np.zeros((crop_h, 48), dtype=np.float32)
    for y in range(crop_h):
        cx = 15.0 + left_var[y]
        for x in range(48):
            val = np.clip((x - (cx - 1.5)) / 3.0, 0.0, 1.0)
            if x >= 27:
                val = 1.0
            left_alpha_strip[y, x] = val

    # Synthesize right 48px ribbon alpha:
    # Inner paper: x <= 21 is 100% solid
    # Torn teeth center: cx = 33.0 + right_var[y] (spans x=23 to x=43)
    # Outer air: x > cx + 1.5 -> alpha = 0.0
    right_alpha_strip = np.zeros((crop_h, 48), dtype=np.float32)
    for y in range(crop_h):
        cx = 33.0 + right_var[y]
        for x in range(48):
            val = np.clip(((cx + 1.5) - x) / 3.0, 0.0, 1.0)
            if x <= 21:
                val = 1.0
            right_alpha_strip[y, x] = val

    # Make alpha strips vertically seamless (tileable in Y)
    left_alpha_strip = make_seamless_y(left_alpha_strip, blend_h=48)
    right_alpha_strip = make_seamless_y(right_alpha_strip, blend_h=48)

    # Resize strips vertically to 512px power of 2 for optimal WebGL & CSS performance
    left_img = Image.fromarray((left_alpha_strip * 255.0).astype(np.uint8), mode='L').resize((48, 512), Image.Resampling.BICUBIC)
    right_img = Image.fromarray((right_alpha_strip * 255.0).astype(np.uint8), mode='L').resize((48, 512), Image.Resampling.BICUBIC)
    left_alpha_512 = np.array(left_img).astype(np.float32) / 255.0
    right_alpha_512 = np.array(right_img).astype(np.float32) / 255.0

    # 2. Load master-parchment-front.png
    master_img = Image.open("public/assets/textures/master-parchment-front.png").convert("RGB")
    master_arr = np.array(master_img.resize((2048, 1024), Image.Resampling.LANCZOS)).astype(np.float32)

    # Make master texture seamlessly tileable in Y
    master_seamless = make_seamless_y(master_arr, blend_h=64)
    master_seamless_img = Image.fromarray(np.clip(master_seamless, 0, 255).astype(np.uint8), mode="RGB")
    master_seamless_img.save("public/assets/textures/master-parchment-front.png", "PNG", optimize=True)
    master_seamless_img.save("public/master-parchment-front.png", "PNG", optimize=True)
    master_seamless_img.save("public/assets/textures/master-parchment-front.jpg", "JPEG", quality=95)
    master_seamless_img.save("public/master-parchment-front.jpg", "JPEG", quality=95)
    print("Saved vertically seamless master-parchment-front (PNG + JPG)")

    # 3. Create deckle-edge-left.png and deckle-edge-right.png using master parchment RGB
    # Subtle torn fiber darkening along the deckle rim (0.91x brightness)
    left_rgb = master_seamless[:512, :48, :].copy()
    for x in range(48):
        edge_shade = 0.90 + 0.10 * np.clip(x / 25.0, 0.0, 1.0)
        left_rgb[:, x, :] *= edge_shade

    left_ribbon = np.zeros((512, 48, 4), dtype=np.uint8)
    left_ribbon[:, :, :3] = np.clip(left_rgb, 0, 255).astype(np.uint8)
    left_ribbon[:, :, 3] = np.clip(left_alpha_512 * 255.0, 0, 255).astype(np.uint8)

    right_rgb = master_seamless[:512, -48:, :].copy()
    for x in range(48):
        edge_shade = 0.90 + 0.10 * np.clip((47 - x) / 25.0, 0.0, 1.0)
        right_rgb[:, x, :] *= edge_shade

    right_ribbon = np.zeros((512, 48, 4), dtype=np.uint8)
    right_ribbon[:, :, :3] = np.clip(right_rgb, 0, 255).astype(np.uint8)
    right_ribbon[:, :, 3] = np.clip(right_alpha_512 * 255.0, 0, 255).astype(np.uint8)

    Image.fromarray(left_ribbon, mode="RGBA").save("public/assets/textures/deckle-edge-left.png", "PNG")
    Image.fromarray(left_ribbon, mode="RGBA").save("public/deckle-edge-left.png", "PNG")
    Image.fromarray(right_ribbon, mode="RGBA").save("public/assets/textures/deckle-edge-right.png", "PNG")
    Image.fromarray(right_ribbon, mode="RGBA").save("public/deckle-edge-right.png", "PNG")
    print("Saved deckle-edge-left.png and deckle-edge-right.png with master parchment texture & fiber tint")

    # 4. Create deckle-alpha-mask.png (2048 x 512) for WebGL shader deckle clipping
    mask_full = np.ones((512, 2048), dtype=np.uint8) * 255
    mask_full[:, :48] = (left_alpha_512 * 255.0).astype(np.uint8)
    mask_full[:, -48:] = (right_alpha_512 * 255.0).astype(np.uint8)
    mask_full_img = Image.fromarray(mask_full, mode="L")
    mask_full_img.save("public/assets/textures/deckle-alpha-mask.png", "PNG")
    mask_full_img.save("public/deckle-alpha-mask.png", "PNG")
    print("Saved deckle-alpha-mask.png")

    # 5. Create roll-torn-paper-back.png (2048 x 1024 RGBA)
    roll_back = np.zeros((1024, 2048, 4), dtype=np.uint8)
    roll_back[:, :, :3] = np.clip(master_seamless * 0.94, 0, 255).astype(np.uint8)

    tiled_left = np.tile(left_alpha_512, (2, 1)) # 1024 x 48
    tiled_right = np.tile(right_alpha_512, (2, 1)) # 1024 x 48

    roll_back[:, :, 3] = 255
    roll_back[:, :48, 3] = np.clip(tiled_left * 255.0, 0, 255).astype(np.uint8)
    roll_back[:, -48:, 3] = np.clip(tiled_right * 255.0, 0, 255).astype(np.uint8)

    roll_back_img = Image.fromarray(roll_back, mode="RGBA")
    roll_back_img.save("public/assets/textures/roll-torn-paper-back.png", "PNG")
    roll_back_img.save("public/roll-torn-paper-back.png", "PNG")
    print("Saved roll-torn-paper-back.png with identical master parchment texture & continuous deckle")

    print("All textures synthesized successfully!")

if __name__ == "__main__":
    generate_textures()
