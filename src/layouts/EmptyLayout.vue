<template>
  <div class="grey darken-1 empty-layout">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  created() {
    this.$vuetify.theme.dark = true;
  }
}
</script>