const projects = [
  {
    title: 'Booze & Bytes',
    status: 'Completed',
    statusColor: '#2ecc40',
    description:
      'Lead programmer for an interactive game built in Unity. Handled core coding and gameplay mechanics.',
    linkText: 'Dev Diary ↗',
    linkUrl: '#',
  },
  {
    title: 'Chessbot',
    status: 'Notable',
    statusColor: '#ff851b',
    description:
      'Secured 2nd place at a university chess tournament. Engineered a competitive chess engine using Minimax, Alpha-Beta pruning, PeSTO PST tables, quiescence search, iterative deepening, and transposition tables.',
    linkText: 'GitHub ↗',
    linkUrl: '#',
  },
  {
    title: 'UL Timetable System',
    status: 'Academic',
    statusColor: '#0074d9',
    description:
      'A Java-based university scheduling system with separate logins for students, lecturers, and admins to manage and view timetables. Built with TCP client-server architecture and MVC pattern.',
    linkText: 'GitHub ↗',
    linkUrl: '#',
  },
];

export default function ProjectsWindow() {
  return (
    <div className="project-list" style={{ height: '100%', overflowY: 'auto' }}>
      {projects.map((proj, i) => (
        <div className="project-item" key={i}>
          <div
            className="project-status-dot"
            style={{ backgroundColor: proj.statusColor }}
            title={proj.status}
          />
          <div className="project-info">
            <div className="project-title">{proj.title}</div>
            <div className="project-status-label">{proj.status}</div>
            <div className="project-desc">{proj.description}</div>
            <a
              href={proj.linkUrl}
              target="_blank"
              rel="noopener noreferrer"
            >
              <button style={{ fontSize: 11 }}>{proj.linkText}</button>
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
