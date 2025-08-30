// Fixed lightbox functionality with simple zoom control
(function() {
  'use strict';
  
  let currentZoom = 1; // Start at 100% (fit to screen)
  let currentImageSrc = '';
  let isDragging = false;
  let dragStartX = 0;
  let dragStartY = 0;
  let imageX = 0;
  let imageY = 0;
  let naturalWidth = 0;
  let naturalHeight = 0;
  
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
            <button id="starlight-download-btn">📥</button>
            <button id="starlight-zoom-out">−</button>
            <input type="number" id="starlight-zoom-input" value="20" min="5" max="500" style="width:60px; text-align:center;">
            <span>%</span>
            <button id="starlight-zoom-in">+</button>
            <button id="starlight-fit-screen">Fit</button>
            <button id="starlight-reset-zoom">⌂</button>
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
    const fitScreenBtn = document.getElementById('starlight-fit-screen');
    const zoomInput = document.getElementById('starlight-zoom-input');
    
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
    fitScreenBtn.addEventListener('click', fitToScreen);
    zoomInput.addEventListener('change', setZoomFromInput);
    zoomInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') setZoomFromInput();
    });
    
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
    
    // Wait for image to load 
    lightboxImg.onload = function() {
      naturalWidth = this.naturalWidth;
      naturalHeight = this.naturalHeight;
      
      // Start at 20%
      currentZoom = 0.2;
      imageX = 0;
      imageY = 0;
      updateZoom();
    };
    
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  }
  
  function closeLightbox() {
    const modal = document.getElementById('starlight-lightbox');
    modal.style.display = 'none';
    document.body.style.overflow = 'auto';
  }
  
  function zoomIn() {
    currentZoom = Math.min(currentZoom + 0.05, 5); // 5% increments, max 500%
    updateZoom();
  }
  
  function zoomOut() {
    currentZoom = Math.max(currentZoom - 0.05, 0.05); // 5% decrements, min 5%
    updateZoom();
  }
  
  function resetZoom() {
    currentZoom = 1; // Reset to 100%
    imageX = 0;
    imageY = 0;
    updateZoom();
  }
  
  function fitToScreen() {
    // 25% for 1080p screens - adjust based on resolution
    currentZoom = 0.25;
    imageX = 0;
    imageY = 0;
    updateZoom();
  }
  
  function setZoomFromInput() {
    const zoomInput = document.getElementById('starlight-zoom-input');
    const value = parseFloat(zoomInput.value);
    if (!isNaN(value) && value >= 5 && value <= 500) {
      currentZoom = value / 100; // Convert percentage to decimal
      imageX = 0;
      imageY = 0;
      updateZoom();
    }
  }
  
  function updateZoom() {
    const lightboxImg = document.getElementById('starlight-lightbox-image');
    const zoomInput = document.getElementById('starlight-zoom-input');
    
    // Use absolute scale value
    lightboxImg.style.transform = `scale(${currentZoom}) translate(${imageX / currentZoom}px, ${imageY / currentZoom}px)`;
    
    // Update the input field with current zoom percentage
    const displayZoom = Math.round(currentZoom * 100);
    zoomInput.value = displayZoom;
    
    if (currentZoom > 0.2) { // Above 20%
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
    if (currentZoom > baseZoom) {
      isDragging = true;
      dragStartX = e.clientX - imageX;
      dragStartY = e.clientY - imageY;
      e.preventDefault();
    }
  }
  
  function drag(e) {
    if (isDragging && currentZoom > baseZoom) {
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