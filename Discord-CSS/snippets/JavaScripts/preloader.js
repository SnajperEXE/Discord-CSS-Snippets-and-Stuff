console.log("REMOTE JS LOADED");

(function () {

    // ============================================
    // PREVENT DOUBLE INJECTION
    // ============================================

    if (window.lolPreloaderLoaded) return;

    window.lolPreloaderLoaded = true;

    // ============================================
    // CREATE MAIN CONTAINER
    // ============================================

    const container = document.createElement("div");
    container.className = "lol-loading-screen-container";

    const logo = document.createElement("div");
    logo.className = "lol-loading-screen-logo";

    const title = document.createElement("div");
    title.className = "lol-loading-screen-title";
    title.innerText = "LOADING";

    const progressFill = document.createElement("div");
    progressFill.className =
        "lol-loading-screen-progress-bar-progress";

    const subtext = document.createElement("div");
    subtext.className = "lol-loading-screen-subtext";

    container.appendChild(logo);
    container.appendChild(title);
    container.appendChild(progressFill);
    container.appendChild(subtext);

    (document.documentElement || document.body)
        .appendChild(container);

    // ============================================
    // SUBTEXTS
    // ============================================

    const packages = [
        "Collecting your RP...",
        "Buffing Yasuo...",
        "Feeding Poros...",
        "Preparing mental damage...",
        "Rendering Blue Essence...",
        "Loading Windwall..."
    ];

    let currentProgress = 0;
    let packageIndex = 0;
    let isCompleting = false;

    subtext.innerText = packages[packageIndex];

    // ============================================
    // MAIN LOOP
    // ============================================

    const interval = window.setInterval(() => {

        let increment = 0;

        // ============================================
        // EARLY PHASE
        // ============================================

        if (currentProgress < 70) {

            increment =
                (80 - currentProgress) * 0.06 +
                (Math.random() * 0.8);

        }

        // ============================================
        // MID PHASE
        // ============================================

        else if (currentProgress < 92) {

            increment =
                (98 - currentProgress) * 0.02 +
                (Math.random() * 0.18);

        }

        // ============================================
        // FINAL PHASE
        // ============================================

        else {

            const remaining =
                100 - currentProgress;

            increment =
                remaining * 0.015 + 0.05;

        }

        // ============================================
        // RANDOM MICRO STALLS
        // ============================================

        if (Math.random() < 0.02) {

            increment *= 0.5;

        }

        // ============================================
        // RANDOM MICRO BURSTS
        // ============================================

        if (Math.random() < 0.015) {

            increment += 0.8;

        }

        currentProgress += increment;

        // ============================================
        // 97% HOLD
        // ============================================

        if (currentProgress >= 97 && !isCompleting) {

            currentProgress = 97;

            setTimeout(() => {

                isCompleting = true;

            }, 700 + Math.random() * 900);

        }

        // ============================================
        // FINAL PUSH
        // ============================================

        if (isCompleting && currentProgress < 100) {

            currentProgress += 1.2;

        }

        // ============================================
        // CLAMP
        // ============================================

        if (currentProgress > 100) {

            currentProgress = 100;

        }

        // ============================================
        // APPLY VISUAL FILL
        // ============================================

        progressFill.style.transform =
            `scaleX(${currentProgress / 100})`;

        // ============================================
        // ROTATE SUBTEXTS
        // ============================================

        if (
            Math.floor(currentProgress) % 18 === 0 &&
            Math.floor(currentProgress) !== 0
        ) {

            packageIndex =
                (packageIndex + 1) % packages.length;

            subtext.innerText =
                packages[packageIndex];

        }

        // ============================================
        // FINISH
        // ============================================

        if (currentProgress >= 100) {

            clearInterval(interval);

            container.style.opacity = "0";

            setTimeout(() => {

                container.remove();

                window.lolPreloaderLoaded = false;

            }, 850);

        }

    }, 50);

})();
