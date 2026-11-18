import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import ProjectDetail from '../../components/ProjectDetail';
import { pokedexEntries } from '../../data/pokedex';
import { entrySlug } from '../../../lib/slug';
import { JsonLd } from '../../../lib/json-ld';
import { projectJsonLd } from '../../../lib/structured-data';

export const dynamicParams = false;

export function generateStaticParams() {
    return pokedexEntries.map((entry) => ({ slug: entrySlug(entry) }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const entry = pokedexEntries.find((candidate) => entrySlug(candidate) === slug);

    if (!entry) {
        notFound();
    }

    return (
        <main>
            <JsonLd data={projectJsonLd(entry)} />
            <ProjectDetail entry={entry} />
        </main>
    );
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
    const { slug } = await params;
    const entry = pokedexEntries.find((candidate) => entrySlug(candidate) === slug);

    if (!entry) {
        return {};
    }

    return {
        title: `${entry.name} — Projects`,
        description: entry.summary,
        alternates: {
            canonical: `/Projects/${entrySlug(entry)}`,
        },
    };
}
