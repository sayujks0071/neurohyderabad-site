export class ScrubEngine {
    constructor(config) {
        this.framePath = config.path; // e.g., 'Model image/'
        this.framePrefix = config.prefix; // e.g., 'ezgif-frame-'
        this.extension = config.extension || '.jpg';
        this.totalFrames = config.totalFrames;
        this.images = [];
        this.loadedCount = 0;
        this.onProgress = config.onProgress || (() => {});
        this.onLoadComplete = config.onLoadComplete || (() => {});
        this.isLoaded = false;
    }

    preload() {
        console.log(`Starting preload of ${this.totalFrames} frames...`);
        for (let i = 1; i <= this.totalFrames; i++) {
            const img = new Image();
            // Pad with zeros to 3 digits (e.g., 001, 010, 100) - adjust padding logic if needed
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

    getFrame(progress) {
        if (!this.isLoaded) return null;
        
        // Clamp progress between 0 and 1
        const clampedProgress = Math.max(0, Math.min(1, progress));
        
        // Map progress to frame index
        const frameIndex = Math.floor(clampedProgress * (this.totalFrames - 1));
        
        return this.images[frameIndex];
    }
}
