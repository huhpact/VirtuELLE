document.addEventListener('DOMContentLoaded', () => {
  initLucideIcons();
  initAOS();
  initFloatingHeader();
  initMobileMenu();
  initSmoothScroll();
  initAdvancedScrollEffects();
  initParallaxDecorations();
  initPricingCards();
  initActiveNavLinks();
  initCookieBanner();
  initTimelineAnimation();
  initAboutPageAnimations();
  initFAQ();
  initServiceModal();
  initPackageButtons();
  initServicesPageAnimations();
});

function initLucideIcons() {
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

function initAOS() {
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 1200,
      easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
      once: false,
      offset: 80,
      delay: 0,
      mirror: true,
    });
  }
}

function initFloatingHeader() {
  const header = document.getElementById('header');
  let lastScrollTop = 0;
  let ticking = false;

  function updateHeader() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    if (scrollTop > 100) {
      header.classList.add('floating');
    } else {
      header.classList.remove('floating');
    }

    lastScrollTop = scrollTop;
    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateHeader);
      ticking = true;
    }
  });
}

function initMobileMenu() {
  const hamburger = document.getElementById('hamburger');
  const nav = document.getElementById('nav');
  const navLinks = document.querySelectorAll('.nav-link');

  function closeMobileMenu() {
    hamburger.classList.remove('active');
    nav.classList.remove('active');
    document.body.style.overflow = '';
  }

  function openMobileMenu() {
    hamburger.classList.add('active');
    nav.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  if (hamburger && nav) {
    hamburger.addEventListener('click', () => {
      if (nav.classList.contains('active')) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });

    navLinks.forEach(link => {
      link.addEventListener('click', closeMobileMenu);
    });
  }
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');

      if (href === '#' || href === '#impressum' || href === '#privacy' || href === '#cookies') {
        return;
      }

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const headerOffset = 100;
        const elementPosition = target.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    });
  });
}

function initAdvancedScrollEffects() {
  const sections = document.querySelectorAll('section');
  let ticking = false;

  function revealSections() {
    const triggerBottom = window.innerHeight * 0.85;

    sections.forEach(section => {
      const sectionTop = section.getBoundingClientRect().top;

      if (sectionTop < triggerBottom) {
        section.style.opacity = '1';
        section.style.transform = 'translateY(0)';
      }
    });

    ticking = false;
  }

  sections.forEach(section => {
    section.style.opacity = '1';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  });

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(revealSections);
      ticking = true;
    }
  });
}

function initParallaxDecorations() {
  const floatingShapes = document.querySelectorAll('.floating-shape');
  const heroCircles = document.querySelectorAll('.hero-circle');
  const heroLines = document.querySelectorAll('.hero-line');
  const heroPlus = document.querySelectorAll('.hero-plus');
  let ticking = false;

  function updateParallax() {
    const scrollY = window.pageYOffset;
    const scrollPercent = scrollY / (document.documentElement.scrollHeight - window.innerHeight);

    floatingShapes.forEach((shape, index) => {
      const speed = 0.1 + (index * 0.05);
      const yPos = scrollY * speed;
      const rotation = scrollPercent * 360 * (index % 2 === 0 ? 1 : -1);
      shape.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
    });

    heroCircles.forEach((circle, index) => {
      const speed = 0.15 + (index * 0.08);
      const yPos = -scrollY * speed;
      const scale = 1 + (scrollPercent * 0.3);
      circle.style.transform = `translateY(${yPos}px) scale(${scale}) rotate(${scrollY * 0.1}deg)`;
    });

    heroLines.forEach((line, index) => {
      const speed = 0.2 + (index * 0.05);
      const yPos = -scrollY * speed;
      line.style.transform = `translateY(${yPos}px) scaleX(${1 + scrollPercent})`;
    });

    heroPlus.forEach((plus, index) => {
      const speed = 0.12 + (index * 0.06);
      const yPos = -scrollY * speed;
      const rotation = scrollY * 0.5 * (index % 2 === 0 ? 1 : -1);
      plus.style.transform = `translateY(${yPos}px) rotate(${rotation}deg)`;
      plus.style.opacity = Math.max(0.05, 0.15 - scrollPercent * 0.2);
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });

  updateParallax();
}


function initPricingCards() {
  const pricingCards = document.querySelectorAll('.pricing-card');
  const pricingButtons = document.querySelectorAll('.pricing-btn');
  const pricingToggles = document.querySelectorAll('[data-pricing-toggle]');

  pricingCards.forEach((card, index) => {
    card.addEventListener('mouseenter', () => {
      card.style.zIndex = '10';
    });

    card.addEventListener('mouseleave', () => {
      setTimeout(() => {
        card.style.zIndex = '';
      }, 300);
    });
  });

  pricingToggles.forEach(toggle => {
    toggle.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.stopPropagation();
        const card = toggle.closest('.pricing-card');
        const wasExpanded = card.classList.contains('expanded');

        pricingCards.forEach(c => c.classList.remove('expanded'));

        if (!wasExpanded) {
          card.classList.add('expanded');
        }

        if (typeof lucide !== 'undefined') {
          lucide.createIcons();
        }
      }
    });
  });

  pricingButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();

      const card = button.closest('.pricing-card');
      const packageName = card.querySelector('.pricing-name').textContent;

      showNotification(`Vielen Dank für Ihr Interesse am ${packageName} Paket. Wir werden uns in Kürze bei Ihnen melden.`, 'success');

      setTimeout(() => {
        const contactSection = document.getElementById('contact');
        if (contactSection) {
          contactSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 1500);
    });
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      pricingCards.forEach(card => card.classList.remove('expanded'));
    }
  });
}


function initActiveNavLinks() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  function updateActiveLink() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
      const sectionHeight = section.offsetHeight;
      const sectionTop = section.offsetTop - 150;
      const sectionId = section.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();
}

function initCountUpAnimation() {
  const stats = document.querySelectorAll('.stat-number');
  let animated = false;

  function animateCountUp(element, target) {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target;
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current) + '+';
      }
    }, 16);
  }

  function checkStatsVisibility() {
    if (animated) return;

    const heroStats = document.querySelector('.hero-stats');
    if (!heroStats) return;

    const rect = heroStats.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

    if (isVisible) {
      animated = true;
      stats.forEach(stat => {
        const text = stat.textContent;
        const number = parseInt(text.replace(/\D/g, ''));
        if (!isNaN(number)) {
          stat.textContent = '0';
          setTimeout(() => animateCountUp(stat, number), 200);
        }
      });
    }
  }

  window.addEventListener('scroll', checkStatsVisibility);
  checkStatsVisibility();
}

function initScrollProgressIndicator() {
  const progressBar = document.createElement('div');
  progressBar.className = 'scroll-progress';
  progressBar.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    height: 3px;
    background: linear-gradient(90deg, #FF69B4, #FF1493);
    z-index: 9999;
    transform-origin: 0%;
    transform: scaleX(0);
    transition: transform 0.1s ease;
  `;
  document.body.appendChild(progressBar);

  function updateProgress() {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercentage = (scrollTop / scrollHeight);
    progressBar.style.transform = `scaleX(${scrollPercentage})`;
  }

  window.addEventListener('scroll', updateProgress);
}


document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }
});

function initCookieBanner() {
  const cookieBanner = document.getElementById('cookieBanner');
  const cookieModal = document.getElementById('cookieModal');
  const cookieAccept = document.getElementById('cookieAccept');
  const cookieMore = document.getElementById('cookieMore');
  const cookieModalClose = document.getElementById('cookieModalClose');
  const cookieModalOverlay = document.getElementById('cookieModalOverlay');
  const cookieSaveSettings = document.getElementById('cookieSaveSettings');

  const cookieEssential = document.getElementById('cookieEssential');
  const cookieMarketing = document.getElementById('cookieMarketing');
  const cookieAnalytics = document.getElementById('cookieAnalytics');

  if (!cookieBanner) return;

  const COOKIE_NAME = 'virtuelle_cookie_consent';
  const COOKIE_EXPIRY_DAYS = 365;

  function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = `expires=${date.toUTCString()}`;
    document.cookie = `${name}=${value};${expires};path=/`;
  }

  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }

  function hideBanner() {
    cookieBanner.classList.add('hidden');
    setTimeout(() => {
      cookieBanner.style.display = 'none';
    }, 400);
  }

  function saveCookiePreferences(preferences) {
    setCookie(COOKIE_NAME, JSON.stringify(preferences), COOKIE_EXPIRY_DAYS);
    hideBanner();
  }

  function openModal() {
    cookieModal.classList.add('active');
    cookieModal.classList.remove('closing');
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    }, 100);
  }

  function closeModal() {
    cookieModal.classList.add('closing');
    setTimeout(() => {
      cookieModal.classList.remove('active', 'closing');
      document.body.style.overflow = '';
    }, 300);
  }

  const existingConsent = getCookie(COOKIE_NAME);
  if (existingConsent) {
    cookieBanner.style.display = 'none';

    try {
      const preferences = JSON.parse(existingConsent);
      if (preferences.analytics) {
        console.log('Analytics enabled');
      }
      if (preferences.marketing) {
        console.log('Marketing enabled');
      }
    } catch (e) {
      console.error('Error parsing cookie preferences:', e);
    }
  }

  cookieAccept.addEventListener('click', () => {
    const preferences = {
      essential: true,
      marketing: true,
      analytics: true,
      timestamp: new Date().toISOString()
    };
    saveCookiePreferences(preferences);
  });

  cookieMore.addEventListener('click', () => {
    openModal();
  });

  cookieModalClose.addEventListener('click', () => {
    closeModal();
  });

  cookieModalOverlay.addEventListener('click', () => {
    closeModal();
  });

  cookieSaveSettings.addEventListener('click', () => {
    const preferences = {
      essential: cookieEssential.checked,
      marketing: cookieMarketing.checked,
      analytics: cookieAnalytics.checked,
      timestamp: new Date().toISOString()
    };
    saveCookiePreferences(preferences);
    closeModal();
  });

}

function initTimelineAnimation() {
  const timeline = document.querySelector('.timeline');
  const timelineLine = document.querySelector('.timeline-line');

  if (!timeline || !timelineLine) return;

  let ticking = false;

  function updateTimelineLine() {
    const timelineRect = timeline.getBoundingClientRect();
    const timelineTop = timelineRect.top;
    const timelineHeight = timelineRect.height;
    const windowHeight = window.innerHeight;

    const scrolled = windowHeight - timelineTop;
    const scrollProgress = Math.max(0, Math.min(scrolled / timelineHeight, 1));

    const lineHeight = scrollProgress * timelineHeight;
    timelineLine.style.height = `${lineHeight}px`;

    ticking = false;
  }

  function requestUpdate() {
    if (!ticking) {
      window.requestAnimationFrame(updateTimelineLine);
      ticking = true;
    }
  }

  window.addEventListener('scroll', requestUpdate);
  window.addEventListener('resize', requestUpdate);

  requestUpdate();
}

function initAboutPageAnimations() {
  initStatsCounter();
  initParallaxHero();
  initTimelineItemAnimations();
}

function initStatsCounter() {
  const statCards = document.querySelectorAll('.stat-card');
  if (statCards.length === 0) return;

  let animated = false;

  function animateCounter(element, target) {
    const duration = 2000;
    const start = 0;
    const increment = target / (duration / 16);
    let current = start;

    const timer = setInterval(() => {
      current += increment;
      if (current >= target) {
        element.textContent = target.toLocaleString();
        clearInterval(timer);
      } else {
        element.textContent = Math.floor(current).toLocaleString();
      }
    }, 16);
  }

  function checkVisibility() {
    if (animated) return;

    const statsSection = document.querySelector('.stats-showcase');
    if (!statsSection) return;

    const rect = statsSection.getBoundingClientRect();
    const isVisible = rect.top < window.innerHeight && rect.bottom >= 0;

    if (isVisible) {
      animated = true;
      statCards.forEach((card, index) => {
        const numberElement = card.querySelector('.stat-number');
        const target = parseInt(numberElement.getAttribute('data-count'));

        setTimeout(() => {
          animateCounter(numberElement, target);
        }, index * 200);
      });
    }
  }

  window.addEventListener('scroll', checkVisibility);
  checkVisibility();
}

function initParallaxHero() {
  const heroCircles = document.querySelectorAll('.about-hero-bg .hero-circle');
  if (heroCircles.length === 0) return;

  let ticking = false;

  function updateParallax() {
    const scrollY = window.pageYOffset;

    heroCircles.forEach((circle, index) => {
      const speed = 0.1 + (index * 0.05);
      const yPos = scrollY * speed;
      circle.style.transform = `translate(0, ${yPos}px)`;
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });
}

function initTimelineItemAnimations() {
  const timelineItems = document.querySelectorAll('.timeline-item');
  if (timelineItems.length === 0) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        const icon = entry.target.querySelector('.timeline-icon');
        if (icon) {
          icon.style.animation = 'pulse 2s ease-in-out';
        }
      }
    });
  }, {
    threshold: 0.2,
    rootMargin: '-50px'
  });

  timelineItems.forEach((item) => {
    observer.observe(item);
  });
}

function initFAQ() {
  const faqItems = document.querySelectorAll('.faq-item');

  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');

    question.addEventListener('click', () => {
      const isActive = item.classList.contains('active');

      faqItems.forEach(otherItem => {
        otherItem.classList.remove('active');
      });

      if (!isActive) {
        item.classList.add('active');
      }

      if (typeof lucide !== 'undefined') {
        lucide.createIcons();
      }
    });
  });
}

function initServiceModal() {
  const modal = document.getElementById('serviceModal');
  if (!modal) return;

  const serviceButtons = document.querySelectorAll('.service-card-button');
  const closeButton = modal.querySelector('.service-modal-close');
  const overlay = modal.querySelector('.service-modal-overlay');
  const modalBody = modal.querySelector('.service-modal-body');

  const serviceDetails = {
    office: {
      title: 'Office Management',
      icon: 'briefcase',
      description: 'Professionelle Verwaltung Ihres Praxisalltags mit höchster Präzision und Diskretion. Wir übernehmen alle administrativen Aufgaben, damit Sie sich auf Ihre Patienten konzentrieren können.',
      features: [
        { title: 'Terminkoordination', desc: 'Professionelle Verwaltung Ihres Kalenders mit automatischen Erinnerungen und optimierter Zeitplanung' },
        { title: 'E-Mail-Management', desc: 'Intelligentes Filtern, Priorisieren und Beantworten Ihrer E-Mails nach Ihren Vorgaben' },
        { title: 'Dokumentenverwaltung', desc: 'Digitale Ablage und Organisation aller wichtigen Dokumente mit schnellem Zugriff' },
        { title: 'Telefonservice', desc: '24/7 Erreichbarkeit für Ihre Patienten mit professionellem Call-Management' },
        { title: 'Rechnungsstellung', desc: 'Präzise Erstellung und Verwaltung von Rechnungen und Mahnwesen' },
        { title: 'Patientenkommunikation', desc: 'Freundliche und professionelle Kommunikation mit Ihren Patienten' }
      ],
      benefits: [
        'Bis zu 15 Stunden pro Woche mehr Zeit für Patienten',
        'Reduzierung administrativer Fehler um 95%',
        'Verbesserte Patientenzufriedenheit',
        'Professionelles Image Ihrer Praxis'
      ]
    },
    travel: {
      title: 'Travel Management',
      icon: 'plane',
      description: 'Stressfreies Reisen durch perfekt organisierte Reiseplanung. Von der Buchung bis zur Rückkehr kümmern wir uns um jedes Detail Ihrer Geschäfts- oder Urlaubsreisen.',
      features: [
        { title: 'Flug- & Hotelbuchungen', desc: 'Optimale Reiseverbindungen und komfortable Unterkünfte zu besten Konditionen' },
        { title: 'Reiserouten', desc: 'Detaillierte Itineraries mit allen wichtigen Informationen und Kontakten' },
        { title: 'Visa & Dokumente', desc: 'Vollständige Abwicklung aller reisebezogenen Formalitäten' },
        { title: 'Mietwagen & Transfers', desc: 'Organisation aller Transportmittel vor Ort' },
        { title: '24/7 Reisebetreuung', desc: 'Persönlicher Ansprechpartner während Ihrer gesamten Reise' },
        { title: 'Reisekostenabrechnung', desc: 'Strukturierte Erfassung und Abrechnung aller Reisekosten' }
      ],
      benefits: [
        'Zeitersparnis von durchschnittlich 8 Stunden pro Reise',
        'Kosteneinsparungen durch optimierte Buchungen',
        'Stressfreies Reisen ohne organisatorische Sorgen',
        'Sofortige Hilfe bei unerwarteten Änderungen'
      ]
    },
    event: {
      title: 'Event Management',
      icon: 'calendar',
      description: 'Unvergessliche Events durch professionelle Planung und perfekte Ausführung. Wir organisieren Konferenzen, Seminare und Firmenfeiern bis ins kleinste Detail.',
      features: [
        { title: 'Konferenzorganisation', desc: 'Komplette Planung und Durchführung von medizinischen Konferenzen und Seminaren' },
        { title: 'Team-Events', desc: 'Kreative Konzepte für motivierende und verbindende Teamveranstaltungen' },
        { title: 'Location-Suche', desc: 'Auswahl der perfekten Location passend zu Event-Typ und Budget' },
        { title: 'Catering-Management', desc: 'Organisation hochwertiger Verpflegung für alle Teilnehmer' },
        { title: 'Technische Ausstattung', desc: 'Bereitstellung und Betreuung aller benötigten technischen Systeme' },
        { title: 'Gästemanagement', desc: 'Professionelle Verwaltung von Einladungen, RSVPs und Teilnehmerlisten' }
      ],
      benefits: [
        'Erfolgreiche Events ohne Stress',
        'Professionelles Projektmanagement',
        'Kostenoptimierung durch Erfahrung',
        'Begeisterte Teilnehmer und Gäste'
      ]
    },
    project: {
      title: 'Project Management',
      icon: 'target',
      description: 'Erfolgreiche Projektumsetzung durch strukturiertes Management. Wir führen Ihre Projekte effizient zum Ziel mit klarer Kommunikation und transparenten Prozessen.',
      features: [
        { title: 'Projektplanung', desc: 'Detaillierte Planung mit realistischen Zeitplänen und Meilensteinen' },
        { title: 'Team-Koordination', desc: 'Effektive Koordination aller Beteiligten und Stakeholder' },
        { title: 'Budget-Überwachung', desc: 'Kontinuierliche Kontrolle und Reporting der Projektkosten' },
        { title: 'Risikomanagement', desc: 'Proaktive Identifikation und Behandlung potenzieller Risiken' },
        { title: 'Qualitätssicherung', desc: 'Systematische Überprüfung aller Projektergebnisse' },
        { title: 'Dokumentation', desc: 'Lückenlose Dokumentation aller Projektphasen und Entscheidungen' }
      ],
      benefits: [
        'Termingerechte Projektumsetzung',
        'Einhaltung des Budgets',
        'Hohe Qualität der Ergebnisse',
        'Transparente Kommunikation'
      ]
    }
  };

  function openModal(serviceType) {
    const details = serviceDetails[serviceType];
    if (!details) return;

    let featuresHTML = '';
    details.features.forEach(feature => {
      featuresHTML += `
        <div class="modal-feature">
          <h4>${feature.title}</h4>
          <p>${feature.desc}</p>
        </div>
      `;
    });

    let benefitsHTML = '';
    details.benefits.forEach(benefit => {
      benefitsHTML += `<li><i data-lucide="check"></i>${benefit}</li>`;
    });

    modalBody.innerHTML = `
      <div class="modal-header">
        <div class="modal-icon">
          <i data-lucide="${details.icon}"></i>
        </div>
        <h2>${details.title}</h2>
        <p>${details.description}</p>
      </div>
      <div class="modal-features">
        <h3>Leistungen im Detail</h3>
        <div class="features-grid">
          ${featuresHTML}
        </div>
      </div>
      <div class="modal-benefits">
        <h3>Ihre Vorteile</h3>
        <ul>
          ${benefitsHTML}
        </ul>
      </div>
      <div class="modal-cta">
        <a href="/#contact" class="modal-cta-button">
          Jetzt beraten lassen
          <i data-lucide="arrow-right"></i>
        </a>
      </div>
    `;

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  serviceButtons.forEach(button => {
    button.addEventListener('click', () => {
      const serviceType = button.getAttribute('data-service');
      openModal(serviceType);
    });
  });

  closeButton.addEventListener('click', closeModal);
  overlay.addEventListener('click', closeModal);

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

function initPackageButtons() {
  const packageButtons = document.querySelectorAll('.package-button');

  packageButtons.forEach(button => {
    button.addEventListener('click', () => {
      const packageCard = button.closest('.package-card');
      const packageTitle = packageCard.querySelector('.package-title').textContent;

      showNotification(`Vielen Dank für Ihr Interesse am ${packageTitle} Paket. Wir werden uns in Kürze bei Ihnen melden.`, 'success');

      setTimeout(() => {
        window.location.href = '/#contact';
      }, 1500);
    });
  });
}

function initServicesPageAnimations() {
  const servicesHero = document.querySelector('.services-hero');
  if (!servicesHero) return;

  const heroCircles = servicesHero.querySelectorAll('.hero-circle');
  let ticking = false;

  function updateParallax() {
    const scrollY = window.pageYOffset;

    heroCircles.forEach((circle, index) => {
      const speed = 0.1 + (index * 0.05);
      const yPos = scrollY * speed;
      circle.style.transform = `translate(0, ${yPos}px)`;
    });

    ticking = false;
  }

  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(updateParallax);
      ticking = true;
    }
  });

  const timelineNumbers = document.querySelectorAll('.timeline-number');
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.animation = 'pulse 1s ease-in-out';
        setTimeout(() => {
          entry.target.style.animation = '';
        }, 1000);
      }
    });
  }, {
    threshold: 0.5
  });

  timelineNumbers.forEach(number => {
    observer.observe(number);
  });
}
