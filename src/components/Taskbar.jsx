import { useState, useEffect } from 'react';
import StartMenu from './StartMenu';

// Windows flag logo SVG - authentic 4-color flag
function WindowsLogo() {
  return (
    <img src="/icons/windowslogo2.png" alt="Windows Logo" style={{ width: 16, height: 16, objectFit: 'contain', marginRight: 4 }} />
  );
}

export default function Taskbar({ windows, activeWindowId, onWindowClick, onStartClick, startMenuOpen, onStartMenuClose, onWindowOpen }) {
  const [time, setTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, '0');
      const m = now.getMinutes().toString().padStart(2, '0');
      setTime(`${h}:${m}`);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="taskbar">
      {/* Start Button + Menu container */}
      <div className="start-button-wrapper">
        <button className="start-button" onClick={onStartClick}>
          <WindowsLogo />
          <span>start</span>
        </button>

        {/* Start Menu renders here, positioned above the taskbar */}
        {startMenuOpen && (
          <StartMenu onClose={onStartMenuClose} onWindowOpen={onWindowOpen} />
        )}
      </div>

      {/* Window Buttons */}
      <div className="taskbar-windows">
        {windows.map((win) => (
          <button
            key={win.id}
            className={`taskbar-window-button ${win.id === activeWindowId && !win.minimized ? 'active' : ''}`}
            onClick={() => onWindowClick(win.id)}
            title={win.title}
          >
            <img src={win.icon} alt="" style={{ width: 16, height: 16, objectFit: 'contain', flexShrink: 0 }} />
            <span className="taskbar-btn-text">{win.title}</span>
          </button>
        ))}
      </div>

      {/* System Tray - sunken inset panel */}
      <div className="system-tray">
        <img src="/icons/network.png" alt="Network" className="tray-icon" />
        <img src="/icons/volume.png" alt="Volume" className="tray-icon" />
        <span className="tray-clock">{time}</span>
      </div>
    </div>
  );
}
