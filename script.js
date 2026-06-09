// ========== FUNÇÕES PRINCIPAIS PARA TRABALHAR COM COOKIES ==========

/**
 * Cria um cookie com nome, valor e data de expiração
 * @param {string} nome - Nome do cookie
 * @param {string} valor - Valor do cookie
 * @param {number} dias - Número de dias até expiração
 */
function setCookie(nome, valor, dias) {
    let data = new Date();
    data.setTime(data.getTime() + (dias * 24 * 60 * 60 * 1000));
    let expira = "expires=" + data.toUTCString();
    document.cookie = nome + "=" + encodeURIComponent(valor) + ";" + expira + ";path=/";
    console.log(`🍪 Cookie criado: ${nome} = ${valor}`);
}

/**
 * Obtém o valor de um cookie pelo nome
 * @param {string} nome - Nome do cookie a buscar
 * @returns {string|null} Valor do cookie ou null se não encontrado
 */
function getCookie(nome) {
    let nomeComIgual = nome + "=";
    let cookies = document.cookie.split(';');
    for(let i = 0; i < cookies.length; i++) {
        let cookie = cookies[i].trim();
        if (cookie.indexOf(nomeComIgual) === 0) {
            return decodeURIComponent(cookie.substring(nomeComIgual.length));
        }
    }
    return null;
}

/**
 * Deleta um cookie configurando sua expiração no passado
 * @param {string} nome - Nome do cookie a deletar
 */
function deleteCookie(nome) {
    setCookie(nome, "", -1);
    console.log(`🗑️ Cookie deletado: ${nome}`);
}

/**
 * Obtém todos os cookies em um objeto
 * @returns {object} Objeto com todos os cookies
 */
function getAllCookies() {
    let cookies = {};
    if (document.cookie === "") return cookies;
    
    let cookieArray = document.cookie.split(';');
    cookieArray.forEach(function(cookie) {
        let [nome, valor] = cookie.trim().split('=');
        if (nome) {
            cookies[nome] = decodeURIComponent(valor || '');
        }
    });
    return cookies;
}

// ========== GERENCIAMENTO DE TEMAS ==========

/**
 * Aplica o tema (claro ou escuro) ao site
 * @param {string} tema - 'claro' ou 'escuro'
 */
function aplicarTema(tema) {
    const body = document.body;
    
    if (tema === 'escuro') {
        body.classList.add('tema-escuro');
        body.classList.remove('tema-claro');
    } else {
        body.classList.remove('tema-escuro');
        body.classList.add('tema-claro');
    }
    
    console.log(`🎨 Tema alterado para: ${tema}`);
}

// ========== EXEMPLO 1: PREFERÊNCIAS DE USUÁRIO ==========

function salvarPreferencias() {
    const nome = document.getElementById('userName').value;
    const tema = document.querySelector('input[name="tema"]:checked')?.value;
    const idioma = document.getElementById('idioma').value;

    if (!nome) {
        alert('Por favor, digite seu nome!');
        return;
    }

    // Salvar como cookies
    setCookie('usuario_nome', nome, 30);
    setCookie('usuario_tema', tema || 'claro', 30);
    setCookie('usuario_idioma', idioma, 30);

    // Aplicar o tema selecionado
    if (tema) {
        aplicarTema(tema);
    }

    // Mostrar resultado
    const resultado = `Nome: ${nome} | Tema: ${tema || 'claro'} | Idioma: ${idioma}`;
    document.getElementById('resultadoTexto1').textContent = resultado;
    document.getElementById('resultado1').style.display = 'block';

    console.log('✅ Preferências salvas:', { nome, tema, idioma });
}

function carregarPreferencias() {
    const nome = getCookie('usuario_nome');
    const tema = getCookie('usuario_tema');
    const idioma = getCookie('usuario_idioma');

    if (nome) {
        document.getElementById('userName').value = nome;
        const temaCarregado = tema || 'claro';
        document.querySelector(`input[name="tema"][value="${temaCarregado}"]`).checked = true;
        document.getElementById('idioma').value = idioma || 'pt';
        
        // Aplicar o tema carregado
        aplicarTema(temaCarregado);
        
        console.log('✅ Preferências carregadas');
    } else {
        // Aplicar tema padrão
        aplicarTema('claro');
    }
}

// ========== EXEMPLO 2: CONTADOR DE VISITAS ==========

function incrementarContador() {
    let visitas = getCookie('visitas');
    visitas = visitas ? parseInt(visitas) + 1 : 1;
    setCookie('visitas', visitas, 365);
    document.getElementById('visitCounter').textContent = `👁️ Visitas: ${visitas}`;
    console.log(`📊 Contador de visitas: ${visitas}`);
}

function resetarContador() {
    if (confirm('Tem certeza que quer resetar o contador?')) {
        deleteCookie('visitas');
        document.getElementById('visitCounter').textContent = `👁️ Visitas: 0`;
        document.getElementById('resultadoTexto2').textContent = 'Contador resetado com sucesso!';
        document.getElementById('resultado2').style.display = 'block';
    }
}

// ========== EXEMPLO 3: CRIAR COOKIE PERSONALIZADO ==========

function criarCookiePersonalizado() {
    const nome = document.getElementById('cookieName').value.trim();
    const valor = document.getElementById('cookieValue').value.trim();
    const dias = document.getElementById('cookieExpiry').value || 30;

    if (!nome) {
        alert('Por favor, insira um nome para o cookie');
        return;
    }

    if (!valor) {
        alert('Por favor, insira um valor para o cookie');
        return;
    }

    setCookie(nome, valor, parseInt(dias));
    alert(`✅ Cookie "${nome}" criado com sucesso!`);
    
    // Limpar formulário
    document.getElementById('cookieName').value = '';
    document.getElementById('cookieValue').value = '';
    document.getElementById('cookieExpiry').value = '30';
    
    atualizarListaCookies();
}

// ========== LISTA E GERENCIAMENTO DE COOKIES ==========

function atualizarListaCookies() {
    let cookies = getAllCookies();
    let container = document.getElementById('cookiesContainer');

    if (Object.keys(cookies).length === 0) {
        container.innerHTML = '<p class="empty-message">Nenhum cookie armazenado</p>';
        console.log('📋 Nenhum cookie armazenado');
        return;
    }

    let html = '';
    Object.keys(cookies).forEach(nome => {
        const valor = cookies[nome];
        html += `
            <div class="cookie-item">
                <div class="cookie-info">
                    <div class="cookie-name">🍪 ${nome}</div>
                    <div class="cookie-value"><strong>Valor:</strong> ${valor}</div>
                </div>
            </div>
        `;
    });

    container.innerHTML = html;
    console.log('📋 Lista de cookies atualizada:', cookies);
}

function limparTodosCookies() {
    if (confirm('⚠️ Tem certeza que deseja deletar TODOS os cookies?')) {
        let cookies = getAllCookies();
        Object.keys(cookies).forEach(nome => {
            deleteCookie(nome);
        });
        alert('🗑️ Todos os cookies foram deletados!');
        atualizarListaCookies();
    }
}

// ========== INICIALIZAÇÃO ==========

window.addEventListener('load', function() {
    console.log('🍪 Página carregada - Sistema de Cookies Ativado');
    console.log('📊 Cookies atuais:', getAllCookies());
    
    // Carregar preferências se existirem (isso também aplica o tema)
    carregarPreferencias();
    
    // Incrementar contador de visitas
    incrementarContador();
    
    // Atualizar lista de cookies
    atualizarListaCookies();
});

// Log quando a página fecha (para debugging)
window.addEventListener('beforeunload', function() {
    console.log('👋 Página será fechada - Cookies foram salvos no navegador');
});