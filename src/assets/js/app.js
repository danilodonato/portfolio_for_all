// Importando o GSAP e o ScrollTrigger das dependências locais
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// Importando o Swiper e seus estilos necessários
import Swiper from "swiper";
import "swiper/css"; // O Vite vai incluir os estilos do Swiper automaticamente aqui

// Registrar o plugin do GSAP como você já faz
gsap.registerPlugin(ScrollTrigger);

// O RESTANTE DO SEU CÓDIGO (Animações, Carrosséis, etc.) CONTINUA EXATAMENTE IGUAL ABAIXO...

// ==========================================
//          REGISTRO DE PLUGINS (GSAP)
// ==========================================
gsap.registerPlugin(ScrollTrigger);

// ==========================================
//      ESCOPO PRINCIPAL DO PROJETO (DOM)
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    
    // --- 1. CONFIGURAÇÕES DO MENU HAMBÚRGUER & UX ---
    const menuToggle = document.getElementById('menu-toggle');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-menu .nav-link');

    if (menuToggle && navMenu) {
        // Abre e fecha o menu cortina
        menuToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('open');
        });

        // MÁGICA DE UX: Fecha o menu automaticamente ao clicar em qualquer link
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                menuToggle.classList.remove('open');
            });
        });
    }

    // --- 2. SCROLL SPY (INDICADOR DE SEÇÃO ATIVA) ---
    const sections = document.querySelectorAll('section[id]');

    function scrollSpy() {
        const scrollY = window.pageYOffset || document.documentElement.scrollTop;

        sections.forEach(current => {
            const sectionHeight = current.offsetHeight;
            const sectionTop = current.offsetTop - 150; 
            const sectionId = current.getAttribute('id');

            if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
                navLinks.forEach(link => link.classList.remove('active'));
                
                const activeLink = document.querySelector(`.nav-menu a[href*="${sectionId}"]`);
                if (activeLink) {
                    activeLink.classList.add('active');
                }
            }
        });
    }

    window.addEventListener('scroll', scrollSpy);
    scrollSpy(); // Executa uma vez no load da página

    // --- 4. INICIALIZAÇÃO DO BACKGROUND DE ESTRELAS ---
    createStars();
});

// ==========================================
//        FUNÇÃO DA ANIMAÇÃO DE ESTRELAS
// ==========================================
function createStars() {
    const container = document.querySelector('.stars-container');
    if (!container) return;

    container.innerHTML = '';
    const starsCount = 50; 
    const isMobile = window.matchMedia("(max-width: 768px)").matches;

    for (let i = 0; i < starsCount; i++) {
        const star = document.createElement('div');
        star.classList.add('star');

        const size = Math.random() * 3 + 1; 
        
        const leftPosition = isMobile 
            ? Math.random() * 96 + 2 
            : Math.random() * 50 + 25;

        const duration = Math.random() * 8 + 5; 
        const delay = Math.random() * -10; 

        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${leftPosition}%`;
        star.style.animationDuration = `${duration}s`;
        star.style.animationDelay = `${delay}s`;

        if (size > 2.5) {
            star.style.boxShadow = '0 0 8px #ffffff';
        }

        container.appendChild(star);
    }
}

// ==========================================
//        ANIMAÇÕES EXTRA-DOM (GSAP & SWIPER)
// ==========================================

// --- Animação das Palavras Chave (Keywords) ---
const words = gsap.utils.toArray('.reveal-text');

if (words.length > 0) {
    const tl = gsap.timeline({
        scrollTrigger: {
            trigger: '.keywords-section', 
            start: 'top top',            
            end: `+=${words.length * 100}%`, 
            pin: true,                   
            scrub: 1,                    
        }
    });

    words.forEach((word, index) => {
        tl.to(word, {
            opacity: 1,
            y: 0,
            duration: 1
        })
        .to({}, { duration: 0.5 });
        
        if (index < words.length - 1) {
            tl.to(word, {
                opacity: 0,
                y: -40,
                duration: 1
            });
        }
    });
}


// --- Carrossel de Imagens (Swiper) ---
const overviewSwiper = new Swiper('.overview-image-wrapper', {
    loop: true,                 
    grabCursor: true,           
    effect: 'slide',            
    speed: 600,                 

    autoplay: {
        delay: 2000,            
        disableOnInteraction: false, 
    },

    pagination: {
        el: '.carousel-dots',
        clickable: true,        
    },
});