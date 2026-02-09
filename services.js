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
            text: 'Koordination aller Termine, Kalenderführung und Erinnerungsservice für einen reibungslosen Praxisablauf'
          },
          {
            title: 'E-Mail & Korrespondenz',
            text: 'Professionelle Bearbeitung Ihrer E-Mails, Anfragen und geschäftliche Korrespondenz in Ihrem Namen'
          },
          {
            title: 'Dokumentenverwaltung',
            text: 'Digitale Ablage, Archivierung und Organisation aller wichtigen Unterlagen und Dokumente'
          },
          {
            title: 'Patientenkommunikation',
            text: 'Freundliche und professionelle Kommunikation mit Patienten via Telefon, E-Mail oder Chat'
          },
          {
            title: 'Buchhaltungsunterstützung',
            text: 'Rechnungsstellung, Mahnwesen und Unterstützung bei der Buchhaltung Ihrer Praxis'
          }
        ]
      }
    ]
  },
  travel: {
    icon: 'plane',
    title: 'Travel Management',
    subtitle: 'Stressfreies Reisen durch perfekt organisierte Reiseplanung und -durchführung',
    sections: [
      {
        title: 'Reiseservices',
        icon: 'map',
        items: [
          {
            title: 'Flug & Hotel',
            text: 'Recherche und Buchung von Flügen und Hotels nach Ihren Präferenzen und Budget'
          },
          {
            title: 'Reiseplanung',
            text: 'Erstellung detaillierter Reisepläne mit allen wichtigen Informationen und Kontakten'
          },
          {
            title: 'Visa & Dokumente',
            text: 'Unterstützung bei Visa-Anträgen und Organisation aller notwendigen Reisedokumente'
          },
          {
            title: 'Transfer & Mobilität',
            text: 'Organisation von Mietwagen, Transfers und lokalen Transportmöglichkeiten'
          },
          {
            title: '24/7 Support',
            text: 'Persönliche Betreuung während Ihrer Reise für spontane Änderungen und Notfälle'
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
            title: 'Konzeptentwicklung',
            text: 'Kreative Entwicklung des Event-Konzepts abgestimmt auf Ihre Ziele und Zielgruppe'
          },
          {
            title: 'Location & Catering',
            text: 'Auswahl und Buchung passender Veranstaltungsorte sowie Organisation des Caterings'
          },
          {
            title: 'Gästemanagement',
            text: 'Einladungsmanagement, RSVP-Tracking und Kommunikation mit allen Teilnehmern'
          },
          {
            title: 'Technische Ausstattung',
            text: 'Organisation von Audio-/Videotechnik, Präsentationsmaterialien und IT-Support'
          },
          {
            title: 'Event-Koordination',
            text: 'Professionelle Koordination am Veranstaltungstag für einen reibungslosen Ablauf'
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
            text: 'Strukturierte Planung mit klaren Meilensteinen, Zeitplänen und Ressourcenallokation'
          },
          {
            title: 'Team-Koordination',
            text: 'Effektive Koordination aller Beteiligten mit regelmäßiger Kommunikation und Updates'
          },
          {
            title: 'Budget & Controlling',
            text: 'Überwachung des Projektbudgets und detailliertes Reporting über den Projektstatus'
          },
          {
            title: 'Risikomanagement',
            text: 'Proaktive Identifikation von Risiken und Entwicklung von Gegenmaßnahmen'
          },
          {
            title: 'Qualitätssicherung',
            text: 'Kontinuierliche Qualitätskontrolle und Sicherstellung der Zielerreichung'
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
