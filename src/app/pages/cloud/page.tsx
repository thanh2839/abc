'use client';

import { useState } from 'react';

const cloudName = "dsymtu3j5";
const uploadPreset = "shop_Santuary";

export default function UploadImagePage() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageUrl, setImageUrl] = useState<string | null>(null);
  

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Hiển thị preview của ảnh
    }
  };

  const handleUpload = async () => {
    if (!image) {
      setError('Please select an image to upload.');
      return;
    }

    setError(null);
    setUploading(true);

    const formData = new FormData();
    formData.append('file', image);
    formData.append('upload_preset', uploadPreset);

    try {
      const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (response.ok) {
        setImageUrl(data.secure_url);  // Lưu URL ảnh vào state
        console.log('Image uploaded successfully! URL:', data.secure_url); // Log đường dẫn ảnh
      } else {
        setError(data.error?.message || 'Failed to upload image.');
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
      <h1>Upload Image to Cloudinary</h1>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      {preview && (
        <div>
          <h3>Preview:</h3>
          <img src={preview} alt="Preview" style={{ width: '100%', maxWidth: '300px' }} />
        </div>
      )}
      <button
        onClick={handleUpload}
        disabled={uploading}
        style={{
          marginTop: '10px',
          padding: '10px 20px',
          backgroundColor: '#0070f3',
          color: '#fff',
          border: 'none',
          cursor: 'pointer',
        }}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>

      {imageUrl && (
        <div style={{ marginTop: '20px' }}>
          <h3>Uploaded Image</h3>
          <img src={imageUrl} alt="Uploaded" style={{ width: '100%', maxWidth: '300px' }} />
        </div>
      )}

      {error && (
        <p style={{ color: 'red', marginTop: '10px' }}>
          <strong>Error:</strong> {error}
        </p>
      )}
    </div>
  );
}
