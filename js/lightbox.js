
class ImageLightbox {
    constructor() {
        this.lightbox = document.getElementById('lightbox');
        this.lightboxImage = document.getElementById('lightboxImage');
        this.closeBtn = document.getElementById('closeBtn');
        this.prevBtn = document.getElementById('prevBtn');
        this.nextBtn = document.getElementById('nextBtn');
        this.currentImages = [];
        this.currentIndex = 0;
        
        this.init();
    }
    
    init() {
        // Get all clickable images
        this.updateImageList();
        
        // Event listeners
        this.closeBtn.addEventListener('click', () => this.close());
        this.prevBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.showPrevious();
        });
        this.nextBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            this.showNext();
        });
        
        // Close when clicking outside image
        this.lightbox.addEventListener('click', (e) => {
            if (e.target === this.lightbox) {
                this.close();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => {
            if (!this.lightbox.classList.contains('active')) return;
            
            switch(e.key) {
                case 'Escape':
                    this.close();
                    break;
                case 'ArrowLeft':
                    this.showPrevious();
                    break;
                case 'ArrowRight':
                    this.showNext();
                    break;
            }
        });
        
        // Touch gestures for mobile
        let startX = 0;
        this.lightboxImage.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        this.lightboxImage.addEventListener('touchend', (e) => {
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            if (Math.abs(diff) > 50) { // Minimum swipe distance
                if (diff > 0) {
                    this.showNext(); // Swipe left - next image
                } else {
                    this.showPrevious(); // Swipe right - previous image
                }
            }
        });
    }
    
    updateImageList() {
        this.currentImages = Array.from(document.querySelectorAll('.clickable-image'));
        
        // Add click listeners to all images
        this.currentImages.forEach((img, index) => {
            img.addEventListener('click', () => this.open(index));
            img.style.cursor = 'pointer';
        });
    }
    
    open(index) {
        this.currentIndex = index;
        const img = this.currentImages[index];
        
        // Get image source - either from src attribute or data-src
        const src = img.src || img.dataset.src;
        const alt = img.alt || img.dataset.alt || '';
        
        this.lightboxImage.src = src;
        this.lightboxImage.alt = alt;
        
        // Show/hide navigation arrows
        this.prevBtn.style.display = this.currentImages.length > 1 ? 'flex' : 'none';
        this.nextBtn.style.display = this.currentImages.length > 1 ? 'flex' : 'none';
        
        this.lightbox.classList.add('active');
        document.body.style.overflow = 'hidden'; // Prevent background scrolling
    }
    
    close() {
        this.lightbox.classList.remove('active');
        document.body.style.overflow = 'auto'; // Restore scrolling
    }
    
    showPrevious() {
        this.currentIndex = this.currentIndex > 0 ? this.currentIndex - 1 : this.currentImages.length - 1;
        this.updateCurrentImage();
    }
    
    showNext() {
        this.currentIndex = this.currentIndex < this.currentImages.length - 1 ? this.currentIndex + 1 : 0;
        this.updateCurrentImage();
    }
    
    updateCurrentImage() {
        const img = this.currentImages[this.currentIndex];
        const src = img.src || img.dataset.src;
        const alt = img.alt || img.dataset.alt || '';
        
        this.lightboxImage.src = src;
        this.lightboxImage.alt = alt;
    }
    
    // Method to refresh image list (call this if you add images dynamically)
    refresh() {
        this.updateImageList();
    }
}

// Initialize the lightbox when page loads
document.addEventListener('DOMContentLoaded', () => {
    window.imageLightbox = new ImageLightbox();
});

// If you add images dynamically, call this:
// window.imageLightbox.refresh();
