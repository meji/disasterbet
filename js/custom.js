//Método que se lanza en document ready
const docReady = fn => {
  if (
    document.readyState === "complete" ||
    document.readyState === "interactive"
  ) {
    setTimeout(fn, 1);
  } else {
    document.addEventListener("DOMContentLoaded", fn);
  }
};

// Método para comprobar si es safari
const isSafari = () => {
  const safaris = navigator.userAgent.toLowerCase().indexOf("safari/") > -1;
  const chrome = navigator.userAgent.toLowerCase().indexOf("chrome/") > -1;
  return safaris && !chrome;
};

//Interacciones de la cabecera, para buscador y para menú mobile
const headerInteraction = () => {
  if (document.getElementById("menu-toggle")) {
    document.getElementById("menu-toggle").addEventListener("click", () => {
      document.getElementById("wrapper").classList.toggle("open");
    });
    // document.querySelector("#header .close").addEventListener("click", () => {
    //   document.getElementById("wrapper").classList.toggle("open");
    // });
  }
};

//Método video interaction para cargar iframe de video al hacer click en la foto.
const videoInteraction = () => {
  document.querySelector(".video-launcher")
    ? document.querySelector(".video-launcher").addEventListener("click", e => {
        const id = e.currentTarget.dataset.id;
        const iframe = document.createElement("iframe");
        iframe.setAttribute("width", "100%");
        iframe.setAttribute("height", "100%");
        iframe.setAttribute(
          "src",
          `https://www.youtube.com/embed/${id}?controls=0&amp;autoplay=true`
        );
        iframe.setAttribute(
          "allow",
          "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        );
        iframe.setAttribute("allowFullScreen", "allowFullScreen");
        e.currentTarget.parentNode.append(iframe);
        e.currentTarget.remove();
      })
    : null;
};

//Método accordion interaction
const accordion = () => {
  if (document.getElementsByClassName("accordion")) {
    const acc = document.getElementsByClassName("accordion");
    let i;
    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function(e) {
        document
          .querySelector(".accordion-container")
          .querySelectorAll(".accordion")
          .forEach(el => {
            if (el !== e.currentTarget) {
              el.classList.remove("active");
              el.nextElementSibling.classList.remove("active");
            }
          });
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("active");
        const topDistance =
          window.pageYOffset + this.getBoundingClientRect().top;
        window.scroll({
          top: topDistance - 90,
          left: 0,
          behavior: "smooth"
        });
      });
    }
  }
};

const accordionSimple = () => {
  if (document.getElementsByClassName("accordion")) {
    const acc = document.getElementsByClassName("accordion");
    let i;
    for (i = 0; i < acc.length; i++) {
      acc[i].addEventListener("click", function() {
        this.classList.toggle("active");
        this.nextElementSibling.classList.toggle("active");
      });
    }
  }
};

//Scroll Up para cabecera y animación profesores scroll up de cabecera y de curso
let lastScrollTop = 0;
// window.addEventListener("scroll", function() {
//   let st = window.scrollY;
//   const wrapper = document.getElementById("wrapper");
//   //Scroll classes up and down
//   if (st > 88) {
//     if (st > lastScrollTop) {
//       wrapper.classList.remove("up");
//       wrapper.classList.add("down");
//     } else {
//       wrapper.classList.add("up");
//       wrapper.classList.remove("down");
//     }
//     lastScrollTop = st;
//   } else {
//     wrapper.classList.remove("up");
//     wrapper.classList.remove("down");
//   }
// });

/*smooth_scroll*/
const smoothScrolls = () => {
  const links = document.querySelectorAll(".smooth");
  for (const link of links) {
    link.addEventListener("click", clickSmooothHandler);
  }
  function clickSmooothHandler(e) {
    e.preventDefault();
    const href = this.dataset.href;
    const target = document.getElementById(this.dataset.target);
    const offsetTop = document.getElementById(href).offsetTop;
    if (!target) {
      scroll({
        top: offsetTop,
        behavior: "smooth"
      });
    } else {
      const realOffsetTop = offsetTop - target.offsetTop;
      // target.style.marginTop = "-" + realOffsetTop + "px";
      target.scroll({
        top: realOffsetTop,
        behavior: "smooth"
      });
    }
  }
};

/*Tabs*/
const tabsFunctionality = () => {
  const myTabs = document.querySelectorAll("ul.nav-tabs > li");
  function myTabClicks(tabClickEvent) {
    console.log("click");
    for (var i = 0; i < myTabs.length; i++) {
      myTabs[i].classList.remove("active");
    }
    const clickedTab = tabClickEvent.currentTarget;
    clickedTab.classList.add("active");
    tabClickEvent.preventDefault();
    const myContentPanes = document.querySelectorAll(".tab-pane");
    for (i = 0; i < myContentPanes.length; i++) {
      myContentPanes[i].classList.remove("active");
    }
    const anchorReference = tabClickEvent.target;
    const activePaneId = anchorReference.dataset.href;
    const activePane = document.getElementById(activePaneId);
    activePane.classList.add("active");
  }
  for (i = 0; i < myTabs.length; i++) {
    myTabs[i].addEventListener("click", myTabClicks);
  }
};

//Iniciamos métodos en document ready.
docReady(
  headerInteraction(),
  // videoInteraction(),
  accordion(),
  smoothScrolls()
  // tabsFunctionality(),
  // fold(),
);

//Swiper
if (typeof Swiper === "function") {
  window.addEventListener("load", () => {
    const heroSlider = new Swiper(".swiper-container.hero-slider", {
      slidesPerView: 1,
      loop: true,
      speed: 1000,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      pagination: {
        el: ".hero-slider-pagination",
        type: "progressbar"
      },
      effect: "fade",
      fadeEffect: {
        crossFade: true
      }
    });
    const featuredSlider = new Swiper(".swiper-container.featured-slider", {
      slidesPerView: 1.45,
      loop: true,
      speed: 1000,
      spaceBetween: 16,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false
      },
      navigation: {
        nextEl: ".swiper-button-next-featured",
        prevEl: ".swiper-button-prev-featured"
      },
      breakpoints: {
        600: {
          slidesPerView: 1.2,
          spaceBetween: 16
        }
      }
    });
  });
}
