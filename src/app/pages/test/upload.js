import cloudinary from 'cloudinary';
import formidable from 'formidable';
import fs from 'fs';

// Cloudinary configuration
cloudinary.config({
  cloud_name: 'dsymtu3j5',  // Your Cloudinary cloud name
  api_key: '498311466552486',  // Your Cloudinary API key
  api_secret: '3tEqYlbKNSn5adC06iQmT34vPG8',  // Your Cloudinary API secret
  secure: true,
});

export const config = {
  api: {
    bodyParser: false,  // Disabling default body parsing to handle file uploads
  },
};

const uploadImage = (req, res) => {
  const form = new formidable.IncomingForm();

  form.parse(req, (err, fields, files) => {
    if (err) {
      return res.status(500).json({ error: 'Error parsing file.' });
    }

    const file = files.file[0];  // Extract the uploaded file

    // Upload the image to Cloudinary
    cloudinary.uploader.upload(file.filepath, {
      public_id: 'newImage',  // Set a custom public ID for the image
    }, (uploadErr, result) => {
      if (uploadErr) {
        return res.status(500).json({ error: 'Error uploading to Cloudinary.' });
      }

      // URL of the uploaded image
      const imageUrl = result.secure_url;

      // Generate optimized delivery URL with auto format and quality
      const optimizedUrl = cloudinary.url(result.public_id, {
        fetch_format: 'auto',
        quality: 'auto',
      });

      // Generate a transformed URL (auto-crop to square)
      const transformedUrl = cloudinary.url(result.public_id, {
        width: 500,
        height: 500,
        crop: 'fill',  // Crop image to a square
        gravity: 'auto',  // Center the crop
      });

      // Respond with URLs for the uploaded, optimized, and transformed images
      return res.status(200).json({
        imageUrl,
        optimizedUrl,
        transformedUrl,
      });
    });
  });
};

export default uploadImage;
