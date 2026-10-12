// ============================================================
// MOBILE NAV TOGGLE
// ============================================================

const navToggle = document.querySelector('.nav-toggle');
const navLinks = document.querySelector('.nav-links');

if (navToggle && navLinks) {
  navToggle.addEventListener('click', () => {
    const isOpen = navLinks.classList.toggle('open');

    document.body.classList.toggle('nav-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('open');
      document.body.classList.remove('nav-open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// ============================================================
// WORK PAGE CATEGORY FILTERING
// ============================================================

const filterBtns = document.querySelectorAll('.filter-btn');
const workCards = document.querySelectorAll('.work-grid .card');

if (filterBtns.length && workCards.length) {
  const workGrid = document.querySelector('.work-grid');
  let fullGridHeight = workGrid ? workGrid.offsetHeight : 0;

  const updateFullGridHeight = () => {
    if (!workGrid) return;

    const hiddenCards = [...workCards].filter(card => card.classList.contains('hide'));
    hiddenCards.forEach(card => card.classList.remove('hide'));
    fullGridHeight = workGrid.offsetHeight;
    hiddenCards.forEach(card => card.classList.add('hide'));
    workGrid.style.minHeight = `${fullGridHeight}px`;
  };

  updateFullGridHeight();
  window.addEventListener('resize', updateFullGridHeight);

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.dataset.filter;

      workCards.forEach(card => {
        const match =
          category === 'all' ||
          card.dataset.category === category;

        card.classList.toggle('hide', !match);
      });

      if (workGrid) {
        workGrid.style.minHeight = `${fullGridHeight}px`;
      }
    });
  });
}

// ============================================================
// Show a placeholder only when the cover file fails to load.
document.querySelectorAll('.card .ph img').forEach(img => {
  const showPlaceholder = () => img.remove();
  img.addEventListener('error', showPlaceholder, { once: true });
  if (img.complete && img.naturalWidth === 0) showPlaceholder();
});

// SCROLL ARROW
// ============================================================

const scrollArrow = document.querySelector('.scroll-arrow');

if (scrollArrow) {
  const updateDirection = () => {
    const atTop = window.scrollY < 150;

    scrollArrow.classList.toggle('dir-down', atTop);
    scrollArrow.setAttribute(
      'aria-label',
      atTop ? 'Scroll to bottom' : 'Scroll to top'
    );
  };

  updateDirection();
  window.addEventListener('scroll', updateDirection);

  scrollArrow.addEventListener('click', () => {
    const target = scrollArrow.classList.contains('dir-down')
      ? document.body.scrollHeight
      : 0;

    window.scrollTo({
      top: target,
      behavior: 'smooth'
    });
  });
}


// ============================================================
// PRINT CV CLEANUP
// ============================================================
// Chrome's own print headers/footers are controlled in the print dialog.
// This temporarily removes the document title from that browser header if
// the user leaves Chrome's Headers and footers option enabled.
const cvPrintButton = document.querySelector('.cv-download');
if (cvPrintButton) {
  cvPrintButton.addEventListener('click', () => {
    const originalTitle = document.title;
    document.title = '';
    window.addEventListener('afterprint', () => {
      document.title = originalTitle;
    }, { once: true });
  });
}
