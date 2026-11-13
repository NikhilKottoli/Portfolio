/**
 * The trainer's Inventory — a Pokémon Bag split into three pockets.
 *
 * TMs are engineering disciplines, ITEMS are individual technologies, and
 * KEY ITEMS are the platforms and tools that matter most to the work.
 * Every entry is backed by something in the portfolio: a project, a role, a
 * merged contribution, or a documented part of the resume.
 */

export type Pocket = 'tm' | 'item' | 'key';

export type InventoryItem = {
    /** Stable identifier used for selection and deep links. */
    id: string;
    /** Display name. */
    name: string;
    /** Short label printed under the name, e.g. "TM01" or "ITEM". */
    label: string;
    /** One-line description shown in the list. */
    summary: string;
    /** Longer explanation shown in the detail panel. */
    description: string;
    /** How the trainer actually uses it. */
    usage: string;
    /** Pixel icon used in the list and detail header. */
    icon: 'chip' | 'cloud' | 'bolt' | 'gear' | 'book' | 'key' | 'star' | 'code' | 'shield' | 'heart' | 'coin' | 'flag' | 'spark';
    /** Project names this entry connects to. */
    relatedProjects: string[];
    /** External link, when there is a meaningful one. */
    href?: string;
};

export type Discipline = InventoryItem & {
    /** TM number, e.g. 01. */
    tmNumber: string;
    /** Technologies that make up the discipline. */
    technologies: string[];
};

export type Technology = InventoryItem & {
    /** The pocket the technology is filed under. */
    group: 'Language' | 'Framework' | 'Infrastructure' | 'Data' | 'AI & Tooling';
};

export type KeyItem = InventoryItem;

/**
 * TMs — the engineering disciplines the trainer has actually practised.
 */
export const disciplines: Discipline[] = [
    {
        id: 'systems-programming',
        tmNumber: '01',
        name: 'Systems Programming',
        label: 'TM01',
        summary: 'Working close to the metal — memory, processes, protocols and hardware.',
        description:
            'Systems programming is where the abstraction stops. It is about knowing what the machine is actually doing while you write the code: how memory is laid out, how a scheduler switches between threads, what a packet looks like on the wire.',
        usage:
            'The FreeBSD PRR contribution put this into practice directly — aligning an implementation with RFC 9937 meant reading the specification closely and reasoning about timer behaviour in a production kernel. The Verilog matrix accelerator pushed the same discipline down into hardware, where every cycle is accounted for.',
        icon: 'chip',
        relatedProjects: ['FreeBSD PRR', 'Matrix Multiplier'],
        technologies: ['C', 'C++', 'Rust', 'Verilog', 'FreeBSD'],
    },
    {
        id: 'distributed-systems',
        tmNumber: '02',
        name: 'Distributed Systems',
        label: 'TM02',
        summary: 'Coordinating work across machines, and designing for partial failure.',
        description:
            'Distributed systems engineering is the discipline of assuming things will fail — networks drop packets, nodes restart, clocks drift — and building systems that still behave correctly.',
        usage:
            'At Microsoft the work was a cloud-scale malware scanning pipeline built on Azure Batch, where a full scan of the extension catalogue was reduced from six hours to two to five minutes by distributing the scan across a pool of workers and coordinating the results.',
        icon: 'cloud',
        relatedProjects: ['Microsoft Extensions Security', 'Agora', 'RupeeRail'],
        technologies: ['C#', '.NET', 'Azure Batch', 'MCP', 'Redis'],
    },
    {
        id: 'backend-engineering',
        tmNumber: '03',
        name: 'Backend Engineering',
        label: 'TM03',
        summary: 'Designing services, APIs and data layers that hold up under load.',
        description:
            'Backend engineering is the craft of building the part nobody sees: APIs with clear contracts, data models that survive contact with reality, and services that can be operated and extended by other people.',
        usage:
            'The IRIS ERP work is the deepest expression of this — a Rails application serving more than 23,000 students and staff, where upgrades, code audits and security checks have to happen continuously without downtime.',
        icon: 'gear',
        relatedProjects: ['IRIS ERP', 'ImpactChain', 'CodeMaster', 'Synkerr'],
        technologies: ['Ruby on Rails', 'Express', 'Node.js', 'PostgreSQL', 'MongoDB'],
    },
    {
        id: 'ai-engineering',
        tmNumber: '04',
        name: 'AI Engineering',
        label: 'TM04',
        summary: 'Applying machine learning where the constraints actually live.',
        description:
            'AI engineering is less about training models than about putting them to work inside systems that have real requirements — latency, privacy, cost and reliability.',
        usage:
            'Private RAG is the clearest example: retrieval-augmented generation that runs entirely inside a Trusted Execution Environment, so the embedding and similarity search happen in a hardware-isolated enclave and the host never touches plaintext.',
        icon: 'spark',
        relatedProjects: ['Private RAG'],
        technologies: ['LangChain', 'NEAR AI TEE', 'NOVA SDK', 'Qdrant', 'Python'],
    },
    {
        id: 'cloud-infrastructure',
        tmNumber: '05',
        name: 'Cloud Infrastructure',
        label: 'TM05',
        summary: 'Provisioning, scheduling and operating compute at scale.',
        description:
            'Cloud infrastructure work is about turning raw compute into a dependable pipeline: the right machines, the right scheduling, the right observability, and a failure story.',
        usage:
            'The Azure Batch pipeline at Microsoft was a scheduling problem in miniature — partition the catalogue into batches, distribute them, collect the verdicts, and report back. Agora applies the same thinking to a decentralised compute marketplace.',
        icon: 'cloud',
        relatedProjects: ['Microsoft Extensions Security', 'Agora'],
        technologies: ['Azure', 'Azure Batch', 'MCP', 'Docker', 'Polkadot'],
    },
    {
        id: 'network-engineering',
        tmNumber: '06',
        name: 'Network Engineering',
        label: 'TM06',
        summary: 'Understanding how data actually moves between hosts.',
        description:
            'Network engineering is about protocols, transport behaviour and the failure modes that only appear once packets leave your machine.',
        usage:
            'The ns-3 merge request added a recent RACK acknowledgement to the network simulator — a real contribution to the tool used to research congestion control. The FreeBSD work sits in the same territory: timer behaviour and protocol correctness in a live kernel.',
        icon: 'bolt',
        relatedProjects: ['ns-3 Contribution', 'FreeBSD PRR'],
        technologies: ['ns-3', 'TCP', 'FreeBSD', 'Packetdrill'],
    },
];

/**
 * ITEMS — the technologies and tools, filed by group.
 */
export const technologies: Technology[] = [
    // Languages
    {
        id: 'ruby',
        name: 'Ruby',
        label: 'ITEM',
        group: 'Language',
        summary: 'The language behind IRIS and the Rails contributions upstream.',
        description:
            'Ruby is the backbone of the IRIS work — a Rails application with more than 23,000 users — and of the documentation corrections merged upstream into Ruby on Rails.',
        usage:
            'Maintaining IRIS means reviewing Ruby, managing gem upgrades, and running code audits on a codebase of this size. Upstream, a Ruby on Rails documentation correction was merged into cssbundling-rails.',
        icon: 'code',
        relatedProjects: ['IRIS ERP', 'Ruby on Rails Contributions'],
    },
    {
        id: 'python',
        name: 'Python',
        label: 'ITEM',
        group: 'Language',
        summary: 'The everyday language for scripting, data work and AI tooling.',
        description:
            'Python is the default for the glue work: scripts, tooling around distributed jobs, and the language most AI frameworks assume.',
        usage:
            'Used for automation around Azure Batch pipelines and for AI prototyping, including the RAG stack behind Private RAG.',
        icon: 'code',
        relatedProjects: ['Private RAG', 'Microsoft Extensions Security'],
    },
    {
        id: 'c',
        name: 'C',
        label: 'ITEM',
        group: 'Language',
        summary: 'Systems work — kernels, drivers and the layers beneath frameworks.',
        description:
            'C is where operating systems live, and where understanding memory and concurrency stops being theoretical.',
        usage:
            'Studied and applied through kernel-level work on FreeBSD and through the ns-3 networking simulator.',
        icon: 'code',
        relatedProjects: ['FreeBSD PRR', 'ns-3 Contribution'],
    },
    {
        id: 'cpp',
        name: 'C++',
        label: 'ITEM',
        group: 'Language',
        summary: 'Performance-critical work where the allocator matters.',
        description:
            'C++ is the language of choice when the bottleneck is the program itself rather than the network or the database.',
        usage:
            'Applied in systems contexts and competitive programming coursework.',
        icon: 'code',
        relatedProjects: ['Matrix Multiplier'],
    },
    {
        id: 'csharp',
        name: 'C#',
        label: 'ITEM',
        group: 'Language',
        summary: 'The language of the malware scanning platform at Microsoft.',
        description:
            'C# and .NET carried the extension-scanning platform: the batched scan jobs, the coordination logic, and the tooling exposed to other teams through MCP.',
        usage:
            'The scanning pipeline that reduced a full catalogue scan from six hours to two to five minutes was written in C# on .NET, running on Azure Batch.',
        icon: 'code',
        relatedProjects: ['Microsoft Extensions Security'],
    },
    {
        id: 'rust',
        name: 'Rust',
        label: 'ITEM',
        group: 'Language',
        summary: 'Memory safety without a garbage collector — used for chain runtimes.',
        description:
            'Rust is the implementation language for Substrate-based chains, where predictability and memory safety are not optional.',
        usage:
            'Used to build the Substrate runtime and custom pallets for the Agora compute marketplace.',
        icon: 'code',
        relatedProjects: ['Agora'],
    },
    {
        id: 'solidity',
        name: 'Solidity',
        label: 'ITEM',
        group: 'Language',
        summary: 'Smart contract implementation across the web3 projects.',
        description:
            'Solidity is the contract language for RupeeRail, ImpactChain and Polkaflow — each with a different concern: payments, transparent funding, and visual workflow composition.',
        usage:
            'Writing ERC-4337 account abstraction contracts and paymasters for RupeeRail, milestone escrow for ImpactChain, and contract templates for Polkaflow.',
        icon: 'code',
        relatedProjects: ['RupeeRail', 'ImpactChain', 'Polkaflow'],
    },
    {
        id: 'verilog',
        name: 'Verilog',
        label: 'ITEM',
        group: 'Language',
        summary: 'Hardware description for the matrix accelerator.',
        description:
            'Verilog describes circuits rather than programs, which is a different way of thinking about correctness: every signal has a value every cycle, and timing is part of the specification.',
        usage:
            'Used to implement the systolic array matrix multiplier, with SystemVerilog testbenches for verification.',
        icon: 'chip',
        relatedProjects: ['Matrix Multiplier'],
    },
    {
        id: 'javascript',
        name: 'JavaScript',
        label: 'ITEM',
        group: 'Language',
        summary: 'The language every browser speaks.',
        description:
            'JavaScript underpins the React frontends across most projects, and TypeScript adds the type discipline needed for larger codebases.',
        usage:
            'Writing the client applications for CodeMaster, Synkerr, ImpactChain and Polkaflow.',
        icon: 'code',
        relatedProjects: ['CodeMaster', 'Synkerr', 'ImpactChain', 'Polkaflow'],
    },
    {
        id: 'sql',
        name: 'SQL',
        label: 'ITEM',
        group: 'Language',
        summary: 'Querying and shaping relational data.',
        description:
            'SQL is how the application talks to its data, and how query shape decides what the application can do at scale.',
        usage:
            'Used with MySQL and MariaDB for the IRIS ERP, which serves more than 23,000 students and staff.',
        icon: 'code',
        relatedProjects: ['IRIS ERP'],
    },

    // Frameworks
    {
        id: 'rails',
        name: 'Ruby on Rails',
        label: 'ITEM',
        group: 'Framework',
        summary: 'The framework behind IRIS and a long-running upstream habit.',
        description:
            'Rails is both a product responsibility and an upstream relationship — two documentation fixes have been merged into Rails and cssbundling-rails.',
        usage:
            'As Head of Maintenance for IRIS, reviewing contributions, managing Rails and gem upgrades, and auditing code. Upstream, merged rails/rails #55581 and cssbundling-rails #182.',
        icon: 'gear',
        relatedProjects: ['IRIS ERP', 'Ruby on Rails Contributions'],
        href: 'https://github.com/rails/rails/pull/55581',
    },
    {
        id: 'react',
        name: 'React',
        label: 'ITEM',
        group: 'Framework',
        summary: 'The interface layer for most of the web projects.',
        description:
            'React is the default front-end choice, from real-time collaborative editors to blockchain dashboards and blockchain-based workflow builders.',
        usage:
            'Building the CodeMaster collaborative editor, the Polkaflow visual node editor, and the RupeeRail payments interface.',
        icon: 'gear',
        relatedProjects: ['CodeMaster', 'Polkaflow', 'RupeeRail', 'Synkerr'],
    },
    {
        id: 'nextjs',
        name: 'Next.js',
        label: 'ITEM',
        group: 'Framework',
        summary: 'The framework behind this very portfolio and the Hamfest platform.',
        description:
            'Next.js handles server rendering, static generation and routing — used here for the portfolio itself and for the Hamfest event platform at NITK.',
        usage:
            'Hamfest India 2026 runs on Next.js with statically generated schedules and API routes for registration and workshop booking.',
        icon: 'gear',
        relatedProjects: ['Hamfest India 2026'],
    },
    {
        id: 'express',
        name: 'Express',
        label: 'ITEM',
        group: 'Framework',
        summary: 'A small, dependable HTTP layer for Node services.',
        description:
            'Express is the minimal web layer behind several of the projects — the API surface, the WebSocket upgrade path, and the middleware that ties it together.',
        usage:
            'Building the CodeMaster room-management API, the Synkerr backend with Socket.io, and the Polkaflow simulation and codegen service.',
        icon: 'gear',
        relatedProjects: ['CodeMaster', 'Synkerr', 'Polkaflow', 'ImpactChain'],
    },
    {
        id: 'dotnet',
        name: '.NET',
        label: 'ITEM',
        group: 'Framework',
        summary: 'The runtime behind the Microsoft scanning platform.',
        description:
            '.NET provided the managed runtime, async model and tooling that made the extension-scanning service maintainable.',
        usage:
            'The Azure Batch scan workers and the MCP tooling exposed to other teams are .NET services.',
        icon: 'gear',
        relatedProjects: ['Microsoft Extensions Security'],
    },
    {
        id: 'langchain',
        name: 'LangChain',
        label: 'ITEM',
        group: 'Framework',
        summary: 'The orchestration layer used to compose retrieval pipelines.',
        description:
            'LangChain provides the abstractions for chaining retrieval, prompting and generation — the plumbing of a RAG system.',
        usage:
            'Applied in building retrieval-augmented generation workflows, including the TEE-backed Private RAG system.',
        icon: 'gear',
        relatedProjects: ['Private RAG'],
    },

    // Infrastructure
    {
        id: 'azure',
        name: 'Azure',
        label: 'ITEM',
        group: 'Infrastructure',
        summary: 'The cloud platform hosting the malware scanning pipeline.',
        description:
            'Azure is where the extension-scanning work ran — managed compute, job scheduling and the storage to coordinate across a pool of workers.',
        usage:
            'Azure Batch scheduled the scan jobs; the pipeline divided the extension catalogue into batches and reported results back to the platform.',
        icon: 'cloud',
        relatedProjects: ['Microsoft Extensions Security'],
    },
    {
        id: 'docker',
        name: 'Docker',
        label: 'ITEM',
        group: 'Infrastructure',
        summary: 'Reproducible environments for services and dependencies.',
        description:
            'Containerisation removes the gap between "works on my machine" and the environment a service actually runs in.',
        usage:
            'Used to package services and their dependencies consistently across development and deployment.',
        icon: 'gear',
        relatedProjects: ['Agora', 'Synkerr', 'ImpactChain'],
    },
    {
        id: 'polkadot',
        name: 'Polkadot',
        label: 'ITEM',
        group: 'Infrastructure',
        summary: 'The parachain ecosystem behind Agora and Polkaflow.',
        description:
            'Polkadot provides the shared security and cross-chain messaging that a parachain-based marketplace depends on.',
        usage:
            'Agora was designed as a parachain with custom Substrate pallets; Polkaflow targets Polkadot AssetHub for contract workflows.',
        icon: 'cloud',
        relatedProjects: ['Agora', 'Polkaflow'],
    },
    {
        id: 'ethereum',
        name: 'Ethereum',
        label: 'ITEM',
        group: 'Infrastructure',
        summary: 'The settlement layer behind RupeeRail.',
        description:
            'Ethereum provides the account abstraction and stablecoin settlement that make cross-border payments practical.',
        usage:
            'RupeeRail deployed ERC-4337 contracts on Ethereum, with a paymaster sponsoring gas so users transact without holding ETH.',
        icon: 'cloud',
        relatedProjects: ['RupeeRail'],
    },
    {
        id: 'near-ai',
        name: 'NEAR AI TEE',
        label: 'ITEM',
        group: 'Infrastructure',
        summary: 'Hardware-isolated execution for privacy-critical computation.',
        description:
            'Trusted Execution Environments run code in an enclave where even the host cannot inspect memory — which is what makes a client-side RAG possible at all.',
        usage:
            'Private RAG runs embedding generation and vector search inside the TEE, so document plaintext is never exposed to the server.',
        icon: 'shield',
        relatedProjects: ['Private RAG'],
    },
    {
        id: 'nginx',
        name: 'Nginx',
        label: 'ITEM',
        group: 'Infrastructure',
        summary: 'The reverse proxy in front of the IRIS application.',
        description:
            'Nginx sits at the edge of the IRIS deployment, handling TLS termination, static assets and request routing.',
        usage:
            'Maintained as part of keeping the IRIS platform stable and available for its users.',
        icon: 'cloud',
        relatedProjects: ['IRIS ERP'],
    },

    // Data
    {
        id: 'mysql',
        name: 'MySQL',
        label: 'ITEM',
        group: 'Data',
        summary: 'The relational store behind the IRIS ERP.',
        description:
            'MySQL holds the academic and administrative records that IRIS serves, with careful attention to schema and query performance.',
        usage:
            'Used for the IRIS database — a system with 23,000+ users where query shape and indexing matter.',
        icon: 'gear',
        relatedProjects: ['IRIS ERP'],
    },
    {
        id: 'mariadb',
        name: 'MariaDB',
        label: 'ITEM',
        group: 'Data',
        summary: 'The database engine actually deployed for IRIS.',
        description:
            'MariaDB is the MySQL-compatible engine running the IRIS production database.',
        usage:
            'Managing upgrades, schema migrations and query behaviour for the live IRIS platform.',
        icon: 'gear',
        relatedProjects: ['IRIS ERP'],
    },
    {
        id: 'mongodb',
        name: 'MongoDB',
        label: 'ITEM',
        group: 'Data',
        summary: 'Document storage for flexible, user-generated content.',
        description:
            'MongoDB suits data whose shape evolves with the product — profiles, posts, project listings — where rigid schemas slow iteration.',
        usage:
            'Backing the Synkerr social platform, where project listings and user profiles differ in shape.',
        icon: 'gear',
        relatedProjects: ['Synkerr'],
    },
    {
        id: 'redis',
        name: 'Redis',
        label: 'ITEM',
        group: 'Data',
        summary: 'In-memory state for real-time and session handling.',
        description:
            'Redis is the fast layer: session state, presence, queues, and the pub/sub that makes real-time features work.',
        usage:
            'CodeMaster uses Redis for session state and pub/sub to keep every participant in an interview room on the same buffer.',
        icon: 'bolt',
        relatedProjects: ['CodeMaster'],
    },
    {
        id: 'qdrant',
        name: 'Qdrant',
        label: 'ITEM',
        group: 'Data',
        summary: 'Vector search for retrieval-augmented generation.',
        description:
            'Qdrant stores embeddings and serves the nearest-neighbour queries that a RAG pipeline depends on.',
        usage:
            'Used alongside the TEE-backed embedding pipeline in Private RAG for similarity retrieval over encrypted document data.',
        icon: 'chip',
        relatedProjects: ['Private RAG'],
    },

    // AI & Tooling
    {
        id: 'mcp',
        name: 'MCP',
        label: 'ITEM',
        group: 'AI & Tooling',
        summary: 'The Model Context Protocol layer that exposed scanning tools.',
        description:
            'MCP is the protocol that lets an AI client call tools in a structured way — the scanning platform was exposed through it so other teams could query results.',
        usage:
            'Built the MCP tooling that lets teams interact with the extension-scanning service and its results.',
        icon: 'chip',
        relatedProjects: ['Microsoft Extensions Security'],
    },
    {
        id: 'git',
        name: 'Git',
        label: 'ITEM',
        group: 'AI & Tooling',
        summary: 'Version control, and the basis for every upstream contribution.',
        description:
            'Git is the medium in which open source work happens — patch series, rebases, and the review process behind a merged change.',
        usage:
            'Maintaining several repositories, preparing patch series for FreeBSD and ns-3, and reviewing contributor patches for IRIS.',
        icon: 'code',
        relatedProjects: ['FreeBSD PRR', 'ns-3 Contribution', 'IRIS ERP'],
    },
    {
        id: 'packetdrill',
        name: 'Packetdrill',
        label: 'ITEM',
        group: 'AI & Tooling',
        summary: 'Scripted network protocol testing for TCP behaviour.',
        description:
            'Packetdrill tests network stack behaviour by scripting packet exchanges and asserting on the responses — precision at the protocol level.',
        usage:
            'Used to exercise TCP protocol behaviour as part of systems and networking work.',
        icon: 'bolt',
        relatedProjects: ['FreeBSD PRR', 'ns-3 Contribution'],
    },
    {
        id: 'postman',
        name: 'Postman',
        label: 'ITEM',
        group: 'AI & Tooling',
        summary: 'API exploration and testing during service development.',
        description:
            'Postman makes the shape of an API visible while it is being built, which is how contract problems get caught early.',
        usage:
            'Testing and documenting the HTTP APIs across the Express-based services.',
        icon: 'gear',
        relatedProjects: ['CodeMaster', 'Synkerr', 'ImpactChain'],
    },
];

/**
 * KEY ITEMS — the platforms that matter most to the trainer's technical world.
 */
export const keyItems: KeyItem[] = [
    {
        id: 'github',
        name: 'GitHub',
        label: 'KEY ITEM',
        summary: 'Where the code lives and where the open source work happens.',
        description:
            'GitHub is the primary place the trainer builds in public: personal projects, team repositories at IEEE NITK, and the profile where upstream contributions are tracked.',
        usage:
            'Hosting projects like RupeeRail, ImpactChain, Polkaflow and Synkerr, maintaining the CodeMaster repository with IEEE NITK, and opening the pull requests that led to merged changes in FreeBSD and Rails.',
        icon: 'code',
        relatedProjects: ['RupeeRail', 'ImpactChain', 'Polkaflow', 'CodeMaster', 'FreeBSD PRR'],
        href: 'https://github.com/NikhilKottoli',
    },
    {
        id: 'freebsd',
        name: 'FreeBSD',
        label: 'KEY ITEM',
        summary: 'An operating system the trainer has contributed to upstream.',
        description:
            'FreeBSD is a serious systems codebase — a production kernel written in C by people who care about correctness. Contributing to it is a genuine test of systems understanding.',
        usage:
            'The merged change "Align PRR implementation with RFC 9937" (45 lines changed, January 2025) brought the PRR implementation in line with the current specification.',
        icon: 'shield',
        relatedProjects: ['FreeBSD PRR'],
        href: 'https://reviews.freebsd.org/D56535',
    },
    {
        id: 'azure-platform',
        name: 'Azure',
        label: 'KEY ITEM',
        summary: 'The cloud platform where the scanning pipeline runs.',
        description:
            'Azure is not just infrastructure for this trainer — it is the substrate for the most demanding piece of engineering work so far.',
        usage:
            'Azure Batch scheduled the distributed scan of the browser extension catalogue, taking a full pass from six hours down to two to five minutes.',
        icon: 'cloud',
        relatedProjects: ['Microsoft Extensions Security'],
        href: 'https://azure.microsoft.com',
    },
    {
        id: 'ns3',
        name: 'ns-3',
        label: 'KEY ITEM',
        summary: 'A discrete-event network simulator used across networking research.',
        description:
            'ns-3 is the standard tool for simulating network stacks before code reaches real hardware — it is where protocol behaviour gets tested in time.',
        usage:
            'Contributed a change adding a recent RACK acknowledgement to the simulator (3,001 lines changed), currently open for review.',
        icon: 'cloud',
        relatedProjects: ['ns-3 Contribution'],
        href: 'https://gitlab.com/nsnam/ns-3-dev/-/merge_requests/2744',
    },
];

/** All inventory entries, flattened. */
export const allInventory: InventoryItem[] = [
    ...disciplines,
    ...technologies,
    ...keyItems,
];
