import { useState, useCallback, useEffect } from 'react';
import Desktop from './components/Desktop.jsx';
import Taskbar from './components/Taskbar.jsx';
import ErrorDialog from './components/ErrorDialog.jsx';
import Window from './components/Window.jsx';
import AboutWindow from './components/windows/AboutWindow.jsx';
import ProjectsWindow from './components/windows/ProjectsWindow.jsx';
import SkillsWindow from './components/windows/SkillsWindow.jsx';
import ContactWindow from './components/windows/ContactWindow.jsx';
import TerminalWindow from './components/windows/TerminalWindow.jsx';

// ============================================================
// Window definitions
// ============================================================
const WINDOW_DEFS = {
  about: {
    id: 'about',
    title: 'My Computer - Mikael Eramian',
    icon: '/icons/my-computer.png',
    width: 520,
    height: 400,
    minWidth: 350,
    minHeight: 280,
    defaultPos: { x: 100, y: 20 },
    Component: AboutWindow,
  },
  projects: {
    id: 'projects',
    title: 'Projects.exe',
    icon: '/icons/folder.png',
    width: 540,
    height: 480,
    minWidth: 350,
    minHeight: 280,
    defaultPos: { x: 140, y: 40 },
    Component: ProjectsWindow,
  },
  skills: {
    id: 'skills',
    title: 'Skills.txt - Notepad',
    icon: '/icons/notepad.png',
    width: 480,
    height: 560,
    minWidth: 300,
    minHeight: 250,
    defaultPos: { x: 120, y: 30 },
    Component: SkillsWindow,
  },
  contact: {
    id: 'contact',
    title: 'C:\\Users\\Mikael\\Contact.bat',
    icon: '/icons/bat.png',
    width: 520,
    height: 360,
    minWidth: 350,
    minHeight: 250,
    defaultPos: { x: 160, y: 50 },
    Component: ContactWindow,
    className: 'cmd-window',
  },
  terminal: {
    id: 'terminal',
    title: 'Terminal.exe - AI Assistant',
    icon: '/icons/cmd.png',
    width: 560,
    height: 420,
    minWidth: 350,
    minHeight: 280,
    defaultPos: { x: 130, y: 25 },
    Component: TerminalWindow,
    className: 'terminal-window',
  },
};

// Desktop icon definitions
const DESKTOP_ICONS = [
  { id: 'about', icon: '/icons/my-computer.png', label: 'My Computer' },
  { id: 'projects', icon: '/icons/folder.png', label: 'Projects.exe' },
  { id: 'skills', icon: '/icons/notepad.png', label: 'Skills.txt' },
  { id: 'contact', icon: '/icons/bat.png', label: 'Contact.bat' },
  { id: 'terminal', icon: '/icons/cmd.png', label: 'Terminal.exe' },
];

// ============================================================
// Boot Sequence Component
// ============================================================
function BootSequence({ onComplete }) {
  const [phase, setPhase] = useState('loading'); // 'loading' | 'welcome' | 'done'
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Phase 1: Loading screen for 2.5 seconds
    const timer1 = setTimeout(() => setPhase('welcome'), 2500);
    return () => clearTimeout(timer1);
  }, []);

  const handleWelcomeClick = () => {
    setFadeOut(true);
    setTimeout(() => onComplete(), 500);
  };

  if (phase === 'loading') {
    return (
      <div className={`boot-screen boot-loading ${fadeOut ? 'fade-out' : ''}`}>
        <div className="boot-logo">
          <span className="boot-name">Portfolio</span>
          <span className="boot-os">OS</span>
        </div>
        <div className="boot-version">v1.0.2026</div>
        <div className="boot-tagline">Loading portfolio environment...</div>
        <div className="boot-progress-container">
          <div className="boot-progress-track">
            <div className="boot-progress-blocks">
              <div className="boot-progress-block" />
              <div className="boot-progress-block" />
              <div className="boot-progress-block" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (phase === 'welcome') {
    return (
      <div
        className={`boot-screen boot-welcome ${fadeOut ? 'fade-out' : ''}`}
      >
        <div className="welcome-content" style={{ width: '100%', maxWidth: 400 }}>
          <div className="welcome-title" style={{ alignSelf: 'flex-start', paddingLeft: 12 }}>Welcome</div>
          
          <div style={{ width: '100%', borderTop: '1px solid rgba(255,255,255,0.3)', margin: '8px 0' }} />
          
          <div className="welcome-user-card" onClick={handleWelcomeClick}>
            <div className="welcome-avatar">
              <img src="/icons/user.png" alt="" style={{ width: 36, height: 36, objectFit: 'contain' }} />
            </div>
            <div className="welcome-username">Mikael Eramian</div>
          </div>
          
          <div style={{ width: '100%', borderTop: '1px solid rgba(255,255,255,0.3)', margin: '8px 0' }} />
          
          <div className="welcome-hint" style={{ alignSelf: 'flex-start', paddingLeft: 12 }}>Click your name to log on</div>
        </div>
        <div className="welcome-bottom-bar" style={{ justifyContent: 'flex-start' }}>
          <div className="welcome-windows-logo">Portfolio OS</div>
        </div>
      </div>
    );
  }

  return null;
}

// ============================================================
// Main App
// ============================================================
export default function App() {
  // Boot state
  const [booted, setBooted] = useState(false);

  // Window state: which windows are open and their state
  const [openWindows, setOpenWindows] = useState({}); // { id: { minimized: bool } }
  const [zStack, setZStack] = useState([]); // ordered list of window ids by z-index
  const [nextZ, setNextZ] = useState(100);

  // Start menu
  const [startMenuOpen, setStartMenuOpen] = useState(false);

  // Error dialog
  const [errorDialog, setErrorDialog] = useState(null);

  // Welcome popup
  const [showWelcome, setShowWelcome] = useState(true);

  // Get active (top) window id
  const activeWindowId = zStack.length > 0 ? zStack[zStack.length - 1] : null;

  // Bring a window to front
  const focusWindow = useCallback((id) => {
    setZStack((prev) => {
      const filtered = prev.filter((w) => w !== id);
      return [...filtered, id];
    });
    setNextZ((z) => z + 1);
  }, []);

  // Open a window (or bring to front if already open)
  const openWindow = useCallback((id) => {
    if (id === 'ie') {
      setErrorDialog({
        title: 'Internet Explorer',
        message:
          'iexplore.exe has encountered a problem and needs to close. We are sorry for the inconvenience.',
      });
      return;
    }

    if (id === 'terminal') {
      setErrorDialog({
        title: 'cmd.exe',
        message: "Hi, I'm currently working on fixing this terminal up with diff commands and a virtual version of me",
      });
      return;
    }

    setOpenWindows((prev) => {
      if (prev[id]) {
        // Already open - unminimize and bring to front
        return { ...prev, [id]: { ...prev[id], minimized: false } };
      }
      return { ...prev, [id]: { minimized: false, maximized: false } };
    });
    focusWindow(id);
    setStartMenuOpen(false);
  }, [focusWindow]);

  // Close a window
  const closeWindow = useCallback((id) => {
    setOpenWindows((prev) => {
      const next = { ...prev };
      delete next[id];
      return next;
    });
    setZStack((prev) => prev.filter((w) => w !== id));
  }, []);

  // Minimize a window
  const minimizeWindow = useCallback((id) => {
    setOpenWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], minimized: true },
    }));
  }, []);

  // Maximize/restore a window
  const toggleMaximize = useCallback((id) => {
    setOpenWindows((prev) => ({
      ...prev,
      [id]: { ...prev[id], maximized: !prev[id]?.maximized },
    }));
    focusWindow(id);
  }, [focusWindow]);

  // Taskbar window button click
  const handleTaskbarWindowClick = useCallback((id) => {
    const win = openWindows[id];
    if (!win) return;

    if (win.minimized) {
      // Restore
      setOpenWindows((prev) => ({
        ...prev,
        [id]: { ...prev[id], minimized: false },
      }));
      focusWindow(id);
    } else if (activeWindowId === id) {
      // Currently focused - minimize
      minimizeWindow(id);
    } else {
      // Not focused - bring to front
      focusWindow(id);
    }
  }, [openWindows, activeWindowId, focusWindow, minimizeWindow]);

  // Get z-index for a window
  const getZIndex = useCallback((id) => {
    const idx = zStack.indexOf(id);
    return idx >= 0 ? 100 + idx : 100;
  }, [zStack]);

  // Build taskbar window list
  const taskbarWindows = Object.keys(openWindows).map((id) => ({
    id,
    title: WINDOW_DEFS[id]?.title || id,
    icon: WINDOW_DEFS[id]?.icon || '/icons/txt.png',
    minimized: openWindows[id]?.minimized || false,
  }));

  // Boot screen
  if (!booted) {
    return <BootSequence onComplete={() => setBooted(true)} />;
  }

  return (
    <div className="app-container desktop-fade-in">
      {/* Desktop with icons */}
      <Desktop icons={DESKTOP_ICONS} onIconClick={openWindow} />

      {/* Render open windows */}
      {Object.keys(openWindows).map((id) => {
        const def = WINDOW_DEFS[id];
        if (!def) return null;
        const win = openWindows[id];
        if (win.minimized) return null; // Don't render minimized windows

        const { Component } = def;

        return (
          <Window
            key={id}
            id={id}
            title={def.title}
            icon={def.icon}
            width={def.width}
            height={def.height}
            minWidth={def.minWidth}
            minHeight={def.minHeight}
            defaultPosition={def.defaultPos}
            zIndex={getZIndex(id)}
            isActive={activeWindowId === id}
            isMaximized={win.maximized}
            onClose={() => closeWindow(id)}
            onMinimize={() => minimizeWindow(id)}
            onMaximize={() => toggleMaximize(id)}
            onFocus={() => focusWindow(id)}
            className={def.className || ''}
          >
            <Component />
          </Window>
        );
      })}

      {/* Taskbar (includes Start Menu) */}
      <Taskbar
        windows={taskbarWindows}
        activeWindowId={activeWindowId}
        onWindowClick={handleTaskbarWindowClick}
        onStartClick={() => setStartMenuOpen((v) => !v)}
        startMenuOpen={startMenuOpen}
        onStartMenuClose={() => setStartMenuOpen(false)}
        onWindowOpen={openWindow}
      />

      {/* Error Dialog */}
      {errorDialog && (
        <ErrorDialog
          title={errorDialog.title}
          message={errorDialog.message}
          onClose={() => setErrorDialog(null)}
        />
      )}

      {/* Welcome Dialog */}
      {showWelcome && (
        <ErrorDialog
          title="Portfolio OS"
          icon="/icons/my-computer.png"
          message="Hi! I built this portfolio as an interactive OS environment. You can click around, and explore my projects and skills!"
          onClose={() => setShowWelcome(false)}
        />
      )}
    </div>
  );
}
