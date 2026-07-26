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

                innerDoc.title = `Portfolio // ${nameInput.value}`;
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

            for (let i = 1; i <= 3; i++) {
                const block = document.querySelector(`.id-exp-${i}`);
                if (block) block.style.display = i <= qty ? 'block' : 'none';
            }

            const expWrapper = innerDoc.querySelector('.experience-wrapper');
            if (expWrapper) expWrapper.classList.toggle('exp-wrapper-single-active', qty <= 2);

            expCards.forEach((card, index) => {
                const num = index + 1;
                if (index < qty) {
                    card.style.setProperty('display', 'flex', 'important');

                    const titleInput = document.getElementById(`input-exp-title-${num}`);
                    const companyInput = document.getElementById(`input-exp-company-${num}`);

                    // Aqui usamos classe porque o 'card.querySelector' busca isoladamente SÓ dentro deste card
                    const titleTarget = card.querySelector('.job-title');

                    if (titleInput && companyInput && titleTarget) {
                        const updateTitle = () => titleTarget.innerHTML = `${titleInput.value} <span class="company-name">• ${companyInput.value}</span>`;
                        titleInput.addEventListener('input', updateTitle);
                        companyInput.addEventListener('input', updateTitle);
                    }

                    // === A CORREÇÃO ESTÁ AQUI 👇 ===
                    // Trocamos '.card-date' por '#exp-date-1', '#exp-date-2'...
                    bindText(`input-exp-date-${num}`, `#exp-date-${num}`);

                    // Trocamos '.job-description' por '#exp-desc-1', '#exp-desc-2'...
                    bindText(`input-exp-desc-${num}`, `#exp-desc-${num}`);
                    // ===============================

                    const techsInput = document.getElementById(`input-exp-techs-${num}`);
                    const techsContainer = card.querySelector('.tech-badges');
                    if (techsInput && techsContainer) {
                        techsInput.addEventListener('input', (e) => {
                            techsContainer.innerHTML = '';
                            e.target.value.split(',').forEach(tech => {
                                if (!tech.trim()) return;
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

            for (let i = 1; i <= 4; i++) {
                const block = document.querySelector(`.id-proj-${i}`);
                if (block) block.style.display = i <= qty ? 'block' : 'none';
            }

            if (!projectGrid || !projectCards) return;

            projectGrid.classList.remove('portfolio-full-width', 'portfolio-three-stretch');
            if (qty === 1) projectGrid.classList.add('portfolio-full-width');
            else if (qty === 3) projectGrid.classList.add('portfolio-three-stretch');

            projectCards.forEach((card, index) => {
                const num = index + 1;
                if (index < qty) {
                    card.style.setProperty('display', 'flex', 'important');

                    // === A MÁGICA ACONTECE AQUI 👇 ===
                    // Trocamos as classes genéricas pelos IDs únicos de cada card!
                    bindText(`input-proj-title-${num}`, `#proj-title-${num}`);
                    bindText(`input-proj-desc-${num}`, `#proj-desc-${num}`);
                    // =================================

                    const imgTarget = card.querySelector('.project-img, .portfolio-img');
                    if (imgTarget && uploadedProjImagesUrls[index]) imgTarget.src = uploadedProjImagesUrls[index];

                    const techsInput = document.getElementById(`input-proj-techs-${num}`);
                    const techsContainer = card.querySelector('.tech-badges, .project-techs');
                    if (techsInput && techsContainer) {
                        techsInput.addEventListener('input', (e) => {
                            techsContainer.innerHTML = '';
                            e.target.value.split(',').forEach(tech => {
                                if (!tech.trim()) return;
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

        [1, 2, 3, 4].forEach(i => {
            const btn = document.getElementById(`lbl-proj-img-${i}`);
            const inp = document.getElementById(`input-proj-img-${i}`);
            if (btn && inp) btn.onclick = () => inp.click();
        });
        const btnProfile = document.getElementById('lbl-img-1');
        if (btnProfile) btnProfile.onclick = () => document.getElementById('input-img-1').click();

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
                    // Preserva o nome/extensão real do arquivo para a exportação em zip
                    b.setAttribute('data-export-filename', e.target.files[0].name);
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

        // 1. Capturar o iframe e CLONAR a estrutura
        const iframeDoc = document.getElementById('portfolio-iframe').contentWindow.document;
        const htmlClone = iframeDoc.documentElement.cloneNode(true);

        // === 2. A EXTRAÇÃO DEFINITIVA DO CSS (USANDO CSSOM) ===
        // Lê as regras diretamente da memória de renderização do navegador!
        let combinedCSS = "";
        try {
            const sheets = iframeDoc.styleSheets;
            for (let i = 0; i < sheets.length; i++) {
                const sheet = sheets[i];
                // Pula fontes do Google para não dar bloqueio de segurança
                if (sheet.href && sheet.href.includes('fonts.googleapis')) continue;
                
                try {
                    const rules = sheet.cssRules || sheet.rules;
                    for (let j = 0; j < rules.length; j++) {
                        combinedCSS += rules[j].cssText + "\n";
                    }
                } catch (err) {
                    console.warn("Ignorando stylesheet externo (CORS)");
                }
            }
        } catch (error) {
            console.error("Erro ao ler CSSOM", error);
        }

        // Conserta os caminhos de imagens de fundo no CSS (/src/ => ./src/)
        combinedCSS = combinedCSS.replace(/http:\/\/localhost:\d+\/src\//g, './src/');
        combinedCSS = combinedCSS.replace(/url\(['"]?\/src\//gi, 'url("./src/');
        
        // Salva o CSS super poderoso e completo no ZIP!
        zip.file("style.css", combinedCSS);

        // === 3. FAXINA NO HTML ===
        // Limpa as tags de estilo e os scripts do Vite, pois o CSS final já foi salvo
        htmlClone.querySelectorAll('style').forEach(el => el.remove());
        htmlClone.querySelectorAll('script[src*="@vite"]').forEach(el => el.remove());

        // Desfaz a "sujeira" que o GSAP/ScrollTrigger deixou no DOM ao vivo (pin-spacer,
        // transforms inline). Se isso for exportado junto, o app.js recria o pin em cima
        // de um HTML que já nasce pinado e o layout quebra no arquivo baixado.
        htmlClone.querySelectorAll('.pin-spacer').forEach(spacer => {
            while (spacer.firstChild) {
                spacer.parentNode.insertBefore(spacer.firstChild, spacer);
            }
            spacer.remove();
        });
        htmlClone.querySelectorAll('.keywords-section, .reveal-text').forEach(el => {
            el.removeAttribute('style');
        });

        // Garante que o HTML chame o nosso novo style.css
        let hasCss = false;
        htmlClone.querySelectorAll('link[rel="stylesheet"]').forEach(link => {
            const href = link.getAttribute('href') || '';
            // Só troca o link do NOSSO CSS (Vite/SCSS). CDNs externos (Swiper, fontes)
            // precisam continuar apontando para fora, senão perdem o CSS inteiro no
            // export (o CSSOM não consegue ler regras cross-origin por CORS).
            if (href.includes('style.scss') || href.includes('style.css')) {
                link.setAttribute('href', './style.css');
                hasCss = true;
            }
        });
        if (!hasCss) {
            const cssLink = iframeDoc.createElement('link');
            cssLink.rel = 'stylesheet';
            cssLink.href = './style.css';
            htmlClone.querySelector('head').appendChild(cssLink);
        }

        // Arruma os scripts locais
        htmlClone.querySelectorAll('script[src]').forEach(script => {
            let currentSrc = script.getAttribute('src');
            if (currentSrc && currentSrc.startsWith('http')) return; 
            if (currentSrc && (currentSrc.includes('app.js') || currentSrc.includes('svg-inject'))) {
                script.removeAttribute('type'); 
                script.setAttribute('defer', 'true');
                let nomeScript = currentSrc.split('/').pop();
                script.setAttribute('src', './' + nomeScript);
            }
        });

        // Se o usuário nunca importou um currículo, o botão ainda aponta pro
        // placeholder "assets/pdf/seu-curriculo.pdf" (que não existe). Em vez de
        // exportar um link morto, esconde o botão.
        htmlClone.querySelectorAll('.btn-download').forEach(btn => {
            const href = btn.getAttribute('href') || '';
            if (!href.startsWith('blob:')) {
                btn.style.setProperty('display', 'none', 'important');
            }
        });

        // === 4. RASTREAMENTO PROFUNDO DE IMAGENS ===
        const arquivosBlob = [];
        let blobCounter = 1;

        htmlClone.querySelectorAll('img, [href]').forEach(el => {
            let currentPath = el.getAttribute('src') || el.getAttribute('href');
            if (!currentPath) return;

            if (currentPath.startsWith('blob:')) {
                // Respeita o nome/extensão original (ex: currículo em PDF) quando disponível,
                // em vez de forçar tudo para .jpg como se fosse imagem
                const nomeOriginal = el.getAttribute('data-export-filename');
                let novoNome = nomeOriginal || `img_upload_${blobCounter}.jpg`;
                el.removeAttribute('data-export-filename');
                if (!arquivosBlob.some(b => b.url === currentPath)) {
                    arquivosBlob.push({ url: currentPath, nome: novoNome });
                }
                if (el.hasAttribute('src')) el.setAttribute('src', './' + novoNome);
                if (el.hasAttribute('href') && !el.hasAttribute('rel')) el.setAttribute('href', './' + novoNome);
                blobCounter++;
            } else if (currentPath.includes('/src/')) {
                let cleanPath = currentPath.split('/src/').pop();
                if (el.hasAttribute('src')) el.setAttribute('src', './src/' + cleanPath);
                if (el.hasAttribute('href') && !currentPath.includes('.css')) el.setAttribute('href', './src/' + cleanPath);
            }
        });

        // Inclui o próprio htmlClone (a tag <html>): é nela que a foto de perfil é
        // aplicada via --profile-img, e querySelectorAll não busca no próprio elemento
        [htmlClone, ...htmlClone.querySelectorAll('[style]')].forEach(el => {
            let inlineStyle = el.getAttribute('style');
            if (inlineStyle && inlineStyle.includes('blob:')) {
                const regexBlob = /blob:http[^)"']+/g;
                const matches = inlineStyle.match(regexBlob);
                if (matches) {
                    matches.forEach(blobUrl => {
                        let novoNome = `img_upload_${blobCounter}.jpg`;
                        if (!arquivosBlob.some(b => b.url === blobUrl)) {
                            arquivosBlob.push({ url: blobUrl, nome: novoNome });
                        }
                        inlineStyle = inlineStyle.replace(blobUrl, './' + novoNome);
                        blobCounter++;
                    });
                    el.setAttribute('style', inlineStyle);
                }
            }
        });

        // Prepara e salva o HTML no ZIP
        const htmlContent = "<!DOCTYPE html>\n" + htmlClone.outerHTML;
        zip.file("index.html", htmlContent);

        // === 5. LISTA DE ARQUIVOS PADRÃO ===
        const assetsNecessarios = [
            "/app.js",
            "/src/assets/js/svg-inject.min.js",
            "/src/assets/svg/icon.svg",
            "/src/assets/svg/github.svg",
            "/src/assets/svg/linkedin.svg",
            "/src/assets/svg/youtube.svg",
            "/src/assets/svg/insta.svg",
            "/src/assets/svg/logo_caelium.svg",
            "/src/assets/svg/download.svg",
            "/src/assets/img/user.jpg",
            "/src/assets/img/ecommerce.jpg",
            "/src/assets/img/fintech.jpg",
            "/src/assets/img/data_analytics.jpg",
            "/src/assets/img/message_api.jpg",
            "/src/assets/img/user3.avif",
            "/src/assets/img/user4.avif"
        ];

        // 6. Baixar arquivos do projeto
        for (const url of assetsNecessarios) {
            try {
                const response = await fetch(url);
                if (response.ok) {
                    const blob = await response.blob();
                    let caminhoNoZip = url === '/app.js' ? 'app.js' : url.replace(/^\//, '');
                    zip.file(caminhoNoZip, blob);
                }
            } catch (erro) {
                console.error(`Erro ao baixar ${url}:`, erro);
            }
        }

        // 7. Salvar as fotos reais upadas
        for (const imgBlob of arquivosBlob) {
            try {
                const response = await fetch(imgBlob.url);
                if (response.ok) {
                    const blob = await response.blob();
                    zip.file(imgBlob.nome, blob); 
                }
            } catch (e) {
                console.error(`Erro ao salvar imagem upada:`, e);
            }
        }

        // 8. FINALIZAR E EXPORTAR O ZIP
        const content = await zip.generateAsync({ type: "blob" });
        saveAs(content, "meu-portfolio.zip");

    } catch (error) {
        console.error("Erro ao gerar o ZIP:", error);
        alert("Ops! Houve um erro ao empacotar seu portfólio.");
    }
}