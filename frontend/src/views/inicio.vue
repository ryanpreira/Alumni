<script>
import Footer from '../components/Footer.vue';
import HeaderSite from '../components/HeaderSite.vue';
import SecaoSobre from '../components/SecaoSobre.vue';
import SecaoDoacao from '../components/SecaoDoacao.vue';
import SecaoNoticias from '../components/SecaoNoticias.vue';
import Carrossel from '../components/Carrossel.vue';

export default {
    name: 'Inicio',
    components: {
        HeaderSite,
        Carrossel,
        SecaoSobre,
        SecaoDoacao,
        SecaoNoticias,
        Footer
    }
}
</script>

<template>
<HeaderSite/>
<Carrossel/>
<SecaoSobre/>
<SecaoDoacao/>
<SecaoNoticias/>
<Footer/>
</template>

<style>

</style>