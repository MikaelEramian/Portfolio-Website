const SKILLS_TEXT = `================================
  MIKAEL ERAMIAN - SKILL DUMP
  Last modified: 2026
================================

LANGUAGES:
  Java, Python, C++, JavaScript, HTML/CSS

TOOLS & TECH:
  Linux, Wireshark, Postman
  Metasploitable2, VirtualBox, Nmap

CURRENTLY LEARNING:
  Cybersecurity - penetration testing,
  network analysis, vulnerability assessment

INTERESTS:
  > Cybersecurity (actively moving into the field)
  > Blockchain & crypto markets (interest in DeFi,
   market mechanics and tokenomics)
  > Calisthenics
  > Video editing
================================`;

export default function SkillsWindow() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
      {/* Notepad menu bar */}
      <div className="notepad-menu-bar">
        <span className="notepad-menu-item">File</span>
        <span className="notepad-menu-item">Edit</span>
        <span className="notepad-menu-item">Format</span>
        <span className="notepad-menu-item">View</span>
        <span className="notepad-menu-item">Help</span>
      </div>

      {/* Notepad text area */}
      <div className="notepad-content">
        {SKILLS_TEXT}
      </div>
    </div>
  );
}
