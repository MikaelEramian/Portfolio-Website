export default function ContactWindow() {
  return (
    <div style={{
      backgroundColor: '#000',
      color: '#c0c0c0',
      fontFamily: "'Courier New', Courier, monospace",
      fontSize: 13,
      padding: 8,
      height: '100%',
      overflowY: 'auto',
      lineHeight: 1.6,
      whiteSpace: 'pre-wrap',
    }}>
      <div>Portfolio OS Professional[Version 1.0.0]</div>
      <div>(C) Copyright 2026 Mikael Eramian</div>
      <br />
      <div>C:\Users\Mikael&gt; contact.bat</div>
      <br />
      <div>
        [OK] GitHub: {' '}
        <a
          className="cmd-link"
          href="https://github.com/MikaelEramian"
          target="_blank"
          rel="noopener noreferrer"
        >
          github.com/MikaelEramian
        </a>
      </div>
      <div>
        [OK] LinkedIn: {' '}
        <a
          className="cmd-link"
          href="https://linkedin.com/in/mikael-eramian"
          target="_blank"
          rel="noopener noreferrer"
        >
          linkedin.com/in/mikael-eramian
        </a>
      </div>
      <div>
        [OK] Email: {' '}
        <a
          className="cmd-link"
          href="mailto:mikaeleramian@gmail.com"
        >
          mikaeleramian@gmail.com
        </a>
      </div>
      <br />
      <div>&gt; Click any link above to open.</div>
      <br />
      <div>C:\Users\Mikael&gt; <span style={{ animation: 'blink 1s step-end infinite' }}>_</span></div>
    </div>
  );
}
