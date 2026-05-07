import { useRef, useEffect } from 'react';

export default function StartMenu({ onClose, onWindowOpen }) {
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        if (e.target.closest('.start-button')) return;
        onClose();
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [onClose]);

  return (
    <div className="start-menu" ref={menuRef}>
      {/* Header */}
      <div className="start-menu-header">
        <div className="start-menu-avatar">
          <img src="/icons/user.png" alt="" style={{ width: 32, height: 32, objectFit: 'contain' }} />
        </div>
        <span>Mikael Eramian</span>
      </div>

      {/* Body */}
      <div className="start-menu-body">
        {/* Left column - programs */}
        <div className="start-menu-left">
          <a
            className="start-menu-item"
            href="https://github.com/MikaelEramian"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
          >
            <span className="start-menu-item-icon">
              <img src="/icons/ie.png" alt="" style={{ width: 20, height: 20, objectFit: 'contain' }} />
            </span>
            <span>GitHub</span>
          </a>
          <a
            className="start-menu-item"
            href="https://linkedin.com/in/mikael-eramian"
            target="_blank"
            rel="noopener noreferrer"
            onClick={onClose}
          >
            <span className="start-menu-item-icon">
              <img src="/icons/ie.png" alt="" style={{ width: 20, height: 20, objectFit: 'contain' }} />
            </span>
            <span>LinkedIn</span>
          </a>
          <div className="start-menu-divider" />
          <div className="start-menu-item" onClick={onClose}>
            <span className="start-menu-item-icon">
              <img src="/icons/email.png" alt="" style={{ width: 20, height: 20, objectFit: 'contain' }} />
            </span>
            <span>mikaeleramian@gmail.com</span>
          </div>
        </div>

        {/* Right column */}
        <div className="start-menu-right">
          <div className="start-menu-item" onClick={() => { onWindowOpen('about'); onClose(); }}>
            <span className="start-menu-item-icon">
              <img src="/icons/my-computer.png" alt="" style={{ width: 20, height: 20, objectFit: 'contain' }} />
            </span>
            <span>My Computer</span>
          </div>
          <div className="start-menu-item" onClick={() => { onWindowOpen('projects'); onClose(); }}>
            <span className="start-menu-item-icon">
              <img src="/icons/my-documents.png" alt="" style={{ width: 20, height: 20, objectFit: 'contain' }} />
            </span>
            <span>My Documents</span>
          </div>
          <div className="start-menu-divider" />
          <div className="start-menu-item" onClick={() => { onWindowOpen('terminal'); onClose(); }}>
            <span className="start-menu-item-icon">
              <img src="/icons/run.png" alt="" style={{ width: 20, height: 20, objectFit: 'contain' }} />
            </span>
            <span>Run...</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="start-menu-footer">
        <div className="start-menu-item" onClick={() => window.location.reload()} style={{ gap: 6, padding: '4px 8px' }}>
          <span className="start-menu-item-icon">
            <img src="/icons/power.png" alt="" style={{ width: 20, height: 20, objectFit: 'contain' }} />
          </span>
          <span style={{ fontSize: 11 }}>Shut Down</span>
        </div>
      </div>
    </div>
  );
}
