// ================= NAVEGAÇÃO ENTRE ABAS =================
function showTab(tabId) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => tab.classList.remove('active'));

    document.getElementById(tabId).classList.add('active');

    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}

// ================= MODAL DE SUGESTÃO =================
const tela = document.getElementById('telaSugestao');
const form = document.getElementById('conteudoForm');
const sucesso = document.getElementById('msgSucesso');
const campoTexto = document.getElementById('txtSugestao');

// Abre a janela de sugestão redefinindo os estados visuais
function abrirSugestao() {
    form.style.display = 'block';
    sucesso.style.display = 'none';
    tela.style.display = 'flex';
    campoTexto.focus();
}

// Conecta ao PHP para salvar os dados no XAMPP de verdade
function processarEnvio() {
    const valor = campoTexto.value.trim();

    // 1. Valida se o aluno digitou algo
    if (valor === '') {
        alert('Por favor, escreva sua sugestão antes de enviar.');
        return;
    }

    // 2. Prepara o texto para o PHP entender
    const dadosForm = new FormData();
    dadosForm.append('sugestao', valor);

    // 3. Envia para o servidor local salvar no MySQL
    fetch('salvar_sugestao.php', {
        method: 'POST',
        body: dadosForm
    })
    .then(resposta => resposta.text())
    .then(resultado => {
        if (resultado.trim() === 'sucesso') {
            // Se salvou no banco, muda as telas de sucesso que você criou
            form.style.display = 'none';
            sucesso.style.display = 'block';
            campoTexto.value = '';
        } else {
            alert('Houve um erro no banco de dados ao salvar a sugestão.');
        }
    })
    .catch(erro => {
        console.error('Erro na requisição:', erro);
        alert('Não foi possível conectar ao servidor local do XAMPP.');
    });
}

// Fecha o modal de overlay
function fecharTudo() {
    tela.style.display = 'none';
}

// Fecha o modal clicando fora da caixa de conteúdo
tela.addEventListener('click', (event) => {
    if (event.target === tela) {
        fecharTudo();
    }
});

// Fecha o modal com a tecla Esc
document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && tela.style.display === 'flex') {
        fecharTudo();
    }
});
