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
    role: 'Software Engineer',
    location: 'Surathkal, Karnataka, India',
    summary:
        'Computer science student and software engineer at NITK Surathkal, working on distributed systems, backend infrastructure and applied AI. Currently a Software Engineering Intern at Microsoft on the Extensions Security team.',
    education: 'B.Tech, Computer Science — NITK Surathkal',
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
        role: 'Software Development Engineer Intern',
        organisation: 'Microsoft — MAI Extensions Security',
        period: 'May 2026 – Jul 2026',
        location: 'Hyderabad, India',
        summary:
            'Worked on cloud-scale security infrastructure for a catalogue of browser extensions.',
        highlights: [
            'Designed and deployed a cloud-scale malware-hunting platform that reduced the time to scan the extension catalogue from 6 hours to 2–5 minutes.',
            'Built the scanning pipeline on Azure Batch and exposed tooling to teams through MCP.',
        ],
        stack: ['C#', '.NET', 'Azure Batch', 'MCP', 'Distributed systems', 'Security'],
    },
    {
        role: 'Head of Maintenance',
        organisation: "IRIS — NITK's Administrative System",
        period: 'November 2024 – Present',
        location: 'NITK Surathkal',
        summary:
            "Maintainer of the official student-led ERP of NITK, used by more than 23,000 students and staff.",
        highlights: [
            'Review contributor code, manage Ruby, Rails and gem upgrades, and run code audits and security checks.',
            'Served as Web Lead from December 2025, managing a team of 8 and turning requirements into issues and sprints.',
            'Built features on the R&D module, including OTP login.',
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
        position: 'Finalist, Arc Track — Best Mobile Web Consumer Agent',
        prize: '$7,000 USDC',
    },
    {
        title: 'Build Resilient Apps with Polkadot Cloud',
        position: '1st place — Agora, a decentralised computation marketplace',
        prize: '$3000',
    },
    {
        title: 'NEARCON Innovation Sandbox',
        position: 'NOVA SDK winner — Private RAG',
        prize: '$1000',
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
            'Merged "Align PRR implementation with RFC 9937" (45 lines changed), January 2025.',
    },
    {
        project: 'Ruby on Rails',
        detail:
            'Merged documentation corrections in rails/rails #55581 and rails/cssbundling-rails #182, plus an open change in cssbundling-rails #181.',
    },
    {
        project: 'ns-3',
        detail:
            'Open merge request adding a recent RACK acknowledgement to the ns-3 network simulator (3001 lines changed).',
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
