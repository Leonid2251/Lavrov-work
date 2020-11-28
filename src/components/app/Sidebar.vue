<template>
  <v-navigation-drawer app clipped expand-on-hover permanent>
    <v-list dense>
      <v-list-item link to="/">
        <v-list-item-action>
          <v-icon>mdi-android-studio</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Расчет</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item link to="/favorites">
        <v-list-item-action>
          <v-icon>mdi-star</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Варианты</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

      <v-list-item @click.prevent="logout">
        <v-list-item-action>
          <v-icon>mdi-logout</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title>Выход</v-list-item-title>
        </v-list-item-content>
      </v-list-item>

    </v-list>
  </v-navigation-drawer>
</template>

<script>
export default {
  data() {
    return {
      checkbox: true,
      radioGroup: 1,
      switch1: true
    };
  },
  methods: {
    async logout() {
      await this.$store.dispatch('logout')
      this.$router.push('/login?message=logout')
    }
  }
};
</script>
