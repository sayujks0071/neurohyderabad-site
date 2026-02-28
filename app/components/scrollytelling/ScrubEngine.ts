export interface ScrubEngineConfig {
    path?: string;
    prefix?: string;
    extension?: string;
    totalFrames: number;
    batchSize?: number;
    onInitLoad?: () => void;
    onProgress?: (progress: number) => void;
    onLoadComplete?: () => void;
}

export class ScrubEngine {
    private framePath: string;
    private framePrefix: string;
    private extension: string;
    private totalFrames: number;
    private batchSize: number;
    private images: (HTMLImageElement | null)[];
    private loadedCount: number;
    private onInitLoad: () => void;
    private onProgress: (progress: number) => void;
    private onLoadComplete: () => void;
    public isLoaded: boolean;
    private initialBatchLoaded: boolean;

    constructor(config: ScrubEngineConfig) {
        this.framePath = config.path || '/model-images/';
        this.framePrefix = config.prefix || 'ezgif-frame-';
        this.extension = config.extension || '.jpg';
        this.totalFrames = config.totalFrames;
        this.batchSize = config.batchSize || 24;
        this.images = new Array(config.totalFrames).fill(null);
        this.loadedCount = 0;
        this.onInitLoad = config.onInitLoad || (() => { });
        this.onProgress = config.onProgress || (() => { });
        this.onLoadComplete = config.onLoadComplete || (() => { });
        this.isLoaded = false;
        this.initialBatchLoaded = false;
    }

    preload() {
        console.log(`Starting preload of ${this.totalFrames} frames in batches...`);
        let initialBatchLoadedCount = 0;
        const batchTarget = Math.min(this.batchSize, this.totalFrames);

        // Helper function to load a range of frames
        const loadRange = (start: number, end: number, isInitialBatch: boolean) => {
            for (let i = start; i <= end; i++) {
                const img = new Image();

                // Pad with zeros to 3 digits (e.g., 001, 010, 100)
                const frameNum = String(i).padStart(3, '0');
                const src = `${this.framePath}${this.framePrefix}${frameNum}${this.extension}`;

                img.onload = () => {
                    // Safe assignment ONLY after fully loaded to prevent DOM/Canvas rendering errors
                    this.images[i - 1] = img;
                    this.loadedCount++;
                    this.onProgress(this.loadedCount / this.totalFrames);

                    if (isInitialBatch && !this.initialBatchLoaded) {
                        initialBatchLoadedCount++;
                        if (initialBatchLoadedCount >= batchTarget) {
                            this.initialBatchLoaded = true;
                            this.isLoaded = true; // Start experience early
                            this.onInitLoad();
                            // Begin loading the remaining frames only after the critical batch is loaded
                            // This prevents bandwidth contention during the crucial LCP rendering window.
                            if (batchTarget < this.totalFrames) {
                                loadRange(batchTarget + 1, this.totalFrames, false);
                            }
                        }
                    }

                    if (this.loadedCount === this.totalFrames) {
                        this.isLoaded = true;
                        console.log('All frames loaded.');
                        this.onLoadComplete();
                    }
                };
                img.onerror = () => {
                    console.error(`Failed to load frame: ${src}`);
                    // Still count as processed to avoid hanging, but don't assign to `this.images` to prevent bad draws
                    this.loadedCount++;

                    if (isInitialBatch && !this.initialBatchLoaded) {
                        initialBatchLoadedCount++;
                        if (initialBatchLoadedCount >= batchTarget) {
                            this.initialBatchLoaded = true;
                            this.isLoaded = true;
                            this.onInitLoad();
                            if (batchTarget < this.totalFrames) {
                                loadRange(batchTarget + 1, this.totalFrames, false);
                            }
                        }
                    }

                    if (this.loadedCount === this.totalFrames) {
                        this.isLoaded = true;
                        this.onLoadComplete();
                    }
                };
                img.src = src; // Trigger network request
            }
        };

        // Start loading ONLY the critical LCP batch
        loadRange(1, batchTarget, true);
    }

    getFrame(progress: number): HTMLImageElement | null {
        if (!this.isLoaded) return null;

        // Clamp progress between 0 and 1
        const clampedProgress = Math.max(0, Math.min(1, progress));

        // Map progress to frame index
        const frameIndex = Math.floor(clampedProgress * (this.totalFrames - 1));

        // Since images are only added to the array on successful load, this will be null
        // if the user scrolls too fast, which prevents rendering incomplete Image objects.
        return this.images[frameIndex];
    }

    // Cleanup method to help garbage collection if component unmounts
    dispose() {
        this.images.forEach(img => {
            if (img) {
                img.onload = null;
                img.onerror = null;
                img.src = '';
            }
        });
        this.images = [];
        this.isLoaded = false;
    }
}
