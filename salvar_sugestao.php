<?php
// 1. Configurações do banco de dados do XAMPP
$servidor = "localhost";
$usuario  = "root";
$senha    = "";
$banco    = "cardapio_escolar"; // Nome do banco criado no phpMyAdmin

$conexao = mysqli_connect($servidor, $usuario, $senha, $banco);

if (!$conexao) {
    die("Falha na conexão: " . mysqli_connect_error());
}

// 2. Recebe o texto enviado pelo JavaScript Fetch
$mensagem = isset($_POST['sugestao']) ? $_POST['sugestao'] : '';

// Limpa o texto contra invasões e caracteres quebrados
$mensagem = mysqli_real_escape_string($conexao, $mensagem);

if (!empty($mensagem)) {
    // 3. Insere a sugestão na tabela
    $sql = "INSERT INTO sugestoes (mensagem) VALUES ('$mensagem')";
    
    if (mysqli_query($conexao, $sql)) {
        echo "sucesso";
    } else {
        echo "erro_banco";
    }
} else {
    echo "campo_vazio";
}

mysqli_close($conexao);
?>
