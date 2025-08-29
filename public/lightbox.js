// Global lightbox functionality for Starlight documentation
(function() {
  'use strict';
  
  let currentZoom = 1;
  let currentImageSrc = '';
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let imageX = 0;
  let imageY = 0;
  
  // Initialize when DOM is ready
  document.addEventListener('DOMContentLoaded', function() {
    initializeLightbox();
  });
  
  function initializeLightbox() {
    // Create lightbox HTML
    const lightboxHTML = `
      <div id="starlight-lightbox" class="lightbox-modal" style="display: none;">
        <span class="lightbox-close">&times;</span>
        <div class="lightbox-content">
          <img id="starlight-lightbox-image" class="lightbox-image" />
          <div class="lightbox-controls">
            <button id="starlight-download-btn">📥 Download</button>
            <span id="starlight-zoom-level">100%</span>
            <button id="starlight-zoom-in">🔍+ Zoom In</button>
            <button id="starlight-zoom-out">🔍- Zoom Out</button>
            <button id="starlight-reset-zoom">↻ Reset</button>
          </div>
        </div>
      </div>
    `;
    
    document.body.insertAdjacentHTML('beforeend', lightboxHTML);
    
    const modal = document.getElementById('starlight-lightbox');
    const lightboxImg = document.getElementById('starlight-lightbox-image');
    const closeBtn = document.querySelector('#starlight-lightbox .lightbox-close');
    const downloadBtn = document.getElementById('starlight-download-btn');
    const zoomInBtn = document.getElementById('starlight-zoom-in');
    const zoomOutBtn = document.getElementById('starlight-zoom-out');
    const resetZoomBtn = document.getElementById('starlight-reset-zoom');
    
    // Add click handlers to all images in Starlight content
    const images = document.querySelectorAll('.sl-markdown-content img');
    images.forEach(img => {
      img.style.cursor = 'zoom-in';
      img.addEventListener('click', function() {
        openLightbox(this);
      });
    });
    
    // Event listeners
    closeBtn.addEventListener('click', closeLightbox);
    modal.addEventListener('click', function(e) {
      if (e.target === modal) {
        closeLightbox();
      }
    });
    
    downloadBtn.addEventListener('click', downloadImage);
    zoomInBtn.addEventListener('click', zoomIn);
    zoomOutBtn.addEventListener('click', zoomOut);
    resetZoomBtn.addEventListener('click', resetZoom);
    
    // Keyboard controls
    document.addEventListener('keydown', function(e) {
      if (modal.style.display === 'block') {
        switch(e.key) {
          case 'Escape':
            closeLightbox();
            break;
          case '+':
          case '=':
            zoomIn();
            break;
          case '-':
            zoomOut();
            break;
          case '0':
            resetZoom();
            break;
        }
      }
    });
    
    // Mouse interactions
    lightboxImg.addEventListener('mousedown', startDrag);
    document.addEventListener('mousemove', drag);
    document.addEventListener('mouseup', endDrag);
    
    // Wheel zoom
    lightboxImg.addEventListener('wheel', function(e) {
      e.preventDefault();
      if (e.deltaY < 0) {
        zoomIn();
      } else {
        zoomOut();
      }
    });
  }
  
  function openLightbox(img) {
    const modal = document.getElementById('starlight-lightbox');
    const lightboxImg = document.getElementById('starlight-lightbox-image');
    
    currentImageSrc = img.src;
    lightboxImg.src = currentImageSrc;
    currentZoom = 1;
    imageX = 0;
    imageY = 0;
    lightboxImg.style.transform = `scale(${currentZoom}) translate(${imageX}px, ${imageY}px)`;
    lightboxImg.classList.remove('zoomed');
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
  
  function closeLightbox() {
    const modal = document.getElementById('starlight-lightbox');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
    currentZoom = 1;
  }
  
  function zoomIn() {
    currentZoom = Math.min(currentZoom * 1.1, 5); // 10% increments, max 5x
    updateZoom();
  }
  
  function zoomOut() {
    currentZoom = Math.max(currentZoom / 1.1, 0.2); // 10% decrements, min 0.2x
    updateZoom();
  }
  
  function resetZoom() {
    currentZoom = 1;
    imageX = 0;
    imageY = 0;
    updateZoom();
  }
  
  function updateZoom() {
    const lightboxImg = document.getElementById('starlight-lightbox-image');
    const zoomLevel = document.getElementById('starlight-zoom-level');
    
    lightboxImg.style.transform = `scale(${currentZoom}) translate(${imageX}px, ${imageY}px)`;
    zoomLevel.textContent = `${Math.round(currentZoom * 100)}%`;
    
    if (currentZoom > 1) {
      lightboxImg.classList.add('zoomed');
      lightboxImg.style.cursor = 'grab';
    } else {
      lightboxImg.classList.remove('zoomed');
      lightboxImg.style.cursor = 'zoom-in';
      imageX = 0;
      imageY = 0;
    }
  }
  
  function startDrag(e) {
    if (currentZoom > 1) {
      isDragging = true;
      dragStartX = e.clientX - imageX;
      dragStartY = e.clientY - imageY;
      e.preventDefault();
    }
  }
  
  function drag(e) {
    if (isDragging && currentZoom > 1) {
      imageX = e.clientX - dragStartX;
      imageY = e.clientY - dragStartY;
      updateZoom();
    }
  }
  
  function endDrag() {
    isDragging = false;
  }
  
  function downloadImage() {
    if (currentImageSrc) {
      const urlParts = currentImageSrc.split('/');
      const originalFilename = urlParts[urlParts.length - 1];
      
      const link = document.createElement('a');
      link.href = currentImageSrc;
      link.download = originalFilename || 'image.png';
      link.target = '_blank';
      
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
})();