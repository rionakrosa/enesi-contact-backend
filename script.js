// Hamburger menu logic
document.addEventListener('DOMContentLoaded', function() {
  const hamburger = document.getElementById('hamburgerBtn');
  const mainNav = document.getElementById('mainNav');
  const overlay = document.getElementById('menuOverlay');
  const dropdownParent = mainNav.querySelector('.has-dropdown');
  const dropdownToggle = dropdownParent.querySelector('a');

  function openMenu() {
    hamburger.classList.add('active');
    mainNav.classList.add('active');
    overlay.classList.add('active');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
  }
  function closeMenu() {
    hamburger.classList.remove('active');
    mainNav.classList.remove('active');
    overlay.classList.remove('active');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
    // Close dropdown if open
    dropdownParent.classList.remove('open');
  }
  hamburger.addEventListener('click', function() {
    if (mainNav.classList.contains('active')) {
      closeMenu();
    } else {
      openMenu();
    }
  });
  overlay.addEventListener('click', closeMenu);

  // Dropdown toggle for Products
  dropdownToggle.addEventListener('click', function(e) {
    // Only toggle dropdown on mobile (menu open)
    if (window.innerWidth < 900 && mainNav.classList.contains('active')) {
      e.preventDefault();
      dropdownParent.classList.toggle('open');
    }
  });

  // Close menu when a nav link is clicked (mobile only)
  mainNav.querySelectorAll('a').forEach(function(link) {
    link.addEventListener('click', function(e) {
      // If dropdown parent, don't close yet
      if (link.parentElement.classList.contains('has-dropdown')) {
        if (window.innerWidth < 900) {
          // Only close if not toggling dropdown
          if (!dropdownParent.classList.contains('open')) {
            closeMenu();
          }
        }
        return;
      }
      if (window.innerWidth < 900) {
        closeMenu();
      }
    });
  });

  // Close menu on resize to desktop
  window.addEventListener('resize', function() {
    if (window.innerWidth >= 900) {
      closeMenu();
    }
  });
});
// Hero slider logic
document.addEventListener('DOMContentLoaded', function() {
  const slides = document.querySelectorAll('.hero-slider .slide');
  if (slides.length > 0) {
    let current = 0;
    setInterval(() => {
      slides[current].classList.remove('active');
      current = (current + 1) % slides.length;
      slides[current].classList.add('active');
    }, 4500);
  }
});

// SPA-like navigation for dynamic site
document.addEventListener('DOMContentLoaded', function() {
  function loadPage(page) {
    let url = '';
    switch(page) {
      case 'home':
        url = 'index.html'; break;
      case 'products':
        url = 'products.html'; break;
      case 'about':
        url = 'about.html'; break;
      case 'search':
        url = 'search.html'; break;
      default:
        url = 'index.html';
    }
    if (window.location.pathname.endsWith(url)) return;
    window.location.href = url;
  }

  // Handle nav link clicks
  document.querySelectorAll('[data-page]').forEach(function(link) {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const page = link.getAttribute('data-page');
      loadPage(page);
    });
  });

  // If on search page, dynamically load products
  if (document.getElementById('productGrid')) {
    const products = [
      { name: 'MH100', img: 'https://www.gesamefoodmachinery.com/wp-content/uploads/2022/11/MH100A-KIT-1.png' },
      { name: 'MHSUPER 114', img: 'https://www.gesamefoodmachinery.com/wp-content/uploads/2022/11/Produccion-MH100A.png' },
      { name: 'MH100A KIT', img: 'https://www.gesamefoodmachinery.com/wp-content/uploads/2022/11/Accesorios-MH100A.png' },
      { name: 'MBM-MH', img: 'https://www.gesamefoodmachinery.com/wp-content/uploads/2022/11/MH100A-KIT-1.png' },
      { name: 'MH100AT', img: 'https://www.gesamefoodmachinery.com/wp-content/uploads/2022/11/Produccion-MH100A.png' },
      { name: 'EM-150', img: 'https://www.gesamefoodmachinery.com/wp-content/uploads/2022/11/Accesorios-MH100A.png' }
    ];
    const grid = document.getElementById('productGrid');
    grid.innerHTML = products.map(p => `
      <div class="product-card">
        <img src="${p.img}" alt="${p.name}">
        <div class="product-name">${p.name}</div>
      </div>
    `).join('');
  }
});
