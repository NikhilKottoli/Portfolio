import { ImageResponse } from 'next/og';
import { pokedexEntries } from '../../data/pokedex';
import { entrySlug, getEntryBySlug } from '../../../lib/slug';
import { SITE_NAME } from '../../../lib/site';

export const alt = 'Project';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

const PARCHMENT = '#f5ecd7';
const BARK = '#2b2a26';
const LEAF = '#33713f';
const HONEY = '#f2be3c';
const BERRY = '#d8433b';

/** Pixel grid for the card sprite; each character maps to a palette colour. */
const SPRITE_ROWS = ['pppyp', 'rkkkr', 'rkykr', 'rrkrr', 'ggggg'];
const SPRITE_COLORS: Record<string, string> = {
    p: PARCHMENT,
    r: BERRY,
    k: BARK,
    y: HONEY,
    g: LEAF,
};

/** Statically render one card per Pokedex entry. */
export function generateStaticParams() {
    return pokedexEntries.map((entry) => ({ slug: entrySlug(entry) }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const entry = getEntryBySlug(pokedexEntries, slug);

    const title = entry ? entry.name : 'Project';
    const summary = entry ? entry.summary : 'Project entry not found in the Pokedex.';
    const category = entry ? entry.category : 'Pokedex';
    const entryNumber = entry ? `No. ${String(entry.number).padStart(2, '0')}` : 'No. --';

    return new ImageResponse(
        (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: 1200,
                    height: 630,
                    padding: '48px',
                    background: PARCHMENT,
                    color: BARK,
                    fontFamily: 'sans-serif',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'column',
                        width: 1104,
                        height: 534,
                        padding: '40px',
                        border: '8px solid #2b2a26',
                        borderRadius: '12px',
                        background: PARCHMENT,
                        boxShadow: '12px 12px 0 0 #f2be3c',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            width: 1048,
                            height: 80,
                        }}
                    >
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <div
                                style={{
                                    display: 'flex',
                                    flexDirection: 'column',
                                    width: 80,
                                    height: 80,
                                    border: '5px solid #2b2a26',
                                    background: PARCHMENT,
                                }}
                            >
                                {SPRITE_ROWS.map((row, rowIndex) => (
                                    <div key={rowIndex} style={{ display: 'flex', height: 14 }}>
                                        {row.split('').map((cell, cellIndex) => (
                                            <div
                                                key={cellIndex}
                                                style={{ width: 14, height: 14, background: SPRITE_COLORS[cell] }}
                                            />
                                        ))}
                                    </div>
                                ))}
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginLeft: '24px',
                                    padding: '12px 20px',
                                    border: '4px solid #33713f',
                                    borderRadius: '10px',
                                    background: PARCHMENT,
                                }}
                            >
                                <div style={{ display: 'flex', fontSize: 26, fontWeight: 700, color: LEAF }}>
                                    {category}
                                </div>
                            </div>
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                fontSize: 26,
                                fontWeight: 700,
                                letterSpacing: '4px',
                                color: BARK,
                            }}
                        >
                            Pokedex - Projects
                        </div>
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            fontSize: 64,
                            fontWeight: 700,
                            color: BARK,
                            marginTop: '28px',
                        }}
                    >
                        {title}
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            fontSize: 30,
                            color: BARK,
                            marginTop: '16px',
                        }}
                    >
                        {summary}
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            marginTop: '20px',
                        }}
                    >
                        <div style={{ display: 'flex', fontSize: 30, fontWeight: 700, color: BERRY }}>
                            {entryNumber}
                        </div>
                        <div style={{ display: 'flex', fontSize: 24, color: BARK }}>{SITE_NAME}</div>
                    </div>
                </div>
            </div>
        ),
        { ...size },
    );
}
