export default function ErrorDialog({ title = 'Error', message, icon = '/icons/error.png', onClose }) {
  return (
    <div className="error-dialog-overlay" onClick={onClose}>
      <div
        className="window"
        style={{ width: 380 }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="title-bar">
          <div className="title-bar-text">{title}</div>
          <div className="title-bar-controls">
            <button aria-label="Close" onClick={onClose}></button>
          </div>
        </div>
        <div className="window-body">
          <div className="error-dialog-content">
            {icon.includes('.') || icon.includes('/') ? (
              <img src={icon} alt="" style={{ width: 32, height: 32, marginRight: 16 }} />
            ) : (
              <span className="error-icon">{icon}</span>
            )}
            <p className="error-text">{message}</p>
          </div>
          <div className="error-buttons">
            <button onClick={onClose}>OK</button>
          </div>
        </div>
      </div>
    </div>
  );
}
