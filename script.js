/* ===========================================================
   Edione de Moraes Advocacia — Interatividade
   Vanilla JS, sem dependências externas.
   =========================================================== */

(function () {
  "use strict";

  var prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* -------------------- Header: sombra/fundo ao rolar -------------------- */
  var header = document.querySelector("[data-header]");
  function onScrollHeader() {
    if (window.scrollY > 24) {
      header.classList.add("is-scrolled");
    } else {
      header.classList.remove("is-scrolled");
    }
  }
  onScrollHeader();
  window.addEventListener("scroll", onScrollHeader, { passive: true });

  /* -------------------- Menu mobile -------------------- */
  var menuToggle = document.querySelector("[data-menu-toggle]");
  var menuMobile = document.getElementById("menu-mobile");
  var iconOpen = document.querySelector("[data-icon-open]");
  var iconClose = document.querySelector("[data-icon-close]");

  if (menuToggle && menuMobile) {
    menuToggle.addEventListener("click", function () {
      var isOpen = menuMobile.classList.toggle("hidden") === false;
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      iconOpen.classList.toggle("hidden", isOpen);
      iconClose.classList.toggle("hidden", !isOpen);
      header.classList.toggle("is-scrolled", isOpen || window.scrollY > 24);
    });

    menuMobile.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", function () {
        menuMobile.classList.add("hidden");
        menuToggle.setAttribute("aria-expanded", "false");
        iconOpen.classList.remove("hidden");
        iconClose.classList.add("hidden");
      });
    });
  }

  /* -------------------- Scroll reveal (IntersectionObserver) -------------------- */
  var revealEls = document.querySelectorAll("[data-reveal]");

  if (prefersReducedMotion || !("IntersectionObserver" in window)) {
    revealEls.forEach(function (el) { el.classList.add("is-visible"); });
  } else {
    revealEls.forEach(function (el) {
      var delay = el.getAttribute("data-reveal-delay");
      if (delay) el.style.transitionDelay = delay + "ms";
    });

    var revealObserver = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            revealObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    revealEls.forEach(function (el) { revealObserver.observe(el); });
  }

  /* -------------------- FAQ accordion -------------------- */
  var faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach(function (item) {
    var trigger = item.querySelector(".faq-trigger");
    trigger.addEventListener("click", function () {
      var isOpen = item.getAttribute("data-open") === "true";

      faqItems.forEach(function (other) {
        other.setAttribute("data-open", "false");
        other.querySelector(".faq-trigger").setAttribute("aria-expanded", "false");
      });

      if (!isOpen) {
        item.setAttribute("data-open", "true");
        trigger.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* -------------------- Carrossel de depoimentos -------------------- */
  var track = document.querySelector("[data-carousel-track]");
  var prevBtn = document.querySelector("[data-carousel-prev]");
  var nextBtn = document.querySelector("[data-carousel-next]");

  if (track) {
    var slides = track.children.length;
    var index = 0;

    function slidesPerView() {
      return window.innerWidth >= 768 ? 2 : 1;
    }

    function update() {
      var perView = slidesPerView();
      var maxIndex = Math.max(0, slides - perView);
      if (index > maxIndex) index = maxIndex;
      var slideWidth = track.children[0].getBoundingClientRect().width + 24; // gap-6 = 24px
      track.style.transform = "translateX(-" + index * slideWidth + "px)";
    }

    nextBtn.addEventListener("click", function () {
      var perView = slidesPerView();
      var maxIndex = Math.max(0, slides - perView);
      index = index >= maxIndex ? 0 : index + 1;
      update();
    });

    prevBtn.addEventListener("click", function () {
      var perView = slidesPerView();
      var maxIndex = Math.max(0, slides - perView);
      index = index <= 0 ? maxIndex : index - 1;
      update();
    });

    window.addEventListener("resize", update);
    update();
  }

  /* -------------------- Formulário de contato -------------------- */
  var form = document.getElementById("contact-form");

  if (form) {
    var fields = ["nome", "telefone", "area", "mensagem"];

    function setError(field, message) {
      var group = document.getElementById(field).closest(".form-group");
      var errorEl = form.querySelector('[data-error-for="' + field + '"]');
      if (message) {
        group.classList.add("has-error");
        errorEl.textContent = message;
      } else {
        group.classList.remove("has-error");
        errorEl.textContent = "";
      }
    }

    function validate() {
      var valid = true;

      var nome = form.nome.value.trim();
      if (nome.length < 3) {
        setError("nome", "Informe seu nome completo.");
        valid = false;
      } else {
        setError("nome", "");
      }

      var telefone = form.telefone.value.trim();
      var telDigits = telefone.replace(/\D/g, "");
      if (telDigits.length < 10) {
        setError("telefone", "Informe um telefone válido com DDD.");
        valid = false;
      } else {
        setError("telefone", "");
      }

      var area = form.area.value;
      if (!area) {
        setError("area", "Selecione a área do seu caso.");
        valid = false;
      } else {
        setError("area", "");
      }

      var mensagem = form.mensagem.value.trim();
      if (mensagem.length < 10) {
        setError("mensagem", "Conte um pouco mais sobre o seu caso.");
        valid = false;
      } else {
        setError("mensagem", "");
      }

      return valid;
    }

    fields.forEach(function (field) {
      var el = form.querySelector("#" + field);
      el.addEventListener("blur", validate);
    });

    form.addEventListener("submit", function (e) {
      e.preventDefault();
      if (!validate()) return;

      var nome = form.nome.value.trim();
      var telefone = form.telefone.value.trim();
      var area = form.area.value;
      var mensagem = form.mensagem.value.trim();

      var texto =
        "Olá! Meu nome é " + nome +
        ". Telefone: " + telefone +
        ". Área de interesse: " + area +
        ". Sobre meu caso: " + mensagem;

      var url = "https://wa.me/5527988323130?text=" + encodeURIComponent(texto);
      window.open(url, "_blank", "noopener");
    });
  }

  /* -------------------- Ano dinâmico no rodapé -------------------- */
  var yearEl = document.querySelector("[data-year]");
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
