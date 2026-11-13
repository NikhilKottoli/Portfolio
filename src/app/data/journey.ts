/**
 * The Journey — a chronological record of education, employment, open source
 * work, leadership and independent projects.
 *
 * Dates are taken from the verified resume and experience records. Ongoing
 * entries are marked as such so a completed role is never shown as current.
 */

export type JourneyCategory =
    | 'Education'
    | 'Experience'
    | 'Open Source'
    | 'Leadership'
    | 'Project';

export type JourneyMilestone = {
    id: string;
    /** Title of the milestone. */
    title: string;
    /** Organisation, project or event. */
    organisation: string;
    /** Date or period. */
    period: string;
    /** Whether the role or activity is still ongoing. */
    ongoing?: boolean;
    /** The role held. */
    role: string;
    /** Category the milestone belongs to. */
    category: JourneyCategory;
    /** What the milestone involved. */
    description: string;
    /** Specific contributions made. */
    contributions: string[];
    /** External link, when there is a meaningful one. */
    href?: string;
};

export const journey: JourneyMilestone[] = [
    {
        id: 'microsoft',
        title: 'Software Engineering Intern',
        organisation: 'Microsoft — MAI Extensions Security',
        period: 'May 2026 – Jul 2026',
        role: 'Software Development Engineer Intern',
        category: 'Experience',
        description:
            'Built cloud-scale security infrastructure for a catalogue of browser extensions, in the team responsible for keeping those extensions safe.',
        contributions: [
            'Designed and deployed a distributed malware-hunting platform that cut a full catalogue scan from 6 hours to 2–5 minutes.',
            'Built the scanning pipeline on Azure Batch and coordinated the scan jobs across the compute pool.',
            'Exposed the scanning tooling to other teams through MCP.',
            'Worked in C# and .NET throughout, in the language and runtime used by the service.',
        ],
        href: 'https://github.com/NikhilKottoli',
    },
    {
        id: 'ethglobal',
        title: 'ETH Global Mumbai Finalist',
        organisation: 'ETH Global 2026 — Arc Track',
        period: '2026',
        role: 'Builder',
        category: 'Project',
        description:
            'Built RupeeRail, cross-border payments on Ethereum using stablecoins and account abstraction, and was selected as a finalist on the Arc track for Best Mobile Web Consumer Agent.',
        contributions: [
            'Implemented ERC-4337 account abstraction so users transact with stablecoins without holding ETH.',
            'Built a paymaster that sponsors gas, removing the need for users to manage native tokens.',
            'Added session keys so repeated operations stay smooth and gasless.',
            'Finalist — $7,000 USDC.',
        ],
        href: 'https://github.com/NikhilKottoli/RupeeRail',
    },
    {
        id: 'iris-maintenance',
        title: 'Head of Maintenance',
        organisation: "IRIS — NITK's Administrative System",
        period: 'April 2026 – Present',
        ongoing: true,
        role: 'Head of Maintenance',
        category: 'Leadership',
        description:
            'Took over maintenance of the official student-led administrative system of NITK Surathkal, used by more than 23,000 students and staff.',
        contributions: [
            'Review contributor code and keep the quality bar consistent across a large codebase.',
            'Manage Ruby, Rails and gem upgrades deliberately rather than reactively.',
            'Run regular code audits and security checks.',
            'Keep the platform stable and up to date for its users.',
        ],
        href: 'https://github.com/iris-nitk/iris',
    },
    {
        id: 'polkadot-win',
        title: 'Polkadot Cloud Winner',
        organisation: 'Build Resilient Apps with Polkadot Cloud',
        period: '2025',
        role: 'Builder',
        category: 'Project',
        description:
            'Placed first with Agora, a parachain-ready decentralised marketplace where compute resources are bought and sold with verifiable results.',
        contributions: [
            'Built a Substrate-based parachain with custom pallets for the compute job market.',
            'Implemented escrow and verification logic for job settlement.',
            'Designed the marketplace around verifiable computation rather than trust in a central operator.',
            'First place — $3,000.',
        ],
        href: 'https://github.com/suyash101101/Agora',
    },
    {
        id: 'near-tee',
        title: 'NOVA SDK Winner',
        organisation: 'NEARCON Innovation Sandbox',
        period: '2025',
        role: 'Builder',
        category: 'Project',
        description:
            'Won the NOVA SDK track with Private RAG, a retrieval system that runs entirely inside a Trusted Execution Environment so documents never leave the device unencrypted.',
        contributions: [
            'Ran embedding generation and vector similarity search inside a hardware-isolated TEE.',
            'Kept the pipeline vectorless — the host never sees document plaintext at any point.',
            'Built the client-side encryption path that feeds the enclave.',
            'Winner — $1,000.',
        ],
        href: 'https://github.com/NikhilKottoli/PrivateRAG',
    },
    {
        id: 'polkadot-assethub',
        title: 'AssetHub Third Place',
        organisation: 'Polkadot AssetHub 2025',
        period: '2025',
        role: 'Builder',
        category: 'Project',
        description:
            'Placed third with Polkaflow, a no-code visual builder that lets developers compose multi-step smart contract workflows without writing boilerplate.',
        contributions: [
            'Built a node-based visual editor where each node represents a contract call.',
            'Added fee estimation and transaction simulation before a user signs anything.',
            'Generated deployment-ready code from the visual workflow.',
            'Third place — $250.',
        ],
        href: 'https://github.com/NikhilKottoli/Polkadot',
    },
    {
        id: 'ns3',
        title: 'ns-3 Merge Request',
        organisation: 'ns-3 Network Simulator',
        period: 'February 2026',
        role: 'Contributor',
        category: 'Open Source',
        description:
            'Submitted a change to the ns-3 discrete-event network simulator adding support for a recent RACK TCP acknowledgement, bringing the simulator in line with current protocol research.',
        contributions: [
            'Implemented RACK acknowledgement handling in the simulator TCP model.',
            'Changed 3,001 lines across the model and its tests.',
            'Submitted the work for review on nsnam/ns-3-dev.',
        ],
        href: 'https://gitlab.com/nsnam/ns-3-dev/-/merge_requests/2744',
    },
    {
        id: 'rails-web-lead',
        title: 'Web Lead',
        organisation: "IRIS — NITK's Administrative System",
        period: 'December 2025 – April 2026',
        role: 'Web Lead',
        category: 'Leadership',
        description:
            'Led a team of eight developers on IRIS, turning requirements into issues and sprints and keeping delivery on schedule.',
        contributions: [
            'Broke down feature requirements into well-scoped issues and sprint plans.',
            'Managed delivery across a team of eight developers.',
            'Coordinated releases for a platform serving the entire institute.',
        ],
    },
    {
        id: 'freebsd',
        title: 'FreeBSD Kernel Contribution',
        organisation: 'FreeBSD Project',
        period: 'January 2025',
        role: 'Contributor',
        category: 'Open Source',
        description:
            'Contributed a change to the FreeBSD kernel aligning the Proportional Rate Reduction implementation with RFC 9937, the current TCP loss recovery specification.',
        contributions: [
            'Compared RFC 9937 against the existing implementation and identified the divergence.',
            'Prepared a patch series bringing the PRR behaviour back in line with the specification.',
            'Merged upstream after review — 45 lines changed.',
        ],
        href: 'https://reviews.freebsd.org/D56535',
    },
    {
        id: 'ieee',
        title: 'Executive Member',
        organisation: 'IEEE NITK Student Branch',
        period: 'October 2024 – Present',
        ongoing: true,
        role: 'Executive Member',
        category: 'Leadership',
        description:
            'Core committee member of the IEEE NITK Student Branch, organising technical workshops and hackathons and mentoring junior members.',
        contributions: [
            'Inducted into the core committee in October 2024 to drive technical events.',
            'Organise workshops and hackathons for the student body.',
            'Mentor junior members and lead initiatives that build a coding culture on campus.',
        ],
        href: 'https://github.com/IEEE-NITK',
    },
    {
        id: 'iris-web-dev',
        title: 'Web Developer',
        organisation: "IRIS — NITK's Administrative System",
        period: 'November 2024 – December 2025',
        role: 'Web Developer',
        category: 'Experience',
        description:
            'Joined the IRIS team as a Ruby on Rails developer and worked on the R&D module of the platform.',
        contributions: [
            'Built features on the R&D module, including OTP login.',
            'Contributed to a codebase serving more than 23,000 students and staff.',
        ],
    },
    {
        id: 'rails-docs',
        title: 'Rails Documentation Merges',
        organisation: 'Ruby on Rails',
        period: 'October – November 2025',
        role: 'Contributor',
        category: 'Open Source',
        description:
            'Merged documentation corrections into Ruby on Rails and cssbundling-rails, including a release 8.0 documentation fix.',
        contributions: [
            'Merged rails/rails #55581 — documentation correction for Rails 8.0.',
            'Merged cssbundling-rails #182 — documentation fix for the CSS bundler.',
            'Opened cssbundling-rails #181 — renaming application.tailwind.css to application.css.',
        ],
        href: 'https://github.com/rails/rails/pull/55581',
    },
    {
        id: 'nitk',
        title: 'B.Tech, Computer Science',
        organisation: 'NITK Surathkal',
        period: 'Present',
        ongoing: true,
        role: 'Student',
        category: 'Education',
        description:
            'Studying Computer Science at the National Institute of Technology Karnataka, Surathkal — the institute that also hosts the IRIS platform the trainer maintains.',
        contributions: [
            'Coursework across systems, networks, algorithms and digital design.',
            'Digital Logic Design project: a parameterised Verilog matrix multiplier on a systolic array.',
        ],
    },
];

export const journeyCategories: JourneyCategory[] = [
    'Education',
    'Experience',
    'Open Source',
    'Leadership',
    'Project',
];
