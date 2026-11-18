import { ImageResponse } from 'next/og';
import { SITE_NAME } from '../../lib/site';

export const alt = 'Projects Pokédex';
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

export default function Image() {
    return new ImageResponse(
        (
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: 1200,
                    height: 630,
                    padding: '56px',
                    background: PARCHMENT,
                    color: BARK,
                    fontFamily: 'sans-serif',
                }}
            >
                <div
                    style={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        justifyContent: 'flex-start',
                        width: 1088,
                        height: 518,
                        padding: '48px',
                        border: '8px solid #2b2a26',
                        borderRadius: '12px',
                        background: PARCHMENT,
                        boxShadow: '12px 12px 0 0 #f2be3c',
                    }}
                >
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: 112,
                            height: 112,
                            border: '6px solid #2b2a26',
                            background: PARCHMENT,
                        }}
                    >
                        {SPRITE_ROWS.map((row, rowIndex) => (
                            <div key={rowIndex} style={{ display: 'flex', height: 20 }}>
                                {row.split('').map((cell, cellIndex) => (
                                    <div
                                        key={cellIndex}
                                        style={{ width: 20, height: 20, background: SPRITE_COLORS[cell] }}
                                    />
                                ))}
                            </div>
                        ))}
                    </div>
                    <div
                        style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: 816,
                            marginLeft: '48px',
                        }}
                    >
                        <div
                            style={{
                                display: 'flex',
                                fontSize: 30,
                                fontWeight: 700,
                                letterSpacing: '4px',
                                color: LEAF,
                                marginBottom: '20px',
                            }}
                        >
                            {SITE_NAME}
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                fontSize: 64,
                                fontWeight: 700,
                                color: BARK,
                                marginBottom: '20px',
                            }}
                        >
                            Pokedex - Projects
                        </div>
                        <div
                            style={{
                                display: 'flex',
                                fontSize: 34,
                                color: BARK,
                                marginBottom: '28px',
                            }}
                        >
                            Every project, filed as a Pokedex entry.
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
                            <div style={{ width: 28, height: 28, marginRight: '12px', background: LEAF }} />
                            <div style={{ width: 28, height: 28, marginRight: '12px', background: HONEY }} />
                            <div style={{ width: 28, height: 28, background: BERRY }} />
                        </div>
                    </div>
                </div>
            </div>
        ),
        { ...size },
    );
}
