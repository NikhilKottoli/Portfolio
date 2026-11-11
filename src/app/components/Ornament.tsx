export default function Ornament({ className = '' }: { className?: string }) {
    return (
        <div className={`flex items-center gap-3 ${className}`} aria-hidden="true">
            <span className="h-px w-10 bg-gradient-to-r from-transparent to-gold/60 sm:w-16" />
            <span className="h-1.5 w-1.5 rotate-45 border border-gold/70" />
            <span className="h-px w-10 bg-gradient-to-l from-transparent to-gold/60 sm:w-16" />
        </div>
    );
}
