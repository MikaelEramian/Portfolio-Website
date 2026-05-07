export default function TerminalWindow() {
  return (
    <div
      style={{
        backgroundColor: '#0c0c0c',
        color: '#33ff33',
        fontFamily: "'Courier New', Courier, monospace",
        fontSize: 13,
        padding: 16,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <style>
        {`
          @keyframes terminal-blink {
            0%, 100% { opacity: 1; }
            50% { opacity: 0; }
          }
        `}
      </style>
      <div style={{ marginBottom: 16 }}>
        C:\\Windows\\System32\\cmd.exe
      </div>
      <div style={{ lineHeight: 1.5, maxWidth: '80%' }}>
        Hi, I'm currently working on fixing this terminal up with diff commands and a virtual version of me<br /><br />
      </div>
      <div style={{ marginTop: 24 }}>
        C:\\Users\\Mikael&gt; <span style={{ animation: 'terminal-blink 1s step-end infinite' }}>_</span>
      </div>
    </div>
  );
}
