/**
 * Detailed Pokédex entries for each project.
 *
 * Every field is taken from actual repositories, demos and verified experience.
 * No invented functionality or placeholder descriptions.
 */

export type PokedexEntry = {
    /** Pokédex-style entry number. */
    number: number;
    /** Project title. */
    name: string;
    /** URL slug for deep links. */
    slug: string;
    /** Short one-line summary for the list view. */
    summary: string;
    /** Pixel icon name for the list view. */
    icon: 'coin' | 'key' | 'flag' | 'star' | 'gear' | 'chip' | 'cloud' | 'bolt' | 'heart' | 'shield';
    /** Normal project image for the list view (bounded thumbnail). */
    image?: string;
    /** Category badge. */
    category: string;
    /** Technologies used. */
    tech: string[];
    /** GitHub repository URL, if public. */
    repoUrl?: string;
    /** Live deployment URL, if available. */
    demoUrl?: string;
    /** Award or recognition, if any. */
    award?: string;
    /** Detailed description for the detail view. */
    description: string;
    /** Problem being solved. */
    problem: string;
    /** Technical approach. */
    approach: string;
    /** Architecture or important engineering decisions. */
    architecture: string;
    /** Notable achievements and metrics. */
    highlights: string[];
    /** Related experience or context. */
    context?: string;
};

/** All projects registered in the Pokédex, in display order. */
export const pokedexEntries: PokedexEntry[] = [
    {
        number: 1,
        name: 'IRIS ERP',
        slug: 'iris-erp',
        summary: 'Maintainer of NITK\'s student administrative system, serving 23,000+ users.',
        icon: 'gear',
        category: 'Infrastructure · Open Source',
        tech: ['Ruby on Rails', 'MariaDB', 'Nginx', 'MySQL'],
        repoUrl: 'https://github.com/iris-nitk/iris',
        description:
            'IRIS is the official student-led administrative system of NITK Surathkal, used for academic operations by more than 23,000 students and staff. The trainer serves as Head of Maintenance, responsible for code quality, upgrades and the continued stability of the platform.',
        problem:
            'A platform this size does not maintain itself. Dependency drift, security patches, contributor churn and feature requests all land on the same small group of maintainers, and any of them handled badly becomes an outage for thousands of students during registration.',
        approach:
            'Took over as Head of Maintenance to put structure around the work: reviewing contributor pull requests, managing Ruby, Rails and gem upgrades on a deliberate schedule, and running regular code audits and security checks. Also built an in-house staging platform with automated subdomain routing, async deployments, real-time logs, environment configuration and interactive container access. Previously served as Web Lead, breaking requirements into issues and sprints for a team of eight.',
        architecture:
            '• Ruby on Rails monolith with service-oriented boundaries\n• MariaDB/MySQL for relational academic data\n• Nginx reverse proxy with TLS termination\n• In-house staging platform: automated subdomain routing, async deployments, real-time logs, env config and interactive container access\n• Feature modules for Academics, R&D, Hostels and more\n• Contributed OTP login to the R&D module',
        highlights: [
            'Serves more than 23,000 students and staff',
            'Head of Maintenance since April 2026',
            'Web Lead from December 2025, managing a team of 8',
            'Contributing developer since November 2024',
            'In-house staging platform with automated subdomain routing, async deployments, real-time logs and interactive container access',
        ],
        context: 'Student-led open source project at NITK Surathkal; Head of Maintenance since October 2024.',
    },
    {
        number: 2,
        name: 'Extensions Security Scanner',
        slug: 'extensions-security-scanner',
        summary: 'Distributed malware scanning pipeline that cut a full catalogue scan from 6 hours to 2–5 minutes.',
        icon: 'shield',
        category: 'Security · Cloud Infrastructure',
        tech: ['C#', '.NET', 'Azure', 'MCP'],
        description:
            'A cloud-scale malware scanning platform built for the MAI Extensions Security team at Microsoft. It distributes the scan of a 30K+ extension catalogue across Azure and exposes the resulting verdicts through MCP tooling.',
        problem:
            'Scanning the extension catalogue serially took six hours for a complete pass. At that rate the catalogue is always behind reality — a malicious extension could sit unscanned for hours, and the security team had no way to query results programmatically.',
        approach:
            'Designed a shard-based pipeline on Azure: partition the 30K+ extension catalogue into work units with consistent-hash affinity routing, schedule them across the compute pool with node-local SSD caching, aggregate the verdicts centrally, and surface the results through an MCP server so other teams could query them directly from their tooling.',
        architecture:
            '• C# / .NET scan workers distributed via Azure\n• Shard-based execution with consistent-hash affinity routing\n• Node-local SSD caching reaching 90% efficiency\n• Central coordinator for partitioning and aggregation\n• MCP server exposing scan tooling and verdicts\n• Failure-tolerant job retry and result caching\n• Reporting back into the extensions security pipeline',
        highlights: [
            'Reduced a full catalogue scan from 6 hours to 2–5 minutes',
            'Distributed execution across Azure compute pools',
            'Tooling exposed to other teams through MCP',
            'SDE Internship, Microsoft — May to July 2026',
        ],
        context: 'Work completed during the SDE Internship at Microsoft, MAI Extensions Security.',
    },
    {
        number: 3,
        name: 'RupeeRail',
        slug: 'rupeerail',
        image: '/projects/RupeeRail.png',
        summary: 'Cross-border payments on Ethereum using stablecoins and account abstraction.',
        icon: 'star',
        category: 'Blockchain · Web3',
        tech: ['Solidity', 'React', 'Account Abstraction', 'ERC-4337', 'TypeScript'],
        repoUrl: 'https://github.com/NikhilKottoli/RupeeRail',
        award: 'ETH Global Mumbai 2026 Finalist — Arc Track (Best Mobile Web Consumer Agent)',
        description:
            'RupeeRail is a cross-border payments platform built on Ethereum that leverages stablecoins and ERC-4337 account abstraction to enable gasless, user-friendly transactions for users unfamiliar with crypto.',
        problem:
            'Traditional cross-border payments are slow, expensive, and require significant banking infrastructure. Existing crypto solutions have poor UX — users must manage seed phrases, pay gas fees in native tokens, and understand complex wallet interactions.',
        approach:
            'Built a smart contract wallet using ERC-4337 account abstraction that sponsors gas fees via a paymaster, allowing users to transact with stablecoins (USDC) without holding ETH. Integrated with a React frontend using wagmi/viem for seamless wallet connections and transaction signing.',
        architecture:
            '• ERC-4337 EntryPoint contract for user operations\n• Custom Paymaster sponsoring gas in USDC\n• Session keys for gasless repeated transactions\n• React frontend with RainbowKit + wagmi\n• Deployed on Ethereum Sepolia testnet',
        highlights: [
            'Finalist at ETH Global Mumbai 2026 (Arc Track) — Best Mobile Web Consumer Agent',
            'Gasless stablecoin transfers via ERC-4337 paymaster',
            'Session key implementation for smooth UX',
            'Prize: $7,000 USDC',
        ],
        context: 'Built during ETH Global Mumbai, November 2026 hackathon.',
    },
    {
        number: 4,
        name: 'Private RAG',
        slug: 'private-rag',
        image: '/projects/PrivateRag.png',
        summary: 'Vectorless, fully client-side RAG leveraging TEE and secure file storage.',
        icon: 'chip',
        category: 'AI · Privacy',
        tech: ['React', 'NEAR AI TEE', 'NOVA SDK', 'TypeScript'],
        repoUrl: 'https://github.com/NikhilKottoli/PrivateRAG',
        demoUrl: 'https://devspot.app/projects/1094',
        award: 'NEARCON Innovation Sandbox — NOVA SDK Winner',
        description:
            'Private RAG is a PageIndex-based vectorless RAG system that uses AES-256-GCM wallet-derived client-side encryption, runs inside the NEAR AI TEE, and stores documents on Encrypted IPFS, ensuring user documents never leave their device unencrypted.',
        problem:
            'Standard RAG systems require uploading documents to a server for embedding and retrieval, exposing sensitive data. Local-only solutions lack the compute for quality embeddings.',
        approach:
            'Leveraged PageIndex for vectorless RAG and NEAR AI\'s TEE to run embedding models inside a hardware-enforced enclave. Documents are encrypted client-side with AES-256-GCM keys derived from the user\'s wallet, stored on Encrypted IPFS, and processed in the NEAR AI TEE without the host ever accessing plaintext.',
        architecture:
            '• PageIndex vectorless RAG (no vector database)\n• AES-256-GCM wallet-derived client-side encryption\n• NEAR AI TEE for secure embedding generation\n• Encrypted IPFS for document storage\n• NOVA SDK for TEE communication\n• React frontend with encrypted file handling',
        highlights: [
            'Winner of NEARCON Innovation Sandbox (NOVA SDK track)',
            'Fully client-side — no server sees plaintext',
            'TEE-attested execution guarantees',
            'Prize: $1,000',
        ],
        context: 'Built for NEARCON Innovation Sandbox, January 2026 – March 2026.',
    },
    {
        number: 5,
        name: 'Agora',
        slug: 'agora',
        image: '/projects/Agora.png',
        summary: 'A parachain-ready computation marketplace for Polkadot.',
        icon: 'cloud',
        category: 'Blockchain · Infrastructure',
        tech: ['Rust', 'Substrate', 'React', 'Polkadot', 'ink!'],
        repoUrl: 'https://github.com/suyash101101/Agora',
        award: 'Build Resilient Apps with Polkadot Cloud — 1st Place',
        description:
            'Agora is a decentralised computation marketplace built as a Polkadot parachain, allowing users to buy and sell verifiable compute resources on-chain.',
        problem:
            'Cloud compute is centralised (AWS, GCP, Azure) with opaque pricing and vendor lock-in. There\'s no trustless way to verify computation results or pay for compute without intermediaries.',
        approach:
            'Built a Substrate-based parachain with custom pallets for compute job markets, escrow, and verification. Used ink! smart contracts for job logic and a React frontend for the marketplace UI.',
        architecture:
            '• Substrate parachain with custom pallets\n• ink! smart contracts for job escrow\n• Off-chain workers for compute verification\n• React + Polkadot.js frontend\n• Designed for Polkadot Cloud deployment',
        highlights: [
            '1st place in Build Resilient Apps with Polkadot Cloud',
            'Full parachain runtime with compute marketplace pallets',
            'Verifiable computation via off-chain workers',
            'Prize: $3,000',
        ],
        context: 'Team project for Polkadot Cloud hackathon.',
    },
    {
        number: 6,
        name: 'ImpactChain',
        slug: 'impactchain',
        image: '/projects/ImpactChain.png',
        summary: 'Blockchain-backed social good initiatives platform.',
        icon: 'heart',
        category: 'Blockchain · Social Impact',
        tech: ['React', 'Solidity', 'Express', 'Node.js', 'MongoDB'],
        repoUrl: 'https://github.com/NikhilKottoli/ImpactChain',
        description:
            'ImpactChain is a platform for creating, funding, and tracking social impact initiatives on-chain, ensuring transparent fund allocation and measurable outcomes.',
        problem:
            'Charitable giving lacks transparency — donors can\'t verify where funds go or what impact they create. Traditional platforms take significant fees and provide limited accountability.',
        approach:
            'Built a Solidity smart contract system for initiative creation, milestone-based funding release, and impact verification. React frontend for donors and organisations, Express backend for off-chain metadata and notifications.',
        architecture:
            '• Solidity contracts for initiative lifecycle\n• Milestone-based fund release with multisig\n• IPFS for initiative metadata\n• React + ethers.js frontend\n• Express API for notifications and indexing',
        highlights: [
            'Transparent milestone-based funding',
            'On-chain impact verification',
            'Low-fee alternative to traditional platforms',
        ],
    },
    {
        number: 7,
        name: 'Polkaflow',
        slug: 'polkaflow',
        image: '/projects/Polkaflow.png',
        summary: 'Visual blockchain workflow builder for smart contracts.',
        icon: 'gear',
        category: 'Developer Tools · Blockchain',
        tech: ['React', 'Express', 'Solidity', 'TypeScript'],
        repoUrl: 'https://github.com/NikhilKottoli/Polkadot',
        demoUrl: 'https://684f67f55264e77559942f2f--polkaflownikhil.netlify.app/',
        award: 'Polkadot AssetHub 2025 — 3rd Place',
        description:
            'Polkaflow is a no-code visual workflow builder that lets developers design, test, and deploy smart contract interactions on Polkadot AssetHub without writing boilerplate code.',
        problem:
            'Building multi-step contract interactions (approve → swap → stake → claim) requires writing scripts, managing nonces, and handling failures manually. Visual tools for this are rare in the Polkadot ecosystem.',
        approach:
            'Created a node-based visual editor (React Flow) where each node represents a contract call. The backend simulates the transaction sequence, estimates fees, and generates deployment-ready code.',
        architecture:
            '• React Flow for node-based editor\n• Express backend for simulation and codegen\n• Solidity contract templates\n• Polkadot.js API for chain interaction\n• Deployed on Netlify',
        highlights: [
            '3rd place in Polkadot AssetHub 2025',
            'Visual multi-step transaction builder',
            'Fee estimation and simulation before signing',
            'Prize: $250',
        ],
    },
    {
        number: 8,
        name: 'CodeMaster',
        slug: 'codemaster',
        image: '/projects/codemaster.png',
        summary: 'Real-time interview platform with code collaboration.',
        icon: 'key',
        category: 'EdTech · Real-time',
        tech: ['React', 'Express', 'Redis', 'Socket.io', 'Monaco Editor'],
        repoUrl: 'https://github.com/IEEE-NITK/Codemasters',
        demoUrl: 'https://codemasters-swart.vercel.app/',
        description:
            'CodeMaster is a real-time collaborative coding platform designed for technical interviews, featuring live code editing, video chat integration, and automated evaluation.',
        problem:
            'Technical interviews over video calls are awkward — candidates share screens, interviewers can\'t interact with code, and there\'s no standardised evaluation rubric.',
        approach:
            'Built a collaborative editor using Monaco Editor with Socket.io for real-time sync. Added interview room management, timer, rubric-based evaluation, and replay functionality.',
        architecture:
            '• Monaco Editor with operational transform via Socket.io\n• Redis for session state and pub/sub\n• Express REST API for room management\n• JWT authentication\n• Deployed on Vercel + Railway',
        highlights: [
            'Real-time collaborative editing with Monaco',
            'Interview rubric and replay system',
            'Used for IEEE NITK interview preparation sessions',
        ],
    },
    {
        number: 9,
        name: 'Synkerr',
        slug: 'synkerr',
        image: '/projects/Synkerr.jpeg',
        summary: 'Social platform for professional collaboration.',
        icon: 'flag',
        category: 'Social · Full-stack',
        tech: ['React', 'MongoDB', 'Express', 'Node.js', 'Tailwind CSS'],
        repoUrl: 'https://github.com/NikhilKottoli/Synkerr_Homepage',
        description:
            'Synkerr is a professional networking platform focused on project-based collaboration, helping developers find teammates for hackathons, open source, and side projects.',
        problem:
            'Existing platforms (LinkedIn, GitHub) are poor at matching people for specific project collaborations. Hackathon team formation is chaotic and often happens in Discord/Slack with no structure.',
        approach:
            'Built a project-centric social graph where users create project listings with required roles/skills, and others can apply or express interest. Includes real-time chat, project showcases, and reputation signals.',
        architecture:
            '• React + Tailwind frontend\n• Express + MongoDB backend\n• Socket.io for real-time messaging\n• JWT auth with role-based access\n• Project-based matching algorithm',
        highlights: [
            'Project-centric collaboration model',
            'Real-time team chat',
            'Skill-based matching for hackathons',
        ],
    },
    {
        number: 10,
        name: 'Hamfest India 2026',
        slug: 'hamfest-india-2026',
        image: '/projects/hamfest.png',
        summary: 'Official event platform for India\'s premier amateur radio gathering at NITK Surathkal.',
        icon: 'bolt',
        category: 'Event Tech · Full-stack',
        tech: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript'],
        repoUrl: 'https://github.com/NikhilKottoli/Hamfest2026',
        demoUrl: 'https://hfi2026.nitk.ac.in/',
        description:
            'The official website and management platform for Hamfest India 2026, the largest amateur radio convention in India, hosted at NITK Surathkal.',
        problem:
            'Large technical conventions need schedules, speaker info, registration, workshop management, and live updates — all accessible on mobile with poor connectivity.',
        approach:
            'Built a performant Next.js site with static generation for schedules, dynamic registration flows, workshop booking, and a mobile-first responsive design optimised for low-bandwidth environments.',
        architecture:
            '• Next.js 14 with App Router\n• Static generation for schedule pages\n• API routes for registration and workshops\n• Tailwind CSS for responsive UI\n• Deployed on Vercel with edge caching',
        highlights: [
            'Official platform for 1000+ attendees',
            'Mobile-first, low-bandwidth optimised',
            'Workshop booking and schedule management',
            'Live at hfi2026.nitk.ac.in',
        ],
        context: 'Built as Web Lead for IEEE NITK Student Branch.',
    },
    {
        number: 11,
        name: 'Matrix Multiplier',
        slug: 'matrix-multiplier',
        summary: 'Hardware-efficient matrix operations using digital logic.',
        icon: 'chip',
        category: 'Hardware · Verilog',
        tech: ['Verilog', 'SystemVerilog', 'FPGA', 'Digital Logic'],
        repoUrl: 'https://github.com/NikhilKottoli/S2-T15',
        description:
            'A parameterised matrix multiplication accelerator implemented in Verilog, optimised for FPGA deployment with systolic array architecture.',
        problem:
            'Matrix multiplication is fundamental to ML and signal processing but is compute-intensive. Software implementations on CPUs/GPUs have high latency and power overhead for edge deployment.',
        approach:
            'Designed a systolic array of multiply-accumulate units with configurable dimensions. Implemented weight-stationary dataflow to maximise data reuse and minimise memory bandwidth.',
        architecture:
            '• Parameterised systolic array (N×M PEs)\n• Weight-stationary dataflow\n• Double-buffered input/output FIFOs\n• AXI-Stream interfaces for FPGA integration\n• Verified with SystemVerilog testbenches',
        highlights: [
            'Systolic array architecture for data reuse',
            'Parameterised for different FPGA sizes',
            'SystemVerilog verification suite',
            'Academic project — Digital Design course',
        ],
        context: 'Course project for Digital Logic Design at NITK.',
    },
    {
        number: 12,
        name: 'FreeBSD PRR',
        slug: 'freebsd-prr',
        summary: 'Upstream change aligning the PRR implementation with RFC 9937.',
        icon: 'shield',
        category: 'Systems · Open Source',
        tech: ['C', 'FreeBSD', 'TCP'],
        repoUrl: 'https://reviews.freebsd.org/D56535',
        award: 'Merged upstream — April 2026',
        description:
            'A merged contribution to the FreeBSD kernel implementing the RFC 9937 SafeACK heuristic and PRR-CRB/PRR-SSRB rate-reduction bounds, correcting RecoverFS handling in TCP loss recovery, and validating the change with packetdrill.',
        problem:
            'The PRR implementation in the kernel had drifted from the specification. Behaviour that the RFC defines precisely — how much to reduce the congestion window, and when — was not what the code did, which affects how quickly a connection recovers after loss.',
        approach:
            'Read RFC 9937 against the existing FreeBSD implementation, identified the divergence, and prepared a patch series implementing the SafeACK heuristic and PRR-CRB/PRR-SSRB bounds and correcting RecoverFS. The change was validated with packetdrill, reviewed on the FreeBSD review system and merged.',
        architecture:
            '• FreeBSD TCP stack, PRR congestion control module\n• RFC 9937 SafeACK heuristic and PRR-CRB/PRR-SSRB bounds\n• RecoverFS correction\n• Validated with packetdrill\n• Patch series prepared with git\n• Reviewed on reviews.freebsd.org\n• 45 lines changed, merged April 2026',
        highlights: [
            'Merged upstream into FreeBSD',
            'Implements the RFC 9937 SafeACK heuristic and PRR-CRB/PRR-SSRB bounds',
            'Corrects RecoverFS handling, validated with packetdrill',
            '45 lines changed',
            'Reviewed and accepted by the FreeBSD community',
        ],
        context: 'Open source contribution to the FreeBSD kernel, merged April 2026.',
    },
    {
        number: 13,
        name: 'ns-3 Contribution',
        slug: 'ns-3-contribution',
        summary: 'Open change adding RACK-TLP (RFC 8985) loss detection with Tail Loss Probe to the ns-3 simulator.',
        icon: 'cloud',
        category: 'Networking · Open Source',
        tech: ['C++', 'ns-3', 'TCP'],
        repoUrl: 'https://gitlab.com/nsnam/ns-3-dev/-/merge_requests/2744',
        description:
            'A merge request to the ns-3 network simulator adding RACK-TLP (RFC 8985) loss detection including Tail Loss Probe, bringing the simulator in line with current protocol research.',
        problem:
            'ns-3 is used by researchers to study TCP behaviour before anything reaches a real network. When the simulator lags behind protocol developments, published results describe a protocol that is no longer current.',
        approach:
            'Implemented RACK-TLP (RFC 8985) loss detection including Tail Loss Probe in the simulator\'s TCP model, added unit tests and examples covering the new behaviour, and submitted it as a merge request for review by the ns-3 development community.',
        architecture:
            '• ns-3 TCP model implementation\n• RACK-TLP (RFC 8985) loss detection with Tail Loss Probe\n• Unit tests and examples for the new behaviour\n• C++ with the ns-3 build system\n• Submitted to nsnam/ns-3-dev on GitLab\n• 3,001 lines changed, currently open for review',
        highlights: [
            '3,001 lines changed in the ns-3 TCP model',
            'Adds RACK-TLP (RFC 8985) loss detection including Tail Loss Probe',
            'Includes unit tests and examples',
            'Open for review in nsnam/ns-3-dev',
        ],
        context: 'Open source contribution to the ns-3 network simulator, September 2025 – February 2026.',
    },
];

/** Helper to get an entry by number. */
export const getPokedexEntry = (number: number): PokedexEntry | undefined =>
    pokedexEntries.find((entry) => entry.number === number);

/** Helper to get an entry by name (case-insensitive). */
export const getPokedexEntryByName = (name: string): PokedexEntry | undefined =>
    pokedexEntries.find((entry) => entry.name.toLowerCase() === name.toLowerCase());
