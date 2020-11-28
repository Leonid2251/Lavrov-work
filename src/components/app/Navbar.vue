<template>
  <v-app-bar app clipped-left>
    <v-toolbar-title>Расчет материального баланса доменной плавки</v-toolbar-title>
  </v-app-bar>
  
 
</template>

<script>
import {mapGetters} from 'vuex'
export default {
  computed: {
    ...mapGetters(['user'])
  },
  methods: {
   
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/login?message=logout')
    }
  }
}

</script>
