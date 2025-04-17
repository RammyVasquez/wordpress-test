// Menú hamburguesa
document.querySelector('.hamburger').addEventListener('click', () => {
  const navLinks = document.querySelector('.nav-links');
  const hamburger = document.querySelector('.hamburger');
  navLinks.classList.toggle('active');
  const isExpanded = navLinks.classList.contains('active');
  hamburger.setAttribute('aria-expanded', isExpanded);
});

// Modo oscuro
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
  const currentTheme = document.body.getAttribute('data-theme');
  document.body.setAttribute('data-theme', currentTheme === 'dark' ? 'light' : 'dark');
  themeToggle.textContent = currentTheme === 'dark' ? '🌙' : '☀️';
});

// Respetar preferencia del sistema
if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
  document.body.setAttribute('data-theme', 'dark');
  themeToggle.textContent = '☀️';
}

// Inicializar AOS
AOS.init({ duration: 1000, once: true });

// Inicializar Swiper (para index.html y blog.html)
const swiperContainers = document.querySelectorAll('.swiper-container');
swiperContainers.forEach(container => {
  new Swiper(container, {
    slidesPerView: 1,
    spaceBetween: 20,
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });
});

// Botón Volver Arriba
const scrollTopBtn = document.querySelector('.scroll-top');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 300);
  });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

// Efecto Parallax
const heroBg = document.querySelector('.hero-bg');
if (heroBg) {
  window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    heroBg.style.transform = `scale(1.1) translateY(${scrollPosition * 0.3}px)`;
  });
}

// Animaciones Lottie
function createLottiePlayer(containerId, src) {
  const container = document.getElementById(containerId);
  if (!container) return;
  const player = document.createElement('lottie-player');
  player.src = src;
  player.loop = true;
  player.autoplay = true;
  container.appendChild(player);
}

// Cargar animaciones Lottie
if (document.getElementById('lottie-animation')) {
  createLottiePlayer('lottie-animation', 'assets/animations/hero-animation.json');
}
if (document.getElementById('lottie-about')) {
  createLottiePlayer('lottie-about', 'assets/animations/about-animation.json');
}
['contact', 'blog', 'qa'].forEach(id => {
  if (document.getElementById(`lottie-${id}`)) {
    createLottiePlayer(`lottie-${id}`, `assets/animations/${id}-animation.json`);
  }
});

// Inicializar Particles.js
if (document.getElementById('particles-js')) {
  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: '#ffffff' },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: true },
      size: { value: 3, random: true },
      line_linked: { enable: true, distance: 150, color: '#ffffff', opacity: 0.4, width: 1 },
      move: { enable: true, speed: 2, direction: 'none', random: true }
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: true, mode: 'repulse' }, onclick: { enable: true, mode: 'push' } },
      modes: { repulse: { distance: 100, duration: 0.4 }, push: { particles_nb: 4 } }
    },
    retina_detect: true
  });
}
// Cargar posts dinámicamente en blog.html
if (document.getElementById('posts')) {
  fetch('assets/posts.json')
    .then(response => response.json())
    .then(data => {
      const swiperWrapper = document.querySelector('#posts .swiper-wrapper');
      data.forEach(post => {
        swiperWrapper.innerHTML += `
          <div class="swiper-slide">
            <div class="card" data-aos="zoom-in">
              <img src="${post.image}" alt="${post.title}" class="post-image">
              <h3>${post.title}</h3>
              <p class="post-date">${post.date}</p>
              <p>${post.summary}</p>
              <a href="#" class="card-link">Leer Más</a>
            </div>
          </div>
        `;
      });
      // Reiniciar Swiper después de cargar los posts
      const swiper = document.querySelector('#posts').swiper;
      swiper.update();
    })
    .catch(error => console.error('Error al cargar posts:', error));
}

// Cargar posts destacados en index.html
if (document.getElementById('featured-posts')) {
  fetch('assets/posts.json')
    .then(response => response.json())
    .then(data => {
      const swiperWrapper = document.querySelector('#featured-posts .swiper-wrapper');
      data.slice(0, 3).forEach(post => {
        swiperWrapper.innerHTML += `
          <div class="swiper-slide">
            <div class="card" data-aos="zoom-in">
              <img src="${post.image}" alt="${post.title}" class="post-image">
              <h3>${post.title}</h3>
              <p class="post-date">${post.date}</p>
              <p>${post.summary}</p>
              <a href="#" class="card-link">Leer Más</a>
            </div>
          </div>
        `;
      });
      // Reiniciar Swiper
      const swiper = document.querySelector('#featured-posts').swiper;
      swiper.update();
    })
    .catch(error => console.error('Error al cargar posts:', error));
}

// Formularios de suscripción
const subscribeForms = document.querySelectorAll('#subscribe-form, #footer-subscribe');
subscribeForms.forEach(form => {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('¡Gracias por suscribirte!');
    form.reset();
  });
});

// Mini-Test
const quizButtons = document.querySelectorAll('.quiz-btn');
const quizResult = document.getElementById('quiz-result');
quizButtons.forEach(button => {
  button.addEventListener('click', () => {
    const topic = button.dataset.topic;
    let result = '';
    switch (topic) {
      case 'filosofia':
        result = '¡La filosofía es tu pasión! Explora grandes preguntas en mi blog.';
        break;
      case 'ciencia':
        result = '¡La ciencia te llama! Descubre avances y reflexiones en mis posts.';
        break;
      case 'sociedad':
        result = '¡La sociedad te inspira! Lee sobre cultura y conexiones humanas.';
        break;
    }
    quizResult.textContent = result;
  });
});

// Formulario de contacto en contacto.html
const contactForm = document.querySelector('#contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Formulario enviado!'); // Reemplaza con integración a Formspree
    contactForm.reset();
  });
}

// FAQ colapsable en qa.html
const faqQuestions = document.querySelectorAll('.faq-question');
faqQuestions.forEach(question => {
  question.addEventListener('click', () => {
    const answer = question.nextElementSibling;
    answer.classList.toggle('active');
    question.classList.toggle('active');
  });
});

