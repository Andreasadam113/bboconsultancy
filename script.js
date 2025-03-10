window.addEventListener('scroll', function () {
  const nav = document.querySelector('.main-nav');
  if (window.scrollY > 50) {
    nav.classList.add('scrolled');
  } else {
    nav.classList.remove('scrolled');
  }
});

// Smooth scroll for navigation links
document.addEventListener('DOMContentLoaded', function () {
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();

      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      const offset = 86; // Adjust this value to control the spacing (in pixels)

      const targetPosition =
        targetElement.getBoundingClientRect().top + window.pageYOffset - offset;

      window.scrollTo({
        top: targetPosition,
        behavior: 'smooth',
      });
    });
  });
});

// Service card expansion functionality
document.addEventListener('DOMContentLoaded', function () {
  const serviceCards = document.querySelectorAll('.service-card');

  serviceCards.forEach((card) => {
    const link = card.querySelector('.service-cta');
    const description = card.querySelector('p');
    const fullText =
      description.getAttribute('data-full-text') || description.textContent;
    const shortText = description.textContent;
    let isExpanded = false;

    link.addEventListener('click', function (e) {
      e.preventDefault();

      if (!isExpanded) {
        description.textContent = fullText;
        link.textContent = 'Lees minder';
        card.classList.add('expanded');
        card.style.height = 'auto';
        card.style.zIndex = '1';
      } else {
        description.textContent = shortText;
        link.textContent = 'Lees meer';
        card.classList.remove('expanded');
        card.style.height = '';
        card.style.zIndex = '';
      }

      isExpanded = !isExpanded;
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  document.body.style.overflow = 'overlay';
});

document.addEventListener('DOMContentLoaded', function () {
  const cards = document.querySelectorAll('.card');

  cards.forEach((card) => {
    card.addEventListener('click', () => {
      // Remove expanded class from all other cards
      cards.forEach((c) => {
        if (c !== card) c.classList.remove('expanded');
      });
      // Toggle current card
      card.classList.toggle('expanded');
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const menuToggle = document.createElement('div');
  menuToggle.className = 'menu-toggle';
  menuToggle.innerHTML = '☰';

  const navContainer = document.querySelector('.nav-container');
  const navLinks = document.querySelector('.nav-links');

  navContainer.insertBefore(menuToggle, navLinks);

  menuToggle.addEventListener('click', function () {
    navLinks.classList.toggle('active');
    menuToggle.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
  });

  // Close menu when clicking a link
  navLinks.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('active');
      menuToggle.innerHTML = '☰';
    });
  });
});

document.addEventListener('DOMContentLoaded', function () {
  const form = document.querySelector('.contact-form');
  const privacyCheckbox = document.querySelector('#privacy');
  const submitButton = form.querySelector('.submit-btn');

  // Function to update submit button state
  function updateSubmitButton() {
    submitButton.disabled = !privacyCheckbox.checked;
    submitButton.style.opacity = privacyCheckbox.checked ? '1' : '0.5';
    submitButton.style.cursor = privacyCheckbox.checked
      ? 'pointer'
      : 'not-allowed';
  }

  // Initial state
  updateSubmitButton();

  // Update when checkbox changes
  privacyCheckbox.addEventListener('change', updateSubmitButton);

  // Form submission handling
  form.addEventListener('submit', function (e) {
    if (!privacyCheckbox.checked) {
      e.preventDefault();
      alert('Please accept the privacy policy to submit the form.');
    }
  });
});

// Reference carousel functionality
document.addEventListener('DOMContentLoaded', function () {
  let currentReference = 0;
  const references = document.querySelectorAll('.reference-image');
  let isAnimating = false;

  function changeReference(n) {
    if (isAnimating) return;
    isAnimating = true;

    const currentImage = references[currentReference];
    currentImage.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
    currentImage.style.opacity = '0';
    currentImage.style.transform =
      n > 0 ? 'translateX(-100%)' : 'translateX(100%)';

    setTimeout(() => {
      currentImage.classList.remove('active');
      currentReference =
        (currentReference + n + references.length) % references.length;

      const nextImage = references[currentReference];
      nextImage.style.transition = 'transform 0.8s ease, opacity 0.8s ease';
      nextImage.style.transform =
        n > 0 ? 'translateX(100%)' : 'translateX(-100%)';
      nextImage.style.opacity = '0';
      nextImage.classList.add('active');

      // Force a reflow
      nextImage.offsetHeight;

      nextImage.style.transform = 'translateX(0)';
      nextImage.style.opacity = '1';

      setTimeout(() => {
        isAnimating = false;
      }, 800); // Match the transition duration
    }, 50);
  }

  // Attach changeReference to window object for onclick use in HTML
  window.changeReference = changeReference;
});
