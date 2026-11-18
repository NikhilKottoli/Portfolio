/** Canonical site name used across metadata and social cards. */
export const SITE_NAME = 'Nikhil Kottoli — Portfolio';

/** Canonical site description used across metadata and social cards. */
export const SITE_DESCRIPTION = 'Software developer. NITK Surathkal.';

/**
 * Resolve the canonical origin of the deployed site.
 *
 * An explicit NEXT_PUBLIC_SITE_URL always wins, the production Vercel host is
 * preferred over the preview host, and local development falls back to
 * http://localhost:3000.
 */
export function getSiteUrl(): string {
    return (
        process.env.NEXT_PUBLIC_SITE_URL ||
        (process.env.VERCEL_PROJECT_PRODUCTION_URL
            ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
            : process.env.VERCEL_URL
              ? `https://${process.env.VERCEL_URL}`
              : 'http://localhost:3000')
    );
}

/** Join a site-relative path onto the canonical origin. */
export function absUrl(path: string): string {
    return `${getSiteUrl().replace(/\/$/, '')}${path.startsWith('/') ? path : '/' + path}`;
}
