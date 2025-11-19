'use client';

interface WearTimeTileProps {
  onTileClick: () => void;
  wearTime: string;
}

export default function WearTimeTile({ onTileClick, wearTime }: WearTimeTileProps) {
  const wearTimeLabels: { [key: string]: string } = {
    'under-2': 'Under 2 hours',
    '2-4': '2-4 hours',
    '4-6': '4-6 hours',
    'over-6': 'Over 6 hours'
  };

  return (
    <article onClick={onTileClick} style={{ cursor: 'pointer' }}>
      <span className="image">
        <img src="/html5up-forty/images/pic04.jpg" alt="" />
      </span>
      <header className="major">
        <h3>Ipsum</h3>
        <p>{wearTime ? `✓ ${wearTimeLabels[wearTime]}` : 'Expected wear time'}</p>
      </header>
    </article>
  );
}
