import definePlugin from "@utils/types";

export default definePlugin({
    id: "LoLPreloader",
    name: "LoLPreloader",
    description: "League-inspired loading screen with realistic animated progress",
    authors: [{ name: "SnajperEXE" } as any],

    interval: null as number | null,
    injected: false,

    injectLoader() {
        if (this.injected) return;
        this.injected = true;

        const container = document.createElement("div");
        container.className = "lol-loading-screen-container";

        const logo = document.createElement("div");
        logo.className = "lol-loading-screen-logo";

        const title = document.createElement("div");
        title.className = "lol-loading-screen-title";
        title.innerText = "LOADING";

        const progressFill = document.createElement("div");
        progressFill.className = "lol-loading-screen-progress-bar-progress";

        const subtext = document.createElement("div");
        subtext.className = "lol-loading-screen-subtext";

        container.appendChild(logo);
        container.appendChild(title);
        container.appendChild(progressFill);
        container.appendChild(subtext);

        (document.documentElement || document.body).appendChild(container);

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

        this.interval = window.setInterval(() => {

            let increment = 0;

            // ============================================
            // EARLY PHASE
            // ============================================

            if (currentProgress < 70) {

                increment =
                    (80 - currentProgress) * 0.07 +
                    (Math.random() * 0.9);

            }

            // ============================================
            // MID PHASE
            // ============================================

            else if (currentProgress < 92) {

                increment =
                    (98 - currentProgress) * 0.025 +
                    (Math.random() * 0.25);

            }

            // ============================================
            // FINAL PHASE
            // ============================================

            else {

                increment =
                    0.03 + (Math.random() * 0.04);

            }

            // ============================================
            // RANDOM MICRO STALLS
            // ============================================

            if (Math.random() < 0.04) {
                increment *= 0.15;
            }

            // ============================================
            // RANDOM MICRO BURSTS
            // ============================================

            if (Math.random() < 0.02) {
                increment += 1.2;
            }

            currentProgress += increment;

            // ============================================
            // REALISTIC 97% HOLD
            // ============================================

            if (currentProgress >= 97 && !isCompleting) {

                currentProgress = 97;

                // Fake "finalizing"
                setTimeout(() => {
                    isCompleting = true;
                }, 700 + Math.random() * 1200);
            }

            // ============================================
            // COMPLETE
            // ============================================

            if (isCompleting && currentProgress < 100) {

                currentProgress += 0.6;

            }

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

            if (Math.floor(currentProgress) % 18 === 0) {

                packageIndex =
                    (packageIndex + 1) % packages.length;

                subtext.innerText = packages[packageIndex];
            }

            // ============================================
            // FINISH ANIMATION
            // ============================================

            if (currentProgress >= 100) {

                clearInterval(this.interval!);

                container.style.opacity = "0";

                setTimeout(() => {

                    container.remove();
                    this.injected = false;

                }, 850);
            }

        }, 50);
    },

    start() {
        this.injectLoader();
    },

    stop() {}
});
