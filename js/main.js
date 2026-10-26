'use strict';

const projects = {
  filesprout: {
    title: 'FileSprout',
    category: 'WEB APPLICATION · LIVE PROJECT',
    image: 'assets/filesprout-actual.webp',
    imageAlt: 'Screenshot of the real FileSprout homepage',
    gallery: [
      {src: 'assets/filesprout-actual.webp', alt: 'FileSprout homepage with browser-local PDF tools', label: 'Homepage', caption: 'Actual FileSprout homepage'},
      {src: 'assets/filesprout-editor-full.webp', alt: 'FileSprout PDF editor showing page thumbnails, drawing toolbar and layer controls', label: 'Editor in use', caption: 'Actual FileSprout editor while working on a PDF'}
    ],
    description: 'FileSprout is a free online PDF editing and document tools project. It represents independent work in building and presenting a practical web application.',
    highlights: ['Launched October 2, 2026', 'Free browser-based PDF editing and file tools', 'A working, publicly accessible independent project'],
    link: 'https://www.filesprout.net',
    linkText: 'Visit FileSprout ↗'
  },
  editor: {
    title: 'Web Video Editor',
    category: 'WEB APPLICATION · IN DEVELOPMENT',
    image: 'assets/aurora-concept.webp',
    imageAlt: 'Aurora interface design concept for the web video editor, featuring a timeline and dark glowing controls',
    gallery: [{src: 'assets/aurora-concept.webp', alt: 'Aurora video editor UI concept with multitrack timeline and colorful preview', label: 'Aurora concept', caption: 'Design concept only — not a screenshot of the working application'}],
    description: 'An independent browser-based video editor in development. Aurora is an exploratory visual direction for the interface, not a completed or deployed version of the application.',
    highlights: ['In development; Aurora is a UI concept', 'Exploring editing workflows and creative controls', 'No public demo linked yet'],
    link: null,
    linkText: null
  },
  mochi: {
    title: 'Mochi & Friends',
    category: 'PUBLISHING · PUBLISHED PROJECT',
    image: 'assets/mochi-front-cover.webp',
    imageAlt: 'Original front cover of Mochi & Friends: A Cozy School Day',
    gallery: [
      {src: 'assets/mochi-front-cover.webp', alt: 'Front book cover showing Mochi and animal friends outside a school', label: 'Front cover', caption: 'The published book’s actual front cover'},
      {src: 'assets/mochi-full-wrap.webp', alt: 'Full front and back cover design with sample coloring pages', label: 'Full book wrap', caption: 'Original front-and-back cover artwork'}
    ],
    description: 'Mochi & Friends: A Cozy School Day is a published children’s coloring book, released under the pen name Lea Moore. The project represents the process of developing an idea into a finished publication.',
    highlights: ['Published in 2026 through Amazon KDP', 'Creative direction and coloring book production', 'Available to view on Amazon'],
    link: 'https://www.amazon.com/dp/B0HNDNXHN5',
    linkText: 'View on Amazon ↗'
  },
  serenity: {
    title: 'SerenityPrints',
    category: 'DESIGN · E-COMMERCE',
    image: 'assets/serenity-actual.webp',
    imageAlt: 'Screenshot of the public SerenityPrints storefront on Zazzle',
    gallery: [
      {src: 'assets/serenity-card-actual.webp', alt: 'SerenityPrints banner and example merchandise artwork', label: 'Featured artwork', caption: 'Artwork selected from the public store'},
      {src: 'assets/serenity-actual.webp', alt: 'Screenshot of the public SerenityPrints storefront on Zazzle', label: 'Storefront', caption: 'Actual public storefront'}
    ],
    description: 'SerenityPrints is an independent print-on-demand shop on Zazzle, featuring designs applied to merchandise and other customizable products.',
    highlights: ['Independent project started in 2023', 'Digital artwork and merchandise design', 'Storefront and product presentation on Zazzle'],
    link: 'https://www.zazzle.com/store/serenityprints',
    linkText: 'Visit the store ↗'
  }
};

// All projects remain editable directly in HTML and this small data object.
const navToggle = document.querySelector('.menu-button');
const navLinks = document.querySelector('.nav-links');
function closeMenu() {
  navLinks.classList.remove('is-open');
  navToggle.setAttribute('aria-expanded', 'false');
  navToggle.setAttribute('aria-label', 'Open navigation');
}
navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('is-open');
  navToggle.setAttribute('aria-expanded', String(isOpen));
  navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
});
navLinks.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeMenu(); });
document.addEventListener('click', event => {
  if (!navLinks.contains(event.target) && !navToggle.contains(event.target)) closeMenu();
});

const filters = [...document.querySelectorAll('[data-filter]')];
const cards = [...document.querySelectorAll('[data-project-card]')];
filters.forEach(button => button.addEventListener('click', () => {
  const filter = button.dataset.filter;
  filters.forEach(b => {
    const active = b === button;
    b.classList.toggle('is-active', active);
    b.setAttribute('aria-pressed', String(active));
  });
  cards.forEach(card => { card.hidden = filter !== 'all' && card.dataset.category !== filter; });
  if (window.ScrollTrigger) window.ScrollTrigger.refresh();
}));

const dialog = document.querySelector('#project-dialog');
const dialogImg = document.querySelector('#dialog-image');
const dialogCat = document.querySelector('#dialog-category');
const dialogTitle = document.querySelector('#dialog-title');
const dialogDesc = document.querySelector('#dialog-description');
const dialogHighlights = document.querySelector('#dialog-highlights');
const dialogLink = document.querySelector('#dialog-link');
const dialogGallery = document.querySelector('#dialog-gallery');
const dialogCaption = document.querySelector('#dialog-caption');

function openProject(key) {
  const project = projects[key];
  if (!project) return;
  const gallery = project.gallery ?? [{src: project.image, alt: project.imageAlt, label: 'Preview', caption: ''}];
  function selectImage(index) {
    const item = gallery[index];
    dialogImg.src = item.src;
    dialogImg.alt = item.alt;
    dialogCaption.textContent = item.caption;
    dialogGallery.querySelectorAll('button').forEach((b, i) => b.setAttribute('aria-pressed', String(i === index)));
  }
  dialogGallery.replaceChildren();
  gallery.forEach((item, i) => {
    const b = document.createElement('button');
    b.type = 'button';
    b.textContent = item.label;
    b.addEventListener('click', () => selectImage(i));
    dialogGallery.appendChild(b);
  });
  dialogGallery.hidden = gallery.length < 2;
  selectImage(0);
  dialogCat.textContent = project.category;
  dialogTitle.textContent = project.title;
  dialogDesc.textContent = project.description;
  dialogHighlights.replaceChildren(...project.highlights.map(item => {
    const p = document.createElement('p');
    p.textContent = item;
    return p;
  }));
  dialogLink.hidden = !project.link;
  if (project.link) {
    dialogLink.href = project.link;
    dialogLink.textContent = project.linkText;
  } else {
    dialogLink.removeAttribute('href');
  }
  if (!dialog.open) dialog.showModal();
}
document.querySelectorAll('[data-project]').forEach(btn => btn.addEventListener('click', () => openProject(btn.dataset.project)));
document.querySelector('.dialog-close').addEventListener('click', () => dialog.close());
document.querySelector('#dialog-done').addEventListener('click', () => dialog.close());

const resumeDialog = document.querySelector('#resume-dialog');
document.querySelectorAll('[data-resume]').forEach(btn => btn.addEventListener('click', () => resumeDialog.showModal()));
document.querySelector('.resume-dialog .dialog-close').addEventListener('click', () => resumeDialog.close());
document.querySelector('#resume-done').addEventListener('click', () => resumeDialog.close());
[dialog, resumeDialog].forEach(d => d.addEventListener('click', event => {
  if (event.target === d) d.close();
}));

const navItems = [...document.querySelectorAll('.nav-link')];
const targets = navItems.map(link => ({link, section: document.querySelector(link.getAttribute('href'))})).filter(item => item.section);
if ('IntersectionObserver' in window) {
  const activeObserver = new IntersectionObserver(entries => {
    const visible = entries.filter(entry => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio);
    if (!visible.length) return;
    const entry = visible[0];
    targets.forEach(item => item.link.classList.toggle('active', item.section === entry.target));
  }, {rootMargin: '-15% 0px -60% 0px', threshold: [0, .15, .3, .6]});
  targets.forEach(item => activeObserver.observe(item.section));
}

document.querySelector('#year').textContent = new Date().getFullYear();

// Animations are optional and never prevent the content from rendering.
const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if (!reducedMotion && window.gsap) {
  gsap.from('.hero-copy > *', {y: 18, opacity: 0, duration: .68, stagger: .11, ease: 'power2.out', clearProps: 'all'});
  gsap.from('.hero-image', {y: 24, opacity: 0, rotate: -2, duration: 1.05, delay: .12, ease: 'power2.out', clearProps: 'all'});
  if (window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);
    gsap.utils.toArray('.project-card, .journey-card, .info-card, .contact-panel').forEach((item, i) => {
      gsap.from(item, {scrollTrigger: {trigger: item, start: 'top 94%', once: true}, y: 24, opacity: 0, duration: .65, delay: (i % 4) * .045, ease: 'power2.out', clearProps: 'all'});
    });
  }
}
