document.addEventListener('DOMContentLoaded', () => {

  /* ============================================================
     GLOBAL ELEMENTS
  ============================================================ */

  const header = document.querySelector('.header');
  const navMenu = document.querySelector('.nav-menu');
  const gridIconBtn = document.querySelector('.grid-icon-btn');
  const toast = document.querySelector('#toast');

  const videoModal = document.querySelector('#videoModal');
  const videoIframe = document.querySelector('#video-iframe');
  const videoCloseBtn = document.querySelector('.modal-close-btn');
  const videoPreviewCard = document.querySelector('.video-preview-card');


  /* ============================================================
     TOAST
  ============================================================ */

  const showToast = (message) => {

    if (!toast) return;

    toast.textContent = message;
    toast.classList.add('show');

    window.setTimeout(() => {
      toast.classList.remove('show');
    }, 3000);
  };


  /* ============================================================
     HEADER / NAVIGATION
     ============================================================ */

  const closeMenu = () => {

    if (!navMenu || !gridIconBtn) return;

    navMenu.classList.remove('open');
    gridIconBtn.classList.remove('menu-open');

    gridIconBtn.setAttribute(
      'aria-expanded',
      'false'
    );

    gridIconBtn.setAttribute(
      'aria-label',
      'Open navigation menu'
    );
  };


  const openMenu = () => {

    if (!navMenu || !gridIconBtn) return;

    navMenu.classList.add('open');
    gridIconBtn.classList.add('menu-open');

    gridIconBtn.setAttribute(
      'aria-expanded',
      'true'
    );

    gridIconBtn.setAttribute(
      'aria-label',
      'Close navigation menu'
    );
  };


  const toggleMenu = () => {

    if (!navMenu || !gridIconBtn) return;

    const isOpen =
      navMenu.classList.contains('open');

    if (isOpen) {
      closeMenu();
    } else {
      openMenu();
    }
  };


  /* ============================================================
     GRID MENU BUTTON
     ============================================================ */

  if (gridIconBtn) {

    gridIconBtn.setAttribute(
      'aria-expanded',
      'false'
    );

    gridIconBtn.addEventListener('click', (event) => {

      event.preventDefault();
      event.stopPropagation();

      toggleMenu();
    });
  }


  /* ============================================================
     NAVIGATION LINKS
     ============================================================ */

  document
    .querySelectorAll('.nav-link')
    .forEach((link) => {

      link.addEventListener('click', () => {

        closeMenu();

      });

    });


  /* ============================================================
     CLOSE MENU WHEN CLICKING OUTSIDE
     ============================================================ */

  document.addEventListener('click', (event) => {

    if (!navMenu || !gridIconBtn) return;

    const clickedInsideMenu =
      navMenu.contains(event.target);

    const clickedButton =
      gridIconBtn.contains(event.target);

    if (!clickedInsideMenu && !clickedButton) {

      closeMenu();

    }

  });


  /* ============================================================
     ESCAPE KEY
     ============================================================ */

  document.addEventListener('keydown', (event) => {

    if (event.key === 'Escape') {

      closeMenu();

    }

  });


  /* ============================================================
     STICKY HEADER
     ============================================================ */

  const updateStickyHeader = () => {

    if (!header) return;

    if (window.scrollY > 50) {

      header.classList.add('sticky');

    } else {

      header.classList.remove('sticky');

    }

  };


  window.addEventListener(
    'scroll',
    updateStickyHeader,
    { passive: true }
  );


  updateStickyHeader();


  /* ============================================================
     ACTIVE NAVIGATION LINK
     ============================================================ */

  const sections = document.querySelectorAll(
    'section[id]'
  );

  const navigationLinks =
    document.querySelectorAll(
      '.nav-link'
    );


  if (
    sections.length > 0 &&
    navigationLinks.length > 0
  ) {

    const updateActiveNavigation = () => {

      const scrollPosition =
        window.scrollY + 150;

      let currentSection = 'hero';

      sections.forEach((section) => {

        const sectionTop =
          section.offsetTop;

        const sectionHeight =
          section.offsetHeight;

        if (
          scrollPosition >= sectionTop &&
          scrollPosition <
          sectionTop + sectionHeight
        ) {

          currentSection =
            section.getAttribute('id');

        }

      });


      navigationLinks.forEach((link) => {

        const href =
          link.getAttribute('href');

        link.classList.toggle(
          'active',
          href === `#${currentSection}`
        );

      });

    };


    window.addEventListener(
      'scroll',
      updateActiveNavigation,
      { passive: true }
    );

    updateActiveNavigation();

  }


  /* ============================================================
     HERO SLIDER
     ============================================================ */

  const heroSlides = [

    {
      title: `
                <span class="fresh">FRESH</span>
                <span class="juicy">JUICY</span>
                <span class="bright">BRIGHT</span>
            `,

      desc: `
                Streamlining Media Relations for Brands. Orange PR manages
                media relations, freeing clients to focus on daily operations,
                while ensuring campaign initiatives are constantly monitored
                and updated for success.
            `
    },

    {
      title: `
                <span class="fresh">FRESH</span>
                <span class="juicy">JUICY</span>
                <span class="bright">BRIGHT</span>
            `,

      desc: `
                Streamlining Media Relations for Brands. Orange PR manages
                media relations, freeing clients to focus on daily operations,
                while ensuring campaign initiatives are constantly monitored
                and updated for success.
            `
    },

    {
      title: `
                <span class="fresh">FRESH</span>
                <span class="juicy">JUICY</span>
                <span class="bright">BRIGHT</span>
            `,

      desc: `
                Streamlining Media Relations for Brands. Orange PR manages
                media relations, freeing clients to focus on daily operations,
                while ensuring campaign initiatives are constantly monitored
                and updated for success.
            `
    },

    {
      title: `
                <span class="fresh">FRESH</span>
                <span class="juicy">JUICY</span>
                <span class="bright">BRIGHT</span>
            `,

      desc: `
                Streamlining Media Relations for Brands. Orange PR manages
                media relations, freeing clients to focus on daily operations,
                while ensuring campaign initiatives are constantly monitored
                and updated for success.
            `
    },

    {
      title: `
                <span class="fresh">FRESH</span>
                <span class="juicy">JUICY</span>
                <span class="bright">BRIGHT</span>
            `,

      desc: `
                Streamlining Media Relations for Brands. Orange PR manages
                media relations, freeing clients to focus on daily operations,
                while ensuring campaign initiatives are constantly monitored
                and updated for success.
            `
    }

  ];


  let currentHeroSlide = 0;

  const dots =
    document.querySelectorAll(
      '.hero-slider-nav .dot'
    );

  const heroTitle =
    document.querySelector(
      '.hero-title'
    );

  const heroDesc =
    document.querySelector(
      '.hero-description'
    );

  const heroPrev =
    document.querySelector(
      '.hero-prev'
    );

  const heroNext =
    document.querySelector(
      '.hero-next'
    );

  const heroSection =
    document.querySelector(
      '#hero'
    );


  /* ============================================================
     UPDATE HERO
     ============================================================ */

  const updateHeroSlide = (index) => {

    if (!heroSlides.length) return;

    currentHeroSlide =
      (
        index +
        heroSlides.length
      ) % heroSlides.length;


    /* FADE OUT */

    if (heroTitle) {

      heroTitle.classList.add(
        'slide-changing'
      );

    }

    if (heroDesc) {

      heroDesc.classList.add(
        'slide-changing'
      );

    }


    window.setTimeout(() => {

      const slide =
        heroSlides[currentHeroSlide];


      if (heroTitle) {

        heroTitle.innerHTML =
          slide.title;

      }


      if (heroDesc) {

        heroDesc.textContent =
          slide.desc.trim();

      }


      if (heroTitle) {

        heroTitle.classList.remove(
          'slide-changing'
        );

      }

      if (heroDesc) {

        heroDesc.classList.remove(
          'slide-changing'
        );

      }

    }, 200);


    /* UPDATE DOTS */

    dots.forEach((dot, dotIndex) => {

      dot.classList.toggle(
        'active',
        dotIndex === currentHeroSlide
      );

    });

  };


  /* ============================================================
     HERO DOTS
     ============================================================ */

  dots.forEach((dot, index) => {

    dot.setAttribute(
      'role',
      'button'
    );

    dot.setAttribute(
      'tabindex',
      '0'
    );

    dot.addEventListener(
      'click',
      () => {

        updateHeroSlide(index);

        restartHeroTimer();

      }
    );


    dot.addEventListener(
      'keydown',
      (event) => {

        if (
          event.key === 'Enter' ||
          event.key === ' '
        ) {

          event.preventDefault();

          updateHeroSlide(index);

          restartHeroTimer();

        }

      }
    );

  });


  /* ============================================================
     HERO PREVIOUS
     ============================================================ */

  if (heroPrev) {

    heroPrev.addEventListener(
      'click',
      () => {

        updateHeroSlide(
          currentHeroSlide - 1
        );

        restartHeroTimer();

      }
    );

  }


  /* ============================================================
     HERO NEXT
     ============================================================ */

  if (heroNext) {

    heroNext.addEventListener(
      'click',
      () => {

        updateHeroSlide(
          currentHeroSlide + 1
        );

        restartHeroTimer();

      }
    );

  }


  /* ============================================================
     HERO AUTO SLIDER
     ============================================================ */

  let heroTimer = null;


  const startHeroTimer = () => {

    window.clearInterval(
      heroTimer
    );

    heroTimer =
      window.setInterval(
        () => {

          updateHeroSlide(
            currentHeroSlide + 1
          );

        },
        6000
      );

  };


  const stopHeroTimer = () => {

    window.clearInterval(
      heroTimer
    );

    heroTimer = null;

  };


  const restartHeroTimer = () => {

    stopHeroTimer();

    startHeroTimer();

  };


  if (heroSection) {

    heroSection.addEventListener(
      'mouseenter',
      stopHeroTimer
    );


    heroSection.addEventListener(
      'mouseleave',
      startHeroTimer
    );

  }


  updateHeroSlide(0);

  startHeroTimer();


  /* ============================================================
     HERO TOUCH / SWIPE
     ============================================================ */

  if (heroSection) {

    let touchStartX = 0;
    let touchEndX = 0;


    heroSection.addEventListener(
      'touchstart',
      (event) => {

        touchStartX =
          event.changedTouches[0].screenX;

      },
      { passive: true }
    );


    heroSection.addEventListener(
      'touchend',
      (event) => {

        touchEndX =
          event.changedTouches[0].screenX;

        const difference =
          touchStartX - touchEndX;


        if (Math.abs(difference) < 50) {
          return;
        }


        if (difference > 0) {

          updateHeroSlide(
            currentHeroSlide + 1
          );

        } else {

          updateHeroSlide(
            currentHeroSlide - 1
          );

        }


        restartHeroTimer();

      },
      { passive: true }
    );

  }


  /* ============================================================
     METRICS / STATS COUNTER
     ============================================================ */

  const counters =
    document.querySelectorAll(
      '.metric-number[data-target]'
    );


  const animateCounter = (element) => {

    const target =
      parseInt(
        element.getAttribute(
          'data-target'
        ) || '0',
        10
      );


    const duration = 1600;

    const startTime =
      performance.now();


    const tick = (now) => {

      const elapsed =
        now - startTime;

      const progress =
        Math.min(
          elapsed / duration,
          1
        );


      const easedProgress =
        1 -
        Math.pow(
          1 - progress,
          3
        );


      element.textContent =
        Math.round(
          target *
          easedProgress
        ).toLocaleString();


      if (progress < 1) {

        requestAnimationFrame(
          tick
        );

      } else {

        element.textContent =
          target.toLocaleString();

      }

    };


    requestAnimationFrame(
      tick
    );

  };


  if (
    'IntersectionObserver' in window &&
    counters.length > 0
  ) {

    const counterObserver =
      new IntersectionObserver(
        (entries) => {

          entries.forEach(
            (entry) => {

              if (
                entry.isIntersecting
              ) {

                animateCounter(
                  entry.target
                );

                counterObserver.unobserve(
                  entry.target
                );

              }

            }
          );

        },
        {
          threshold: 0.3
        }
      );


    counters.forEach(
      (counter) => {

        counterObserver.observe(
          counter
        );

      }
    );

  } else {

    counters.forEach(
      (counter) => {

        counter.textContent =
          counter.getAttribute(
            'data-target'
          ) || '0';

      }
    );

  }


  /* ============================================================
     TESTIMONIAL SLIDER
     ============================================================ */

  const testimonials = [

    {
      name: 'James Andrews',

      role:
        'CEO and Founder of the Company',

      quote:
        '"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."',

      avatar:
        'assets/images/Ellipse 11.png'
    },

    {
      name: 'James Andrews',

      role:
        'CEO and Founder of the Company',

      quote:
        '"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."',

      avatar:
        'assets/images/Mask group-3.png'
    },

    {
      name: 'James Andrews',

      role:
        'CEO and Founder of the Company',

      quote:
        '"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."',

      avatar:
        'assets/images/Mask group-4.png'
    }

  ];


  let currentTestimonialIndex = 0;


  const quoteElem =
    document.querySelector(
      '.testimonial-quote'
    );

  const authorNameElem =
    document.querySelector(
      '.testimonial-author-name'
    );

  const authorRoleElem =
    document.querySelector(
      '.testimonial-author-role'
    );

  const activeAvatarImg =
    document.querySelector(
      '.active-avatar-img'
    );

  const testIndexElem =
    document.querySelector(
      '.testimonial-index'
    );

  const testPrevBtn =
    document.querySelector(
      '.test-prev'
    );

  const testNextBtn =
    document.querySelector(
      '.test-next'
    );


  /* ============================================================
     UPDATE TESTIMONIAL
     ============================================================ */

  const updateTestimonial = (index) => {

    if (!testimonials.length) return;


    currentTestimonialIndex =
      (
        index +
        testimonials.length
      ) % testimonials.length;


    const currentTest =
      testimonials[
      currentTestimonialIndex
      ];


    if (
      quoteElem &&
      authorNameElem &&
      authorRoleElem &&
      activeAvatarImg
    ) {

      quoteElem.style.opacity = '0';


      window.setTimeout(() => {

        quoteElem.textContent =
          currentTest.quote;

        authorNameElem.textContent =
          currentTest.name;

        authorRoleElem.textContent =
          currentTest.role;

        activeAvatarImg.src =
          currentTest.avatar;

        activeAvatarImg.alt =
          currentTest.name;

        quoteElem.style.opacity = '1';

      }, 200);

    }


    /* TESTIMONIAL NUMBERS */

    if (testIndexElem) {

      testIndexElem.innerHTML = '';


      testimonials.forEach(
        (testimonial, index) => {

          const number =
            document.createElement(
              'span'
            );


          number.className =
            'testimonial-num';


          number.dataset.index =
            String(index);


          number.textContent =
            String(
              index + 1
            ).padStart(
              2,
              '0'
            );


          if (
            index ===
            currentTestimonialIndex
          ) {

            number.classList.add(
              'active'
            );

          }


          number.addEventListener(
            'click',
            () => {

              updateTestimonial(
                index
              );

            }
          );


          testIndexElem.appendChild(
            number
          );


          if (
            index <
            testimonials.length - 1
          ) {

            const separator =
              document.createElement(
                'span'
              );

            separator.className =
              'testimonial-separator';

            separator.textContent =
              ' / ';

            testIndexElem.appendChild(
              separator
            );

          }

        }
      );

    }

  };


  /* ============================================================
     TESTIMONIAL PREVIOUS
     ============================================================ */

  if (testPrevBtn) {

    testPrevBtn.addEventListener(
      'click',
      () => {

        updateTestimonial(
          currentTestimonialIndex - 1
        );

      }
    );

  }


  /* ============================================================
     TESTIMONIAL NEXT
     ============================================================ */

  if (testNextBtn) {

    testNextBtn.addEventListener(
      'click',
      () => {

        updateTestimonial(
          currentTestimonialIndex + 1
        );

      }
    );

  }


  /* ============================================================
     CLOUD AVATARS
     ============================================================ */

  document
    .querySelectorAll(
      '.cloud-card img'
    )
    .forEach(
      (avatar, index) => {

        avatar.style.cursor =
          'pointer';


        avatar.addEventListener(
          'click',
          () => {

            const testimonialIndex =
              index %
              testimonials.length;


            updateTestimonial(
              testimonialIndex
            );


            showToast(
              `Selected Testimonial: ${testimonials[testimonialIndex].name}`
            );

          }
        );

      }
    );


  updateTestimonial(0);


  /* ============================================================
     VIDEO MODAL
     ============================================================ */

  if (
    videoPreviewCard &&
    videoModal &&
    videoIframe
  ) {

    videoPreviewCard.setAttribute(
      'tabindex',
      '0'
    );


    const openVideoModal = () => {

      videoIframe.src =
        'https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=1';

      videoModal.classList.add(
        'active'
      );

      document.body.classList.add(
        'modal-open'
      );

    };


    const closeVideoModal = () => {

      videoModal.classList.remove(
        'active'
      );

      videoIframe.src = '';

      document.body.classList.remove(
        'modal-open'
      );

    };


    videoPreviewCard.addEventListener(
      'click',
      openVideoModal
    );


    videoPreviewCard.addEventListener(
      'keydown',
      (event) => {

        if (
          event.key === 'Enter' ||
          event.key === ' '
        ) {

          event.preventDefault();

          openVideoModal();

        }

      }
    );


    if (videoCloseBtn) {

      videoCloseBtn.addEventListener(
        'click',
        closeVideoModal
      );

    }


    videoModal.addEventListener(
      'click',
      (event) => {

        if (
          event.target ===
          videoModal
        ) {

          closeVideoModal();

        }

      }
    );


    document.addEventListener(
      'keydown',
      (event) => {

        if (
          event.key === 'Escape' &&
          videoModal.classList.contains(
            'active'
          )
        ) {

          closeVideoModal();

        }

      }
    );

  }


  /* ============================================================
     CONTACT FORM
     ============================================================ */

  const contactForm =
    document.querySelector(
      '#contact-form'
    );


  if (contactForm) {

    contactForm.addEventListener(
      'submit',
      (event) => {

        event.preventDefault();


        const firstName =
          document.querySelector(
            '#firstName'
          )?.value.trim();


        const email =
          document.querySelector(
            '#email'
          )?.value.trim();


        if (
          !firstName ||
          !email
        ) {

          showToast(
            'Please fill out required fields (First Name & Email).'
          );

          return;

        }


        showToast(
          `Thank you ${firstName}! Your message has been submitted.`
        );


        contactForm.reset();

      }
    );

  }


  /* ============================================================
     NEWSLETTER FORM
     ============================================================ */

  const newsletterForm =
    document.querySelector(
      '#newsletter-form'
    );


  if (newsletterForm) {

    newsletterForm.addEventListener(
      'submit',
      (event) => {

        event.preventDefault();


        const emailInput =
          document.querySelector(
            '#newsletterEmail'
          );


        const email =
          emailInput?.value.trim();


        if (!email) {

          showToast(
            'Please enter a valid email address.'
          );

          return;

        }


        showToast(
          'Thank you for subscribing to the Orange PR newsletter!'
        );


        newsletterForm.reset();

      }
    );

  }


  /* ============================================================
     SERVICES CARD SLIDER
     ============================================================ */

  const serviceTrack =
    document.querySelector(
      '.services-cards-grid'
    );


  const serviceIndex =
    document.querySelector(
      '.services-index'
    );


  if (serviceTrack) {

    let serviceCards =
      Array.from(
        serviceTrack.querySelectorAll(
          '.service-card'
        )
      );


    /* ========================================================
       ORIGINAL CARD ORDER
       ======================================================== */

    const originalCards =
      [...serviceCards];


    let currentService = 0;


    /* ========================================================
       REFRESH CARDS
       ======================================================== */

    const refreshCards = () => {

      serviceCards =
        Array.from(
          serviceTrack.querySelectorAll(
            '.service-card'
          )
        );

    };


    /* ========================================================
       UPDATE SERVICE NUMBERS
       ======================================================== */

    const updateServiceNumbers = () => {

      if (!serviceIndex) return;


      serviceIndex.innerHTML = '';


      serviceCards.forEach(
        (card, index) => {

          const number =
            document.createElement(
              'span'
            );


          number.className =
            'service-number';


          const originalIndex =
            Number(
              card.dataset.index
            );


          number.textContent =
            String(
              originalIndex + 1
            ).padStart(
              2,
              '0'
            );


          number.dataset.index =
            String(
              originalIndex
            );


          if (index === 0) {

            number.classList.add(
              'active'
            );

          }


          number.addEventListener(
            'click',
            () => {

              activateService(
                originalIndex
              );

            }
          );


          serviceIndex.appendChild(
            number
          );


          if (
            index <
            serviceCards.length - 1
          ) {

            const separator =
              document.createElement(
                'span'
              );


            separator.className =
              'service-separator';


            separator.textContent =
              ' / ';


            serviceIndex.appendChild(
              separator
            );

          }

        }
      );

    };


    /* ========================================================
       UPDATE ACTIVE STATE
       ======================================================== */

    const updateActiveState = () => {

      refreshCards();


      serviceCards.forEach(
        (card, index) => {

          if (index === 0) {

            card.classList.add(
              'active'
            );

          } else {

            card.classList.remove(
              'active'
            );

          }

        }
      );


      updateServiceNumbers();

    };


    /* ========================================================
       ACTIVATE SERVICE
       ======================================================== */

    const activateService = (targetIndex) => {

      if (
        targetIndex < 0 ||
        targetIndex >=
        originalCards.length
      ) {

        return;

      }


      const rotated = [

        ...originalCards.slice(
          targetIndex
        ),

        ...originalCards.slice(
          0,
          targetIndex
        )

      ];


      rotated.forEach(
        (card) => {

          serviceTrack.appendChild(
            card
          );

        }
      );


      currentService =
        targetIndex;


      updateActiveState();

    };


    /* ========================================================
       CARD CLICK / KEYBOARD
       ======================================================== */

    originalCards.forEach(
      (card) => {

        card.setAttribute(
          'tabindex',
          '0'
        );


        card.addEventListener(
          'click',
          (event) => {

            if (
              event.target.closest(
                '.service-card-btn'
              )
            ) {

              return;

            }


            const index =
              Number(
                card.dataset.index
              );


            activateService(
              index
            );

          }
        );


        card.addEventListener(
          'keydown',
          (event) => {

            if (
              event.key ===
              'Enter' ||
              event.key ===
              ' '
            ) {

              event.preventDefault();


              const index =
                Number(
                  card.dataset.index
                );


              activateService(
                index
              );

            }

          }
        );

      }
    );


    /* ========================================================
       SERVICE ARROW BUTTONS
       ======================================================== */

    originalCards.forEach(
      (card) => {

        const button =
          card.querySelector(
            '.service-card-btn'
          );


        if (!button) return;


        button.addEventListener(
          'click',
          (event) => {

            event.preventDefault();

            event.stopPropagation();


            const nextIndex =
              (
                currentService + 1
              ) %
              originalCards.length;


            activateService(
              nextIndex
            );

          }
        );

      }
    );


    /* ========================================================
       INITIAL SERVICE STATE
       ======================================================== */

    activateService(0);

  }


  /* ============================================================
     GRID MENU BUTTON - MOBILE / DESKTOP ANIMATION
     ============================================================ */

  if (gridIconBtn) {

    const svg =
      gridIconBtn.querySelector(
        'svg'
      );


    if (svg) {

      svg.style.transition =
        'transform 0.45s ease';


      gridIconBtn.addEventListener(
        'click',
        () => {

          if (
            gridIconBtn.classList.contains(
              'menu-open'
            )
          ) {

            svg.style.transform =
              'rotate(90deg)';

          } else {

            svg.style.transform =
              'rotate(0deg)';

          }

        }
      );

    }

  }


  /* ============================================================
     WINDOW RESIZE
     ============================================================ */

  window.addEventListener(
    'resize',
    () => {

      /*
       * When switching from mobile to desktop,
       * make sure the mobile menu does not remain open.
       */

      if (
        window.innerWidth > 900 &&
        navMenu
      ) {

        closeMenu();

      }

    }
  );


});