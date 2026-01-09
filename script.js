// Slider Simples em Loop Infinito
class SimpleSlider {
    constructor() {
        this.slides = [
            {
                image: 'services/clareamento3.jpeg',
                title: 'Clareamento Especializado'
            },
            {
                image: 'services/depilação4.png',
                title: 'Depilação Completa'
            },
            {
                image: 'services/depilaçãoaxila2.png',
                title: 'Depilação Axila'
            },
            {
                image: 'services/plasticadospes1.png',
                title: 'Tratamento para os Pés'
            }
        ];
        
        this.currentSlide = 0;
        this.totalSlides = this.slides.length;
        this.sliderInterval = null;
        this.slidesWrapper = document.querySelector('.slides-wrapper');
        this.dotsContainer = document.querySelector('.slider-dots');
        
        this.init();
    }
    
    init() {
        this.createSlides();
        this.createDots();
        this.startAutoPlay();
        this.setupEventListeners();
    }
    
    createSlides() {
        this.slides.forEach((slide, index) => {
            const slideElement = document.createElement('div');
            slideElement.className = 'slide';
            slideElement.innerHTML = `
                <img src="${slide.image}" alt="${slide.title}">
                <div class="slide-caption">
                    <h3>${slide.title}</h3>
                </div>
            `;
            this.slidesWrapper.appendChild(slideElement);
        });
    }
    
    createDots() {
        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.className = `dot ${index === 0 ? 'active' : ''}`;
            dot.addEventListener('click', () => this.goToSlide(index));
            this.dotsContainer.appendChild(dot);
        });
    }
    
    goToSlide(index) {
        this.currentSlide = index;
        this.updateSlider();
    }
    
    nextSlide() {
        this.currentSlide = (this.currentSlide + 1) % this.totalSlides;
        this.updateSlider();
    }
    
    updateSlider() {
        // Calcular posição baseada no slide atual
        const translateX = -this.currentSlide * 25; // Cada slide tem 25% de width
        this.slidesWrapper.style.transform = `translateX(${translateX}%)`;
        
        // Atualizar dots
        const dots = document.querySelectorAll('.dot');
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === this.currentSlide);
        });
    }
    
    startAutoPlay() {
        this.sliderInterval = setInterval(() => {
            this.nextSlide();
        }, 4000); // Muda a cada 4 segundos
    }
    
    stopAutoPlay() {
        if (this.sliderInterval) {
            clearInterval(this.sliderInterval);
            this.sliderInterval = null;
        }
    }
    
    setupEventListeners() {
        // Pausar no hover
        this.slidesWrapper.addEventListener('mouseenter', () => this.stopAutoPlay());
        this.slidesWrapper.addEventListener('mouseleave', () => this.startAutoPlay());
        
        // Touch para mobile
        let touchStartX = 0;
        
        this.slidesWrapper.addEventListener('touchstart', (e) => {
            touchStartX = e.touches[0].clientX;
            this.stopAutoPlay();
        });
        
        this.slidesWrapper.addEventListener('touchend', (e) => {
            const touchEndX = e.changedTouches[0].clientX;
            const diff = touchStartX - touchEndX;
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.nextSlide();
                } else {
                    // Slide anterior
                    this.currentSlide = (this.currentSlide - 1 + this.totalSlides) % this.totalSlides;
                    this.updateSlider();
                }
            }
            
            this.startAutoPlay();
        });
    }
}

// Menu Toggle
const menuToggle = document.getElementById('menu-toggle');
const navbar = document.querySelector('.navbar');
const navLinks = document.querySelectorAll('.navbar a');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navbar.classList.toggle('active');
        menuToggle.innerHTML = navbar.classList.contains('active') 
            ? '<i class="bi bi-x"></i>' 
            : '<i class="bi bi-list"></i>';
    });
}

// Fechar menu ao clicar em um link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navbar.classList.remove('active');
        if (menuToggle) {
            menuToggle.innerHTML = '<i class="bi bi-list"></i>';
        }
    });
});

// Header scroll effect
const header = document.querySelector('.header');
if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Fechar menu mobile se aberto
            if (navbar && navbar.classList.contains('active')) {
                navbar.classList.remove('active');
                if (menuToggle) {
                    menuToggle.innerHTML = '<i class="bi bi-list"></i>';
                }
            }
        }
    });
});

// Inicializar quando o DOM carregar
document.addEventListener('DOMContentLoaded', () => {
    // Inicializar slider
    if (document.querySelector('.services-slider')) {
        new SimpleSlider();
    }
    
    // Ativar link ativo baseado na posição de scroll
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.navbar a');
    
    function setActiveNavItem() {
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollY >= (sectionTop - 150)) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}`) {
                item.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', setActiveNavItem);
});