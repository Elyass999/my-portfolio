
// Initialize Lenis for smooth scrolling
const lenis = new Lenis();

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time) => {
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

//Menu btn :
const MenuNav = document.querySelector('.menu-btn');
gsap.set(MenuNav, {
  x: 0,
  opacity: 0
});

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll > 200) {
    gsap.to(MenuNav, {
      y: 0,
      opacity: 1,
      duration: 0.2,
      ease: "power2.out"
    });
  } else {
    gsap.to(MenuNav, {
      x: 0,
      opacity: 0,
      duration: 0.2,
      ease: "power2.in"
    });
  }
});

// Preloader :
const tll = gsap.timeline({ defaults: { ease: "power4.out" } });

// 1. Text entrance (Preloader)
tll.to("#preloader .hello span", {
  y: 0,
  opacity: 1,
  duration: 0.5,
  stagger: 0.08
})

  // 2. The Panel "Sweep" 
  .to(".overlay.black", {
    x: "-100%",
    duration: 0.6,
    ease: "expo.inOut"
  }, "+=0.2") // Brief pause to let user read "Hello"

  .to(".overlay.blue", {
    y: "-100%",
    duration: 0.6,
    ease: "expo.inOut"
  }, "-=0.4") // Starts while black is still moving

  .to("#preloader", {
    x: "-100%",
    duration: 0.7,
    ease: "expo.inOut"
  }, "-=0.4") // Moves the container away early to reveal content




// Appearing element 
window.addEventListener('DOMContentLoaded', () => {
  const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
  // 1. Reveal the Nav items one by one
  tl.fromTo(".main-nav-list li",
    { y: -50, opacity: 0 },
    { y: 0, opacity: 1, duration: 2, stagger: 0.1 }
  )

  // 2. Animate the main heading text
  const tll = gsap.timeline({ defaults: { ease: "power4.out" } });

  // --- Your existing Preloader Sequence ---
  tll.to("#preloader .hello span", {
    y: 0, opacity: 1, duration: 0.4, stagger: 0.1
  })
    .to(".overlay.black", { x: "-100%", duration: 0.3 })
    .to(".overlay.blue", { y: "-100%", duration: 0.3 }, "+=0.5")
    .to("#preloader", { x: "-100%", duration: 0.3, ease: "power2.inOut" })

    // --- NEW Content Reveal Logic ---
    .fromTo(".main-nav-list li",
      {
        y: -40,              // Start slightly higher for more "travel"
        opacity: 0,
        rotationX: -90,      // Start completely flat (invisible in 3D space)
        scale: 0.8,          // Small to large effect
        filter: "blur(10px)" // Soft entry
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        scale: 1,
        filter: "blur(0px)",
        duration: 1.2,
        stagger: {
          each: 0.1,
          from: "end"        // Reverses stagger: right-most link animates first (modern trend)
        },
        ease: "expo.out"     // Ultra-smooth deceleration
      },
      "-=0.4"
    )

    .fromTo("h1",
      {
        y: 70,
        opacity: 0,
        rotationX: -30, // Tilts the text away
        skewX: 10,      // Cinematic slant
        filter: "blur(15px)" // Starts blurry
      },
      {
        y: 0,
        opacity: 1,
        rotationX: 0,
        skewX: 0,
        filter: "blur(0px)",
        duration: 1.6,
        ease: "expo.out"
      },
      "-=0.6" // Heavy overlap for "smooth" feel
    )

    .fromTo("#text-container",
      {
        scale: 0.7,
        color: "#3498db" // Optional: Start with a highlight color
      },
      {
        scale: 1,
        color: "inherit", // Fade back to original color
        duration: 1,
        ease: "back.out(2)"
      },
      "-=1" // Happens while h1 is still settling
    )

    // 3. Special "Pop" for your name
    .fromTo("#text-container",
      { scale: 0.8, opacity: 0 },
      { scale: 1, opacity: 1, duration: 0.8 },
      "-=0.8"
    )

    // 4. Reveal the Magnetic Button
    .fromTo(".magnetic-btn",
      {
        y: 40,
        opacity: 0,
        scale: 0.8,
        filter: "blur(10px)",
        rotationX: -45
      },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        filter: "blur(0px)",
        rotationX: 0,
        duration: 1.2,
        ease: "expo.out"
      },
      "-=0.6" // Starts while the name is popping
    );
});








// Main navbar elemnts script :
const FLIP_DURATION = 0.4;
const FLIP_STAGGER = 0.04;

const mainNavLinks = document.querySelectorAll(".main-nav-link");

mainNavLinks.forEach(navLink => {
  const linkText = navLink.getAttribute('data-text') || navLink.textContent.trim();
  navLink.innerHTML = '';

  const topText = document.createElement("div");
  const bottomText = document.createElement("div");

  topText.className = "top-text";
  bottomText.className = "bottom-text";

  linkText.split("").forEach(character => {
    const topChar = document.createElement("span");
    topChar.textContent = character === ' ' ? '\u00A0' : character;

    const bottomChar = document.createElement("span");
    bottomChar.textContent = character === ' ' ? '\u00A0' : character;

    topText.appendChild(topChar);
    bottomText.appendChild(bottomChar);
  });

  navLink.appendChild(topText);
  navLink.appendChild(bottomText);

  const topChars = topText.querySelectorAll("span");
  const bottomChars = bottomText.querySelectorAll("span");

  gsap.set(bottomChars, { yPercent: 100 });

  navLink.addEventListener("mouseenter", () => {
    gsap.to(topChars, {
      yPercent: -100,
      duration: FLIP_DURATION,
      ease: "power2.inOut",
      stagger: FLIP_STAGGER
    });

    gsap.to(bottomChars, {
      yPercent: 0,
      duration: FLIP_DURATION,
      ease: "power2.inOut",
      stagger: FLIP_STAGGER
    });
  });

  navLink.addEventListener("mouseleave", () => {
    gsap.to(topChars, {
      yPercent: 0,
      duration: FLIP_DURATION,
      ease: "power2.inOut",
      stagger: FLIP_STAGGER
    });

    gsap.to(bottomChars, {
      yPercent: 100,
      duration: FLIP_DURATION,
      ease: "power2.inOut",
      stagger: FLIP_STAGGER
    });
  });
});



//Overlay nav section elements 
const menuBtn = document.getElementById("menuBtn");
const nav = document.getElementById("nav");
const navItems = document.querySelectorAll(".nav-content ul li");

function getBtnCenter() {
  const rect = menuBtn.getBoundingClientRect();
  return {
    x: rect.left + rect.width / 2,
    y: rect.top + rect.height / 2
  };
}

let isOpen = false;
menuBtn.addEventListener("click", () => {
  const { x, y } = getBtnCenter();

  if (!isOpen) {
    menuBtn.classList.add("active");
    nav.classList.add("open");

    gsap.to(nav, {
      clipPath: `circle(150% at ${x}px ${y}px)`,
      duration: 0.8,
      ease: "power3.inOut"
    });

    gsap.to(navItems, {
      opacity: 1,
      x: 0,
      stagger: 0.1,
      duration: 0.5,
      ease: "power3.out",
      delay: 0.2
    });

    isOpen = true;
  } else {
    menuBtn.classList.remove("active");

    gsap.to(navItems, {
      opacity: 0,
      x: -50,
      stagger: 0.05,
      duration: 0.3,
      ease: "power3.in"
    });

    gsap.to(nav, {
      clipPath: `circle(0% at ${x}px ${y}px)`,
      duration: 0.8,
      ease: "power3.inOut",
      onComplete: () => nav.classList.remove("open")
    });

    isOpen = false;
  }
});

// Fliping Links Hovering Script :
const DURATION = 0.25;
const STAGGER = 0.025;

document.querySelectorAll(".flip-link").forEach(link => {
  const text = link.dataset.text;

  const front = document.createElement("div");
  const back = document.createElement("div");

  front.classList.add("front");
  back.classList.add("back");

  // create spans
  text.split("").forEach(letter => {
    const f = document.createElement("span");
    f.textContent = letter;

    const b = document.createElement("span");
    b.textContent = letter;

    front.appendChild(f);
    back.appendChild(b);
  });

  link.appendChild(front);
  link.appendChild(back);

  const spansFront = front.querySelectorAll("span");
  const spansBack = back.querySelectorAll("span");

  // position back letters below
  gsap.set(spansBack, { yPercent: 100 });

  link.addEventListener("mouseenter", () => {
    gsap.to(spansFront, {
      yPercent: -100,
      duration: DURATION,
      ease: "power2.inOut",
      stagger: STAGGER
    });
    gsap.to(spansBack, {
      yPercent: 0,
      duration: DURATION,
      ease: "power2.inOut",
      stagger: STAGGER
    });
  });

  link.addEventListener("mouseleave", () => {
    gsap.to(spansFront, {
      yPercent: 0,
      duration: DURATION,
      ease: "power2.inOut",
      stagger: STAGGER
    });
    gsap.to(spansBack, {
      yPercent: 100,
      duration: DURATION,
      ease: "power2.inOut",
      stagger: STAGGER
    });
  });
});
document.querySelectorAll(".hover-link").forEach(link => {

  // split text into spans
  const title = link.querySelector("h2");
  title.innerHTML = title.textContent
    .split("")
    .map(c => `<span class="char">${c}</span>`)
    .join("");

  // image
  const img = document.createElement("img");
  img.src = link.dataset.img;
  img.className = "hover-img";
  link.appendChild(img);

  const chars = link.querySelectorAll(".char");
  const arrow = link.querySelector(".arrow");

  link.addEventListener("mouseenter", () => {
    gsap.to(img, { scale: 1, rotate: 12, duration: 0.5, ease: "power3.out" });
    gsap.to(arrow, { x: 0, opacity: 1, duration: 0.4, ease: "power3.out" });

    gsap.to(chars, {
      x: 16,
      stagger: 0.03,
      duration: 0.4,
      ease: "power3.out"
    });
  });

  link.addEventListener("mouseleave", () => {
    gsap.to(img, { scale: 0, rotate: -12, duration: 0.4 });
    gsap.to(arrow, { x: "25%", opacity: 0, duration: 0.3 });

    gsap.to(chars, {
      x: 0,
      stagger: 0.02,
      duration: 0.3
    });
  });

  link.addEventListener("mousemove", e => {
    const rect = link.getBoundingClientRect();
    gsap.to(img, {
      left: e.clientX - rect.left,
      top: e.clientY - rect.top,
      duration: 0.3,
      ease: "power3.out"
    });
  });
});


// Hero Sticky reveal animation
gsap.registerPlugin(ScrollTrigger);

const heroTimeline = gsap.timeline({
  scrollTrigger: {
    trigger: ".hero-section-wrapper",
    start: "top top",
    end: "bottom top",
    scrub: true,
    pin: true,
    pinSpacing: false,
  }
});

heroTimeline.to(".hero-section-wrapper .container", {
  scale: 0.8,
  opacity: 0,
  ease: "none"
});

heroTimeline.to(".hero-section-wrapper", {
  backgroundColor: "#111",
  ease: "none"
}, 0);




//View Project Cursor 1 :
const cursor = document.querySelector(".cursor");
const cards = document.querySelectorAll(".proj-pic");

// Hide cursor on touch devices
if ('ontouchstart' in window === false) {
  // Cursor follows mouse
  window.addEventListener("mousemove", (e) => {
    gsap.to(cursor, {
      x: e.clientX,
      y: e.clientY,
      duration: 0.2,
      ease: "power2.out"
    });
  });

  // Show custom cursor ONLY on card hover
  cards.forEach(card => {
    card.addEventListener("mouseenter", () => {
      gsap.to(cursor, { scale: 1, duration: 0.3, ease: "back.out(2)" });
    });
    card.addEventListener("mouseleave", () => {
      gsap.to(cursor, { scale: 0, duration: 0.3, ease: "back.in(2)" });
    });
  });
}

// Advanced Neon Drawing Line Logic
gsap.registerPlugin(ScrollTrigger);

const neonDrawingPath = document.getElementById('neon-drawing-path');
if (neonDrawingPath) {
  window.addEventListener('load', () => {
    const pathLength = neonDrawingPath.getTotalLength();

    gsap.set(neonDrawingPath, {
      strokeDasharray: pathLength,
      strokeDashoffset: pathLength
    });

    gsap.to(neonDrawingPath, {
      strokeDashoffset: 0,
      ease: "none",
      scrollTrigger: {
        trigger: ".projects-cards",
        start: "top center",
        end: "bottom -250%", // Extended to cover the About section waves
        scrub: 1,
      }
    });
  });
}

// Animate all cards
const cardss = document.querySelectorAll(".project-card");
cards.forEach((card, index) => {
  gsap.from(card, {
    y: (index % 2 === 0 ? -100 : 100),
    opacity: 0,
    duration: 1.2,
    ease: "power3.out",
    scrollTrigger: {
      trigger: card,
      start: "top 95%",
      toggleActions: "play none none reverse"
    }
  });
});


// Animate the "Works" title
const headingInner1 = document.querySelector('.title1.t2');
gsap.to(headingInner1, {
  y: -25,
  opacity: 1,
  duration: 0.8,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.title1',
    start: 'top 85%',
    end: 'top 65%',
    toggleActions: 'play none none reverse',
  }
});
// Animate reveal text lines from bottom (no wavy effect)
gsap.utils.toArray('.reveal-text .line-inner').forEach((lineInner, index) => {
  gsap.fromTo(lineInner,
    {
      yPercent: 100,
      opacity: 0
    },
    {
      yPercent: 0,
      opacity: 1,
      duration: 0.8,
      ease: 'power3.out',
      delay: index * 0.15,
      scrollTrigger: {
        trigger: '.reveal-text',
        start: 'top 75%',
        toggleActions: 'play none none none'
      }
    }
  );
});
//About Section-Animation :

gsap.registerPlugin(ScrollTrigger);
const aboutSection = document.getElementById('aboutSection');

// Set initial state - Focused window
gsap.set(aboutSection, {
  clipPath: 'inset(15% 10% 15% 10% round 80px)',
  scale: 0.85,
  opacity: 0,
  filter: 'blur(15px)',
});

// Main expansion animation - The "Liquid" fill
gsap.to(aboutSection, {
  clipPath: 'inset(0% 0% 0% 0% round 0px)',
  scale: 1,
  opacity: 1,
  filter: 'blur(0px)',
  ease: 'expo.inOut',
  scrollTrigger: {
    trigger: aboutSection,
    start: 'top 95%',
    end: 'top 10%',
    scrub: 1.2,
    invalidateOnRefresh: true,
  }
});

// Image reveal - Mask and Parallax
gsap.set('.about-pic', {
  scale: 1.6,
  yPercent: 20,
  filter: 'brightness(0.2) contrast(1.5)',
});

gsap.to('.about-pic', {
  scale: 1,
  yPercent: 0,
  filter: 'brightness(1) contrast(1)',
  ease: 'power3.inOut',
  scrollTrigger: {
    trigger: aboutSection,
    start: 'top 80%',
    end: 'top 20%',
    scrub: 1.5
  }
});



// Animated cursore in lieft of pic :
const wrapper = document.querySelector('.about-pic-wrapper');
const pic = document.querySelector('.about-pic');
const message = document.querySelector('.cursor-message');

let isHovering = false;

pic.addEventListener('mouseenter', () => {
  isHovering = true;
  gsap.to(message, {
    opacity: 1,
    scale: 1,
    duration: 0.3,
    ease: 'back.out(1.7)'
  });
});

pic.addEventListener('mouseleave', () => {
  isHovering = false;
  gsap.to(message, {
    opacity: 0,
    scale: 0.8,
    duration: 0.25,
    ease: 'power2.inOut'
  });
});

pic.addEventListener('mousemove', (e) => {
  if (!isHovering) return;

  const rect = wrapper.getBoundingClientRect();

  gsap.to(message, {
    x: e.clientX - rect.left + 16,
    y: e.clientY - rect.top + 16,
    duration: 0.2,
    ease: 'power3.out'
  });
});


//Skills Hero Scroll Animation Script :
document.addEventListener("DOMContentLoaded", function () {
  if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(".sk-hero", {
      opacity: 0,
      y: -50,
      duration: 1.5,
      ease: "power3.out",
      scrollTrigger: {
        trigger: ".sk-hero",
        start: "top 90%",
        toggleActions: "play none none none",
      }
    });
  }
});
//Skills Cards :
gsap.registerPlugin(ScrollTrigger);

const Scards = gsap.utils.toArray('.skill-card');
const totalCards = Scards.length;

Scards.forEach((card, index) => {
  const isLast = index === totalCards - 1;

  // Initial stacking position
  gsap.set(card, {
    zIndex: totalCards - index,
    scale: 1 - (index * 0.05),
    y: index * 20,
    opacity: 1
  });

  if (!isLast) {
    ScrollTrigger.create({
      trigger: '.skills-section',
      start: () => `top+=${index * (100 / totalCards)}% top`,
      end: () => `top+=${(index + 1) * (100 / totalCards)}% top`,
      scrub: 1,
      onUpdate: (self) => {
        const progress = self.progress;

        // Card slides up and to the left
        gsap.to(card, {
          y: -progress * 800,
          x: -progress * 400,
          rotation: -progress * 15,
          opacity: 1 - progress,
          scale: 1 - (progress * 0.3),
          duration: 0.1
        });

        // Bring next card forward
        if (Scards[index + 1]) {
          gsap.to(Scards[index + 1], {
            scale: 1 - ((1 - progress) * 0.05),
            y: (1 - progress) * 20,
            duration: 0.1
          });
        }
      }
    });
  }
});

// Ticker script Section:
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.ticker').forEach(ticker => {
    const inner = ticker.querySelector('.ticker-wrap')
    const content = inner.querySelector('.ticker-text')
    const duration = ticker.getAttribute('data-duration')
    inner.append(content.cloneNode(true))

    const animations = []
    inner.querySelectorAll('.ticker-text').forEach(element => {
      const animation = gsap.to(element, {
        x: "-100%",
        repeat: -1,
        duration: duration,
        ease: 'linear'
      })
      animations.push(animation)
    })

    ticker.addEventListener('mouseenter', () => {
      animations.forEach(anim => anim.pause())
    })

    ticker.addEventListener('mouseleave', () => {
      animations.forEach(anim => anim.play())
    })
  })
})

// ticker scrolle aniation :
const ticker = document.querySelectorAll(".ticker");
ticker.forEach((ticker, index) => {
  gsap.from(ticker, {
    x: index % 2 === 0 ? -200 : 200,// even cards from left, odd cards from right
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    delay: index * 0.2, // Add stagger delay between tickers
    scrollTrigger: {
      trigger: ticker,
      start: "top 90%",
      toggleActions: "play none none reverse"
    }
  });
});



// services script container
gsap.registerPlugin(ScrollTrigger);

function initServices() {
  const track = document.querySelector(".horizontal-track");
  const path = document.querySelector("#drawing-path");
  const mobilePath = document.querySelector("#mobile-drawing-path");

  if (!track || !path || !mobilePath) return;

  const pathLength = path.getTotalLength();
  const mobilePathLength = mobilePath.getTotalLength();

  // Hide paths initially
  gsap.set(path, {
    strokeDasharray: pathLength,
    strokeDashoffset: pathLength
  });
  gsap.set(mobilePath, {
    strokeDasharray: mobilePathLength,
    strokeDashoffset: mobilePathLength
  });

  // Create the pin and scroll timeline with matchMedia
  ScrollTrigger.matchMedia({
    // Desktop and Tablet: Horizontal scroll
    "(min-width: 601px)": function () {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".services-section",
          pin: true,
          start: "top top",
          end: () => "+=" + track.offsetWidth,
          scrub: 1,
          invalidateOnRefresh: true,
          anticipatePin: 1
        }
      });

      tl.to(track, {
        x: () => -(track.scrollWidth - window.innerWidth),
        ease: "none"
      });

      tl.to(path, {
        strokeDashoffset: 0,
        ease: "none"
      }, 0);
    },

    // Mobile: Vertical layout with snaking line
    "(max-width: 600px)": function () {
      // Snaking path drawing animation
      gsap.to(mobilePath, {
        strokeDashoffset: 0,
        ease: "none",
        scrollTrigger: {
          trigger: ".services-section",
          start: "top 10%",
          end: "bottom 90%",
          scrub: 1
        }
      });

      // Add wavy entry animations for alternating service cards
      document.querySelectorAll('.service-card').forEach((card, i) => {
        const isEven = (i + 1) % 2 === 0;

        gsap.from(card, {
          y: 100,
          x: isEven ? 50 : -50, // Appear from their respective sides
          rotation: isEven ? 5 : -5, // Wavy tilt
          opacity: 0,
          duration: 1.2,
          ease: "power4.out",
          scrollTrigger: {
            trigger: card,
            start: "top 90%",
            toggleActions: "play none none reverse"
          }
        });

        // Inner content wavy stagger
        const h2 = card.querySelector('h2');
        const p = card.querySelector('p');
        const num = card.querySelector('.card-number');

        gsap.from([num, h2, p], {
          y: 30,
          opacity: 0,
          stagger: 0.1,
          duration: 0.8,
          ease: "power2.out",
          scrollTrigger: {
            trigger: card,
            start: "top 85%"
          }
        });
      });

      // Reset track position if it was previously set
      gsap.set(track, { x: 0 });
    }
  });

  // Refresh ScrollTrigger to catch any layout shifts
  ScrollTrigger.refresh();
}

// Initialize on load and also immediately if DOM is ready
if (document.readyState === 'complete') {
  initServices();
} else {
  window.addEventListener('load', initServices);
}


// contact me section:
const ContactHero = document.querySelectorAll(".contact-form-hero");
ContactHero.forEach((contactHero, index) => {
  gsap.from(contactHero, {
    y: -200,
    opacity: 0,
    duration: 1,
    ease: "power3.out",
    scrollTrigger: {
      trigger: contactHero,
      start: "top 90%",
      toggleActions: "play none none reverse"
    }
  });
});

// Animate form appearance
gsap.registerPlugin(ScrollTrigger);

// Animate title
gsap.to('.section-title', {
  opacity: 1,
  y: 0,
  duration: 1,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.contact-section',
    start: 'top 70%',
  }
});

// Animate subtitle
gsap.to('.section-subtitle', {
  opacity: 1,
  y: 0,
  duration: 1,
  delay: 0.2,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.contact-section',
    start: 'top 70%',
  }
});

// Animate form groups
const formGroups = document.querySelectorAll('.form-group');
formGroups.forEach((group, index) => {
  gsap.to(group, {
    opacity: 1,
    x: 0,
    duration: 0.8,
    delay: 0.4 + (index * 0.2),
    ease: 'power3.out',
    scrollTrigger: {
      trigger: '.contact-section',
      start: 'top 70%',
    }
  });
});

// Animate submit button
gsap.to('.submit-wrapper', {
  opacity: 1,
  y: 0,
  duration: 0.8,
  delay: 1.2,
  ease: 'power3.out',
  scrollTrigger: {
    trigger: '.contact-section',
    start: 'top 70%',
  }
});

// Animate decorative lines
gsap.to('.deco-line-1', {
  height: '40%',
  duration: 1.5,
  delay: 0.5,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.contact-section',
    start: 'top 70%',
  }
});

gsap.to('.deco-line-2', {
  height: '60%',
  duration: 1.5,
  delay: 0.7,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.contact-section',
    start: 'top 70%',
  }
});

gsap.to('.deco-line-3', {
  height: '30%',
  duration: 1.5,
  delay: 0.9,
  ease: 'power2.out',
  scrollTrigger: {
    trigger: '.contact-section',
    start: 'top 70%',
  }
});

// Focus animations
const inputs = document.querySelectorAll('input, textarea');
inputs.forEach(input => {
  input.addEventListener('focus', function () {
    const formGroup = this.closest('.form-group');
    formGroup.classList.add('focused');

    gsap.to(this, {
      x: 10,
      duration: 0.3,
      ease: 'power2.out'
    });
  });

  input.addEventListener('blur', function () {
    const formGroup = this.closest('.form-group');
    if (!this.value) {
      formGroup.classList.remove('focused');
    }

    gsap.to(this, {
      x: 0,
      duration: 0.3,
      ease: 'power2.out'
    });
  });
});

// Character counter for message
const messageInput = document.getElementById('message');
const charCount = document.querySelector('.char-count');

messageInput.addEventListener('input', function () {
  const count = this.value.length;
  charCount.textContent = `${count} / 500`;

  if (count > 450) {
    charCount.style.color = '#fff';
  } else {
    charCount.style.color = '#444';
  }
});

// Fliping Links Hovering Script V1:
const navItems1 = document.querySelectorAll(".nav-content1 ul li");
const DURATION1 = 0.25;
const STAGGER1 = 0.025;

document.querySelectorAll(".flip-link1").forEach(link => {
  const text1 = link.dataset.text;

  const front1 = document.createElement("section");
  const back1 = document.createElement("section");

  front1.classList.add("front1");
  back1.classList.add("back1");

  // create spans
  text1.split("").forEach(letter => {
    const f1 = document.createElement("span");
    f1.textContent = letter;

    const b1 = document.createElement("span");
    b1.textContent = letter;

    front1.appendChild(f1);
    back1.appendChild(b1);
  });

  link.appendChild(front1);
  link.appendChild(back1);

  const spansFront1 = front1.querySelectorAll("span");
  const spansBack1 = back1.querySelectorAll("span");

  // position back letters below
  gsap.set(spansBack1, { yPercent: 100 });

  link.addEventListener("mouseenter", () => {
    gsap.to(spansFront1, {
      yPercent: -100,
      duration: DURATION1,
      ease: "power2.inOut",
      stagger: STAGGER1
    });
    gsap.to(spansBack1, {
      yPercent: 0,
      duration: DURATION1,
      ease: "power2.inOut",
      stagger: STAGGER1
    });
  });

  link.addEventListener("mouseleave", () => {
    gsap.to(spansFront1, {
      yPercent: 0,
      duration: DURATION1,
      ease: "power2.inOut",
      stagger: STAGGER1
    });
    gsap.to(spansBack1, {
      yPercent: 100,
      duration: DURATION1,
      ease: "power2.inOut",
      stagger: STAGGER1
    });
  });
});










const heroTitles = document.querySelectorAll('.fill-animation');
heroTitles.forEach((heroTitle) => {
  const filledText = heroTitle.querySelector('.title-filled');

  gsap.set(filledText, {
    clipPath: 'inset(100% 0 0 0)'
  });

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: heroTitle,
      start: 'top 75%',
      end: 'top 25%',
      scrub: 1,
    }
  });

  timeline.to(filledText, {
    clipPath: 'inset(80% 0 0 0)',
    duration: 0.15,
    ease: 'power1.in'
  })
    .to(filledText, {
      clipPath: 'inset(75% 0 0 0)',
      duration: 0.1,
      ease: 'sine.inOut'
    })
    .to(filledText, {
      clipPath: 'inset(60% 0 0 0)',
      duration: 0.15,
      ease: 'power1.in'
    })
    .to(filledText, {
      clipPath: 'inset(55% 0 0 0)',
      duration: 0.1,
      ease: 'sine.inOut'
    })
    .to(filledText, {
      clipPath: 'inset(40% 0 0 0)',
      duration: 0.15,
      ease: 'power1.in'
    })
    .to(filledText, {
      clipPath: 'inset(35% 0 0 0)',
      duration: 0.1,
      ease: 'sine.inOut'
    })
    .to(filledText, {
      clipPath: 'inset(20% 0 0 0)',
      duration: 0.15,
      ease: 'power1.in'
    })
    .to(filledText, {
      clipPath: 'inset(15% 0 0 0)',
      duration: 0.1,
      ease: 'sine.inOut'
    })
    .to(filledText, {
      clipPath: 'inset(0% 0 0 0)',
      duration: 0.1,
      ease: 'power2.out'
    });
});

//Independent about-title script for a special case 

const aboutTitles = document.querySelectorAll('.about-animation');
aboutTitles.forEach((aboutTitle) => {
  const filledText = aboutTitle.querySelector('.about-filled');

  gsap.set(filledText, {
    clipPath: 'inset(100% 0 0 0)'
  });

  const timeline = gsap.timeline({
    scrollTrigger: {
      trigger: aboutTitle,
      start: 'top 75%',
      end: 'top 25%',
      scrub: 1,
    }
  });

  timeline.to(filledText, {
    clipPath: 'inset(80% 0 0 0)',
    duration: 0.15,
    ease: 'power1.in'
  })
    .to(filledText, {
      clipPath: 'inset(75% 0 0 0)',
      duration: 0.1,
      ease: 'sine.inOut'
    })
    .to(filledText, {
      clipPath: 'inset(60% 0 0 0)',
      duration: 0.15,
      ease: 'power1.in'
    })
    .to(filledText, {
      clipPath: 'inset(55% 0 0 0)',
      duration: 0.1,
      ease: 'sine.inOut'
    })
    .to(filledText, {
      clipPath: 'inset(40% 0 0 0)',
      duration: 0.15,
      ease: 'power1.in'
    })
    .to(filledText, {
      clipPath: 'inset(35% 0 0 0)',
      duration: 0.1,
      ease: 'sine.inOut'
    })
    .to(filledText, {
      clipPath: 'inset(20% 0 0 0)',
      duration: 0.15,
      ease: 'power1.in'
    })
    .to(filledText, {
      clipPath: 'inset(15% 0 0 0)',
      duration: 0.1,
      ease: 'sine.inOut'
    })
    .to(filledText, {
      clipPath: 'inset(0% 0 0 0)',
      duration: 0.1,
      ease: 'power2.out'
    });
});




// Magnetic Button Logic
const magneticBtn = document.querySelector('.magnetic-btn');

if (magneticBtn && !('ontouchstart' in window)) {
  const btnFill = magneticBtn.querySelector('.btn-fill');
  const btnText = magneticBtn.querySelector('.btn-text');

  magneticBtn.addEventListener('mousemove', (e) => {
    const rect = magneticBtn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Magnetic effect (move button towards cursor)
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    const deltaX = (x - centerX) * 0.35; // Sensitivity
    const deltaY = (y - centerY) * 0.35;

    gsap.to(magneticBtn, {
      x: deltaX,
      y: deltaY,
      duration: 0.3,
      ease: "power2.out"
    });

    gsap.to(btnText, {
      x: deltaX * 0.5,
      y: deltaY * 0.5,
      duration: 0.3,
      ease: "power2.out"
    });
  });

  magneticBtn.addEventListener('mouseenter', (e) => {
    const rect = magneticBtn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Set fill position to entry point
    gsap.set(btnFill, {
      left: x,
      top: y,
      scale: 0
    });

    // Animate fill expansion
    gsap.to(btnFill, {
      scale: 1.5, // Large enough to cover the button
      duration: 0.6,
      ease: "power2.out"
    });

    gsap.to(btnText, {
      color: "#000",
      duration: 0.3
    });
  });

  magneticBtn.addEventListener('mouseleave', (e) => {
    const rect = magneticBtn.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    // Animate fill contraction towards exit point
    gsap.to(btnFill, {
      left: x,
      top: y,
      scale: 0,
      duration: 0.4,
      ease: "power2.in",
      overwrite: "auto"
    });

    // Reset button and text position
    gsap.to([magneticBtn, btnText], {
      x: 0,
      y: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.3)",
      overwrite: "auto"
    });

    // Fade text color back to white
    gsap.to(btnText, {
      color: "#fff",
      duration: 0.3,
      delay: 0.1
    });
  });
}

if (magneticBtn) {
  const btnFill = magneticBtn.querySelector('.btn-fill');
  // Click Reaction (Always active for feedback)
  magneticBtn.addEventListener('mousedown', () => {
    gsap.to(magneticBtn, {
      scale: 0.85,
      duration: 0.1,
      ease: "power2.out"
    });
    if (btnFill) {
      gsap.to(btnFill, {
        backgroundColor: "#e0e0e0",
        duration: 0.1
      });
    }
  });

  magneticBtn.addEventListener('mouseup', () => {
    gsap.to(magneticBtn, {
      scale: 1,
      duration: 0.6,
      ease: "elastic.out(1, 0.3)"
    });
    if (btnFill) {
      gsap.to(btnFill, {
        backgroundColor: "#fff",
        duration: 0.2
      });
    }
  });
}

// Project Card Wavy Text Hover Effect
const projectCards = document.querySelectorAll('.proj-pic');

projectCards.forEach(card => {
  const wavyName = card.querySelector('.wavy-name');
  if (wavyName) {
    // Split the text into characters
    const splitText = new SplitType(wavyName, { types: 'chars' });
    const chars = splitText.chars;

    // Set initial state for characters
    gsap.set(chars, {
      y: 40,
      opacity: 0,
      skewY: 7
    });

    card.addEventListener('mouseenter', () => {
      gsap.to(chars, {
        y: 0,
        opacity: 1,
        skewY: 0,
        stagger: 0.04,
        duration: 0.6,
        ease: "power3.out",
        overwrite: true
      });
    });

    card.addEventListener('mouseleave', () => {
      gsap.to(chars, {
        y: -40,
        opacity: 0,
        skewY: -7,
        stagger: 0.03,
        duration: 0.4,
        ease: "power3.in",
        overwrite: true,
        onComplete: () => {
          // Reset chars to bottom position for the next hover entry
          gsap.set(chars, { y: 40, skewY: 7 });
        }
      });
    });
  }
});

// Skills Section Wavy Transition
gsap.registerPlugin(ScrollTrigger);

const skillsWavePath = document.getElementById('skills-wave-path');

if (skillsWavePath) {
  gsap.to(skillsWavePath, {
    attr: { d: "M0,120 C480,-100 960,-100 1440,120 L1440,120 L0,120 Z" },
    ease: "power1.inOut",
    scrollTrigger: {
      trigger: ".skills-wrapper",
      start: "top 100%",
      end: "top 20%",
      scrub: 1,
    }
  });

  // Additional parallax for the wrapper to enhance the "going up over" feel
  gsap.from(".skills-wrapper", {
    y: 150,
    ease: "none",
    scrollTrigger: {
      trigger: ".skills-wrapper",
      start: "top bottom",
      end: "top top",
      scrub: true
    }
  });
}

// Footer Wavy Text Animation
window.addEventListener('load', () => {
  const wavyFooter = document.getElementById('wavy-text');
  if (wavyFooter) {
    const text = new SplitType(wavyFooter, { types: 'chars' });

    gsap.from(text.chars, {
      y: 200, // Start deep from the bottom
      opacity: 0,
      stagger: 0.05,
      duration: 1,
      ease: "power4.out",
      scrollTrigger: {
        trigger: wavyFooter,
        start: "top 95%", // Start when text is just entering
        toggleActions: "play none none reverse",
      }
    });
  }
});
