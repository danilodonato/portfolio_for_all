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

    // --- 2. SISTEMA DE TRADUÇÃO (PT / EN) ---
    const buttonsLang = document.querySelectorAll('.btn-lang');
    let currentLang = 'PT'; 

    buttonsLang.forEach(button => {
        button.addEventListener('click', () => {
            // Efeito visual de clique piscando
            button.classList.add('clicked');
            setTimeout(() => button.classList.remove('clicked'), 300);

            // Alterna o idioma
            currentLang = currentLang === 'PT' ? 'EN' : 'PT';

            // Altera o texto dos botões (Mobile e Desktop)
            buttonsLang.forEach(btn => {
                btn.textContent = currentLang === 'PT' ? 'BR' : 'EN';
            });

            // Traduz os elementos da página
            const translatableElements = document.querySelectorAll('[data-pt][data-en]');
            translatableElements.forEach(element => {
                const textTarget = currentLang === 'EN' ? element.getAttribute('data-en') : element.getAttribute('data-pt');

                // Preserva a tag da empresa (.company-name) se existir
                if (element.querySelector('.company-name')) {
                    const companyHTML = element.querySelector('.company-name').outerHTML;
                    element.innerHTML = `${textTarget} ${companyHTML}`;
                } else {
                    element.textContent = textTarget;
                }
            });
        });
    });

    // --- 3. SCROLL SPY (INDICADOR DE SEÇÃO ATIVA) ---
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

// --- Parallax da Sidebar de Experiências (Desktop vs Mobile) ---
ScrollTrigger.matchMedia({
    "(min-width: 1025px)": function() {
        gsap.to('.experience-sidebar', {
            y: () => {
                const wrapper = document.querySelector('.experience-wrapper');
                const sidebar = document.querySelector('.experience-sidebar');
                if (wrapper && sidebar) {
                    return wrapper.offsetHeight - sidebar.offsetHeight;
                }
                return 0;
            },
            ease: "none",
            scrollTrigger: {
                trigger: '.experience-section',
                start: 'top 120px',
                end: 'bottom bottom',
                scrub: 1,
                invalidateOnRefresh: true
            }
        });
    },

    "(max-width: 1024px)": function() {
        gsap.set('.experience-sidebar', { clearProps: "all" });
    }
});

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


function applyColorsToIframe() {
                const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
                
                // 1. Aplica as variáveis CSS diretamente na tag <html> (documentElement) de dentro do iframe
                if (innerDoc && innerDoc.documentElement) {
                    innerDoc.documentElement.style.setProperty('--primary-color', activeColor);
                    innerDoc.documentElement.style.setProperty('--primary-glow', activeGlow);
                    innerDoc.documentElement.style.setProperty('--primary-gradient', activeGradient);
                }

                // 2. Garante que se houver alguma tag <body> lá dentro, ela também receba as novas cores
                if (innerDoc && innerDoc.body) {
                    innerDoc.body.style.setProperty('--primary-color', activeColor);
                    innerDoc.body.style.setProperty('--primary-glow', activeGlow);
                    innerDoc.body.style.setProperty('--primary-gradient', activeGradient);
                }
            }