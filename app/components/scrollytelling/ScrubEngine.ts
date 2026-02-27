export interface ScrubEngineConfig {
    path?: string;
    prefix?: string;
    extension?: string;
    totalFrames: number;
    batchSize?: number;
    onProgress?: (progress: number) => void;
    onInitLoad?: () => void;
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
    private onProgress: (progress: number) => void;
    private onInitLoad: () => void;
    private onLoadComplete: () => void;
    public isLoaded: boolean;
    public isReady: boolean;
    private lastValidFrame: HTMLImageElement | null = null;

    constructor(config: ScrubEngineConfig) {
        this.framePath = config.path || '/model-images/';
        this.framePrefix = config.prefix || 'ezgif-frame-';
        this.extension = config.extension || '.jpg';
        this.totalFrames = config.totalFrames;
        this.batchSize = config.batchSize || 24; // Default to loading first 24 frames
        this.images = new Array(config.totalFrames).fill(null);
        this.loadedCount = 0;
        this.onProgress = config.onProgress || (() => { });
        this.onInitLoad = config.onInitLoad || (() => { });
        this.onLoadComplete = config.onLoadComplete || (() => { });
        this.isLoaded = false;
        this.isReady = false;
    }

    preload() {
        console.log(`Starting preload of ${this.totalFrames} frames... (Batch size: ${this.batchSize})`);

        // Load initial batch first
        const batchEnd = Math.min(this.batchSize, this.totalFrames);
        this._loadBatch(1, batchEnd, () => {
            console.log('Initial batch loaded.');
            this.isReady = true;

            // Set first frame as initial valid frame
            if (this.images[0]) {
                this.lastValidFrame = this.images[0];
            }

            this.onInitLoad();

            // Start loading the rest in background
            if (batchEnd < this.totalFrames) {
                // Use setTimeout to yield to main thread before continuing
                setTimeout(() => {
                    this._loadRemainingFrames(batchEnd + 1);
                }, 100);
            } else {
                this.isLoaded = true;
                this.onLoadComplete();
            }
        });
    }

    private _loadBatch(start: number, end: number, onBatchComplete: () => void) {
        let batchLoadedCount = 0;
        const batchTotal = end - start + 1;

        if (batchTotal <= 0) {
            onBatchComplete();
            return;
        }

        for (let i = start; i <= end; i++) {
            this._loadImage(i, () => {
                batchLoadedCount++;
                if (batchLoadedCount === batchTotal) {
                    onBatchComplete();
                }
            });
        }
    }

    private _loadRemainingFrames(start: number) {
        console.log('Starting background load of remaining frames...');
        // Load remaining frames with low priority
        // We can process them in chunks or all at once depending on network strategy
        // Here we just fire them off but could be optimized further with requestIdleCallback

        for (let i = start; i <= this.totalFrames; i++) {
            this._loadImage(i, () => {
                // Check if all frames are loaded
                if (this.loadedCount === this.totalFrames) {
                    this.isLoaded = true;
                    console.log('All frames loaded.');
                    this.onLoadComplete();
                }
            });
        }
    }

    private _loadImage(index: number, callback: () => void) {
        // Skip if already loaded (safety check)
        if (this.images[index - 1]) {
            callback();
            return;
        }

        const img = new Image();
        // Pad with zeros to 3 digits (e.g., 001, 010, 100)
        const frameNum = String(index).padStart(3, '0');
        const src = `${this.framePath}${this.framePrefix}${frameNum}${this.extension}`;

        img.src = src;
        img.onload = () => {
            // Assign only when fully loaded to prevent getFrame returning incomplete images
            this.images[index - 1] = img;
            this.loadedCount++;
            this.onProgress(this.loadedCount / this.totalFrames);
            callback();
        };
        img.onerror = () => {
            console.error(`Failed to load frame: ${src}`);
            // Still count as processed to avoid hanging, but don't add to images array
            this.loadedCount++;
            callback();
        };
    }

    getFrame(progress: number): HTMLImageElement | null {
        // Return null only if not even ready (initial batch not loaded)
        if (!this.isReady) return null;

        // Clamp progress between 0 and 1
        const clampedProgress = Math.max(0, Math.min(1, progress));

        // Map progress to frame index
        const frameIndex = Math.floor(clampedProgress * (this.totalFrames - 1));

        const frame = this.images[frameIndex];

        if (frame) {
            this.lastValidFrame = frame;
            return frame;
        }

        // If requested frame isn't loaded yet (background loading), return last valid frame
        // This prevents flickering while scrolling into unloaded territory
        return this.lastValidFrame;
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
        this.isReady = false;
        this.lastValidFrame = null;
    }
}
