// Menú hamburguesa
document.querySelector('.hamburger').addEventListener('click', () => {
  document.querySelector('.nav-links').classList.toggle('active');
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

// Cargar animaciones Lottie según la página
if (document.getElementById('lottie-animation')) {
  createLottiePlayer('lottie-animation', 'assets/animations/hero-animation.json');
}
['contact', 'blog', 'qa'].forEach(id => {
  if (document.getElementById(`lottie-${id}`)) {
    createLottiePlayer(`lottie-${id}`, `assets/animations/${id}-animation.json`);
  }
});

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

