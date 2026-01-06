function updateUI() {
    const scrollIndicator = document.querySelector('.scroll-indicator');

    // Hide/Show Scroll Indicator (Safe check)
    if (scrollIndicator) {
        if (window.scrollY > 50) {
            scrollIndicator.classList.add('hidden');
        } else {
            scrollIndicator.classList.remove('hidden');
        }
    }

    // --- Wave Generation ---
    const width = window.innerWidth;
    const waveSvg = document.querySelector('.wave-svg');
    const visualPath = document.getElementById('visual-wave-path');

    const h = waveSvg ? (waveSvg.clientHeight || (width * 0.15)) : 150;
    const w = width;

    // --- Logic for "More Wavey" (Double Sine Wave) ---
    // We oscillate between 0 (top) and h (bottom), centered at h/2.
    // This creates distinct crests and troughs relative to the midline.

    // Y-Coordinates for Visual Path (Relative to SVG top-left 0,0)
    const yMid = h / 2;
    const yTop = 0;
    const yBot = h;

    // Control points X-ratios
    // Cycle 1: 0 -> w/4 (Up), w/4 -> w/2 (Down)
    // Cycle 2: w/2 -> 3w/4 (Up), 3w/4 -> w (Down)
    // Actually, let's do: Start(Mid) -> Up Peak -> Mid -> Down Peak -> Mid -> Up Peak -> Mid -> Down Peak -> Mid?
    // User said "more troughs and crests but not too many".
    // 2 Full cycles: Mid -> Up -> Mid -> Down -> Mid -> Up -> Mid -> Down -> Mid ? That's 4 humps.
    // Let's do 2 Simple Cycles: Mid -> Up -> Down -> Mid (One Cycle) x 2?
    // Cycle 1: 0 to w/2. Start Mid. Go Up to Top. Go Down to Bot. End Mid.
    // Cycle 2: w/2 to w. Same.

    // Bezier segments:
    // 1. 0 to w*0.25: Mid -> Top -> Mid? No, simple C is one arc.
    // Let's do:
    // C1: 0 to 0.25w (Mid to Top to Mid is hard with 1 C).
    // Let's do:
    // P0: 0, Mid.
    // C1: 0.1w, Top. 0.15w, Top. 0.25w, Mid.
    // S1: 0.4w, Bot. 0.5w, Mid.
    // S2: 0.65w, Top. 0.75w, Mid.
    // S3: 0.9w, Bot. 1.0w, Mid.

    // Visual Path Construction
    // Note: To fill the TOP with blue, we must close the loop: Start 0,0 -> 0,Mid -> Curve -> w,Mid -> w,0 -> Z.

    // Dynamic Curve String function
    const generateCurve = (yOffset) => {
        const YM = yMid + yOffset;
        const YT = yTop + yOffset;
        const YB = yBot + yOffset;

        return `C ${w * 0.1},${YT} ${w * 0.15},${YT} ${w * 0.25},${YM} ` +
            `S ${w * 0.4},${YB} ${w * 0.5},${YM} ` +
            `S ${w * 0.65},${YT} ${w * 0.75},${YM} ` +
            `S ${w * 0.9},${YB} ${w},${YM}`;
    };

    const visualCurve = generateCurve(0); // No offset for visual
    const visualD = `M 0,0 L 0,${yMid} ${visualCurve} L ${w},0 Z`;

    if (waveSvg && visualPath) {
        waveSvg.setAttribute('viewBox', `0 0 ${w} ${h}`);
        visualPath.setAttribute('d', visualD);
        visualPath.setAttribute('fill', '#0177BF');
    }

    // --- Scroll Locking Logic ---
    const brandOverlay = document.querySelector('.brand-overlay');
    // Lock point: 100% of viewport
    const lockLimit = window.innerHeight;

    if (brandOverlay) {
        if (window.scrollY > lockLimit) {
            brandOverlay.style.position = 'absolute';
            brandOverlay.style.top = lockLimit + 'px';
        } else {
            brandOverlay.style.position = 'fixed';
            brandOverlay.style.top = '0px';
        }
    }

    // --- Mask Update Logic ---
    const wrapper = document.querySelector('.logo-blue-wrapper-fullscreen');
    let relativeWaveY = 0;

    if (waveSvg && wrapper) {
        const waveRect = waveSvg.getBoundingClientRect();
        const wrapperRect = wrapper.getBoundingClientRect();
        relativeWaveY = waveRect.top - wrapperRect.top;
    }

    // Mask must cover the WHITE (bottom) area.
    // Visual is Blue (Top).
    // So Mask is Everything BELOW the curve.
    // Start at 0,Mid+Offset -> Curve -> w,Mid+Offset -> w,Depth -> 0,Depth -> Z.

    const depth = window.innerHeight * 5;
    const maskCurve = generateCurve(relativeWaveY); // Offset by Y position

    const maskD = `M 0,${yMid + relativeWaveY} ${maskCurve} L ${w},${depth + relativeWaveY} L 0,${depth + relativeWaveY} Z`;

    const clipPath = document.getElementById('clip-wave-path');
    if (clipPath) {
        clipPath.setAttribute('d', maskD);
        clipPath.removeAttribute('transform');
    }

    // 3. Sync Logo Sizes
    const fixedLogoImg = document.querySelector('.logo-white');
    const bluePositioner = document.querySelector('.logo-blue-positioner');

    if (fixedLogoImg && bluePositioner) {
        const rect = fixedLogoImg.getBoundingClientRect();
        if (rect.width > 0 && rect.height > 0) {
            bluePositioner.style.width = rect.width + 'px';
            bluePositioner.style.height = rect.height + 'px';
        }
    }
}

function fixMask() {
    const blueLogo = document.querySelector('.logo-blue');
    if (blueLogo && !blueLogo.dataset.reflowed) {
        blueLogo.style.display = 'none';
        void blueLogo.offsetHeight;
        blueLogo.style.display = 'block';
        blueLogo.dataset.reflowed = 'true';
    }
}

let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        window.requestAnimationFrame(() => {
            updateUI();
            ticking = false;
        });
        ticking = true;
    }
});

window.addEventListener('resize', updateUI);
window.addEventListener('DOMContentLoaded', () => {
    fixMask();
    updateUI();
});
