import cloudinary
import cloudinary.uploader
from cloudinary.utils import cloudinary_url

# Configuration       
cloudinary.config( 
    cloud_name = "dsymtu3j5", 
    api_key = "498311466552486", 
    api_secret = "3tEqYlbKNSn5adC06iQmT34vPG8", # Click 'View API Keys' above to copy your API secret
    secure=True
)

image_path = r"D:\New folder (2)\dating-shopping\src\app\pages\test\2.jpg"

# Upload an image
# upload_result = cloudinary.uploader.upload("https://res.cloudinary.com/demo/image/upload/getting-started/shoes.jpg",
#                                            public_id="shoes")

upload_result = cloudinary.uploader.upload(image_path,
                                           public_id="newImage")

print(upload_result["secure_url"])

# Optimize delivery by resizing and applying auto-format and auto-quality
optimize_url, _ = cloudinary_url("shoes", fetch_format="auto", quality="auto")
# print(optimize_url)

# Transform the image: auto-crop to square aspect_ratio
auto_crop_url, _ = cloudinary_url("shoes", width=500, height=500, crop="auto", gravity="auto")
# print(auto_crop_url)