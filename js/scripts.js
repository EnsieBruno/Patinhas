// --- 1. MÓDULO: NAVEGAÇÃO  --- //

 /* Inicializa os eventos do menu hambúrguer */
function initMobileMenu() {
    const menuToggle = document.querySelector('.menu-toggle');
    const body = document.body;

    if (menuToggle) {
        menuToggle.addEventListener('click', () => {
            body.classList.toggle('menu-open');

            const isExpanded = body.classList.contains('menu-open');
            menuToggle.setAttribute('aria-expanded', isExpanded);
        });
    }

    // Fecha o menu ao clicar em um link //
    document.querySelector('.menu ol')?.addEventListener('click', (e) => {
        if (e.target.tagName === 'A') {
            body.classList.remove('menu-open');
            menuToggle.setAttribute('aria-expanded', 'false');
        }
    });
}

// --- 2. MÓDULO: VALIDAÇÃO DE FORMULÁRIOS --- //


 /* Valida um número de CPF.
 * @param {string} cpf - O CPF a ser validado.
 * @returns {boolean} - True se o CPF for válido, false se inválido.
 */

function validaCPF(cpf) {
    cpf = cpf.replace(/[^\d]/g, ''); 
    if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)) return false;

    let soma = 0;
    let resto;

    for (let i = 1; i <= 9; i++) soma += parseInt(cpf.substring(i - 1, i)) * (11 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(9, 10))) return false;

    soma = 0;
    for (let i = 1; i <= 10; i++) soma += parseInt(cpf.substring(i - 1, i)) * (12 - i);
    resto = (soma * 10) % 11;
    if (resto === 10 || resto === 11) resto = 0;
    if (resto !== parseInt(cpf.substring(10, 11))) return false;

    return true;
}

/**
 * Aplica máscaras de input nos campos de formulário.
 */
function initFormMasks() {
    const cpfInput = document.getElementById('cpf');
    const telInput = document.getElementById('telefone');
    const cepInput = document.getElementById('cep');

    if (cpfInput) {
        cpfInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d)/, '$1.$2');
            value = value.replace(/(\d{3})(\d{1,2})$/, '$1-$2');
            e.target.value = value;
        });
    }

    if (telInput) {
        telInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/^(\d{2})(\d)/g, '($1) $2');
            value = value.replace(/(\d{5})(\d)/, '$1-$2');
            e.target.value = value;
        });
    }

    if (cepInput) {
        cepInput.addEventListener('input', (e) => {
            let value = e.target.value.replace(/\D/g, '');
            value = value.replace(/^(\d{5})(\d)/, '$1-$2');
            e.target.value = value;
        });
    }
}

/**
 * Inicializa a validação avançada da página de cadastro. */
function initCadastroPage() {
    initFormMasks(); 

    const form = document.getElementById('form-voluntario');
    const cpfInput = document.getElementById('cpf');
    
    if (form && cpfInput) {
        const removeOldAlert = () => {
            const oldAlert = form.querySelector('.alert-error');
            if (oldAlert) oldAlert.remove();
        };

        // Adiciona um aviso //
        const showAlert = (message) => {
            removeOldAlert();
            const alert = document.createElement('div');
            alert.className = 'alert alert-error';
            alert.textContent = message;
            form.prepend(alert);
        };

        // Valida no "submit" //
        form.addEventListener('submit', (e) => {
            removeOldAlert();
            if (!validaCPF(cpfInput.value)) {
                e.preventDefault();
                showAlert('CPF inválido. Por favor, verifique os dados.');
                cpfInput.focus();
                cpfInput.classList.add('input-error'); 
        });

        // Valida em tempo real (quando sai do campo) //
        cpfInput.addEventListener('blur', () => {
            removeOldAlert();
            if (cpfInput.value && !validaCPF(cpfInput.value)) {
                showAlert('CPF inválido.');
            }
        });
    }
}


// --- 3. MÓDULO: GRÁFICOS --- //

/**
 * Inicializa os gráficos da página de transparência.
 */
function initTransparenciaPage() {
    // Gráfico de Pizza //
    const recursosCtx = document.getElementById('recursosPizzaChart');
    if (recursosCtx) {
    
        if (window.chartRecursos) window.chartRecursos.destroy();
        
        window.chartRecursos = new Chart(recursosCtx, {
            type: 'pie',
            data: {
                labels: ['Alimentação', 'Cuidados Veterinários', 'Manutenção do Abrigo', 'Eventos', 'Administrativo'],
                datasets: [{
                    label: 'Distribuição de Recursos',
                    data: [40, 25, 15, 10, 10],
                    backgroundColor: ['#D95B23', '#FF7F50', '#FFD8B1', '#FA8072', '#E9967A'],
                    hoverOffset: 4
                }]
            }
        });
    }

    // Gráfico de Linha//
    const voluntariosCtx = document.getElementById('voluntariosLineChart');
    if (voluntariosCtx) {
        if (window.chartVoluntarios) window.chartVoluntarios.destroy();

        window.chartVoluntarios = new Chart(voluntariosCtx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out'],
                datasets: [{
                    label: 'Novos Voluntários',
                    data: [5, 8, 12, 10, 15, 18, 22, 25, 23, 30],
                    fill: false,
                    borderColor: '#D95B23',
                    tension: 0.1
                }]
            },
            options: { scales: { y: { beginAtZero: true } } }
        });
    }

    // Gráfico de Barras: Impacto Social por Região
    const impactoCtx = document.getElementById('impactoBarChart');
    if (impactoCtx) {
        if (window.chartImpacto) window.chartImpacto.destroy();

        window.chartImpacto = new Chart(impactoCtx, {
            type: 'bar',
            data: {
                labels: ['Centro', 'Bairro Norte', 'Bairro Sul', 'Bairro Leste', 'Bairro Oeste'],
                datasets: [{
                    label: 'Adoções Realizadas',
                    data: [65, 59, 80, 81, 56],
                    backgroundColor: ['#D95B23', '#FF7F50', '#FFD8B1', '#FA8072', '#E9967A']
                }]
            },
            options: { scales: { y: { beginAtZero: true } } }
        });
    }
}


// --- 4. MÓDULO: ROTEADOR SPA //

/**
 * Cache para o conteúdo das páginas (Template System)
 */
const pageCache = {};

/**
 * Roda os scripts específicos da página que acabou de ser carregada.
 */
function runPageScripts() {
    const path = window.location.pathname;

    if (path.endsWith('/') || path.endsWith('index.html')) {
        // Scripts da Home //
    } else if (path.endsWith('cadastro.html')) {
        initCadastroPage();
    } else if (path.endsWith('transparencia.html')) {
        initTransparenciaPage(); 
    }
}

/**
 * Carrega o conteúdo da página via fetch e o injeta no <main>.
 * @param {string} href
 */
async function loadPageContent(href) {
    const mainContainer = document.querySelector('main');
    if (!mainContainer) return;

    try {
        let content;
        
        if (pageCache[href]) {
            content = pageCache[href];
        } else {
            // 2. Se não está no cache, busca (fetch) //
            const response = await fetch(href);
            if (!response.ok) throw new Error('Página não encontrada');
            
            const html = await response.text();
            
            // 3. Parser do HTML para extrair <main> e <title> //
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            
            const newTitle = doc.querySelector('title')?.textContent || 'Patinhas.org';
            const newMain = doc.querySelector('main');

            if (!newMain) throw new Error('Conteúdo principal não encontrado');
            
            content = {
                title: newTitle,
                main: newMain.innerHTML
            };
            
            // 4. Salva no cache //
            pageCache[href] = content;
        }

        // 5. Injeta o conteúdo na página //
        document.title = content.title;
        mainContainer.innerHTML = content.main;

        // 6. Roda os scripts específicos da nova página //
        runPageScripts();

        // 7. Rola para o topo
        window.scrollTo(0, 0);

    } catch (error) {
        console.error('Erro ao carregar página:', error);
        mainContainer.innerHTML = '<section class="content-page"><h2>Erro ao carregar</h2><p>Não foi possível carregar esta página. Tente novamente.</p></section>';
    }
}

/**
 * Intercepta cliques em links locais //
 * @param {Event} e - O evento de clique.
 */
function handleLinkClick(e) {
    if (e.target.tagName === 'A' && e.target.origin === window.location.origin && !e.target.hash && e.target.target !== '_blank') {
        e.preventDefault(); // Impede o recarregamento da página //
        const href = e.target.href;
        
        // Não recarrega se for a mesma página //
        if (href === window.location.href) return;

        // Atualiza a URL na barra de endereços //
        window.history.pushState({ path: href }, '', href);
        
        // Carrega o novo conteúdo
        loadPageContent(href);
    }
}

/**
 * Lida com a navegação do histórico (botões voltar/avançar).
 */
window.addEventListener('popstate', (e) => {
    if (e.state && e.state.path) {
        loadPageContent(e.state.path);
    } else {
        
        loadPageContent(window.location.pathname);
    }
});

// --- 5. MÓDULO: INICIALIZAÇÃO --- //

/**
 * Função principal que inicializa o app.
 */
function initApp() {
    // 1. Inicializa o menu mobile (sempre presente) //
    initMobileMenu();

    // 2. Adiciona o 'listener' do SPA em todo o documento //
    document.addEventListener('click', handleLinkClick);

    // 3. Carrega os scripts da página atual //
    // Salva o conteúdo inicial no cache //
    pageCache[window.location.pathname] = {
        title: document.title,
        main: document.querySelector('main').innerHTML
    };
    runPageScripts();
}

// Roda o app quando o DOM estiver pronto. //
document.addEventListener('DOMContentLoaded', initApp);