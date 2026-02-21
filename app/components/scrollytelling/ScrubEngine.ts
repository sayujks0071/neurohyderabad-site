export interface ScrubEngineConfig {
    path?: string;
    prefix?: string;
    extension?: string;
    totalFrames: number;
    onProgress?: (progress: number) => void;
    onLoadComplete?: () => void;
}

export class ScrubEngine {
    private framePath: string;
    private framePrefix: string;
    private extension: string;
    private totalFrames: number;
    private images: (HTMLImageElement | null)[];
    private loadedCount: number;
    private onProgress: (progress: number) => void;
    private onLoadComplete: () => void;
    public isLoaded: boolean;

    constructor(config: ScrubEngineConfig) {
        this.framePath = config.path || '/model-images/';
        this.framePrefix = config.prefix || 'ezgif-frame-';
        this.extension = config.extension || '.jpg';
        this.totalFrames = config.totalFrames;
        this.images = new Array(config.totalFrames).fill(null);
        this.loadedCount = 0;
        this.onProgress = config.onProgress || (() => { });
        this.onLoadComplete = config.onLoadComplete || (() => { });
        this.isLoaded = false;
    }

    preload() {
        console.log(`Starting preload of ${this.totalFrames} frames...`);
        for (let i = 1; i <= this.totalFrames; i++) {
            const img = new Image();
            // Pad with zeros to 3 digits (e.g., 001, 010, 100)
            const frameNum = String(i).padStart(3, '0');
            const src = `${this.framePath}${this.framePrefix}${frameNum}${this.extension}`;

            img.src = src;
            img.onload = () => {
                this.loadedCount++;
                this.onProgress(this.loadedCount / this.totalFrames);
                if (this.loadedCount === this.totalFrames) {
                    this.isLoaded = true;
                    console.log('All frames loaded.');
                    this.onLoadComplete();
                }
            };
            img.onerror = () => {
                console.error(`Failed to load frame: ${src}`);
                // Still count as processed to avoid hanging
                this.loadedCount++;
                if (this.loadedCount === this.totalFrames) {
                    this.isLoaded = true;
                    this.onLoadComplete();
                }
            };
            this.images[i - 1] = img;
        }
    }

    getFrame(progress: number): HTMLImageElement | null {
        if (!this.isLoaded) return null;

        // Clamp progress between 0 and 1
        const clampedProgress = Math.max(0, Math.min(1, progress));

        // Map progress to frame index
        const frameIndex = Math.floor(clampedProgress * (this.totalFrames - 1));

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
