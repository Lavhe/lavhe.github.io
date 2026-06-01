/* =========================================================
   Sirwali Joseph — Portfolio interactions (vanilla JS)
   Minimal: nav state, mobile menu, scroll-spy, subtle reveal.
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Header border on scroll ---------- */
  var nav = document.querySelector(".nav");
  function onScroll() {
    if (nav) nav.classList.toggle("scrolled", (window.scrollY || 0) > 12);
  }
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- Mobile menu ---------- */
  var toggle = document.querySelector(".nav-toggle");
  var links = document.querySelector(".nav-links");
  if (toggle && links) {
    toggle.addEventListener("click", function () {
      links.classList.toggle("open");
    });
    links.addEventListener("click", function (e) {
      if (e.target.tagName === "A") links.classList.remove("open");
    });
  }

  /* ---------- Scroll-spy nav ---------- */
  var navAnchors = Array.prototype.slice.call(
    document.querySelectorAll(".nav-links a[href^='#']")
  );
  var sections = navAnchors
    .map(function (a) {
      return document.querySelector(a.getAttribute("href"));
    })
    .filter(Boolean);
  if (sections.length && "IntersectionObserver" in window) {
    var spy = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            navAnchors.forEach(function (a) {
              a.classList.toggle(
                "active",
                a.getAttribute("href") === "#" + en.target.id
              );
            });
          }
        });
      },
      { rootMargin: "-45% 0px -50% 0px" }
    );
    sections.forEach(function (s) {
      spy.observe(s);
    });
  }

  /* ---------- Subtle reveal on scroll ---------- */
  var revs = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    var io = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (en) {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: "0px 0px -30px 0px" }
    );
    revs.forEach(function (r) {
      io.observe(r);
    });
  } else {
    revs.forEach(function (r) {
      r.classList.add("in");
    });
  }

  /* ---------- Year ---------- */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
