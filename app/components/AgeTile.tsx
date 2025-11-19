'use client';

interface AgeTileProps {
  onTileClick: () => void;
  age: string;
}

export default function AgeTile({ onTileClick, age }: AgeTileProps) {
  return (
    <article onClick={onTileClick} style={{ cursor: 'pointer' }}>
      <span className="image">
        <img src="/html5up-forty/images/pic03.jpg" alt="" />
      </span>
      <header className="major">
        <h3>With each year, more elegant</h3>
        <p>{age ? `✓ Age ${new Date().getFullYear() - parseInt(age)}` : 'Enter your birth year'}</p>
      </header>
    </article>
  );
}
