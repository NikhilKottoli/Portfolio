import React from 'react';
import PixelIcon from './pixel/PixelIcon';

/** Links to the canonical resume PDF. */
const ResumeDownloadButton = () => {
    return (
        <a
            href="/Nikhil_Kottoli_Resume.pdf"
            download="Nikhil_Kottoli_Resume.pdf"
            className="pk-btn pk-btn-primary no-print px-5 py-3 font-pixel-ui text-[0.64rem] uppercase tracking-[0.16em]"
        >
            <PixelIcon name="book" className="h-4 w-4" />
            Download PDF
        </a>
    );
};

export default ResumeDownloadButton;
