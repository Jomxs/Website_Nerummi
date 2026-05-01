/* ================================================================
   NERUMMI — Single Page Site
   script.js
   ================================================================ */

(function () {
  'use strict';

  /* ================================================================
     DATA
     ================================================================ */
  var illArtworks = [
    { src: 'assets/art_1.png',  label: 'ART I'    },
    { src: 'assets/art_2.png',  label: 'ART II'   },
    { src: 'assets/art_3.png',  label: 'ART III'  },
    { src: 'assets/art_4.png',  label: 'ART IV'   },
    { src: 'assets/art_5.png',  label: 'ART V'    },
    { src: 'assets/art_6.png',  label: 'ART VI'   },
    { src: 'assets/art_7.png',  label: 'ART VII'  },
    { src: 'assets/art_8.png',  label: 'ART VIII' },
    { src: 'assets/art_9.png',  label: 'ART IX'   },
    { src: 'assets/art_10.png', label: 'ART X'    },
  ];

  var galleryArtworks = [
    { src: 'assets/art_1.webp',  label: 'ART I',    category: 'illustrations' },
    { src: 'assets/art_2.webp',  label: 'ART II',   category: 'characters'    },
    { src: 'assets/art_3.webp',  label: 'ART III',  category: 'illustrations' },
    { src: 'assets/art_4.webp',  label: 'ART IV',   category: 'concepts'      },
    { src: 'assets/art_5.webp',  label: 'ART V',    category: 'characters'    },
    { src: 'assets/art_6.webp',  label: 'ART VI',   category: 'illustrations' },
    { src: 'assets/art_7.webp',  label: 'ART VII',  category: 'concepts'      },
    { src: 'assets/art_8.webp',  label: 'ART VIII', category: 'characters'    },
    { src: 'assets/art_9.webp',  label: 'ART IX',   category: 'illustrations' },
    { src: 'assets/art_10.webp', label: 'ART X',    category: 'concepts'      },
  ];

  /* ================================================================
     LIGHTBOX STATE (shared)
     ================================================================ */
  var lbItems   = [];
  var lbIndex   = 0;
  var lbOpen    = false;

  var lb, lbBackdrop, lbClose, lbPrev, lbNext, lbImg, lbLabel, lbCounter;

  /* ================================================================
     COPY PROTECTION
     ================================================================ */
  document.addEventListener('contextmenu', function (e) { e.preventDefault(); });
  document.addEventListener('keydown', function (e) {
    if ((e.ctrlKey || e.metaKey) && ['c','u','s','a','p'].indexOf(e.key.toLowerCase()) !== -1) {
      e.preventDefault();
    }
  });
  document.addEventListener('selectstart', function (e) { e.preventDefault(); });
  document.addEventListener('dragstart',   function (e) { e.preventDefault(); });

  /* ================================================================
     STARS
     ================================================================ */
  function initStars() {
    var container = document.getElementById('stars');
    if (!container) return;
    for (var i = 0; i < 130; i++) {
      var s = document.createElement('div');
      s.className = 'star';
      var sz = Math.random() * 2 + 0.4;
      s.style.cssText = 'width:' + sz + 'px;height:' + sz + 'px;left:' + (Math.random() * 100) + '%;top:' + (Math.random() * 100) + '%;--dur:' + (2 + Math.random() * 4) + 's;animation-delay:' + (Math.random() * 5) + 's;';
      container.appendChild(s);
    }
  }

  /* ================================================================
     SCROLL PROGRESS
     ================================================================ */
  function initScrollProgress() {
    var bar = document.getElementById('scrollProgress');
    if (!bar) return;
    window.addEventListener('scroll', function () {
      var scrolled = window.scrollY;
      var max = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = (max > 0 ? (scrolled / max) * 100 : 0) + '%';
    }, { passive: true });
  }

  /* ================================================================
     NAV — smooth anchor scroll + dropdown
     ================================================================ */
  function initNav() {
    var btn      = document.getElementById('menuToggleBtn');
    var dropdown = document.getElementById('navDropdown');
    var isOpen   = false;

    function openMenu() {
      isOpen = true;
      btn.classList.add('active');
      btn.setAttribute('aria-expanded', 'true');
      dropdown.classList.add('open');
    }
    function closeMenu() {
      isOpen = false;
      btn.classList.remove('active');
      btn.setAttribute('aria-expanded', 'false');
      dropdown.classList.remove('open');
    }

    if (btn) {
      btn.addEventListener('mousedown', function (e) {
        e.preventDefault();
        if (isOpen) { closeMenu(); } else { openMenu(); }
      });
    }

    document.addEventListener('mousedown', function (e) {
      if (isOpen && btn && dropdown &&
          !btn.contains(e.target) && !dropdown.contains(e.target)) {
        closeMenu();
      }
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') { closeMenu(); }
    });

    /* Smooth scroll for all data-scroll links */
    document.querySelectorAll('[data-scroll]').forEach(function (link) {
      link.addEventListener('click', function (e) {
        e.preventDefault();
        var targetId = link.getAttribute('data-scroll');
        var target   = document.getElementById(targetId);
        if (target) {
          var offset = 64; /* nav height */
          var top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top: top, behavior: 'smooth' });
        }
        closeMenu();
      });
    });
  }

  /* ================================================================
     SPARKLE ON CLICK
     ================================================================ */
  function initSparkle() {
    var palette = ['#f0a8c0','#fad4e4','#a8d4a0','#d0eecc','#f5e8a8','#fdf6d8'];
    document.addEventListener('click', function (e) {
      for (var i = 0; i < 7; i++) {
        var sp = document.createElement('div');
        sp.className = 'sparkle';
        var sz    = 3 + Math.random() * 4.5;
        var angle = Math.random() * 360;
        var dist  = 28 + Math.random() * 55;
        var dx    = Math.cos(angle * Math.PI / 180) * dist;
        var dy    = Math.sin(angle * Math.PI / 180) * dist;
        sp.style.cssText =
          'left:' + e.clientX + 'px;top:' + e.clientY + 'px;' +
          'width:' + sz + 'px;height:' + sz + 'px;' +
          'background:' + palette[Math.floor(Math.random() * palette.length)] + ';' +
          '--dx:' + dx + 'px;--dy:' + dy + 'px;' +
          'animation:sparkleAnim 0.65s ease-out forwards;';
        document.body.appendChild(sp);
        setTimeout(function () { if (sp.parentNode) sp.parentNode.removeChild(sp); }, 700);
      }
    });
  }

  /* ================================================================
     REVEAL ON SCROLL (IntersectionObserver)
     ================================================================ */
  function initReveal() {
    if (!window.IntersectionObserver) {
      document.querySelectorAll('.reveal').forEach(function (el) {
        el.classList.add('visible');
      });
      return;
    }
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.06 });
    document.querySelectorAll('.reveal').forEach(function (el) { obs.observe(el); });
  }

  /* ================================================================
     ILLUSTRATION — build masonry + wire featured cards
     ================================================================ */
  function buildIllMasonry() {
    var masonry = document.getElementById('illMasonry');
    if (!masonry) return;

    /* artworks 4–10 (index 3 onwards) go into masonry */
    for (var i = 3; i < illArtworks.length; i++) {
      masonry.appendChild(makeIllCard(illArtworks[i], i));
    }

    /* Wire featured cards (already in HTML) */
    document.querySelectorAll('.ill-card--link[data-idx]').forEach(function (card) {
      var idx = parseInt(card.getAttribute('data-idx'), 10);
      /* skeleton/load for featured */
      var img = card.querySelector('.ill-card-img');
      var sk  = card.querySelector('.ill-card-skeleton');
      if (img) {
        img.addEventListener('load', function () {
          img.classList.add('loaded');
          if (sk) { sk.style.opacity = '0'; setTimeout(function () { if (sk.parentNode) sk.parentNode.removeChild(sk); }, 400); }
        });
        img.addEventListener('error', function () { card.style.display = 'none'; });
      }
      card.addEventListener('click', function () { openLightbox(illArtworks, idx); });
      card.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(illArtworks, idx); }
      });
    });

    /* Observe ill cards for entrance */
    observeCards(document.querySelectorAll('.ill-masonry .ill-card'));
  }

  function makeIllCard(art, idx) {
    var card = document.createElement('article');
    card.className = 'ill-card';
    card.setAttribute('tabindex', '0');
    card.setAttribute('role', 'button');
    card.setAttribute('aria-label', 'View ' + art.label);

    var wrap = document.createElement('div');
    wrap.className = 'ill-card-img-wrap';

    var sk = document.createElement('div');
    sk.className = 'ill-card-skeleton';

    var img = document.createElement('img');
    img.className = 'ill-card-img';
    img.src = art.src;
    img.alt = art.label;
    img.decoding = 'async';
    img.loading = 'lazy';
    img.width = 400;
    img.addEventListener('load', function () {
      img.classList.add('loaded');
      sk.style.opacity = '0';
      setTimeout(function () { if (sk.parentNode) sk.parentNode.removeChild(sk); }, 300);
    });
    img.addEventListener('error', function () { card.style.display = 'none'; });

    var shine = document.createElement('div');
    shine.className = 'ill-card-shine';

    wrap.appendChild(sk);
    wrap.appendChild(img);
    wrap.appendChild(shine);

    var overlay = document.createElement('div');
    overlay.className = 'ill-card-overlay';
    var btn = document.createElement('span');
    btn.className = 'ill-overlay-btn';
    btn.textContent = 'VIEW';
    overlay.appendChild(btn);

    var footer = document.createElement('div');
    footer.className = 'ill-card-footer';
    var lbl = document.createElement('span');
    lbl.className = 'ill-card-label';
    lbl.textContent = art.label;
    var num = document.createElement('span');
    num.className = 'ill-card-num';
    num.textContent = (idx + 1 < 10 ? '0' : '') + (idx + 1);
    footer.appendChild(lbl);
    footer.appendChild(num);

    card.appendChild(wrap);
    card.appendChild(overlay);
    card.appendChild(footer);

    card.addEventListener('click', function () { openLightbox(illArtworks, idx); });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(illArtworks, idx); }
    });

    return card;
  }

  /* ================================================================
     GALLERY — build category grids
     ================================================================ */
  function buildGallery() {
    var grids = {
      illustrations: document.getElementById('gridIllustrations'),
      characters:    document.getElementById('gridCharacters'),
      concepts:      document.getElementById('gridConcepts'),
    };
    var counts = { illustrations: 0, characters: 0, concepts: 0 };

    galleryArtworks.forEach(function (art, globalIdx) {
      var grid = grids[art.category];
      if (!grid) return;
      counts[art.category]++;
      grid.appendChild(makeGalleryCard(art, globalIdx));
    });

    Object.keys(counts).forEach(function (cat) {
      var el = document.getElementById('count' + cap(cat));
      if (el) el.textContent = pad(counts[cat]);
      if (counts[cat] === 0) {
        var sec = document.getElementById('sec' + cap(cat));
        if (sec) sec.style.display = 'none';
      }
    });

    var heroCount = document.getElementById('heroCount');
    if (heroCount) heroCount.textContent = pad(galleryArtworks.length);

    observeCards(document.querySelectorAll('.art-card'));

    initFilterBar();
  }

  function makeGalleryCard(art, globalIdx) {
    var card = document.createElement('article');
    card.className = 'art-card';
    card.setAttribute('data-idx', globalIdx);
    card.setAttribute('role', 'button');
    card.setAttribute('tabindex', '0');
    card.setAttribute('aria-label', 'View ' + art.label);

    var wrap = document.createElement('div');
    wrap.className = 'art-card-img-wrap';

    var sk = document.createElement('div');
    sk.className = 'art-card-skeleton';

    var img = document.createElement('img');
    img.className = 'art-card-img';
    img.alt = art.label;
    img.width = 400;
    img.decoding = 'async';
    img.loading = globalIdx < 6 ? 'eager' : 'lazy';
    img.src = art.src;

    img.addEventListener('load', function () {
      img.classList.add('loaded');
      sk.style.opacity = '0';
      setTimeout(function () { if (sk.parentNode) sk.parentNode.removeChild(sk); }, 400);
    });
    img.addEventListener('error', function () { card.classList.add('img-error'); });

    var overlay = document.createElement('div');
    overlay.className = 'art-card-overlay';
    var badge = document.createElement('span');
    badge.className = 'overlay-badge';
    badge.textContent = 'VIEW';
    overlay.appendChild(badge);

    wrap.appendChild(sk);
    wrap.appendChild(img);
    wrap.appendChild(overlay);

    var footer = document.createElement('div');
    footer.className = 'art-card-footer';
    var lbl = document.createElement('span');
    lbl.className = 'art-card-label';
    lbl.textContent = art.label;
    var idx = document.createElement('span');
    idx.className = 'art-card-idx';
    idx.textContent = pad(globalIdx + 1);
    footer.appendChild(lbl);
    footer.appendChild(idx);

    card.appendChild(wrap);
    card.appendChild(footer);

    card.addEventListener('click', function () { openLightbox(galleryArtworks, globalIdx); });
    card.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); openLightbox(galleryArtworks, globalIdx); }
    });

    return card;
  }

  /* ================================================================
     FILTER BAR (gallery)
     ================================================================ */
  var galleryFilterList = galleryArtworks.slice();

  function initFilterBar() {
    var bar = document.getElementById('filterBar');
    if (!bar) return;

    bar.addEventListener('click', function (e) {
      var btn = e.target.closest('.filter-btn');
      if (!btn) return;

      var filter = btn.getAttribute('data-filter');
      bar.querySelectorAll('.filter-btn').forEach(function (b) {
        b.classList.toggle('active', b === btn);
      });

      document.querySelectorAll('.gallery-cat-section').forEach(function (sec) {
        if (filter === 'all') {
          sec.classList.remove('hidden');
        } else {
          sec.classList.toggle('hidden', sec.getAttribute('data-category') !== filter);
        }
      });

      galleryFilterList = filter === 'all'
        ? galleryArtworks.slice()
        : galleryArtworks.filter(function (a) { return a.category === filter; });
    });
  }

  /* ================================================================
     INTERSECTION OBSERVER — card entrance animation
     ================================================================ */
  function observeCards(cards) {
    if (!window.IntersectionObserver) {
      cards.forEach(function (c) {
        c.classList.add('card-visible', 'card-in');
      });
      return;
    }
    var stagger = {};
    var obs = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        var card = e.target;
        var key = (card.parentNode && card.parentNode.id) || 'default';
        if (!stagger[key]) stagger[key] = 0;
        var delay = stagger[key] * 30;
        stagger[key]++;
        setTimeout(function () { card.classList.add('card-visible', 'card-in'); }, delay);
        obs.unobserve(card);
      });
    }, { threshold: 0.05, rootMargin: '0px 0px 80px 0px' });
    cards.forEach(function (card) { obs.observe(card); });
  }

  /* ================================================================
     LIGHTBOX — open / navigate / close
     ================================================================ */
  function openLightbox(list, idx) {
    lbItems = list;
    lbIndex = idx;
    setLbImage(lbItems[lbIndex]);
    lb.classList.add('open');
    lbOpen = true;
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', onLbKey);
  }

  function closeLightbox() {
    lb.classList.remove('open');
    lbOpen = false;
    document.body.style.overflow = '';
    document.removeEventListener('keydown', onLbKey);
  }

  function navigateLb(dir) {
    lbIndex = (lbIndex + dir + lbItems.length) % lbItems.length;
    setLbImage(lbItems[lbIndex]);
  }

  function setLbImage(art) {
    lbImg.classList.remove('lb-loaded');
    lbImg.src = '';
    lbLabel.textContent   = art.label;
    lbCounter.textContent = (lbIndex + 1) + ' / ' + lbItems.length;
    requestAnimationFrame(function () { lbImg.src = art.src; });
    lbImg.onload  = function () { lbImg.classList.add('lb-loaded'); };
    lbImg.onerror = function () { lbImg.classList.add('lb-loaded'); };
  }

  function onLbKey(e) {
    if (!lbOpen) return;
    if (e.key === 'ArrowRight') { e.preventDefault(); navigateLb(+1); }
    if (e.key === 'ArrowLeft')  { e.preventDefault(); navigateLb(-1); }
    if (e.key === 'Escape')     { e.preventDefault(); closeLightbox(); }
  }

  /* ================================================================
     HELPERS
     ================================================================ */
  function pad(n) { return n < 10 ? '0' + n : '' + n; }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }

  /* ================================================================
     INIT
     ================================================================ */
  function init() {
    /* Lightbox DOM refs */
    lb         = document.getElementById('lightbox');
    lbBackdrop = document.getElementById('lightboxBackdrop');
    lbClose    = document.getElementById('lightboxClose');
    lbPrev     = document.getElementById('lightboxPrev');
    lbNext     = document.getElementById('lightboxNext');
    lbImg      = document.getElementById('lightboxImg');
    lbLabel    = document.getElementById('lightboxLabel');
    lbCounter  = document.getElementById('lightboxCounter');

    if (lb) {
      lbBackdrop.addEventListener('click', closeLightbox);
      lbClose.addEventListener('click', closeLightbox);
      lbPrev.addEventListener('click', function (e) { e.stopPropagation(); navigateLb(-1); });
      lbNext.addEventListener('click', function (e) { e.stopPropagation(); navigateLb(+1); });

      /* Touch swipe */
      var startX = null;
      lb.addEventListener('touchstart', function (e) { startX = e.changedTouches[0].clientX; }, { passive: true });
      lb.addEventListener('touchend', function (e) {
        if (startX === null) return;
        var dx = e.changedTouches[0].clientX - startX;
        startX = null;
        if (Math.abs(dx) < 40) return;
        navigateLb(dx < 0 ? +1 : -1);
      }, { passive: true });
    }

    initStars();
    initScrollProgress();
    initNav();
    initSparkle();
    initReveal();
    buildIllMasonry();
    buildGallery();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();