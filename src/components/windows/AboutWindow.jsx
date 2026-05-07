import { useState } from 'react';

const files = {
  'about.txt': `I'm a Computer Science student at the University of Limerick, currently interning as a Product Support Engineer at Telnyx.

I enjoy Cybersecurity and am building a home lab using Kali Linux and Metasploitable2 to practice penetration testing and vulnerability assessment.`,
  'education.txt': `Degree: BSc Computer Science
University: University of Limerick
Status: 2nd Year
Expected Graduation: 2028`,
  'internship.txt': `Role: Product Support Engineer Intern
Company: Telnyx

Focus: Network troubleshooting, Wireshark packet analysis, API debugging with Postman, supporting engineering and operations squads.`,
};

const fileKeys = Object.keys(files);

export default function AboutWindow() {
  const [selectedFile, setSelectedFile] = useState('about.txt');

  return (
    <div className="explorer-layout" style={{ height: '100%' }}>
      {/* Sidebar - Tree View */}
      <div className="explorer-sidebar">
        <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
          <li style={{ fontWeight: 'bold', padding: '4px' }}>
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
              <img src="/icons/desktop.png" alt="" style={{ width: 16, height: 16, marginRight: 6 }} />
              Desktop
            </div>
            <ul style={{ listStyle: 'none', margin: 0, paddingLeft: 18 }}>
              <li style={{ padding: '2px 0' }}>
                <div style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                  <img src="/icons/folder.png" alt="" style={{ width: 16, height: 16, marginRight: 6 }} />
                  mikael
                </div>
                <ul style={{ listStyle: 'none', margin: 0, paddingLeft: 18 }}>
                  {fileKeys.map((f) => (
                    <li key={f}>
                      <div
                        className={`tree-file-item ${selectedFile === f ? 'selected' : ''}`}
                        onClick={() => setSelectedFile(f)}
                      >
                        <img src="/icons/txt.png" alt="" style={{ width: 16, height: 16, marginRight: 6 }} />
                        <span style={{ fontWeight: selectedFile === f ? 'bold' : 'normal' }}>{f}</span>
                      </div>
                    </li>
                  ))}
                </ul>
              </li>
            </ul>
          </li>
        </ul>
      </div>

      {/* Content Panel */}
      <div className="explorer-content">
        <div style={{ fontWeight: 'bold', marginBottom: 8, borderBottom: '1px solid #ccc', paddingBottom: 4 }}>
          <img src="/icons/txt.png" alt="" style={{ width: 16, height: 16, verticalAlign: 'middle', marginRight: 4 }} />
          {selectedFile}
        </div>
        <div style={{ whiteSpace: 'pre-wrap', lineHeight: 1.7 }}>
          {files[selectedFile]}
        </div>
      </div>
    </div>
  );
}
