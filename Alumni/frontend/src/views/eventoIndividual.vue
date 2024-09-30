<script>
import HeaderVar from '../components/HeaderVar.vue';
import CardEvento from '../components/cardEvento.vue';
import Footer from './../components/Footer.vue'

export default {
  name: 'Eventos',
  components: {
    HeaderVar,
    CardEvento,
    Footer,
    }
}
</script>

<template>
    <HeaderVar/>
    <CardEvento/>
    <Footer></Footer>
</template>

<style scoped>
</style>
