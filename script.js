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

// Envia os dados direto para a nuvem usando o SheetDB
function processarEnvio() {
    const valor = campoTexto.value.trim();

    // 1. Valida se o aluno digitou algo
    if (valor === '') {
        alert('Por favor, escreva sua sugestão antes de enviar.');
        return;
    }

    // 2. Envia para a API do SheetDB usando JSON (Substituiu o PHP/XAMPP)
    fetch('https://sheetdb.io/api/v1/0eljmmh440yjn', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            data: [
                {
                    "id": Date.now(),
                    "sugestao": valor,
                    "data_envio": new Date().toLocaleString()
                }
            ]
        })
    })
    .then(resposta => {
        if (resposta.ok) {
            // Se salvou na planilha, muda as telas de sucesso
            form.style.display = 'none';
            sucesso.style.display = 'block';
            campoTexto.value = '';
        } else {
            alert('Houve um erro ao salvar a sugestão na planilha.');
        }
    })
    .catch(erro => {
        console.error('Erro na requisição:', erro);
        alert('Não foi possível conectar ao servidor de banco de dados.');
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
