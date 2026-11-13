'use client';

import React from 'react';
import PixelIcon from './pixel/PixelIcon';

/**
 * Saves the resume as a PDF.
 *
 * The browser's own print pipeline is used so the saved file matches exactly
 * what is on screen and no extra tooling has to be shipped.
 */
const ResumeDownloadButton = () => {
    return (
        <button
            type="button"
            onClick={() => window.print()}
            className="pk-btn pk-btn-primary no-print px-5 py-3 font-pixel-ui text-[0.64rem] uppercase tracking-[0.16em]"
        >
            <PixelIcon name="book" className="h-4 w-4" />
            Download PDF
        </button>
    );
};

export default ResumeDownloadButton;
