/**
 * Serialise JSON-LD for safe embedding in a `<script>` element.
 *
 * `<`, `>` and `&` are escaped to their unicode escape sequences, so a value
 * such as `</script><img onerror=1>` can never close the script tag or start
 * markup of its own.
 */
export function serializeJsonLd(data: unknown): string {
    return JSON.stringify(data)
        .replace(/</g, '\\u003c')
        .replace(/>/g, '\\u003e')
        .replace(/&/g, '\\u0026');
}

/** Render a JSON-LD block as an inline `application/ld+json` script. */
export function JsonLd({ data }: { data: unknown }) {
    return (
        <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: serializeJsonLd(data) }}
        />
    );
}
