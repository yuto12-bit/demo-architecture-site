/* ============================================================
   REMEDORA BUILD — assets/js/main.js
   最小限のインタラクション: メニュー開閉・ヘッダースクロール
   ============================================================ */

(function () {
  'use strict';

  /* ---- Element refs ---------------------------------------- */
  var menuBtn  = document.querySelector('.menu-circle');
  var overlay  = document.querySelector('.nav-overlay');
  var closeBtn = document.querySelector('.nav-overlay__close');
  var header   = document.querySelector('.site-header');

  /* ---- Menu open / close ------------------------------------ */
  function openMenu() {
    if (!overlay) return;
    overlay.classList.add('is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!overlay) return;
    overlay.classList.remove('is-open');
    document.body.style.overflow = '';
  }

  if (menuBtn)  menuBtn.addEventListener('click', openMenu);
  if (closeBtn) closeBtn.addEventListener('click', closeMenu);

  /* Close on Escape key */
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  /* Close when clicking a nav link (same-page SPA-feel) */
  if (overlay) {
    overlay.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  /* ---- Header transparency on scroll (TOP page only) ------- */
  if (header && header.classList.contains('site-header--transparent')) {
    function updateHeader() {
      if (window.scrollY > 40) {
        header.classList.add('site-header--scrolled');
      } else {
        header.classList.remove('site-header--scrolled');
      }
    }
    window.addEventListener('scroll', updateHeader, { passive: true });
    updateHeader(); /* run once on load */
  }

  /* ---- Mark current page in nav overlay -------------------- */
  var currentPath = window.location.pathname.split('/').pop() || 'index.html';
  if (overlay) {
    overlay.querySelectorAll('a[data-page]').forEach(function (a) {
      if (a.getAttribute('data-page') === currentPath) {
        a.classList.add('is-current');
      }
    });
  }
})();
