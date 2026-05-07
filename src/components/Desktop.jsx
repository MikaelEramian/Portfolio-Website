import { useState, useRef, useCallback, useEffect } from 'react';
import Draggable from 'react-draggable';

function DesktopIcon({ icon, position, onStart, onStop, onIconClick, zoom, isDragging }) {
  const nodeRef = useRef(null);

  return (
    <>
      {isDragging && (
        <div
          className="desktop-icon"
          style={{ position: 'absolute', top: position.y, left: position.x, opacity: 0.4, pointerEvents: 'none' }}
        >
          <div className="desktop-icon-img">
            <img src={icon.icon} alt="" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
          </div>
          <div className="desktop-icon-label">{icon.label}</div>
        </div>
      )}
      <Draggable
        nodeRef={nodeRef}
        scale={zoom}
        grid={[90, 90]}
        position={position}
        onStart={(e, data) => onStart(icon.id, data)}
        onStop={(e, data) => onStop(icon.id, data)}
      >
        <div
          ref={nodeRef}
          className="desktop-icon"
          style={{ position: 'absolute', top: 0, left: 0, opacity: isDragging ? 0.7 : 1 }}
          title={icon.label}
        >
          <div className="desktop-icon-img">
            <img
              src={icon.icon}
              alt={icon.label}
              draggable={false}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
          <div className="desktop-icon-label">{icon.label}</div>
        </div>
      </Draggable>
    </>
  );
}

export default function Desktop({ icons, onIconClick }) {
  const [selBox, setSelBox] = useState(null);
  const [draggingId, setDraggingId] = useState(null);
  const startPos = useRef(null);
  const desktopRef = useRef(null);

  // Initialize icon positions to stack vertically 
  // e.g., { mycomputer: {x: 10, y: 10}, projects: {x: 10, y: 100}, ... }
  const [iconPositions, setIconPositions] = useState(() => {
    const initPos = {};
    icons.forEach((icon, index) => {
      initPos[icon.id] = { x: 10, y: 10 + index * 90 };
    });
    return initPos;
  });

  const getZoom = () => parseFloat(getComputedStyle(document.documentElement).zoom) || 1;

  const handleMouseDown = useCallback((e) => {
    if (e.target !== desktopRef.current) return;
    const rect = desktopRef.current.getBoundingClientRect();
    const zoom = getZoom();
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;
    startPos.current = { x, y };
    setSelBox({ x, y, w: 0, h: 0 });
  }, []);

  const handleMouseMove = useCallback((e) => {
    if (!startPos.current || !desktopRef.current) return;
    const rect = desktopRef.current.getBoundingClientRect();
    const zoom = getZoom();
    const x = (e.clientX - rect.left) / zoom;
    const y = (e.clientY - rect.top) / zoom;
    const sx = startPos.current.x;
    const sy = startPos.current.y;
    setSelBox({
      x: Math.min(sx, x),
      y: Math.min(sy, y),
      w: Math.abs(x - sx),
      h: Math.abs(y - sy),
    });
  }, []);

  const handleMouseUp = useCallback(() => {
    startPos.current = null;
    setSelBox(null);
  }, []);

  const handleIconStart = (id) => {
    setDraggingId(id);
  };

  const handleIconStop = (id, data) => {
    setDraggingId(null);
    const oldPos = iconPositions[id];
    // Check if it barely moved (click vs drag)
    if (Math.abs(data.x - oldPos.x) < 5 && Math.abs(data.y - oldPos.y) < 5) {
      onIconClick(id);
    } else {
      // Update state with new position
      setIconPositions(prev => ({
        ...prev,
        [id]: { x: data.x, y: data.y }
      }));
    }
  };

  const zoom = getZoom();

  return (
    <div
      className="xp-desktop"
      ref={desktopRef}
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      style={{ position: 'relative' }}
    >
      {/* Render icons absolutely using independent positions */}
      {icons.map((icon) => (
        <DesktopIcon
          key={icon.id}
          icon={icon}
          position={iconPositions[icon.id] || { x: 0, y: 0 }}
          onStart={handleIconStart}
          onStop={handleIconStop}
          onIconClick={onIconClick}
          zoom={zoom}
          isDragging={draggingId === icon.id}
        />
      ))}

      {/* Rubber-band selection rectangle */}
      {selBox && selBox.w > 2 && selBox.h > 2 && (
        <div
          className="desktop-selection-box"
          style={{
            left: selBox.x,
            top: selBox.y,
            width: selBox.w,
            height: selBox.h,
          }}
        />
      )}
    </div>
  );
}
