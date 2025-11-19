'use client';

interface HeelExperienceTileProps {
  onTileClick: () => void;
  experience: string;
}

export default function HeelExperienceTile({ onTileClick, experience }: HeelExperienceTileProps) {

  return (
    <article onClick={onTileClick} style={{ cursor: 'pointer' }}>
      <span className="image">
        <img src="/html5up-forty/images/pic02.jpg" alt="" />
      </span>
      <header className="major">
        <h3>Been wearing them since</h3>
        <p>{experience ? `✓ ${experience}` : 'Heel wearing experience'}</p>
      </header>
    </article>
  );
}
