import React from 'react';

type MenuSelectorProps = {
    className?: string;
    /** Faces right by default, like the cursor in a GBA menu. */
    direction?: 'right' | 'down';
};

/**
 * The blinking selection cursor that sits to the left of a highlighted menu
 * option. It is drawn with hard pixels so it never looks like a smooth
 * chevron, and it is decorative: the selected state itself is announced with
 * `aria-current` on the link itself.
 */
const MenuSelector = ({ className = '', direction = 'right' }: MenuSelectorProps) => {
    const points = direction === 'right' ? '0,0 8,4 0,8 3,4' : '0,0 8,0 4,8';

    return (
        <svg
            viewBox="0 0 8 8"
            className={`h-3 w-3 shrink-0 text-berry ${className}`}
            aria-hidden="true"
            focusable="false"
            shapeRendering="crispEdges"
            xmlns="http://www.w3.org/2000/svg"
        >
            <path d={`M${points}`} fill="currentColor" />
        </svg>
    );
};

export default MenuSelector;
