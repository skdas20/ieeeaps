import os
import cv2
import sys

cascade_path = cv2.data.haarcascades + 'haarcascade_frontalface_default.xml'
face_cascade = cv2.CascadeClassifier(cascade_path)

picture_dir = r"d:\CODES\claude\APS\public\picture"
files = [f for f in os.listdir(picture_dir) if f.endswith('.jpeg') or f.endswith('.jpg') or f.endswith('.png')]

# We'll use a fixed standard size for output to ensure absolute consistency
TARGET_SIZE = (512, 512)

for file in files:
    filepath = os.path.join(picture_dir, file)
    img = cv2.imread(filepath)
    if img is None:
        print(f"Could not read {file}")
        continue
    
    gray = cv2.cvtColor(img, cv2.COLOR_BGR2GRAY)
    faces = face_cascade.detectMultiScale(gray, 1.1, 4)
    
    if len(faces) > 0:
        # Find largest face by area
        faces = sorted(faces, key=lambda x: x[2]*x[3], reverse=True)
        x, y, w, h = faces[0]
        
        # Center of face
        cx, cy = x + w//2, y + h//2
        
        # Determine crop side length: we want face to occupy a good portion
        # but with some headroom and shoulder room. 2.0x to 2.5x the face width is standard.
        side = int(w * 2.2)
        
        # Shift crop slightly down so face is in the upper half of the crop 
        y_offset = int(h * 0.2)
        
        # Calculate bounding box
        x1 = cx - side // 2
        y1 = cy - side // 2 - y_offset
        x2 = cx + side // 2
        y2 = cy + side // 2 - y_offset
        
        # If crop goes out of bounds, we simply pad the image or shift crop
        h_img, w_img = img.shape[:2]
        
        # First, try to shift crop if it's out of bounds but fits within the image dimensions
        if x1 < 0:
            x2 += abs(x1)
            x1 = 0
        if y1 < 0:
            y2 += abs(y1)
            y1 = 0
        if x2 > w_img:
            x1 -= (x2 - w_img)
            x2 = w_img
        if y2 > h_img:
            y1 -= (y2 - h_img)
            y2 = h_img
            
        # Ensure we don't go out of bounds after shifting
        x1 = max(0, x1)
        y1 = max(0, y1)
        x2 = min(w_img, x2)
        y2 = min(h_img, y2)
        
        cropped = img[y1:y2, x1:x2]
        
        # Now if cropped is not square due to boundaries, pad it
        ch, cw = cropped.shape[:2]
        if ch != side or cw != side:
            # calculate padding required
            target_dim = max(ch, cw)
            pad_top = (target_dim - ch) // 2
            pad_bottom = target_dim - ch - pad_top
            pad_left = (target_dim - cw) // 2
            pad_right = target_dim - cw - pad_left
            
            # Use blur or edge extend for padding to avoid sharp black borders
            cropped = cv2.copyMakeBorder(cropped, pad_top, pad_bottom, pad_left, pad_right, cv2.BORDER_REPLICATE)
        
        final_img = cv2.resize(cropped, TARGET_SIZE, interpolation=cv2.INTER_LANCZOS4)
        cv2.imwrite(filepath, final_img)
        print(f"FACES CROP SUCCESS: {file}")
        
    else:
        # Fallback to center-top crop
        h_img, w_img = img.shape[:2]
        side = min(h_img, w_img)
        cx, cy = w_img // 2, int(h_img * 0.4)
        
        x1 = max(0, cx - side//2)
        y1 = max(0, cy - side//2)
        x2 = min(w_img, x1 + side)
        y2 = min(h_img, y1 + side)
        
        if y2 > h_img:
            y1 = max(0, h_img - side)
            y2 = h_img
        if x2 > w_img:
            x1 = max(0, w_img - side)
            x2 = w_img
            
        cropped = img[y1:y2, x1:x2]
        final_img = cv2.resize(cropped, TARGET_SIZE, interpolation=cv2.INTER_LANCZOS4)
        cv2.imwrite(filepath, final_img)
        print(f"CENTER CROP SUCCESS: {file}")

print("Image processing complete.")
