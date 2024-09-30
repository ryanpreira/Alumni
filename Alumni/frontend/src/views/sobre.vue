<script>

import Sobre from './../components/Sobre.vue';
import Footer from './../components/Footer.vue';
import HeaderSite from './../components/HeaderSite.vue';

export default {
  name: Sobre,
  components: {
    HeaderSite,
    Sobre,
    Footer
}
}

</script>

<template>
    <<HeaderSite/>
    <Sobre/>
    <Footer/>
</template>

<style scoped>
</style>
