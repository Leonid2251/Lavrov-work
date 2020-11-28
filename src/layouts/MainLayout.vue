<template>
  <v-app id="inspire">
    <Sidebar/>
    <Navbar/>
    <v-main>
      <v-container>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import Sidebar from "../components/app/Sidebar";
import Navbar from "../components/app/Navbar";
export default {
  async created() {
    this.$vuetify.theme.dark = false;
    await this.$store.dispatch("fetchSaveRecord");
  },
  components: {
    Sidebar,
    Navbar
  }
};
</script>
