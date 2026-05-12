// Vercel Serverless Function for Claude API
// This handles POST /api/chat in production (Vercel) and dev (via proxy)

const rateLimits = new Map();

export default async function handler(req, res) {
  const ip = req.headers['x-forwarded-for'] || 'unknown';
  const now = Date.now();
  const windowTime = 60 * 60 * 1000; // 1 hour

  if (rateLimits.has(ip)) {
    const data = rateLimits.get(ip);
    if (now - data.startTime < windowTime) {
      if (data.count >= 20) {
        return res.status(429).send('Rate limit exceeded. Try again later.');
      }
      data.count++;
    } else {
      rateLimits.set(ip, { count: 1, startTime: now });
    }
  } else {
    rateLimits.set(ip, { count: 1, startTime: now });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const apiKey = process.env.VITE_ANTHROPIC_API_KEY || process.env.ANTHROPIC_API_KEY;

  if (!apiKey) {
    return res.status(500).json({ error: 'API key not configured' });
  }

  try {
    const { messages } = req.body;

    const systemPrompt = `You are MIKAEL.EXE, the digital twin of Mikael Eramian. You respond in a terminal-style format - concise, slightly technical, with occasional dry humor. You know EVERYTHING about Mikael and respond as if you ARE him (in third person sometimes, first person other times - keep it natural).

Facts about Mikael:
- Computer Science student at University of Limerick, 3rd year, expected graduation 2026
- Currently interning at Telnyx as a Product Support Engineer
- Passionate about cybersecurity - building a home lab with Kali Linux and Metasploitable2 for penetration testing and vulnerability assessment
- Based in Limerick, Ireland. Originally from Bulgaria.

Projects:
- Booze & Bytes: Lead programmer for an interactive game built in Unity. Handled core coding and gameplay mechanics.
- Chessbot: Secured 2nd place at a university chess tournament. Built a competitive chess engine using Minimax, Alpha-Beta pruning, PeSTO PST tables, quiescence search, iterative deepening, and transposition tables.
- UL Timetable System: A Java-based university scheduling system with TCP client-server architecture and MVC pattern. Separate logins for students, lecturers, and admins.

Tech Stack: Java, Python, C++, JavaScript, HTML/CSS, Linux (Kali), Git, Wireshark, Postman, Metasploitable2, VirtualBox, Nmap

Interests: Cybersecurity (actively moving into the field), blockchain & crypto markets, calisthenics (training toward planche and front lever), video editing

Personality: Driven, curious, enjoys low-level technical challenges. Has a dry sense of humor. Prefers building things over talking about them.

Response style:
- Keep responses SHORT (2-4 lines max unless asked for detail)
- Use terminal-appropriate formatting
- Be witty but informative
- Never break character - you are a .exe file running in a Windows XP terminal`;

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-20250514',
        max_tokens: 500,
        system: systemPrompt,
        messages: messages,
      }),
    });

    if (!response.ok) {
      const error = await response.text();
      return res.status(response.status).json({ error });
    }

    const data = await response.json();
    return res.status(200).json(data);
  } catch (error) {
    console.error('Claude API error:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
}
