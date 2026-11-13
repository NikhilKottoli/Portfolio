/**
 * Everything that is true about the trainer, kept away from the way it is
 * drawn. Copy can be updated here without touching a single component.
 */

export type SocialLink = {
    label: string;
    href: string;
    external: boolean;
};

export const trainer = {
    name: 'Nikhil Kottoli',
    firstName: 'Nikhil',
    lastName: 'Kottoli',
    /** Playful identifier printed on the trainer card, like a Pokédex entry number. */
    id: '2048',
    handle: 'nikhil_k0tt0li',
    role: 'Software Engineer',
    currentRole: 'Software Engineering Intern at Microsoft',
    currentOrg: 'Microsoft — MAI Extensions Security',
    location: 'Surathkal, Karnataka, India',
    school: 'NITK Surathkal',
    education: 'Computer Science',
    tagline: 'Computer science student and software engineer.',
    intro:
        "Hey, I'm Nikhil — a computer science student and software engineer interested in systems programming, distributed infrastructure, backend engineering, and applied AI.",
    dialogue:
        "Hey there! I'm Nikhil. I'm a software engineer who enjoys building systems, exploring new technologies, and contributing to open source.",
    availability: 'Open to internships, research roles, and interesting problems.',
    interests: [
        'Systems programming',
        'Distributed systems',
        'Networking',
        'Backend engineering',
        'AI engineering',
        'Open source',
    ],
} as const;

export const socials: SocialLink[] = [
    { label: 'GitHub', href: 'https://github.com/NikhilKottoli', external: true },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/nikhil-kottoli-92552128a/',
        external: true,
    },
    { label: 'Email', href: 'mailto:nikhilkottoli2005@gmail.com', external: false },
];

export type NavItem = {
    /** Label shown in the menu. */
    name: string;
    /** Route the label leads to. */
    path: string;
    /** Pixel icon drawn next to the label. */
    icon: 'home' | 'user' | 'folder' | 'code' | 'mail' | 'book' | 'badge' | 'spark';
    /** Small caption used on mobile and by assistive technology. */
    caption: string;
};

export const navItems: NavItem[] = [
    { name: 'TRAINER CARD', path: '/', icon: 'home', caption: 'Trainer profile' },
    { name: 'POKÉDEX', path: '/Projects', icon: 'folder', caption: 'Project collection' },
    { name: 'INVENTORY', path: '/Inventory', icon: 'book', caption: 'Skills & tech' },
    { name: 'BADGES', path: '/Badges', icon: 'badge', caption: 'Achievements' },
    { name: 'JOURNEY', path: '/Experience', icon: 'user', caption: 'Experience & education' },
    { name: 'CONTACT', path: '/Contact', icon: 'mail', caption: 'Send a message' },
];

export type Highlight = {
    title: string;
    detail: string;
    tag: string;
};

/**
 * Short, factual highlights taken from the experience, open source and award
 * records that already live in this portfolio.
 */
export const recentAdventures: Highlight[] = [
    {
        title: 'Microsoft — Extensions Security',
        detail:
            'Shipped a cloud-scale malware scanning pipeline for a catalogue of browser extensions, taking a full scan from 6 hours down to 2–5 minutes.',
        tag: 'C# · Azure Batch · MCP',
    },
    {
        title: 'ETH Global Mumbai 2026',
        detail:
            'Finalist on the Arc track with RupeeRail, cross-border payments on Ethereum built with stablecoins and account abstraction.',
        tag: 'Solidity · ERC-4337',
    },
    {
        title: 'Upstream contributions',
        detail:
            'Merged work in FreeBSD and Ruby on Rails, and an open ns-3 networking change — systems, docs and protocols, all the way upstream.',
        tag: 'FreeBSD · Rails · ns-3',
    },
];

export type CurrentStatus = {
    role: string;
    organisation: string;
    focus: string;
    availability: string;
};

export const currentStatus: CurrentStatus = {
    role: 'Software Engineering Intern',
    organisation: 'Microsoft — Extensions Security',
    focus: 'Distributed malware scanning infrastructure, Azure Batch pipelines and MCP tooling.',
    availability: trainer.availability,
};
