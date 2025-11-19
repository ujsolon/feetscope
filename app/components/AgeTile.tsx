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
        <h3>Magna</h3>
        <p>{age ? `✓ Age: ${age}` : 'Enter your age'}</p>
      </header>
    </article>
  );
}
