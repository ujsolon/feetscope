'use client';

import { ChangeEvent } from 'react';

interface PhotoUploadInputProps {
  onPhotoChange: (file: File | null) => void;
}

export default function PhotoUploadInput({ onPhotoChange }: PhotoUploadInputProps) {
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onPhotoChange(e.target.files[0]);
    }
  };

  return (
    <div className="inner">
      <header className="major">
        <h2>Upload Foot Photo</h2>
      </header>
      <p>Upload a clear photo of your foot for automatic size detection</p>
      <div style={{ marginTop: '2em' }}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          style={{
            display: 'block',
            padding: '1em',
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: '100%'
          }}
        />
      </div>
    </div>
  );
}
