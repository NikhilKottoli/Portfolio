import { describe, expect, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import ResumePage from '../../src/app/resume/page';

describe('resume', () => {
    it('introduces the trainer', () => {
        render(<ResumePage />);

        expect(screen.getByRole('heading', { name: 'Nikhil Kottoli' })).toBeInTheDocument();
        expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    });

    it('lists every role', () => {
        render(<ResumePage />);

        expect(screen.getByText('Microsoft — MAI Extensions Security')).toBeInTheDocument();
        expect(screen.getByText("IRIS — NITK's Administrative System")).toBeInTheDocument();
        expect(screen.getByText('IEEE NITK Student Branch')).toBeInTheDocument();
    });

    it('offers a download', () => {
        render(<ResumePage />);

        expect(screen.getByRole('button', { name: /download pdf/i })).toBeInTheDocument();
    });

    it('keeps the email address reachable', () => {
        render(<ResumePage />);

        expect(screen.getByRole('link', { name: 'Email' })).toHaveAttribute(
            'href',
            'mailto:nikhilkottoli2005@gmail.com',
        );
    });
});
