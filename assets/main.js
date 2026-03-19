document.addEventListener("DOMContentLoaded", () => {
  const hero = document.getElementById("heroSection");
  const cta = document.getElementById("stickyCta");

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          cta.classList.remove("hidden");
        } else {
          cta.classList.add("hidden");
        }
      });
    },
    {
      root: null,
      threshold: 0,
    },
  );

  observer.observe(hero);
});

/* ACCORDION */
document.addEventListener("DOMContentLoaded", () => {
  const faqButtons = Array.from(document.querySelectorAll(".faq-button"));
  const faqContents = Array.from(document.querySelectorAll(".faq-content"));
  const VISIBLE_COUNT = 4;

  // accordion click
  faqButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const content = btn.nextElementSibling;
      content.classList.toggle("hidden");

      // okretanje strelice
      const arrow = btn.querySelector("img");
      if (arrow) arrow.classList.toggle("rotate-90");
    });
  });

  // sakrij sve posle 4.
  for (let i = VISIBLE_COUNT; i < faqButtons.length; i++) {
    faqButtons[i].classList.add("hidden");
    faqContents[i].classList.add("hidden");
  }

  // SHOW MORE / SHOW LESS
  const showMoreBtn = document.getElementById("faqShowMore");
  if (showMoreBtn) {
    let expanded = false;

    showMoreBtn.addEventListener("click", () => {
      expanded = !expanded;

      for (let i = VISIBLE_COUNT; i < faqButtons.length; i++) {
        faqButtons[i].classList.toggle("hidden");

        faqContents[i].classList.add("hidden");
      }

      showMoreBtn.textContent = expanded ? "Mostrar menos" : "Mostrar mais";
    });
  }
});

/* WINNERS SLIDER – 2 PROMO KARTICE */
document.addEventListener("DOMContentLoaded", () => {
  const wrapper = document.getElementById("winnersGrid");
  if (!wrapper) return;

  const cards = [
    {
      id: "cassino",
      title: "CASSINO",
      text: "Jogue R$ 300,00 em slots Expanse e receba 100 rodadas grátis em 4 dias.",
      img: "./img/cassino.png",
      alt: "Promo Cassino",
      gradientDesk: "bg-[linear-gradient(180deg,#59029D_30px,#000000_16vw)]",
      gradient: "from-[#59029D] via-[#59029D] to-[#000000]",
      link: "https://meridianbet.bet.br/promo/ca/category/1414/page/37342",
    },
    {
      id: "esportes",
      title: "ESPORTES",
      text: "Aposte a partir de R$5,00 e ganhe 100% de freebet nas ligas selecionadas.",
      img: "./img/futebol.png",
      alt: "Promo Esportes",
      gradientDesk: "bg-[linear-gradient(180deg,#234919_30px,#030A0E_16vw)]",
      gradient: "bg-gradient-to-br from-[#234919] via-[#234919] to-[#030A0E]",
      link: "https://meridianbet.bet.br/promo/ca/category/1413/page/37413",
    },
  ];

  wrapper.innerHTML = "";
  cards.forEach((card) => {
    const slide = document.createElement("div");
    slide.className =
      "swiper-slide flex items-stretch justify-center px-1 md:px-2";
    slide.innerHTML = `
  <a href="${card.link}" target="_blank" class="block w-full">
    <div
      class="relative overflow-hidden w-full
             min-h-[220px] sm:h-[250px]
             rounded-[20px]
             px-5 py-5 md:px-10 md:py-8
             ${card.gradientDesk ? `md:${card.gradientDesk}` : ""}
             bg-gradient-to-br ${card.gradient}
             shadow-[0_18px_40px_rgba(0,0,0,0.6)]
             flex items-start sm:items-center gap-4 md:gap-6"
    >
      <!-- TEXT -->
      <div class="relative z-[2] text-left max-w-[62%] sm:max-w-none flex-1">
        <p class="font-bold uppercase text-[18px] sm:text-[22px] text-[#d9a445]">
          ${card.title}
        </p>
        <p class="mt-3 text-[15px] sm:text-[18px] leading-snug text-[#fff]">
          ${card.text}
        </p>
      </div>

      <!-- DESKTOP IMAGE -->
      <div class="flex-shrink-0 hidden sm:block ${card.id}">
  <img
  src="${card.img}"
  alt="${card.alt}"
  class="
    object-contain
    ${
      card.id === "cassino"
        ? "w-[230px] md:w-[250px] lg:w-[270px]"
        : "w-[260px] md:w-[300px] lg:w-[340px]"
    }
  "
/>
</div>

      <!-- MOBILE IMAGE -->
      <img
        src="${card.img}"
        alt="${card.alt}"
       class="sm:hidden absolute right-[-20px] bottom-[-12px]
       w-[190px] h-[190px] object-contain z-[1]"
        loading="lazy"
        decoding="async"
      />
    </div>
  </a>
`;

    wrapper.appendChild(slide);
  });

  new Swiper(".swiper-container", {
    loop: false,
    spaceBetween: 16,
    grabCursor: true,
    speed: 500,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
      pauseOnMouseEnter: false,
    },
    breakpoints: {
      0: {
        slidesPerView: 1.05,
        allowTouchMove: true,
      },
      640: {
        slidesPerView: 1.2,
        allowTouchMove: true,
      },
      1024: {
        slidesPerView: 2,
        allowTouchMove: false,
      },
    },
  });
});

/*FOOTER SLIDER*/

function autoSlide(sliderContainer) {
  const wrapper = sliderContainer.querySelector(".slider-wrapper");
  const slides = sliderContainer.querySelectorAll(".slider-slide");

  // Ako nema ili je samo jedan slajd, ne pokreći auto klizanje
  if (!wrapper || slides.length < 2) {
    // centriraj statični jedan logo
    sliderContainer.classList.add("is-static");
    return;
  }

  const slideWidth = slides[0].offsetWidth;
  let currentPosition = 0;

  function moveSlides() {
    currentPosition -= 1;
    wrapper.style.transform = `translateX(${currentPosition}px)`;

    if (Math.abs(currentPosition) >= slideWidth) {
      currentPosition = 0;
      wrapper.style.transition = "none";
      wrapper.appendChild(wrapper.firstElementChild);
      wrapper.style.transform = `translateX(${currentPosition}px)`;
      requestAnimationFrame(() => (wrapper.style.transition = ""));
    }
  }

  setInterval(moveSlides, 30);
}

document.querySelectorAll(".slider-container").forEach(autoSlide);

(function () {
  const ua = navigator.userAgent.toLowerCase();

  const isIOS = /iphone|ipad|ipod/.test(ua);
  const isMacSafari =
    /macintosh/.test(ua) &&
    /safari/.test(ua) &&
    !/chrome|chromium|edg/.test(ua);

  if (isIOS || isMacSafari) {
    document.documentElement.classList.add("no-hero-bg");
  }
})();
