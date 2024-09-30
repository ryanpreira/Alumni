
<template>
<div class="retorno">
    <img class="retornoIcone" src=".././assets/001-back.png"/>
    <p v-if="!cardCadastro" class="retornoHead">Cadastrar</p>
    <p v-else class="retornoHead">Login</p>
</div>
</template>

<script>
export default {
data() {
    return {
        nome: '',
        sobrenome: '',
        email: '',
        senha: '',
        confirmarSenha: '',
        formacao: '',
        ano: '',
        matriculaCPF: '',
        papel: '',
    };
    }
}
</script>