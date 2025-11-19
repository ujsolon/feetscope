'use client';

import { useRef, ChangeEvent, useState } from 'react';

interface PhotoUploadTileProps {
  onPhotoChange: (file: File | null) => void;
  photo: File | null;
}

export default function PhotoUploadTile({ onPhotoChange, photo }: PhotoUploadTileProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onPhotoChange(e.target.files[0]);
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <article style={{ cursor: 'pointer' }}>
      <span className="image" style={{ display: photo ? 'block' : 'none' }}>
        {photo && <img src="/html5up-forty/images/pic01.jpg" alt="" />}
      </span>
      {!photo ? (
        <>
          <span className="image">
            <img src="/html5up-forty/images/pic01.jpg" alt="" />
          </span>
          <header className="major">
            <h3>Aliquam</h3>
            <p>Upload photo</p>
          </header>
          <button 
            onClick={handleButtonClick}
            style={{
              padding: '1em 2em',
              marginTop: '1em',
              backgroundColor: '#007bff',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '1em'
            }}
          >
            Upload Photo
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </>
      ) : (
        <header className="major">
          <h3>✓ Photo Uploaded</h3>
          <p>File: {photo.name}</p>
          <button 
            onClick={handleButtonClick}
            style={{
              padding: '0.5em 1em',
              marginTop: '1em',
              backgroundColor: '#28a745',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
              fontSize: '0.9em'
            }}
          >
            Change Photo
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ display: 'none' }}
          />
        </header>
      )}
    </article>
  );
}
