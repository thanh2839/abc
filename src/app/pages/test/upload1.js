'use client'
import { useState } from 'react';

const UploadImage = () => {
  const [imageUrl, setImageUrl] = useState(null);
  const [optimizedUrl, setOptimizedUrl] = useState(null);
  const [transformedUrl, setTransformedUrl] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setLoading(true);

    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });

    const data = await res.json();

    if (data.imageUrl) {
      setImageUrl(data.imageUrl);
      setOptimizedUrl(data.optimizedUrl);
      setTransformedUrl(data.transformedUrl);
    } else {
      alert('Upload failed');
    }

    setLoading(false);
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      {loading && <p>Uploading...</p>}
      
      <div>
        {imageUrl && (
          <>
            <h3>Original Image</h3>
            <img src={imageUrl} alt="Uploaded" />
          </>
        )}
        {optimizedUrl && (
          <>
            <h3>Optimized Image (Auto Format & Quality)</h3>
            <img src={optimizedUrl} alt="Optimized" />
          </>
        )}
        {transformedUrl && (
          <>
            <h3>Transformed Image (Auto Crop)</h3>
            <img src={transformedUrl} alt="Transformed" />
          </>
        )}
      </div>
    </div>
  );
};

export default UploadImage;
