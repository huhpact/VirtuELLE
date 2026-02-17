const serviceData = {
  office: {
    icon: 'briefcase',
    title: 'Office Management',
    subtitle: 'Professionelle Verwaltung Ihres Praxisalltags mit höchster Präzision und Diskretion',
    sections: [
      {
        title: 'Kernleistungen',
        icon: 'star',
        items: [
          {
            title: 'Terminmanagement',
            text: 'Professionelle Verwaltung Ihres Kalenders mit automatischen Erinnerungen und optimierter Zeitplanung'
          },
          {
            title: 'E-Mail-Management',
            text: 'Intelligentes Filtern, Priorisieren und Beantworten Ihrer E-Mails nach Ihren Vorgaben'
          },
          {
            title: 'Dokumentenverwaltung',
            text: 'Digitale Ablage und Organisation aller wichtigen Dokumente mit schnellem Zugriff'
          },
          {
            title: 'Telefonservice',
            text: '24/7 Erreichbarkeit für Ihre Patienten mit professionellem Call-Management'
          },
          {
            title: 'Patientenkommunikation',
            text: 'Freundliche und professionelle Kommunikation mit Ihren Patienten'
          },
            {
            title: 'Rechnungsstellung',
            text: 'Präzise Erstellung und Verwaltung von Rechnungen und Mahnwesen'
          }
        ]
      }
    ]
  },
  travel: {
    icon: 'plane',
    title: 'Travel Management',
    subtitle: 'Stressfreies Reisen durch perfekt organisierte Reiseplanung.',
    sections: [
      {
        title: 'Reiseservices',
        icon: 'map',
        items: [
          {
            title: 'Flug- & Hotelbuchungen',
            text: 'Optimale Reiseverbindungen und komfortable Unterkünfte zu besten Konditionen'
          },
          {
            title: 'Reiserouten',
            text: 'Detaillierte Reiserouten mit allen wichtigen Informationen und Kontakten'
          },
          {
            title: 'Mietwagen & Transfers',
            text: 'Organisation aller Transportmittel vor Ort'
          },
          {
            title: '24/7 Reisebetreuung',
            text: 'Persönlicher Ansprechpartner während Ihrer gesamten Reise'
          },
          {
            title: 'Reisekostenabrechnung',
            text: 'Strukturierte Erfassung und Abrechnung aller Reisekosten'
          }
        ]
      }
    ]
  },
  event: {
    icon: 'calendar',
    title: 'Event Management',
    subtitle: 'Unvergessliche Events durch professionelle Planung und perfekte Ausführung',
    sections: [
      {
        title: 'Event-Services',
        icon: 'sparkles',
        items: [
          {
            title: 'Konferenzorganisation',
            text: 'Komplette Planung und Durchführung von medizinischen Konferenzen und Seminaren'
          },
          {
            title: 'Team-Events',
            text: 'Kreative Konzepte für motivierende und verbindende Teamveranstaltungen'
          },
          {
            title: 'Location',
            text: 'Auswahl der perfekten Location passend zu Event-Typ und Budget'
          },
          {
            title: 'Catering-Management',
            text: 'Organisation hochwertiger Beköstigung für alle Teilnehmer'
          },
          {
            title: 'Gäste-Management',
            text: 'Professionelle Verwaltung von Einladungen, RSVPs und Teilnehmerlisten'
          },
           {
            title: 'Technische Ausstattung',
            text: 'Bereitstellung und Betreuung aller benötigten technischen Systeme'
          }
        ]
      }
    ]
  },
  project: {
    icon: 'target',
    title: 'Project Management',
    subtitle: 'Erfolgreiche Projektumsetzung durch strukturiertes Management und klare Zielverfolgung',
    sections: [
      {
        title: 'Projektleistungen',
        icon: 'check-circle',
        items: [
          {
            title: 'Projektplanung',
            text: 'Detaillierte Planung mit realistischen Zeitplänen und Meilensteinen'
          },
          {
            title: 'Team-Koordination',
            text: 'Effektive Koordination aller Beteiligten und Stakeholder'
          },
          {
            title: 'Budget-Controlling',
            text: 'Kontinuierliche Überwachung und Reporting der Projektkosten'
          },
          {
            title: 'Risikomanagement',
            text: 'Proaktive Identifikation und Behandlung potenzieller Risiken '
          },
          {
            title: 'Qualitätssicherung',
            text: 'Systematische Überprüfung aller Projektergebnisse'
          },
           {
            title: 'Dokumentation',
            text: 'Lückenlose Dokumentation aller Projektphasen und Entscheidungen'
          }
        ]
      }
    ]
  }
};

function initServiceModal() {
  const modal = document.getElementById('serviceModal');
  const modalBody = modal.querySelector('.service-modal-body');
  const closeBtn = modal.querySelector('.service-modal-close');
  const overlay = modal.querySelector('.service-modal-overlay');
  const serviceButtons = document.querySelectorAll('.service-card-button');

  serviceButtons.forEach(button => {
    button.addEventListener('click', (e) => {
      const serviceType = button.getAttribute('data-service');
      const data = serviceData[serviceType];

      if (data) {
        openModal(data, modalBody, modal);
      }
    });
  });

  closeBtn.addEventListener('click', () => {
    closeModal(modal);
  });

  overlay.addEventListener('click', () => {
    closeModal(modal);
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal(modal);
    }
  });
}

function openModal(data, modalBody, modal) {
  const content = `
    <div class="modal-header">
      <div class="modal-icon">
        <i data-lucide="${data.icon}"></i>
      </div>
      <h2 class="modal-title">${data.title}</h2>
      <p class="modal-subtitle">${data.subtitle}</p>
    </div>

    ${data.sections.map(section => `
      <div class="modal-section">
        <h3 class="modal-section-title">
          <i data-lucide="${section.icon}"></i>
          ${section.title}
        </h3>
        <ul class="modal-list">
          ${section.items.map(item => `
            <li>
              <i data-lucide="check-circle"></i>
              <div class="modal-list-content">
                <div class="modal-list-title">${item.title}</div>
                <div class="modal-list-text">${item.text}</div>
              </div>
            </li>
          `).join('')}
        </ul>
      </div>
    `).join('')}

    <div class="modal-footer">
      <button class="modal-cta-button" onclick="window.location.href='/contact.html'">
        Jetzt Beratung vereinbaren
        <i data-lucide="arrow-right"></i>
      </button>
    </div>
  `;

  modalBody.innerHTML = content;
  modal.classList.add('active');
  document.body.style.overflow = 'hidden';

  if (window.lucide) {
    lucide.createIcons();
  }
}

function closeModal(modal) {
  modal.classList.remove('active');
  document.body.style.overflow = '';
}

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const href = this.getAttribute('href');
      if (href === '#' || href === '') return;

      e.preventDefault();
      const target = document.querySelector(href);

      if (target) {
        const offsetTop = target.offsetTop - 100;
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });
}

function initCardAnimation() {
  const cards = document.querySelectorAll('.service-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(card);
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initServiceModal();
    initSmoothScroll();
    initCardAnimation();
  });
} else {
  initServiceModal();
  initSmoothScroll();
  initCardAnimation();
}
