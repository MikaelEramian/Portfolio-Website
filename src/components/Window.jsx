import { useState, useRef, useCallback } from 'react';
import Draggable from 'react-draggable';
import { ResizableBox } from 'react-resizable';

// Get the current CSS zoom level to correct draggable coordinates
function getZoomScale() {
  const zoom = parseFloat(getComputedStyle(document.documentElement).zoom) || 1;
  return zoom;
}

function TitleBar({ icon, title, isMaximized, onMinimize, onMaximize, onClose }) {
  return (
    <div className="title-bar">
      <div className="title-bar-text">
        {icon && (
          <img
            src={icon}
            alt=""
            style={{ width: 16, height: 16, objectFit: 'contain', marginRight: 4, verticalAlign: 'middle' }}
          />
        )}
        {title}
      </div>
      <div className="title-bar-controls">
        <button aria-label="Minimize" onClick={(e) => { e.stopPropagation(); onMinimize(); }}></button>
        <button aria-label={isMaximized ? "Restore" : "Maximize"} onClick={(e) => { e.stopPropagation(); onMaximize(); }}></button>
        <button aria-label="Close" onClick={(e) => { e.stopPropagation(); onClose(); }}></button>
      </div>
    </div>
  );
}

export default function Window({
  id,
  title,
  icon,
  width = 500,
  height = 400,
  minWidth = 300,
  minHeight = 200,
  defaultPosition,
  zIndex,
  isActive,
  isMaximized,
  onClose,
  onMinimize,
  onMaximize,
  onFocus,
  children,
  className = '',
}) {
  const [size, setSize] = useState({ width, height });
  const nodeRef = useRef(null);

  const handleResize = useCallback((e, { size: newSize }) => {
    setSize(newSize);
  }, []);

  const windowClasses = [
    'window',
    isActive ? 'active-window' : 'inactive-window',
    className,
  ].filter(Boolean).join(' ');

  if (isMaximized) {
    return (
      <div
        className="xp-window-wrapper window-maximized"
        style={{ zIndex }}
        onMouseDown={onFocus}
      >
        <div className={windowClasses}>
          <TitleBar
            icon={icon}
            title={title}
            isMaximized={true}
            onMinimize={onMinimize}
            onMaximize={onMaximize}
            onClose={onClose}
          />
          <div className="window-body" style={{ height: 'calc(100% - 28px)', overflow: 'auto' }}>
            {children}
          </div>
        </div>
      </div>
    );
  }

  const scale = getZoomScale();

  return (
    <Draggable
      handle=".title-bar"
      defaultPosition={defaultPosition}
      nodeRef={nodeRef}
      scale={scale}
    >
      <div
        ref={nodeRef}
        className="xp-window-wrapper"
        style={{ zIndex }}
        onMouseDown={onFocus}
      >
        <ResizableBox
          width={size.width}
          height={size.height}
          minConstraints={[minWidth, minHeight]}
          maxConstraints={[1600, 1000]}
          onResize={handleResize}
          resizeHandles={['se']}
        >
          <div className={windowClasses} style={{ width: '100%', height: '100%', display: 'flex', flexDirection: 'column' }}>
            <TitleBar
              icon={icon}
              title={title}
              isMaximized={false}
              onMinimize={onMinimize}
              onMaximize={onMaximize}
              onClose={onClose}
            />
            <div className="window-body" style={{ flex: 1, overflow: 'auto' }}>
              {children}
            </div>
          </div>
        </ResizableBox>
      </div>
    </Draggable>
  );
}
