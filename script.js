'use strict';

/* =====================
   Sidebar toggle
===================== */
const sidebar = document.querySelector('[data-sidebar]');
const sidebarBtn = document.querySelector('[data-sidebar-btn]');
if (sidebar && sidebarBtn) {
  sidebarBtn.addEventListener('click', () => sidebar.classList.toggle('active'));
}

/* =====================
   Custom select + Portfolio filtering
===================== */
const select = document.querySelector('[data-select]');
const selectValue = document.querySelector('[data-select-value]');
const selectList = select ? select.querySelector('.select-list') : null;
const selectItems = select ? select.querySelectorAll('[data-select-item]') : [];
const filterButtons = document.querySelectorAll('[data-filter-btn]');
const filterItems = document.querySelectorAll('[data-filter-item]');

/** Normalize a data-category string into a list of tokens */
function parseCategories(attr) {
  return String(attr || '')
    .toLowerCase()
    .split(',')
    .map(s => s.trim())
    .filter(Boolean);
}

function applyFilter(value) {
  const wanted = String(value || '').trim().toLowerCase();

  filterItems.forEach(item => {
    const categories = parseCategories(item.dataset.category);
    const show = wanted === 'all' || categories.includes(wanted);
    item.classList.toggle('active', show);
  });
}

/** Wire up custom select */
if (select && selectValue && selectList) {
  // Toggle open/close
  select.addEventListener('click', () => {
    select.classList.toggle('active');
  });

  // Choose an item
  selectItems.forEach(li => {
    li.addEventListener('click', () => {
      const value = li.innerText.trim();
      selectValue.innerText = value;
      select.classList.remove('active');
      applyFilter(value);
      // Also update buttons' active state (if present)
      filterButtons.forEach(btn => {
        btn.classList.toggle('active', btn.innerText.trim().toLowerCase() === value.toLowerCase());
      });
    });
  });

  // Close when clicking outside
  document.addEventListener('click', (e) => {
    if (!select.contains(e.target)) select.classList.remove('active');
  });
}

/** Wire up filter buttons */
if (filterButtons.length) {
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      // Visual state
      filterButtons.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      // Apply
      const value = btn.innerText.trim();
      applyFilter(value);
      // Sync custom select label if present
      if (selectValue) selectValue.innerText = value;
    });
  });
}

/* Initial filter (show all) */
applyFilter('all');

/* =====================
   Testimonials modal
===================== */
const testimonialsItems = document.querySelectorAll('[data-testimonials-item]');
const modalContainer = document.querySelector('[data-modal-container]');
const modalCloseBtn = document.querySelector('[data-modal-close-btn]');
const overlay = document.querySelector('[data-overlay]');

const modalImg = document.querySelector('[data-modal-img]');
const modalTitle = document.querySelector('[data-modal-title]');
const modalText = document.querySelector('[data-modal-text]');

function testimonialsModalToggle() {
  modalContainer?.classList.toggle('active');
  overlay?.classList.toggle('active');
}

testimonialsItems.forEach(item => {
  item.addEventListener('click', () => {
    const avatar = item.querySelector('[data-testimonials-avatar]');
    const title = item.querySelector('[data-testimonials-title]');
    const text = item.querySelector('[data-testimonials-text]');

    if (modalImg && avatar) {
      modalImg.src = avatar.src;
      modalImg.alt = avatar.alt || '';
    }
    if (modalTitle && title) modalTitle.innerText = title.innerText;
    if (modalText && text) modalText.innerHTML = text.innerHTML;

    testimonialsModalToggle();
  });
});

modalCloseBtn?.addEventListener('click', testimonialsModalToggle);
overlay?.addEventListener('click', testimonialsModalToggle);

/* =====================
   Contact form validation
===================== */
const formInputs = document.querySelectorAll('[data-form-input]');
const formBtn = document.querySelector('[data-form-btn]');

function validateForm() {
  const allFilled = Array.from(formInputs).every(input => input.value.trim().length > 0);
  if (formBtn) formBtn.disabled = !allFilled;
}
formInputs.forEach(input => input.addEventListener('input', validateForm));
validateForm();

/* =====================
   Page Navigation
===================== */
const navigationLinks = document.querySelectorAll('[data-nav-link]');
const pages = document.querySelectorAll('[data-page]');

navigationLinks.forEach(link => {
  link.addEventListener('click', () => {
    const target = link.innerText.trim().toLowerCase();
    pages.forEach((page, idx) => {
      const match = page.dataset.page === target;
      page.classList.toggle('active', match);
      navigationLinks[idx].classList.toggle('active', match);
    });
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  });
});


// === SEAMLESS INFINITE SCROLL WITH DUPLICATION ===
const clientsList = document.querySelector('.clients-list');

if (clientsList) {
  // Clone all items and append them for seamless loop
  const items = Array.from(clientsList.children);
  items.forEach(item => {
    const clone = item.cloneNode(true);
    clientsList.appendChild(clone);
  });

  // Configuration
  const scrollSpeed = 0.5; // pixels per frame (lower = smoother)
  let scrollPosition = 0;
  let isHovering = false;
  let animationFrameId = null;

  // Pause on hover
  clientsList.addEventListener('mouseenter', () => {
    isHovering = true;
  });

  clientsList.addEventListener('mouseleave', () => {
    isHovering = false;
  });

  // Main animation loop
  function animateScroll() {
    if (!isHovering) {
      scrollPosition += scrollSpeed;
      
      // Get the original content width (half of total since we duplicated)
      const originalWidth = clientsList.scrollWidth / 2;
      
      // Reset seamlessly when we've scrolled through original content
      if (scrollPosition >= originalWidth) {
        scrollPosition = 0;
      }
      
      // Apply the scroll using transform for smoother animation
      clientsList.style.transform = `translateX(-${scrollPosition}px)`;
    }
    
    // Continue the animation
    animationFrameId = requestAnimationFrame(animateScroll);
  }

  // Start the animation
  animateScroll();

  // Optional: Pause when user hovers over individual items
  const allItems = clientsList.querySelectorAll('.clients-item');
  allItems.forEach(item => {
    item.addEventListener('mouseenter', () => isHovering = true);
    item.addEventListener('mouseleave', () => isHovering = false);
  });
}
