'use client';
import { useRef, useEffect, CSSProperties } from 'react';

const LetterGlitch = ({
    glitchColors = ['#FF00FF', '#00FFFF', '#00FF00'],
    className = '',
    glitchSpeed = 50,
    centerVignette = false,
    outerVignette = true,
    smooth = true,
    characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ!@#$&*()-_+=/[]{};:<>.,0123456789'
}) => {
    const canvasRef = useRef(null);
    const animationRef = useRef(null);
    const letters = useRef([]);
    const grid = useRef({ columns: 0, rows: 0 });
    const context = useRef(null);
    const lastGlitchTime = useRef(Date.now());
    const running = useRef(false);
    const isVisible = useRef(true);
    const pageVisible = useRef(true);
    const colorCache = useRef(new Map());

    const lettersAndSymbols = Array.from(characters);

    const fontSize = 16;
    const charWidth = 10;
    const charHeight = 20;

    const getRandomChar = () => {
        return lettersAndSymbols[Math.floor(Math.random() * lettersAndSymbols.length)];
    };

    const getRandomColor = () => {
        return glitchColors[Math.floor(Math.random() * glitchColors.length)];
    };

    const hexToRgb = hex => {
        if (colorCache.current.has(hex)) {
            return colorCache.current.get(hex);
        }

        let result = null;
        const normalized = hex.replace(
            /^#?([a-f\d])([a-f\d])([a-f\d])$/i,
            (m, r, g, b) => r + r + g + g + b + b
        );

        const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(normalized);
        if (match) {
            result = {
                r: parseInt(match[1], 16),
                g: parseInt(match[2], 16),
                b: parseInt(match[3], 16)
            };
        } else {
            const rgbMatch = /^rgb\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*\)$/i.exec(hex);
            if (rgbMatch) {
                result = {
                    r: parseInt(rgbMatch[1], 10),
                    g: parseInt(rgbMatch[2], 10),
                    b: parseInt(rgbMatch[3], 10)
                };
            }
        }

        colorCache.current.set(hex, result);
        return result;
    };

    const interpolateColor = (start, end, factor) => {
        const result = {
            r: Math.round(start.r + (end.r - start.r) * factor),
            g: Math.round(start.g + (end.g - start.g) * factor),
            b: Math.round(start.b + (end.b - start.b) * factor)
        };
        return `rgb(${result.r}, ${result.g}, ${result.b})`;
    };

    const calculateGrid = (width, height) => {
        const columns = Math.ceil(width / charWidth);
        const rows = Math.ceil(height / charHeight);
        return { columns, rows };
    };

    const initializeLetters = (columns, rows) => {
        grid.current = { columns, rows };
        const totalLetters = columns * rows;
        letters.current = Array.from({ length: totalLetters }, () => ({
            char: getRandomChar(),
            color: getRandomColor(),
            targetColor: getRandomColor(),
            colorProgress: 1
        }));
    };

    const resizeCanvas = () => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const parent = canvas.parentElement;
        if (!parent) return;

        const dpr = Math.min(window.devicePixelRatio || 1, 2);
        const rect = parent.getBoundingClientRect();

        canvas.width = rect.width * dpr;
        canvas.height = rect.height * dpr;

        canvas.style.width = `${rect.width}px`;
        canvas.style.height = `${rect.height}px`;

        if (context.current) {
            context.current.setTransform(dpr, 0, 0, dpr, 0, 0);
        }

        const { columns, rows } = calculateGrid(rect.width, rect.height);
        initializeLetters(columns, rows);

        drawLetters();
    };

    const drawLetters = () => {
        if (!context.current || letters.current.length === 0) return;
        const ctx = context.current;
        const { width, height } = canvasRef.current.getBoundingClientRect();
        ctx.clearRect(0, 0, width, height);
        ctx.font = `${fontSize}px monospace`;
        ctx.textBaseline = 'top';

        letters.current.forEach((letter, index) => {
            const x = (index % grid.current.columns) * charWidth;
            const y = Math.floor(index / grid.current.columns) * charHeight;
            ctx.fillStyle = letter.color;
            ctx.fillText(letter.char, x, y);
        });
    };

    const updateLetters = () => {
        if (!letters.current || letters.current.length === 0) return;

        const updateCount = Math.max(1, Math.floor(letters.current.length * 0.05));

        for (let i = 0; i < updateCount; i++) {
            const index = Math.floor(Math.random() * letters.current.length);
            if (!letters.current[index]) continue;

            letters.current[index].char = getRandomChar();
            letters.current[index].targetColor = getRandomColor();

            if (!smooth) {
                letters.current[index].color = letters.current[index].targetColor;
                letters.current[index].colorProgress = 1;
            } else {
                letters.current[index].colorProgress = 0;
            }
        }
    };

    const handleSmoothTransitions = () => {
        let needsRedraw = false;
        letters.current.forEach(letter => {
            if (letter.colorProgress < 1) {
                letter.colorProgress += 0.05;
                if (letter.colorProgress > 1) letter.colorProgress = 1;

                const startRgb = hexToRgb(letter.color);
                const endRgb = hexToRgb(letter.targetColor);
                if (startRgb && endRgb) {
                    letter.color = interpolateColor(startRgb, endRgb, letter.colorProgress);
                    needsRedraw = true;
                }
            }
        });

        if (needsRedraw) {
            drawLetters();
        }
    };

    const animate = () => {
        if (!running.current) return;

        const now = Date.now();
        if (now - lastGlitchTime.current >= glitchSpeed) {
            updateLetters();
            drawLetters();
            lastGlitchTime.current = now;
        }

        if (smooth) {
            handleSmoothTransitions();
        }

        animationRef.current = requestAnimationFrame(animate);
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const container = canvas.parentElement;

        context.current = canvas.getContext('2d');
        resizeCanvas();

        const startAnimation = () => {
            if (running.current) return;
            running.current = true;
            lastGlitchTime.current = Date.now();
            animate();
        };

        const stopAnimation = () => {
            running.current = false;
            cancelAnimationFrame(animationRef.current);
        };

        const handleVisibility = () => {
            pageVisible.current = !document.hidden;
            if (pageVisible.current && isVisible.current) {
                startAnimation();
            } else {
                stopAnimation();
            }
        };

        const observer = new IntersectionObserver(
            ([entry]) => {
                isVisible.current = entry.isIntersecting;
                if (entry.isIntersecting && pageVisible.current) {
                    startAnimation();
                } else {
                    stopAnimation();
                }
            },
            { threshold: 0.05 }
        );

        if (container) {
            observer.observe(container);
        }

        document.addEventListener('visibilitychange', handleVisibility);

        let resizeTimeout;

        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                stopAnimation();
                resizeCanvas();
                if (isVisible.current && pageVisible.current) {
                    startAnimation();
                }
            }, 100);
        };

        window.addEventListener('resize', handleResize);

        startAnimation();

        return () => {
            stopAnimation();
            observer.disconnect();
            document.removeEventListener('visibilitychange', handleVisibility);
            window.removeEventListener('resize', handleResize);
            clearTimeout(resizeTimeout);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [glitchSpeed, smooth]);

    const containerStyle: CSSProperties = {
        position: 'relative',
        width: '100%',
        height: '100%',
        backgroundColor: '#000000',
        overflow: 'hidden'
    };

    const canvasStyle: CSSProperties = {
        display: 'block',
        width: '100%',
        height: '100%'
    };

    const outerVignetteStyle: CSSProperties = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(0,0,0,0) 60%, rgba(0,0,0,1) 100%)'
    };

    const centerVignetteStyle: CSSProperties = {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        background: 'radial-gradient(circle, rgba(0,0,0,0.8) 0%, rgba(0,0,0,0) 60%)'
    };

    return (
        <div style={containerStyle} className={className}>
            <canvas ref={canvasRef} style={canvasStyle} />
            {outerVignette && <div style={outerVignetteStyle}></div>}
            {centerVignette && <div style={centerVignetteStyle}></div>}
        </div>
    );
};

export default LetterGlitch;
