document.addEventListener('DOMContentLoaded', () => {
    const iframe = document.getElementById('portfolio-iframe');
    const wrapper = document.getElementById('iframe-wrapper');

    let activeColor = "#A384FF";
    let activeGlow = "rgba(163, 132, 255, 0.15)";
    let activeGradient = "linear-gradient(to right, #A384FF, #7C3AED)";
    let activeBgImage = "space.svg"; // Variável para controlar o SVG de fundo
    
    let importedCvUrl = "";
    let uploadedPhotosUrls = ["", "", ""];
    let uploadedProjImagesUrls = ["", "", "", ""];

    // Controle de visualização (Mobile/Tablet/Desktop)
    const viewButtons = document.querySelectorAll('.view-btn');
    viewButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            viewButtons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const view = btn.getAttribute('data-view');
            wrapper.style.width = view === 'mobile' ? '375px' : view === 'tablet' ? '768px' : '100%';
            wrapper.style.height = view === 'mobile' ? '667px' : '100%';
        });
    });

    // Seletor de Cores
    const colorDots = document.querySelectorAll('.color-dot');
    colorDots.forEach(dot => {
        dot.addEventListener('click', () => {
            colorDots.forEach(d => d.classList.remove('active'));
            dot.classList.add('active');
            activeColor = dot.getAttribute('data-color');
            activeGlow = dot.getAttribute('data-glow');
            activeGradient = dot.getAttribute('data-gradient');
            
            // Mapeia a cor escolhida para a imagem SVG correspondente na pasta
            const colorMap = {
                '#A384FF': 'space.svg',
                '#38BDF8': 'space-blue.svg',
                '#34D399': 'space-green.svg',
                '#F472B6': 'space-pink.svg',
                '#FB923C': 'space-orange.svg'
            };
            activeBgImage = colorMap[activeColor] || 'space.svg';

            applyCSSVariables();
        });
    });

    // Aplica as variáveis CSS e troca as imagens
    // Aplica as variáveis CSS e troca as imagens
    // Aplica as variáveis CSS e troca as imagens (Versão com preservação de Gradientes)
    function applyCSSVariables() {
        // 1. ATUALIZA O PAINEL DO GERADOR (Menu Esquerdo)
        document.documentElement.style.setProperty('--accent-color', activeColor);

        // 2. ATUALIZA O IFRAME (Portfólio)
        const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
        const innerWindow = iframe.contentWindow;
        if (!innerDoc || !innerDoc.documentElement) return;

        innerDoc.documentElement.style.setProperty('--primary-color', activeColor);
        innerDoc.documentElement.style.setProperty('--primary-glow', activeGlow);
        innerDoc.documentElement.style.setProperty('--primary-gradient', activeGradient);

        // 3. TROCA O BRILHO SVG MANTENDO OS GRADIENTES INTACTOS
        
        // A) Verifica tags <img> normais
        innerDoc.querySelectorAll('img').forEach(img => {
            if (img.src && img.src.includes('space') && img.src.includes('.svg')) {
                img.src = `/src/assets/svg/${activeBgImage}`;
            }
        });

        let dynamicStyles = "";
        
        // Expressão regular (Regex) para encontrar apenas a parte "url(...space...svg)" sem apagar o linear-gradient
        const bgRegex = /url\(['"]?[^'")]*space[^'")]*\.svg['"]?\)/gi;
        const newUrl = `url("/src/assets/svg/${activeBgImage}")`;

        // B) Verifica elementos e pseudo-elementos (::before / ::after) no CSS
        innerDoc.querySelectorAll('body, div, section, main, header').forEach(el => {
            
            // 1. Elemento direto
            const style = innerWindow.getComputedStyle(el);
            if (style.backgroundImage && style.backgroundImage.includes('space') && style.backgroundImage.includes('.svg')) {
                // Substitui apenas o SVG, mantendo o linear-gradient intacto
                const newBg = style.backgroundImage.replace(bgRegex, newUrl);
                el.style.setProperty('background-image', newBg, 'important');
            }

            // 2. Pseudo-elemento ::before
            const beforeStyle = innerWindow.getComputedStyle(el, '::before');
            if (beforeStyle.backgroundImage && beforeStyle.backgroundImage.includes('space') && beforeStyle.backgroundImage.includes('.svg')) {
                const newBgBefore = beforeStyle.backgroundImage.replace(bgRegex, newUrl);
                const selector = el.id ? '#' + el.id : (el.classList.length > 0 ? '.' + Array.from(el.classList).join('.') : el.tagName.toLowerCase());
                dynamicStyles += `${selector}::before { background-image: ${newBgBefore} !important; }\n`;
            }
            
            // 3. Pseudo-elemento ::after
            const afterStyle = innerWindow.getComputedStyle(el, '::after');
            if (afterStyle.backgroundImage && afterStyle.backgroundImage.includes('space') && afterStyle.backgroundImage.includes('.svg')) {
                const newBgAfter = afterStyle.backgroundImage.replace(bgRegex, newUrl);
                const selector = el.id ? '#' + el.id : (el.classList.length > 0 ? '.' + Array.from(el.classList).join('.') : el.tagName.toLowerCase());
                dynamicStyles += `${selector}::after { background-image: ${newBgAfter} !important; }\n`;
            }
        });

        // Injeta as regras combinadas
        let styleTag = innerDoc.getElementById('dynamic-bg-before');
        if (!styleTag) {
            styleTag = innerDoc.createElement('style');
            styleTag.id = 'dynamic-bg-before';
            innerDoc.head.appendChild(styleTag);
        }
        
        styleTag.textContent = dynamicStyles;
    }// Aplica as variáveis CSS e troca as imagens (Versão com preservação de Gradientes)
    function applyCSSVariables() {

        // 1. ATUALIZA O IFRAME (Portfólio)
        const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
        const innerWindow = iframe.contentWindow;
        if (!innerDoc || !innerDoc.documentElement) return;

        innerDoc.documentElement.style.setProperty('--primary-color', activeColor);
        innerDoc.documentElement.style.setProperty('--primary-glow', activeGlow);
        innerDoc.documentElement.style.setProperty('--primary-gradient', activeGradient);

        // 2. TROCA O BRILHO SVG MANTENDO OS GRADIENTES INTACTOS
        
        // A) Verifica tags <img> normais
        innerDoc.querySelectorAll('img').forEach(img => {
            if (img.src && img.src.includes('space') && img.src.includes('.svg')) {
                img.src = `/src/assets/svg/${activeBgImage}`;
            }
        });

        let dynamicStyles = "";
        
        // Expressão regular (Regex) para encontrar apenas a parte "url(...space...svg)" sem apagar o linear-gradient
        const bgRegex = /url\(['"]?[^'")]*space[^'")]*\.svg['"]?\)/gi;
        const newUrl = `url("/src/assets/svg/${activeBgImage}")`;

        // B) Verifica elementos e pseudo-elementos (::before / ::after) no CSS
        innerDoc.querySelectorAll('body, div, section, main, header').forEach(el => {
            
            // 1. Elemento direto
            const style = innerWindow.getComputedStyle(el);
            if (style.backgroundImage && style.backgroundImage.includes('space') && style.backgroundImage.includes('.svg')) {
                // Substitui apenas o SVG, mantendo o linear-gradient intacto
                const newBg = style.backgroundImage.replace(bgRegex, newUrl);
                el.style.setProperty('background-image', newBg, 'important');
            }

            // 2. Pseudo-elemento ::before
            const beforeStyle = innerWindow.getComputedStyle(el, '::before');
            if (beforeStyle.backgroundImage && beforeStyle.backgroundImage.includes('space') && beforeStyle.backgroundImage.includes('.svg')) {
                const newBgBefore = beforeStyle.backgroundImage.replace(bgRegex, newUrl);
                const selector = el.id ? '#' + el.id : (el.classList.length > 0 ? '.' + Array.from(el.classList).join('.') : el.tagName.toLowerCase());
                dynamicStyles += `${selector}::before { background-image: ${newBgBefore} !important; }\n`;
            }
            
            // 3. Pseudo-elemento ::after
            const afterStyle = innerWindow.getComputedStyle(el, '::after');
            if (afterStyle.backgroundImage && afterStyle.backgroundImage.includes('space') && afterStyle.backgroundImage.includes('.svg')) {
                const newBgAfter = afterStyle.backgroundImage.replace(bgRegex, newUrl);
                const selector = el.id ? '#' + el.id : (el.classList.length > 0 ? '.' + Array.from(el.classList).join('.') : el.tagName.toLowerCase());
                dynamicStyles += `${selector}::after { background-image: ${newBgAfter} !important; }\n`;
            }
        });

        // Injeta as regras combinadas
        let styleTag = innerDoc.getElementById('dynamic-bg-before');
        if (!styleTag) {
            styleTag = innerDoc.createElement('style');
            styleTag.id = 'dynamic-bg-before';
            innerDoc.head.appendChild(styleTag);
        }
        
        styleTag.textContent = dynamicStyles;
    }
    function setupLiveBinding() {
        const innerDoc = iframe.contentDocument || iframe.contentWindow.document;
        const innerWindow = iframe.contentWindow;
        if (!innerDoc || !innerWindow) return;

        // Restaura as cores no reload do iframe
        applyCSSVariables();

        // Lógica de Foto de Perfil
        function updatePhotoState() {
            const hasPhoto = !!uploadedPhotosUrls[0];
            innerDoc.body.classList.toggle('no-profile-photo', !hasPhoto);
            
            if (hasPhoto) {
                innerDoc.documentElement.style.setProperty('--profile-img', `url("${uploadedPhotosUrls[0]}")`);
            }

            if (innerWindow.overviewSwiper && typeof innerWindow.overviewSwiper.update === 'function') {
                innerWindow.overviewSwiper.update();
            }
        }
        updatePhotoState();

        // Redes Sociais
        document.querySelectorAll('.social-checkbox input').forEach(chk => {
            chk.addEventListener('change', () => {
                const net = chk.getAttribute('data-social');
                const altNet = net === 'instagram' ? 'insta' : net;
                const targets = innerDoc.querySelectorAll(`.social-btn[aria-label*="${net}" i], .social-btn[aria-label*="${altNet}" i], a[href*="${net}" i], a[href*="${altNet}" i]`);
                targets.forEach(el => {
                    const anchor = el.tagName === 'A' ? el : el.closest('a');
                    if (anchor) anchor.style.setProperty('display', chk.checked ? 'inline-flex' : 'none', 'important');
                });
            });
        });

        // Helper para Inputs de Texto Simples
        const bindText = (inputId, targetSelector, isAttr = false) => {
            const input = document.getElementById(inputId);
            if (!input) return;
            input.addEventListener('input', (e) => {
                const targets = innerDoc.querySelectorAll(targetSelector);
                targets.forEach(t => {
                    t.textContent = e.target.value;
                    if (isAttr) {
                        t.setAttribute('data-pt', e.target.value);
                        t.setAttribute('data-en', e.target.value);
                    }
                });
            });
        };

        bindText('input-brand', '#brand-name');
        bindText('input-name', '#hero-name, .overview-name');
        bindText('input-bio', '#hero-bio', true);
        bindText('input-about-desc', '.overview-description', true);
        bindText('input-contact-bio', '.contact-description', true);
        bindText('input-badge', '#hero-badge-text, .badge-purple', true);

        // Footer Dinâmico
        const nameInput = document.getElementById('input-name');
        if (nameInput) {
            nameInput.addEventListener('input', () => {
                const footerElement = innerDoc.querySelector('.footer-credits');
                if (footerElement) {
                    const footerString = `© ${new Date().getFullYear()} ${nameInput.value}. Todos os direitos reservados.`;
                    footerElement.textContent = footerString;
                    footerElement.setAttribute('data-pt', footerString);
                }
            });
        }

        // Email e Localização
        const emailInput = document.getElementById('input-contact-email');
        if (emailInput) {
            emailInput.addEventListener('input', () => {
                const btn = innerDoc.querySelector('.btn-start-project, a[href^="mailto:"]');
                if (btn) btn.setAttribute('href', `mailto:${emailInput.value.trim()}`);
            });
        }

        const locInput = document.getElementById('input-about-location');
        if (locInput) {
            locInput.addEventListener('input', () => {
                const locTarget = innerDoc.querySelector('.location-text');
                if (locTarget) {
                    locTarget.textContent = `Residente em ${locInput.value}`;
                    locTarget.setAttribute('data-pt', `Residente em ${locInput.value}`);
                }
            });
        }

        // === EXPERIÊNCIAS ===
        const selectQtyExp = document.getElementById('select-qty-exp');
        function syncExperiences() {
            const qty = parseInt(selectQtyExp.value);
            const expCards = innerDoc.querySelectorAll('.experience-card');
            
            for(let i=1; i<=3; i++) {
                const block = document.querySelector(`.id-exp-${i}`);
                if(block) block.style.display = i <= qty ? 'block' : 'none';
            }

            const expWrapper = innerDoc.querySelector('.experience-wrapper');
            if (expWrapper) expWrapper.classList.toggle('exp-wrapper-single-active', qty <= 2);

            expCards.forEach((card, index) => {
                const num = index + 1;
                if (index < qty) {
                    card.style.setProperty('display', 'flex', 'important');
                    
                    const titleInput = document.getElementById(`input-exp-title-${num}`);
                    const companyInput = document.getElementById(`input-exp-company-${num}`);
                    const titleTarget = card.querySelector('.job-title');

                    if (titleInput && companyInput && titleTarget) {
                        const updateTitle = () => titleTarget.innerHTML = `${titleInput.value} <span class="company-name">• ${companyInput.value}</span>`;
                        titleInput.addEventListener('input', updateTitle);
                        companyInput.addEventListener('input', updateTitle);
                    }

                    bindText(`input-exp-date-${num}`, '.card-date');
                    bindText(`input-exp-desc-${num}`, '.job-description');

                    const techsInput = document.getElementById(`input-exp-techs-${num}`);
                    const techsContainer = card.querySelector('.tech-badges');
                    if (techsInput && techsContainer) {
                        techsInput.addEventListener('input', (e) => {
                            techsContainer.innerHTML = '';
                            e.target.value.split(',').forEach(tech => {
                                if(!tech.trim()) return;
                                const span = innerDoc.createElement('span');
                                span.className = 'badge';
                                span.textContent = tech.trim();
                                techsContainer.appendChild(span);
                            });
                        });
                    }
                } else {
                    card.style.setProperty('display', 'none', 'important');
                }
            });
            setTimeout(() => { if (innerWindow.ScrollTrigger) innerWindow.ScrollTrigger.refresh(); }, 50);
        }
        if (selectQtyExp) { syncExperiences(); selectQtyExp.addEventListener('change', syncExperiences); }

        // === PROJETOS ===
        const selectQtyProj = document.getElementById('select-qty-proj');
        function syncProjects() {
            const qty = parseInt(selectQtyProj.value);
            const projectCards = innerDoc.querySelectorAll('.project-card, .portfolio-card');
            const projectGrid = innerDoc.querySelector('.projects-grid, .portfolio-grid');

            for(let i=1; i<=4; i++) {
                const block = document.querySelector(`.id-proj-${i}`);
                if(block) block.style.display = i <= qty ? 'block' : 'none';
            }

            if (!projectGrid || !projectCards) return;

            projectGrid.classList.remove('portfolio-full-width', 'portfolio-three-stretch');
            if (qty === 1) projectGrid.classList.add('portfolio-full-width');
            else if (qty === 3) projectGrid.classList.add('portfolio-three-stretch');

            projectCards.forEach((card, index) => {
                const num = index + 1;
                if (index < qty) {
                    card.style.setProperty('display', 'flex', 'important');

                    bindText(`input-proj-title-${num}`, '.project-title, .portfolio-title');
                    bindText(`input-proj-desc-${num}`, '.project-description, .portfolio-description');

                    const imgTarget = card.querySelector('.project-img, .portfolio-img');
                    if (imgTarget && uploadedProjImagesUrls[index]) imgTarget.src = uploadedProjImagesUrls[index];

                    const techsInput = document.getElementById(`input-proj-techs-${num}`);
                    const techsContainer = card.querySelector('.tech-badges, .project-techs');
                    if (techsInput && techsContainer) {
                        techsInput.addEventListener('input', (e) => {
                            techsContainer.innerHTML = '';
                            e.target.value.split(',').forEach(tech => {
                                if(!tech.trim()) return;
                                const span = innerDoc.createElement('span');
                                span.className = card.querySelector('.tech-tag') ? 'tech-tag' : 'badge';
                                span.textContent = tech.trim();
                                techsContainer.appendChild(span);
                            });
                        });
                    }

                    const btnCode = card.querySelector('.project-link-btn:not(.live), .portfolio-link:not(.live)');
                    const btnLive = card.querySelector('.project-link-btn.live, .portfolio-link.live');
                    const codeInput = document.getElementById(`input-proj-code-${num}`);
                    const liveInput = document.getElementById(`input-proj-live-${num}`);
                    const chkDemo = document.getElementById(`chk-proj-demo-${num}`);

                    if (codeInput && btnCode) codeInput.addEventListener('input', (e) => btnCode.setAttribute('href', e.target.value));
                    if (liveInput && btnLive) liveInput.addEventListener('input', (e) => btnLive.setAttribute('href', e.target.value));
                    
                    if (btnLive && chkDemo) {
                        chkDemo.addEventListener('change', () => {
                            btnLive.style.setProperty('display', chkDemo.checked ? 'inline-flex' : 'none', 'important');
                        });
                    }
                } else {
                    card.style.setProperty('display', 'none', 'important');
                }
            });
        }
        if (selectQtyProj) { syncProjects(); selectQtyProj.addEventListener('change', syncProjects); }

        // Lógica de Arquivos (Fotos e Mockups)
        document.querySelectorAll('.proj-file-input').forEach(input => {
            input.addEventListener('change', (e) => {
                if (e.target.files.length === 0) return;
                const index = parseInt(input.getAttribute('data-pindex'));
                uploadedProjImagesUrls[index] = URL.createObjectURL(e.target.files[0]);
                document.getElementById(`lbl-proj-img-${index + 1}`).textContent = `✓ Salvo`;
                syncProjects();
            });
        });

        document.querySelectorAll('.photo-file-input').forEach(input => {
            input.addEventListener('change', (e) => {
                if (e.target.files.length === 0) return;
                const index = parseInt(input.getAttribute('data-index'));
                uploadedPhotosUrls[index] = URL.createObjectURL(e.target.files[0]);
                document.getElementById(`lbl-img-${index + 1}`).textContent = `✓ Carregada`;
                updatePhotoState();
            });
        });

        [1,2,3,4].forEach(i => {
            const btn = document.getElementById(`lbl-proj-img-${i}`);
            const inp = document.getElementById(`input-proj-img-${i}`);
            if(btn && inp) btn.onclick = () => inp.click();
        });
        const btnProfile = document.getElementById('lbl-img-1');
        if(btnProfile) btnProfile.onclick = () => document.getElementById('input-img-1').click();

        const cvInput = document.getElementById('input-cv-file');
        const cvBtn = document.getElementById('upload-label');
        if (cvInput && cvBtn) {
            cvBtn.onclick = () => cvInput.click();
            cvInput.addEventListener('change', (e) => {
                if (e.target.files.length === 0) return;
                importedCvUrl = URL.createObjectURL(e.target.files[0]);
                cvBtn.textContent = `✓ PDF Pronto`;
                innerDoc.querySelectorAll('.btn-download').forEach(b => {
                    b.setAttribute('href', importedCvUrl);
                    b.setAttribute('target', '_blank');
                });
            });
        }

        if (innerWindow.ScrollTrigger) innerWindow.ScrollTrigger.refresh();
    }

    iframe.addEventListener('load', setupLiveBinding);
    if (iframe.contentDocument && iframe.contentDocument.readyState === 'complete') setupLiveBinding();
});

document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('download-zip-btn');
    const modal = document.getElementById('download-modal');
    const closeBtn = document.getElementById('close-modal-btn');

    // Abre o modal quando clicar em baixar
    downloadBtn.addEventListener('click', () => {
        modal.classList.add('active');
        
        // AQUI ENTRARÁ A LÓGICA DO JSZip QUE FAREMOS EM SEGUIDA!
        // gerarZipDoPortfolio();
    });

    // Fecha o modal ao clicar no X
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
});

// 1. Importações no TOPO do arquivo
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

document.addEventListener('DOMContentLoaded', () => {
    const downloadBtn = document.getElementById('download-zip-btn');
    const modal = document.getElementById('download-modal');
    const closeBtn = document.getElementById('close-modal-btn');

    // Abre o modal e INICIA O DOWNLOAD
    downloadBtn.addEventListener('click', async () => {
        // Mostra a tela bonita da sua logo falando
        modal.classList.add('active');
        
        // Chama a função pesada que gera o arquivo
        await gerarZipDoPortfolio();
    });

    // Fecha o modal ao clicar no X
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
});

// --- A MÁGICA DO DOWNLOAD ACONTECE AQUI ---
async function gerarZipDoPortfolio() {
    try {
        const zip = new JSZip();

        // 1. Capturar o iframe onde o portfólio está sendo modificado
        const iframe = document.getElementById('portfolio-iframe');
        let htmlContent = iframe.contentWindow.document.documentElement.outerHTML;

        // Limpeza de injeções do Vite (Remove scripts de recarregamento automático do Dev Server do HTML final)
        htmlContent = htmlContent.replace(/<script type="module" src="\/@vite\/client"><\/script>/g, '');

        // Adiciona a tag DOCTYPE
        htmlContent = "<!DOCTYPE html>\n" + htmlContent;

        // Adiciona o HTML principal na raiz do ZIP
        zip.file("index.html", htmlContent);

        // 2. LISTA DE ARQUIVOS (ASSETS) DO PORTFÓLIO
        // Coloque aqui o caminho exato de tudo que o site precisa para funcionar:
        const assetsNecessarios = [
            // Seus estilos (Ajuste o caminho se o nome for diferente)
            "/src/assets/css/style.css", 
            
            // Seu JavaScript do portfólio (se houver)
            // "/src/assets/js/main.js",
            
            // Suas imagens e SVGs
            "/src/assets/svg/github.svg",
            "/src/assets/svg/linkedin.svg",
            "/src/assets/svg/youtube.svg",
            "/src/assets/svg/insta.svg",
            "/src/assets/svg/logo_caelium.svg"
            // Continue adicionando outras imagens/assets que o iframe utiliza...
        ];

        // 3. Baixar cada arquivo da lista e colocar na pasta correta dentro do ZIP
        for (const url of assetsNecessarios) {
            try {
                const response = await fetch(url);
                if (response.ok) {
                    const blob = await response.blob();
                    
                    // Remove a primeira barra (/) para evitar criar uma pasta vazia na raiz do ZIP
                    const caminhoNoZip = url.startsWith('/') ? url.substring(1) : url;
                    
                    // O JSZip cria as pastas (src/assets/svg/...) automaticamente!
                    zip.file(caminhoNoZip, blob);
                } else {
                    console.warn(`Arquivo não encontrado para o ZIP: ${url}`);
                }
            } catch (erroArquivo) {
                console.error(`Erro ao tentar baixar ${url}:`, erroArquivo);
            }
        }

        // 4. Empacotar tudo (Gera o arquivo final)
        const content = await zip.generateAsync({ type: "blob" });

        // 5. Acionar o download para o usuário
        saveAs(content, "meu-portfolio.zip");

    } catch (error) {
        console.error("Erro ao gerar o ZIP:", error);
        alert("Ops! Houve um erro ao empacotar seu portfólio. Tente novamente.");
    }
}