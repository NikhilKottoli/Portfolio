export type Project = {
    image: string;
    title: string;
    description: string;
    tech: string[];
    link: string;
    award?: string;
    deployment?: string;
};

/**
 * Every project in the Pokédex, in the order they are shown on the projects
 * page. The first three are the ones previewed on the home page.
 *
 * NOTE: This file exists separately from `pokedex.ts` because the homepage
 * preview uses project images, while the Pokédex uses pixel icons. The two
 * data sets overlap but are structured differently for their respective
 * presentation needs.
 */
export const projects: Project[] = [
    {
        image: '/projects/RupeeRail.png',
        title: 'RupeeRail',
        description:
            'ETH Global 2026 Mumbai Finalist, Arc Track (Best Mobile Web Consumer Agent) - Cross-border payments on Ethereum using stablecoins and account abstraction.',
        tech: ['Solidity', 'React', 'Account Abstraction', 'ERC-4337'],
        link: 'https://github.com/NikhilKottoli/RupeeRail',
        award: 'ETH Global Mumbai 2026 Finalist',
    },
    {
        image: '/projects/PrivateRag.png',
        title: 'Private RAG',
        description: 'A vectorless, fully client-side RAG leveraging TEE and secure file storage.',
        tech: ['React', 'NEAR AI TEE', 'NOVA SDK'],
        link: 'https://devspot.app/projects/1094',
    },
    {
        image: '/projects/Agora.png',
        title: 'Agora',
        description: 'A parachain-ready computation marketplace for Polkadot.',
        tech: ['Rust', 'Substrate', 'React'],
        link: 'https://github.com/suyash101101/Agora',
    },
    {
        image: '/projects/ImpactChain.png',
        title: 'ImpactChain',
        description: 'Blockchain-backed social good initiatives platform.',
        tech: ['React', 'Solidity', 'Express'],
        link: 'https://github.com/NikhilKottoli/ImpactChain',
    },
    {
        image: '/projects/Polkaflow.png',
        title: 'Polkaflow',
        description: 'Visual blockchain workflow builder for smart contracts.',
        tech: ['React', 'Express', 'Solidity'],
        link: 'https://github.com/NikhilKottoli/Polkadot',
        deployment: 'https://684f67f55264e77559942f2f--polkaflownikhil.netlify.app/',
    },
    {
        image: '/projects/codemaster.png',
        title: 'CodeMaster',
        description: 'Real-time interview platform with code collaboration.',
        tech: ['React', 'Express', 'redis'],
        link: 'https://github.com/IEEE-NITK/Codemasters',
        deployment: 'https://codemasters-swart.vercel.app/',
    },
    {
        image: '/projects/Synkerr.jpeg',
        title: 'Synkerr',
        description: 'Social platform for professional collaboration.',
        tech: ['React', 'MongoDB', 'Express'],
        link: 'https://github.com/NikhilKottoli/Synkerr_Homepage',
    },
    {
        image: '/projects/hamfest.png',
        title: 'Hamfest India 2026',
        description:
            "Official event platform for India's premier gathering of amateur radio enthusiasts at NITK Surathkal.",
        tech: ['Next.js', 'React', 'Tailwind CSS'],
        link: 'https://hfi2026.nitk.ac.in/',
    },
    {
        image: '/projects/DDS.png',
        title: 'Matrix Multiplier',
        description: 'Hardware-efficient matrix operations using digital logic.',
        tech: ['verilog'],
        link: 'https://github.com/NikhilKottoli/S2-T15',
    },
];

/** The handful of projects previewed on the home page. */
export const featuredProjects = projects.slice(0, 3);
