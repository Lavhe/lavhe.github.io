/* =========================================================
   Sirwali Joseph — Portfolio interactions (vanilla JS)
   ========================================================= */
(function () {
  "use strict";

  /* ---------- Typewriter ---------- */
  function typeWriter(el) {
    if (!el) return;
    var words = (el.dataset.words || "").split("|").filter(Boolean);
    if (!words.length) return;
    var w = 0,
      c = 0,
      deleting = false;

    function tick() {
      var word = words[w];
      el.textContent = word.substring(0, c);
      if (!deleting && c < word.length) {
        c++;
        setTimeout(tick, 70);
      } else if (deleting && c > 0) {
        c--;
        setTimeout(tick, 35);
      } else if (!deleting && c === word.length) {
        deleting = true;
        setTimeout(tick, 1600);
      } else {
        deleting = false;
        w = (w + 1) % words.length;
        setTimeout(tick, 320);
      }
    }
    tick();
  }
  typeWriter(document.getElementById("typed"));

  /* ---------- Navbar scroll state + progress ---------- */
  var nav = document.querySelector(".nav");
  var progress = document.querySelector(".progress");
  function onScroll() {
    var y = window.scrollY || document.documentElement.scrollTop;
    if (nav) nav.classList.toggle("scrolled", y > 24);
    if (progress) {
      var h =
        document.documentElement.scrollHeight - window.innerHeight;
      progress.style.width = (h > 0 ? (y / h) * 100 : 0) + "%";
    }
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

  /* ---------- Reveal on scroll ---------- */
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
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revs.forEach(function (r) {
      io.observe(r);
    });
  } else {
    revs.forEach(function (r) {
      r.classList.add("in");
    });
  }

  /* ---------- Animated stat counters ---------- */
  function animateCount(el) {
    var target = parseFloat(el.dataset.count);
    var suffix = el.dataset.suffix || "";
    var dur = 1400,
      start = null;
    function step(ts) {
      if (!start) start = ts;
      var p = Math.min((ts - start) / dur, 1);
      var eased = 1 - Math.pow(1 - p, 3);
      var val = target * eased;
      el.textContent =
        (target % 1 === 0 ? Math.round(val) : val.toFixed(0)) + suffix;
      if (p < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  var counted = false;
  var statsEl = document.querySelector(".stats");
  if (statsEl && "IntersectionObserver" in window) {
    var sio = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (en.isIntersecting && !counted) {
          counted = true;
          document.querySelectorAll(".num[data-count]").forEach(animateCount);
        }
      });
    });
    sio.observe(statsEl);
  }

  /* ---------- Year ---------- */
  var yr = document.getElementById("year");
  if (yr) yr.textContent = new Date().getFullYear();
})();
