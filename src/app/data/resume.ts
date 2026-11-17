export type ResumeEntry = {
    role: string;
    organisation: string;
    period: string;
    location: string;
    summary: string;
    highlights: string[];
    stack: string[];
};

export type ResumeAward = {
    title: string;
    position: string;
    prize: string;
};

export type ResumeContribution = {
    project: string;
    detail: string;
};

/**
 * The contents of the resume.
 *
 * Every line here is taken from the experience, awards and open source
 * records that already live in this portfolio. Nothing is invented.
 */
export const resumeProfile = {
    name: 'Nikhil Kottoli',
    role: 'Computer Science Student',
    location: 'Surathkal, Karnataka, India',
    summary:
        'Computer science student and software engineer at NITK Surathkal, working on distributed systems, backend infrastructure and applied AI. Recently completed an SDE internship at Microsoft on the MAI – Extensions Security team (May–Jul 2026); currently a B.Tech Computer Science student at NITK Surathkal.',
    education: 'B.Tech, Computer Science — NITK Surathkal · 8.65 CGPA · Aug 2023 – Present',
    interests: [
        'Systems programming',
        'Distributed systems',
        'Networking',
        'Backend engineering',
        'AI engineering',
        'Open source',
    ],
};

export const resumeExperience: ResumeEntry[] = [
    {
        role: 'SDE Intern',
        organisation: 'Microsoft — MAI Extensions Security',
        period: 'May 2026 – Jul 2026',
        location: 'Hyderabad, India',
        summary:
            'Interned on cloud-scale security infrastructure for a 30K+ browser-extension catalogue.',
        highlights: [
            'Designed and deployed a cloud-scale malware-hunting platform that cut a full catalogue scan from 6 hours to 2–5 minutes.',
            'Architected shard-based distributed execution with consistent-hash affinity routing and node-local SSD caching, reaching 90% efficiency across elastic worker pools.',
            'Built MCP-powered tooling to enable agentic workflows for security researchers.',
        ],
        stack: ['C#', '.NET', 'Azure', 'MCP', 'Distributed systems', 'Security'],
    },
    {
        role: 'Head of Maintenance',
        organisation: "IRIS — NITK's Administrative System",
        period: 'October 2024 – Present',
        location: 'NITK Surathkal',
        summary:
            "Maintainer of the official student-led ERP of NITK, used by more than 23,000 students and staff.",
        highlights: [
            'Review contributor code, manage Ruby, Rails and gem upgrades, and run code audits and security checks.',
            'Served as Web Lead from December 2025, managing a team of 8 and turning requirements into issues and sprints.',
            'Built features on the R&D module, including OTP login.',
            'Built an in-house staging platform with automated subdomain routing, async deployments, real-time logs, environment configuration and interactive container access.',
        ],
        stack: ['Ruby on Rails', 'MySQL', 'Nginx'],
    },
    {
        role: 'Executive Member',
        organisation: 'IEEE NITK Student Branch',
        period: 'October 2024 – Present',
        location: 'NITK Surathkal',
        summary:
            'Organises technical workshops and hackathons, mentors junior members and leads initiatives that foster a coding culture on campus.',
        highlights: [
            'Inducted into the core committee in October 2024 to drive technical events.',
        ],
        stack: ['Leadership', 'Management', 'Mentoring'],
    },
];

export const resumeAwards: ResumeAward[] = [
    {
        title: 'ETH Global Mumbai 2026',
        position: 'Finalist (Top 8 of 622 projects) — RupeeRail, among 1,402 hackers at a 36-hour hackathon',
        prize: '$7,000 USDC',
    },
    {
        title: 'Build Resilient Apps with Polkadot Cloud',
        position: '1st place — Agora, a decentralised computation marketplace',
        prize: '$3,000',
    },
    {
        title: 'NEARCON Innovation Sandbox',
        position: 'NOVA SDK winner — Private RAG',
        prize: '$1,000',
    },
    {
        title: 'Polkadot AssetHub 2025',
        position: '3rd place — Polkaflow, a no-code visual workflow builder',
        prize: '$250',
    },
];

export const resumeContributions: ResumeContribution[] = [
    {
        project: 'FreeBSD',
        detail:
            "Updated PRR to match RFC 9937's SafeACK heuristic (PRR-CRB / PRR-SSRB), corrected RecoverFS, and validated with a packetdrill test — April 2026.",
    },
    {
        project: 'Ruby on Rails',
        detail:
            'Merged documentation corrections in rails/rails #55581 and rails/cssbundling-rails #182, plus an open change in cssbundling-rails #181.',
    },
    {
        project: 'ns-3',
        detail:
            'RACK-TLP (RFC 8985) loss detection with Tail Loss Probe in the ns-3 TCP stack (3,001 lines), September 2025 – February 2026.',
    },
];

export const resumeSkills: { group: string; items: string[] }[] = [
    {
        group: 'Languages',
        items: ['Ruby', 'Python', 'C', 'C++', 'C#', 'SQL', 'JavaScript', 'HTML', 'CSS'],
    },
    {
        group: 'Frameworks',
        items: ['Ruby on Rails', 'React', 'Node.js', 'Django', '.NET', 'LangChain'],
    },
    { group: 'Databases', items: ['MariaDB', 'Redis', 'Qdrant'] },
    { group: 'Developer tools', items: ['Git', 'Docker', 'Packetdrill', 'Postman'] },
];
