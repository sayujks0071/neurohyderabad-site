export interface ScrubEngineConfig {
    path?: string;
    prefix?: string;
    extension?: string;
    totalFrames: number;
    onProgress?: (progress: number) => void;
    onLoadComplete?: () => void;
    defer?: boolean;
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
    public defer: boolean;

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
        this.defer = config.defer || false;
    }

    private loadFrame(index: number, totalToLoad: number) {
        const i = index + 1; // 1-based index for filenames
        const img = new Image();
        // Pad with zeros to 3 digits (e.g., 001, 010, 100)
        const frameNum = String(i).padStart(3, '0');
        const src = `${this.framePath}${this.framePrefix}${frameNum}${this.extension}`;

        img.src = src;
        img.onload = () => {
            this.loadedCount++;

            // If deferred, we only track progress relative to what we're loading now
            // But for total progress bar, we might want to be careful.
            // For now, let's keep it simple: progress is loaded / totalFrames
            this.onProgress(this.loadedCount / this.totalFrames);

            if (this.loadedCount === totalToLoad) {
                this.isLoaded = true;
                console.log(`Frames loaded up to ${totalToLoad}.`);
                this.onLoadComplete();
            }
        };
        img.onerror = () => {
            console.error(`Failed to load frame: ${src}`);
            // Still count as processed to avoid hanging
            this.loadedCount++;
            if (this.loadedCount === totalToLoad) {
                this.isLoaded = true;
                this.onLoadComplete();
            }
        };
        this.images[index] = img;
    }

    preload() {
        const framesToLoad = this.defer ? 1 : this.totalFrames;
        console.log(`Starting preload of ${framesToLoad} frames (Defer: ${this.defer})...`);

        for (let i = 0; i < framesToLoad; i++) {
            this.loadFrame(i, framesToLoad);
        }
    }

    loadRemainingFrames() {
        if (!this.defer || this.loadedCount >= this.totalFrames) return;

        console.log(`Loading remaining frames (${this.totalFrames - 1})...`);

        // Temporarily reset isLoaded only if we want to block interaction,
        // but for smooth UX we usually want to keep showing what we have.
        // However, onProgress and onLoadComplete logic needs to be robust.

        // We continue loading from index 1 to totalFrames - 1
        for (let i = 1; i < this.totalFrames; i++) {
            // Re-implement load logic inline or reuse helper but need to handle completion differently
             const index = i;
             const imgIndex = index + 1;
             const img = new Image();
             const frameNum = String(imgIndex).padStart(3, '0');
             const src = `${this.framePath}${this.framePrefix}${frameNum}${this.extension}`;

             img.src = src;
             img.onload = () => {
                 this.loadedCount++;
                 this.onProgress(this.loadedCount / this.totalFrames);
                 // Only trigger complete when ALL are done
                 if (this.loadedCount === this.totalFrames) {
                     this.isLoaded = true; // Fully loaded
                     console.log('All remaining frames loaded.');
                     // We can optionally call onLoadComplete again if the consumer wants to know
                 }
             };
             img.onerror = () => {
                 console.error(`Failed to load frame: ${src}`);
                 this.loadedCount++;
                 if (this.loadedCount === this.totalFrames) {
                    this.isLoaded = true;
                 }
             };
             this.images[index] = img;
        }
    }

    getFrame(progress: number): HTMLImageElement | null {
        // If deferred loading is on, we might have isLoaded=true (for 1st frame)
        // but request a frame that isn't loaded yet.

        if (!this.isLoaded && this.loadedCount === 0) return null;

        // Clamp progress between 0 and 1
        const clampedProgress = Math.max(0, Math.min(1, progress));

        // Map progress to frame index
        const frameIndex = Math.floor(clampedProgress * (this.totalFrames - 1));

        const frame = this.images[frameIndex];

        // Fallback to the first frame or last loaded frame if the specific one isn't ready
        // This prevents flickering during deferred loading
        if (!frame || !frame.complete) {
            // Find nearest loaded frame? Or just return index 0 for safety
            return this.images[0];
        }

        return frame;
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
