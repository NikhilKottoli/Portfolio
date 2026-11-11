import React from 'react';

type HallownestSkylineProps = {
    className?: string;
};

/**
 * A distant skyline of ruined spires, arches, and lantern-lit towers.
 * Original vector scenery inspired by Hallownest's silhouette language.
 */
const HallownestSkyline = ({ className = '' }: HallownestSkylineProps) => {
    return (
        <svg
            viewBox="0 0 1440 420"
            preserveAspectRatio="xMidYMax slice"
            aria-hidden="true"
            className={className}
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
        >
            {/* Deep background: broken outer walls */}
            <g fill="currentColor" opacity="0.34">
                <path d="M0 420V332L28 300L58 332V420H0Z" />
                <path d="M78 420V356L96 334L114 356V420H78Z" />
                <path d="M1320 420V344L1342 316L1364 344V420H1320Z" />
                <path d="M1376 420V300L1404 264L1432 300V420H1376Z" />
                <path d="M420 420V362H520V420H420Z" />
                <path d="M920 420V362H1020V420H920Z" />
            </g>

            {/* Left cluster of towers */}
            <g fill="currentColor" opacity="0.78">
                <path d="M-20 420V240H16L38 172L60 240H96V420H-20Z" />
                <path d="M66 420V292L94 252L122 292V420H66Z" />
                <path d="M112 420V206L140 142L168 206V420H112Z" />
                <path d="M156 420V286L177 246L198 286V420H156Z" />
                <path d="M190 420V328L208 300L226 328V420H190Z" />
            </g>

            {/* Right cluster of towers */}
            <g fill="currentColor" opacity="0.78">
                <path d="M1460 420V240H1424L1402 172L1380 240H1344V420H1460Z" />
                <path d="M1374 420V292L1346 252L1318 292V420H1374Z" />
                <path d="M1328 420V206L1300 142L1272 206V420H1328Z" />
                <path d="M1284 420V286L1263 246L1242 286V420H1284Z" />
                <path d="M1250 420V328L1232 300L1214 328V420H1250Z" />
            </g>

            {/* Central bridge and low ruins, kept quiet behind the hero */}
            <g fill="currentColor" opacity="0.5">
                <path d="M418 420V370H1022V420H418Z" />
                <path d="M456 370V344H492V370H456Z" />
                <path d="M548 370V344H584V370H548Z" />
                <path d="M856 370V344H892V370H856Z" />
                <path d="M948 370V344H984V370H948Z" />
                <path d="M286 420V386H380V420H286Z" />
                <path d="M1060 420V386H1154V420H1060Z" />
            </g>

            {/* Distant arches */}
            <g stroke="currentColor" strokeOpacity="0.22" strokeWidth="10">
                <path d="M286 420V342C286 292 326 262 374 262C422 262 462 292 462 342V420" />
                <path d="M978 420V342C978 292 1018 262 1066 262C1114 262 1154 292 1154 342V420" />
            </g>

            {/* Spire tips */}
            <g fill="currentColor" opacity="0.9">
                <path d="M132 154L140 134L148 154L140 150L132 154Z" />
                <path d="M1292 154L1300 134L1308 154L1300 150L1292 154Z" />
                <path d="M22 186L38 156L54 186L38 178L22 186Z" />
                <path d="M1386 186L1402 156L1418 186L1402 178L1386 186Z" />
            </g>

            {/* Window lights */}
            <g fill="#b9f2ff" fillOpacity="0.5">
                <rect x="26" y="270" width="3" height="12" rx="1.5" />
                <rect x="48" y="270" width="3" height="12" rx="1.5" />
                <rect x="26" y="302" width="3" height="12" rx="1.5" />
                <rect x="120" y="244" width="3" height="14" rx="1.5" />
                <rect x="146" y="244" width="3" height="14" rx="1.5" />
                <rect x="132" y="284" width="3" height="14" rx="1.5" />
                <rect x="1394" y="270" width="3" height="12" rx="1.5" />
                <rect x="1416" y="270" width="3" height="12" rx="1.5" />
                <rect x="1394" y="302" width="3" height="12" rx="1.5" />
                <rect x="1300" y="244" width="3" height="14" rx="1.5" />
                <rect x="1326" y="244" width="3" height="14" rx="1.5" />
                <rect x="1312" y="284" width="3" height="14" rx="1.5" />
            </g>

            {/* Hanging lanterns */}
            <g>
                <path d="M96 254V292" stroke="#c8a96b" strokeOpacity="0.35" strokeWidth="1" />
                <circle cx="96" cy="296" r="2.4" fill="#c8a96b" fillOpacity="0.55" />
                <path d="M1344 254V292" stroke="#c8a96b" strokeOpacity="0.35" strokeWidth="1" />
                <circle cx="1344" cy="296" r="2.4" fill="#c8a96b" fillOpacity="0.55" />
            </g>
        </svg>
    );
};

export default HallownestSkyline;
