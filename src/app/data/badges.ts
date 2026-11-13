/**
 * The Badge Case — verified accomplishments and recognitions.
 *
 * Participation, selection, winning and employment are kept distinct. Every
 * entry below is taken from the resume, the open source records or the
 * project history that already exists in this portfolio. Nothing here is
 * inferred or inflated.
 */

export type BadgeKind = 'Employment' | 'Award' | 'Open Source' | 'Leadership';

export type Badge = {
    /** Stable identifier. */
    id: string;
    /** Which sprite in `badgeSprites` to draw. */
    sprite: 'microsoft' | 'microsoft32' | 'ethglobal' | 'polkadot' | 'freebsd' | 'iris' | 'leadership' | 'tee' | 'rails';
    /** Badge title. */
    name: string;
    /** Organisation, event or project the badge comes from. */
    organisation: string;
    /** Date or period, when verified. */
    period?: string;
    /** The kind of accomplishment — never blurred together. */
    kind: BadgeKind;
    /** One-line description shown on the badge tile. */
    summary: string;
    /** Full description shown in the detail panel. */
    description: string;
    /** Why it mattered. */
    significance: string;
    /** Supporting project or contribution name. */
    supporting?: string;
    /** External link, when there is a meaningful one. */
    href?: string;
};

export const badges: Badge[] = [
    {
        id: 'microsoft-internship',
        sprite: 'microsoft32',
        name: 'Microsoft Internship',
        organisation: 'Microsoft — MAI Extensions Security',
        period: 'May 2026 – Jul 2026',
        kind: 'Employment',
        summary: 'Software Engineering Intern on the Extensions Security team.',
        description:
            'Worked as a Software Engineering Intern on the MAI Extensions Security team, building cloud-scale malware scanning infrastructure for a catalogue of browser extensions.',
        significance:
            'The scanning platform reduced a full catalogue scan from six hours to two to five minutes, and the tooling was exposed to other teams through MCP. The work involved distributed execution on Azure Batch and a design that had to survive real scan volumes rather than a demo.',
        supporting: 'Extensions Security Scanner',
        href: 'https://github.com/NikhilKottoli',
    },
    {
        id: 'ethglobal-finalist',
        sprite: 'ethglobal',
        name: 'ETH Global Finalist',
        organisation: 'ETH Global Mumbai 2026 — Arc Track',
        period: '2026',
        kind: 'Award',
        summary: 'Finalist on the Arc track for Best Mobile Web Consumer Agent.',
        description:
            'Finalist at ETH Global Mumbai 2026 on the Arc track, which recognises the best mobile web consumer agent, with the cross-border payments project RupeeRail.',
        significance:
            'Selected as a finalist out of the track entries at one of the largest Ethereum hackathons. The project tackled a genuine usability barrier — making cross-border stablecoin payments possible without the user holding ETH or managing a seed phrase — by using ERC-4337 account abstraction and a paymaster. Prize: $7,000 USDC.',
        supporting: 'RupeeRail',
        href: 'https://github.com/NikhilKottoli/RupeeRail',
    },
    {
        id: 'polkadot-first',
        sprite: 'polkadot',
        name: 'Polkadot Cloud Winner',
        organisation: 'Build Resilient Apps with Polkadot Cloud',
        period: '2025',
        kind: 'Award',
        summary: 'First place for Agora, a parachain-ready computation marketplace.',
        description:
            'Placed first in the Build Resilient Apps with Polkadot Cloud competition with Agora, a decentralised computation marketplace designed as a Polkadot parachain.',
        significance:
            'First place in the competition. Agora required a full Substrate runtime with custom pallets for a compute job market, escrow and verification — a decentralised take on the cloud compute market, where the hard part is verification rather than scheduling. Prize: $3,000.',
        supporting: 'Agora',
        href: 'https://github.com/suyash101101/Agora',
    },
    {
        id: 'freebsd-upstream',
        sprite: 'freebsd',
        name: 'FreeBSD Upstream',
        organisation: 'FreeBSD Project',
        period: 'January 2025',
        kind: 'Open Source',
        summary: 'Merged kernel change aligning PRR with RFC 9937.',
        description:
            'A merged contribution to the FreeBSD kernel aligning the Proportional Rate Reduction implementation with RFC 9937, the current TCP loss recovery specification.',
        significance:
            'Merged upstream into a production operating system kernel after review on the FreeBSD review system. It required reading the RFC closely, comparing it against the existing implementation, and preparing a patch that reviewers would accept — 45 lines changed.',
        supporting: 'FreeBSD PRR',
        href: 'https://reviews.freebsd.org/D56535',
    },
    {
        id: 'iris-maintainer',
        sprite: 'iris',
        name: 'IRIS Maintainer',
        organisation: "IRIS — NITK's Administrative System",
        period: 'April 2026 – Present',
        kind: 'Leadership',
        summary: 'Head of Maintenance for a platform serving 23,000+ users.',
        description:
            'Serving as Head of Maintenance of IRIS, the official student-led administrative system of NITK Surathkal, used by more than 23,000 students and staff.',
        significance:
            'Responsible for code quality, upgrade management and the continued stability of a platform used across the entire institute. Earlier served as Web Lead, managing a team of eight and turning requirements into issues and sprints. Contributing developer since November 2024.',
        supporting: 'IRIS ERP',
        href: 'https://github.com/iris-nitk/iris',
    },
    {
        id: 'near-tee-winner',
        sprite: 'tee',
        name: 'NOVA SDK Winner',
        organisation: 'NEARCON Innovation Sandbox',
        period: '2025',
        kind: 'Award',
        summary: 'Winner for Private RAG, a TEE-backed client-side RAG.',
        description:
            'Won the NOVA SDK track at the NEARCON Innovation Sandbox with Private RAG, a vectorless, fully client-side retrieval system running inside a Trusted Execution Environment.',
        significance:
            'The winning approach solved a real constraint: standard RAG requires uploading documents to a server, exposing sensitive data. Running the embedding and similarity search inside a TEE means the host never sees plaintext, which is what makes a genuinely private RAG possible. Prize: $1,000.',
        supporting: 'Private RAG',
        href: 'https://github.com/NikhilKottoli/PrivateRAG',
    },
    {
        id: 'ieee-leadership',
        sprite: 'leadership',
        name: 'IEEE Executive',
        organisation: 'IEEE NITK Student Branch',
        period: 'October 2024 – Present',
        kind: 'Leadership',
        summary: 'Executive member organising workshops and hackathons.',
        description:
            'Executive member of the IEEE NITK Student Branch, organising technical workshops and hackathons, mentoring junior members, and leading initiatives that build a coding culture on campus.',
        significance:
            'Inducted into the core committee in October 2024 to drive technical events. The role is about the people as much as the events — running workshops, mentoring juniors, and creating the conditions where other people build things.',
        href: 'https://github.com/IEEE-NITK',
    },
    {
        id: 'rails-upstream',
        sprite: 'rails',
        name: 'Rails Upstream',
        organisation: 'Ruby on Rails',
        period: 'October – November 2025',
        kind: 'Open Source',
        summary: 'Merged documentation corrections in Rails and cssbundling-rails.',
        description:
            'Merged documentation corrections into Ruby on Rails and cssbundling-rails, including a release 8.0 documentation fix in rails/rails #55581.',
        significance:
            'Two documentation changes merged upstream — rails/rails #55581 and cssbundling-rails #182 — with a third change open. Small in scope, but upstream documentation is how a framework stays honest for the people who depend on it.',
        href: 'https://github.com/rails/rails/pull/55581',
    },
];

/** Badges grouped by kind, used by the filter tabs in the badge case. */
export const badgeKinds: BadgeKind[] = ['Employment', 'Award', 'Open Source', 'Leadership'];
