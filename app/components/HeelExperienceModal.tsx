'use client';

import { ChangeEvent } from 'react';

interface HeelExperienceModalProps {
  isOpen: boolean;
  onClose: () => void;
  onExperienceChange: (experience: string) => void;
  experience: string;
}

export default function HeelExperienceModal({
  isOpen,
  onClose,
  onExperienceChange,
  experience
}: HeelExperienceModalProps) {
  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    onExperienceChange(e.target.value);
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000
      }}
      onClick={onClose}
    >
      <div
        style={{
          backgroundColor: '#e8f4f8',
          padding: '3em',
          borderRadius: '4px',
          minWidth: '450px',
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)'
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ color: '#242943', marginBottom: '0.5em' }}>Heel Wearing Experience</h2>
        <p style={{ color: '#555', marginBottom: '1.5em' }}>Select your experience level with wearing heels</p>
        <select
          value={experience}
          onChange={handleChange}
          style={{
            marginBottom: '1.5em',
            padding: '0.75em 1em',
            width: '100%',
            borderRadius: '4px',
            border: '2px solid #9bf1ff',
            fontSize: '1em',
            color: '#242943',
            fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
            boxSizing: 'border-box'
          }}
        >
          <option value="">Select experience level</option>
          <option value="beginner">Beginner (0-6 months)</option>
          <option value="intermediate">Intermediate (6 months - 2 years)</option>
          <option value="experienced">Experienced (2+ years)</option>
          <option value="none">None</option>
        </select>
        <button
          onClick={onClose}
          className="button primary"
          style={{
            backgroundColor: '#242943',
            color: '#ffffff',
            border: '0',
            borderRadius: '0',
            boxShadow: 'inset 0 0 0 2px #242943',
            cursor: 'pointer',
            fontSize: '0.8em',
            fontWeight: '600',
            height: '3.5em',
            letterSpacing: '0.25em',
            lineHeight: '3.5em',
            padding: '0 1.75em',
            textAlign: 'center',
            textDecoration: 'none',
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            display: 'inline-block',
            fontFamily: '"Source Sans Pro", Helvetica, sans-serif',
            transition: 'background-color 0.2s ease-in-out'
          }}
          onMouseEnter={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = '#9bf1ff';
            (e.target as HTMLButtonElement).style.boxShadow = 'inset 0 0 0 2px #9bf1ff';
            (e.target as HTMLButtonElement).style.color = '#242943';
          }}
          onMouseLeave={(e) => {
            (e.target as HTMLButtonElement).style.backgroundColor = '#242943';
            (e.target as HTMLButtonElement).style.boxShadow = 'inset 0 0 0 2px #242943';
            (e.target as HTMLButtonElement).style.color = '#ffffff';
          }}
        >
          Done
        </button>
      </div>
    </div>
  );
}
