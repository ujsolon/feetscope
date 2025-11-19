'use client';

interface WearTimeTileProps {
  onTileClick: () => void;
  wearTime: string;
}

export default function WearTimeTile({ onTileClick, wearTime }: WearTimeTileProps) {
  const getHeader = () => {
    if (!wearTime) return 'How often are they on my feet?';
    const hours = parseInt(wearTime);
    if (hours > 8) return 'I can wear them all day';
    if (hours > 4) return 'Cuties for work';
    if (hours > 2) return 'For parties';
    return 'I am being forced to do this, help';
  };

  return (
    <article onClick={onTileClick} style={{ cursor: 'pointer' }}>
      <span className="image">
        <img src="/html5up-forty/images/pic04.jpg" alt="" />
      </span>
      <header className="major">
        <h3>{getHeader()}</h3>
        <p>{wearTime ? `✓ ${wearTime}h per day` : 'Expected wear time'}</p>
      </header>
    </article>
  );
}
