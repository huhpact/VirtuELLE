const packageData = {
  kennenlernen: {
    name: 'Kennenlernen',
    price: '115,43'
  },
  basic: {
    name: 'Basic',
    price: '270,13'
  },
  advanced: {
    name: 'Advanced',
    price: '650,93'
  },
  premium: {
    name: 'Premium',
    price: '1.186,43'
  }
};

function initBookingModal() {
  const modal = document.getElementById('bookingModal');
  const modalClose = document.getElementById('modalClose');
  const modalCancel = document.getElementById('modalCancel');
  const modalConfirm = document.getElementById('modalConfirm');
  const modalPackageInfo = document.getElementById('modalPackageInfo');
  const modalOverlay = modal.querySelector('.modal-overlay');
  const packageButtons = document.querySelectorAll('.package-button');

  let selectedPackage = null;

  packageButtons.forEach(button => {
    button.addEventListener('click', () => {
      const packageKey = button.getAttribute('data-package');
      selectedPackage = packageKey;
      const packageInfo = packageData[packageKey];

      modalPackageInfo.innerHTML = `
        <div style="text-align: left;">
          <div style="font-weight: 700; font-size: 1.25rem; color: var(--primary-color); margin-bottom: 0.5rem;">
            ${packageInfo.name}
          </div>
          
          <div style="font-size: 1.5rem; font-weight: 800; color: var(--text-color);">
            € ${packageInfo.price} <span style="font-size: 1rem; font-weight: 600;">brutto</span>
          </div>
        </div>
      `;

      modal.classList.add('active');
      document.body.style.overflow = 'hidden';

      setTimeout(() => {
        if (window.lucide) {
          window.lucide.createIcons();
        }
      }, 100);
    });
  });

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
    selectedPackage = null;
  }

  modalClose.addEventListener('click', closeModal);
  modalCancel.addEventListener('click', closeModal);
  modalOverlay.addEventListener('click', closeModal);

  modalConfirm.addEventListener('click', () => {
    if (selectedPackage) {
      window.location.href = `/contact.html?package=${selectedPackage}`;
    }
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
      closeModal();
    }
  });
}

function initCardAnimation() {
  const cards = document.querySelectorAll('.package-card, .rate-card');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 80);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(40px)';
    card.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
    observer.observe(card);
  });
}

function initParallaxEffect() {
  const orbs = document.querySelectorAll('.gradient-orb');

  window.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;

    orbs.forEach((orb, index) => {
      const speed = (index + 1) * 20;
      const x = (mouseX - 0.5) * speed;
      const y = (mouseY - 0.5) * speed;

      orb.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initBookingModal();
    initCardAnimation();
    initParallaxEffect();
  });
} else {
  initBookingModal();
  initCardAnimation();
  initParallaxEffect();
}
