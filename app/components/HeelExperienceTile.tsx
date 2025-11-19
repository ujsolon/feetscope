'use client';

interface HeelExperienceTileProps {
  onTileClick: () => void;
  experience: string;
}

export default function HeelExperienceTile({ onTileClick, experience }: HeelExperienceTileProps) {
  const experienceLabels: { [key: string]: string } = {
    'beginner': 'Beginner (0-6 months)',
    'intermediate': 'Intermediate (6 months - 2 years)',
    'experienced': 'Experienced (2+ years)',
    'none': 'None'
  };

  return (
    <article onClick={onTileClick} style={{ cursor: 'pointer' }}>
      <span className="image">
        <img src="/html5up-forty/images/pic02.jpg" alt="" />
      </span>
      <header className="major">
        <h3>Tempus</h3>
        <p>{experience ? `✓ ${experienceLabels[experience]}` : 'Heel wearing experience'}</p>
      </header>
    </article>
  );
}
