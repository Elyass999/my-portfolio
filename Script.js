
// Light Rays Script Section

// Visual scroll position indicator (px and %)
// (() => {
//   function createIndicator() {
//     let el = document.getElementById('scroll-indicator');
//     if (!el) {
//       el = document.createElement('div');
//       el.id = 'scroll-indicator';
//       Object.assign(el.style, {
//         position: 'fixed',
//         right: '12px',
//         bottom: '12px',
//         zIndex: '9999',
//         background: 'rgba(0,0,0,0.6)',
//         color: '#fff',
//         padding: '6px 10px',
//         borderRadius: '8px',
//         font: '12px/1.4 system-ui, -apple-system, Segoe UI, Roboto, Helvetica, Arial, sans-serif',
//         pointerEvents: 'none',
//         backdropFilter: 'blur(4px)'
//       });
//       document.body.appendChild(el);
//     }
//     return el;
//   }

//   function update(el) {
//     const scrollTop = window.scrollY || window.pageYOffset || 0;
//     const doc = document.documentElement;
//     const body = document.body;
//     const docHeight = Math.max(
//       doc.scrollHeight, body.scrollHeight,
//       doc.offsetHeight, body.offsetHeight,
//       doc.clientHeight, body.clientHeight
//     );
//     const viewport = window.innerHeight || doc.clientHeight;
//     const maxScroll = Math.max(docHeight - viewport, 0);
//     const pct = maxScroll ? Math.round((scrollTop / maxScroll) * 100) : 0;
//     el.textContent = `Scroll: ${Math.round(scrollTop)}px (${pct}%)`;
//   }

//   let indicatorEl;
//   let ticking = false;

//   function onScroll() {
//     if (!indicatorEl) return;
//     if (ticking) return;
//     ticking = true;
//     requestAnimationFrame(() => {
//       update(indicatorEl);
//       ticking = false;
//     });
//   }

//   function init() {
//     indicatorEl = createIndicator();
//     update(indicatorEl);
//     window.addEventListener('scroll', onScroll, { passive: true });
//     window.addEventListener('resize', () => update(indicatorEl));
//   }

//   if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', init, { once: true });
//   } else {
//     init();
//   }
// })();

//gary section anm :
gsap.registerPlugin(ScrollTrigger);
gsap.to(".corner-reveal", {
  borderTopLeftRadius: 2,
  borderTopRightRadius: 2,
  
  ease: "none",
  scrollTrigger: {
    trigger: ".corner-reveal",
    start: "top 40%",
    end: "top 10%",
    scrub: true
  }
});


//Menu btn :
const MenuNav = document.querySelector('.menu-btn');
// Hide nav initially
gsap.set(MenuNav, { 
    x: 0, 
    opacity: 0 
});

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 200) {
        // Show nav when scrolled past 200px
        gsap.to(MenuNav, {
            y: 0,
            opacity: 1,
            duration: 0.2,
            ease: "power2.out"
        });
    } else {
        // Hide nav when back at top
        gsap.to(MenuNav, {
            x: 0,
            opacity: 0,
            duration: 0.2 ,
            ease: "power2.in"
        });
    }
});

// Preloader :
const tll = gsap.timeline({ defaults: { ease: "power3.out" } });
// Step 1: Stagger "Hello"
tll.to("#preloader .hello span", {
  y: 0,
  opacity: 1,
  duration: 0.4,
  stagger: 0.1
})

// Step 2: Slide black panel up
.to(".overlay.black", {
  x: "-100%",
  duration: 0.3
})

// Step 3: Slide blue panel up (0.5s after black starts)
.to(".overlay.blue", {
  y: "-100%",
  duration: 0.3
}, "+=0.5")

// Step 4: Move whole preloader away
.to("#preloader", {
  x: "-100%",
  duration: 0.3,
  ease: "power2.inOut"
})


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

    // Text Starting animation script :
    gsap.registerPlugin(ScrollTrigger);
    document.querySelectorAll(".fade-text").forEach((element) => {
    const text = new SplitType(element, { types: "words, chars" });    
    const scrollConfig = {
      trigger: element,
      start: "top 80%",
      end: "top 20%",
      scrub: true,
      toggleActions: "play play reverse reverse",
    };

    gsap.fromTo(
        text.chars,
        { opacity: 0.1 },
        {
        opacity: 1,
        duration: 0.3,
        stagger: 0.02,
        scrollTrigger: scrollConfig,
        }
    );

    gsap.fromTo(
        element.querySelectorAll("span .char"),
        { color: "#000000" },
        {
        color: "#ff0000",
        duration: 0.3,
        stagger: 0.02,
        scrollTrigger: scrollConfig,
        }
    );
    });



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
  
  //Neon line script 
  gsap.registerPlugin(ScrollTrigger);
  gsap.to(".line-fill", {
      height: "100%",
      ease: "none",
      scrollTrigger: {
          trigger: ".projects-cards",
          start: "top center",
          end: "bottom center",
          scrub: 0.5
      }
  });
  // Animate all cards (side by side)
  const cardss = document.querySelectorAll(".project-card");
  cards.forEach((card, index) => {
    gsap.from(card, {
      y: index % 2 === 0 ? -200 : 200,// even cards from left, odd cards from right
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
      scrollTrigger: {
        trigger: card,
        start: "top 90%",  // when card enters 100% from top of viewport
        toggleActions: "play none none reverse"
      }
    });
  });

  // Animate the "Works" title
const headingInner1 = document.querySelector('.title1.t2');
gsap.to(headingInner1, {
    y:-25,
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

// Set initial state - bigger square
gsap.set(aboutSection, {
  width: '150vmin',
  height: '150vmin',
  borderRadius: '50px',
  overflow: 'hidden',
  background: 'linear-gradient(135deg, #000000, #0a0a0a)',
  scale: 0.9,
  opacity: 0.7
});

// Expansion animation - optimized
gsap.to(aboutSection, {
  width: '100%',
  height: 'auto',
  minHeight: '100vh',
  borderRadius: '0px',
  scale: 1,
  opacity: 1,
  background: '#000000',
  ease: 'power2.inOut',
  scrollTrigger: {
    trigger: aboutSection,
    start: 'top 80%',
    end: 'top 20%',
    scrub: 1,
    invalidateOnRefresh: true
  }
});

// Image expansion animation with section
gsap.set('.about-pic', {
  scale: 0.6,
  borderRadius: '30%',
  opacity: 0.5
});

gsap.to('.about-pic', {
  scale: 1,
  borderRadius: '12px',
  opacity: 1,
  ease: 'power2.inOut',
  scrollTrigger: {
    trigger: aboutSection,
    start: 'top 70%',
    end: 'top 20%',
    scrub: 1
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
    document.addEventListener("DOMContentLoaded", function() {
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
    gsap.registerPlugin(ScrollTrigger);
    gsap.from(".sk-hero", {
      opacity: 0,
      y:-50,
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
window.onload = () => {
    const track = document.querySelector(".horizontal-track");
    const path = document.querySelector("#drawing-path");

    if (track && path) {
        const pathLength = path.getTotalLength();
        
        // Hide path initially
        gsap.set(path, { 
            strokeDasharray: pathLength, 
            strokeDashoffset: pathLength 
        });

        // Create the pin and scroll timeline
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: ".services-section",
                pin: true,           // Stick the section to the screen
                start: "top top",    // Start when top hits top
                // Duration is equal to the width of the cards
                end: () => "+=" + track.offsetWidth, 
                scrub: 1,            // Link animation to scroll
                invalidateOnRefresh: true, 
                anticipatePin: 1
            }
        });

        // 1. Move cards to the left
        tl.to(track, {
            x: () => -(track.scrollWidth - window.innerWidth),
            ease: "none"
        });

        // 2. Draw the line (starts at same time as card movement)
        tl.to(path, {
            strokeDashoffset: 0,
            ease: "none"
        }, 0);
    }
    
    // Refresh ScrollTrigger to catch any layout shifts
    ScrollTrigger.refresh();
};


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
    input.addEventListener('focus', function() {
        const formGroup = this.closest('.form-group');
        formGroup.classList.add('focused');
        
        gsap.to(this, {
            x: 10,
            duration: 0.3,
            ease: 'power2.out'
        });
    });

    input.addEventListener('blur', function() {
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

messageInput.addEventListener('input', function() {
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



