from PIL import Image, ImageFilter
import os
import glob

IMAGES_DIR = os.path.join(os.path.dirname(__file__), "images")

# Region as fractions of image dimensions (x1, y1, x2, y2)
# Bottom-center strip where license plates typically appear
PLATE_REGION = (0.30, 0.78, 0.70, 0.95)
BLUR_RADIUS = 20


def blur_plate_region(path):
    img = Image.open(path).convert("RGB")
    w, h = img.size

    x1 = int(PLATE_REGION[0] * w)
    y1 = int(PLATE_REGION[1] * h)
    x2 = int(PLATE_REGION[2] * w)
    y2 = int(PLATE_REGION[3] * h)

    region = img.crop((x1, y1, x2, y2))
    blurred = region.filter(ImageFilter.GaussianBlur(radius=BLUR_RADIUS))
    img.paste(blurred, (x1, y1))
    img.save(path, "JPEG", quality=95)
    print(f"  blurred {os.path.basename(path)}  [{x1},{y1} -> {x2},{y2}]")


def main():
    jpegs = glob.glob(os.path.join(IMAGES_DIR, "*.jpeg")) + \
            glob.glob(os.path.join(IMAGES_DIR, "*.jpg"))

    if not jpegs:
        print("No JPEG files found in", IMAGES_DIR)
        return

    print(f"Processing {len(jpegs)} image(s)...\n")
    for path in sorted(jpegs):
        blur_plate_region(path)
    print(f"\nDone. {len(jpegs)} image(s) updated in-place.")


if __name__ == "__main__":
    main()
