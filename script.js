
/* Aditi Tiwari — website interactions. No external dependencies. */
(() => {
    'use strict';
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const tabs = [...document.querySelectorAll('nav .tab')];
    const sections = [...document.querySelectorAll('.tab-content')];
    const nav = document.querySelector('nav');
  
    function showTab(name, updateHistory = true) {
      const target = document.getElementById(name);
      if (!target || !target.classList.contains('tab-content')) return;
      sections.forEach(section => {
        const selected = section === target;
        section.hidden = !selected;
        section.style.display = selected ? 'block' : 'none';
        section.classList.toggle('is-visible', selected);
      });
      tabs.forEach(tab => {
        const selected = tab.getAttribute('onclick')?.includes(`'${name}'`) || tab.dataset.tab === name;
        tab.classList.toggle('active', !!selected);
        if (selected) tab.setAttribute('aria-current', 'page');
        else tab.removeAttribute('aria-current');
      });
      nav?.classList.remove('nav-open');
      document.querySelector('.mobile-nav-toggle')?.setAttribute('aria-expanded', 'false');
      if (updateHistory && location.hash !== `#${name}`) history.replaceState(null, '', `#${name}`);
    }
    window.showTab = showTab;
  
    // Mobile navigation
    if (nav) {
      const menu = document.createElement('button');
      menu.className = 'mobile-nav-toggle';
      menu.type = 'button';
      menu.textContent = 'Menu';
      menu.setAttribute('aria-label', 'Toggle navigation');
      menu.setAttribute('aria-expanded', 'false');
      menu.addEventListener('click', () => {
        const open = nav.classList.toggle('nav-open');
        menu.setAttribute('aria-expanded', String(open));
      });
      nav.prepend(menu);
    }
    const initialTab = decodeURIComponent(location.hash.slice(1));
    showTab(sections.some(s => s.id === initialTab) ? initialTab : 'home', false);
    window.addEventListener('hashchange', () => {
      const name = decodeURIComponent(location.hash.slice(1));
      if (sections.some(s => s.id === name)) showTab(name, false);
    });
  
    // Profile picture
    const profile = document.getElementById('profile-pic');
    if (profile) {
      const original = profile.getAttribute('src');
      const alternate = 'figures/aditi2.png';
      const preload = new Image();
      preload.src = alternate;
      profile.addEventListener('mouseenter', () => {
        if (preload.complete && preload.naturalWidth > 0) profile.src = alternate;
      });
      profile.addEventListener('mouseleave', () => { profile.src = original; });
      profile.addEventListener('focus', () => {
        if (preload.complete && preload.naturalWidth > 0) profile.src = alternate;
      });
      profile.addEventListener('blur', () => { profile.src = original; });
    }
  
    // Cover carousel: preserve all original filenames.
    const images = [
      'figures/cover1.jpg', 'figures/cover14.png', 'figures/cover17.png',
      'figures/cover15.png', 'figures/cover16.png', 'figures/cover4.jpg',
      'figures/cover19.png', 'figures/cover12.png', 'figures/cover6.jpg',
      'figures/cover10.jpg', 'figures/cover11.png', 'figures/cover18.png',
      'figures/cover20.png'
    ];
    const cover = document.querySelector('.cover-photo');
    const indicator = document.querySelector('.scroll-indicator');
    let currentImageIndex = 0;
    let changeToken = 0;
    let fadeTimer;
    const dots = [];
  
    if (cover && indicator) {
      indicator.replaceChildren();
      indicator.setAttribute('aria-label', 'Cover photo selection');
      images.forEach((_, index) => {
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = 'dot';
        dot.setAttribute('aria-label', `Show cover photo ${index + 1} of ${images.length}`);
        dot.addEventListener('click', () => window.setImage(index));
        indicator.appendChild(dot);
        dots.push(dot);
      });
      cover.style.backgroundImage = `url('${images[0]}')`;
      const overlay = document.createElement('div');
      overlay.className = 'cover-photo cover-photo-next';
      overlay.setAttribute('aria-hidden', 'true');
      cover.after(overlay);
  
      function updateDots() {
        dots.forEach((dot, i) => {
          dot.classList.toggle('active', i === currentImageIndex);
          dot.setAttribute('aria-pressed', String(i === currentImageIndex));
        });
      }
      updateDots();
  
      window.setImage = function(index) {
        if (!Number.isInteger(index) || index < 0 || index >= images.length || index === currentImageIndex) return;
        currentImageIndex = index;
        updateDots();
        const token = ++changeToken;
        clearTimeout(fadeTimer);
        const next = images[index];
        const preload = new Image();
  
        preload.onload = () => {
          if (token !== changeToken) return;
          if (reducedMotion.matches) {
            cover.style.backgroundImage = `url('${next}')`;
            overlay.classList.remove('is-showing');
            return;
          }
          overlay.style.backgroundImage = `url('${next}')`;
          overlay.classList.remove('is-showing');
          void overlay.offsetWidth;
          overlay.classList.add('is-showing');
          fadeTimer = setTimeout(() => {
            if (token !== changeToken) return;
            cover.style.backgroundImage = `url('${next}')`;
            overlay.classList.remove('is-showing');
          }, 550);
        };
        preload.onerror = () => {
          if (token === changeToken) dots[index]?.classList.add('image-unavailable');
        };
        preload.src = next;
      };
  
      window.prevImage = () => window.setImage((currentImageIndex - 1 + images.length) % images.length);
      window.nextImage = () => window.setImage((currentImageIndex + 1) % images.length);
  
      const container = document.querySelector('.cover-photo-container');
      container?.addEventListener('keydown', event => {
        if (event.key === 'ArrowLeft') { event.preventDefault(); window.prevImage(); }
        if (event.key === 'ArrowRight') { event.preventDefault(); window.nextImage(); }
      });
      document.querySelectorAll('.arrow').forEach(button => {
        button.setAttribute('type', 'button');
        button.setAttribute('aria-label', button.classList.contains('left') ? 'Previous cover photo' : 'Next cover photo');
      });
    } else {
      window.setImage = () => {};
      window.prevImage = () => {};
      window.nextImage = () => {};
    }
  
    // Light and dark mode
    const toggle = document.getElementById('darkModeToggle');
    const savedTheme = localStorage.getItem('dark-mode');
    if (savedTheme === 'enabled' || savedTheme === 'true') document.body.classList.add('dark-mode');
  
    function syncThemeButton() {
      if (!toggle) return;
      const dark = document.body.classList.contains('dark-mode');
      toggle.textContent = dark ? '☀️ Light Mode' : '🌙 Dark Mode';
      toggle.setAttribute('aria-label', dark ? 'Switch to light mode' : 'Switch to dark mode');
      toggle.setAttribute('aria-pressed', String(dark));
    }
  
    window.toggleDarkMode = () => {
      document.body.classList.toggle('dark-mode');
      localStorage.setItem('dark-mode', document.body.classList.contains('dark-mode') ? 'enabled' : 'disabled');
      syncThemeButton();
    };
    toggle?.addEventListener('click', window.toggleDarkMode);
    syncThemeButton();
  
    // Back to top
    const topButton = document.getElementById('topBtn');
    function updateTopButton() {
      if (!topButton) return;
      topButton.classList.toggle('is-visible', window.scrollY > 300);
    }
    window.scrollToTop = () => window.scrollTo({
      top: 0,
      behavior: reducedMotion.matches ? 'instant' : 'smooth'
    });
    topButton?.setAttribute('aria-label', 'Back to top');
    window.addEventListener('scroll', updateTopButton, { passive: true });
    updateTopButton();
  
    // Experience cards: click, touch and keyboard access
    document.querySelectorAll('.grid-item').forEach(card => {
      const detail = card.querySelector('.description');
      if (!detail) return;
      card.tabIndex = 0;
      card.setAttribute('role', 'button');
      card.setAttribute('aria-expanded', 'false');
  
      function toggleCard() {
        const isOpen = card.classList.toggle('card-open');
        card.setAttribute('aria-expanded', String(isOpen));
      }
      card.addEventListener('click', event => {
        if (event.target.closest('a')) return;
        toggleCard();
      });
      card.addEventListener('keydown', event => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault();
          toggleCard();
        }
        if (event.key === 'Escape') {
          card.classList.remove('card-open');
          card.setAttribute('aria-expanded', 'false');
        }
      });
    });
  })();
  
  // Random footer quote on each page load.
  // Intentionally unattributed where authorship is uncertain.
  (() => {
    const quotes = [
      'The greatest skill you can ever learn is decreasing the time between idea and execution.',
      'The art of not being ready and doing it anyway will get you far.',
      'Clarity doesn’t come before action. It comes from action.',
      'Nothing changes if nothing changes.',
      'Ambition without action becomes anxiety.',
      'Cold water does not get warmer if you jump late.',
      'The scariest moment is just before you start.',
      'What you are not changing, you are choosing.',
      'It won’t happen overnight, but if you quit, it won’t happen at all.',
      'Enjoy the process of becoming.',
      'Be where your feet are.',
      'The little moments aren’t little.',
      'Learn to enjoy life without needing an audience.',
      'There are seats reserved for you in rooms you haven’t even seen.'
    ];
    const element = document.getElementById('footerQuote');
    if (element) {
      element.textContent = '“' +
        quotes[Math.floor(Math.random() * quotes.length)] + '”';
    }
  })();
  



  


/* Beyond Research gallery */

const galleryPhotos = [
    { src: "figures/painting1.jpg", caption: "Painting" },
    { src: "figures/painting2.jpg", caption: "Painting" },
    { src: "figures/clay1.jpg", caption: "Clay" },
    { src: "figures/drawing1.jpg", caption: "Sketching" },
    { src: "figures/lego1.jpg", caption: "LEGO" },
    { src: "figures/photography1.jpg", caption: "Photography" }
];

let currentGalleryPhoto = 0;
const gallery = document.getElementById("personalGallery");
const lightbox = document.getElementById("galleryLightbox");

if (gallery) {
    galleryPhotos.forEach((photo, index) => {
        const button = document.createElement("button");
        button.className = "gallery-photo";
        button.type = "button";
        button.setAttribute("aria-label", `View ${photo.caption}`);

        const img = document.createElement("img");
        img.src = photo.src;
        img.alt = photo.caption;
        img.loading = "lazy";

        // Do not show an empty box for missing images.
        img.onerror = () => button.remove();

        button.appendChild(img);
        button.addEventListener("click", () => openGalleryPhoto(index));
        gallery.appendChild(button);
    });
}

function displayGalleryPhoto() {
    const photo = galleryPhotos[currentGalleryPhoto];

    document.getElementById("galleryFullImage").src = photo.src;
    document.getElementById("galleryFullImage").alt = photo.caption;
    document.getElementById("galleryCaption").textContent = photo.caption;
}

function openGalleryPhoto(index) {
    currentGalleryPhoto = index;
    displayGalleryPhoto();
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    lightbox.querySelector(".gallery-close").focus();
}

function closeGalleryPhoto() {
    lightbox.classList.remove("open");
    lightbox.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
}

function changeGalleryPhoto(direction) {
    currentGalleryPhoto =
        (currentGalleryPhoto + direction + galleryPhotos.length)
        % galleryPhotos.length;

    displayGalleryPhoto();
}

document.addEventListener("keydown", event => {
    if (!lightbox?.classList.contains("open")) return;

    if (event.key === "Escape") closeGalleryPhoto();
    if (event.key === "ArrowLeft") changeGalleryPhoto(-1);
    if (event.key === "ArrowRight") changeGalleryPhoto(1);
});

lightbox?.addEventListener("click", event => {
    if (event.target === lightbox) closeGalleryPhoto();
});
