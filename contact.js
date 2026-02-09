function initCardAnimation() {
  const cards = document.querySelectorAll('.contact-info-card, .social-links, .booking-widget-wrapper');

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        setTimeout(() => {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateX(0)';
        }, index * 100);
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1
  });

  cards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateX(40px)';
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
      const speed = (index + 1) * 25;
      const x = (mouseX - 0.5) * speed;
      const y = (mouseY - 0.5) * speed;

      orb.style.transform = `translate(${x}px, ${y}px)`;
    });
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    initCardAnimation();
    initParallaxEffect();
  });
} else {
  initCardAnimation();
  initParallaxEffect();
}
