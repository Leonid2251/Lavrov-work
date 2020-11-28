<template>
  <v-app>
    <v-main>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="5" lg="5">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Регистрация</v-toolbar-title>
              </v-toolbar>

              <v-card-text>
                <v-form v-model="valid" ref="form" lazy-validation>
                  <v-text-field
                    prepend-icon="mdi-account"
                    label="Имя"
                    name="name"
                    type="text"
                    counter
                    v-model.trim="name"
                    :rules="rules.name"
                  ></v-text-field>

                  <v-text-field
                    prepend-icon="mdi-at"
                    label="E-mail"
                    name="email"
                    type="email"
                    v-model.trim="email"
                    :rules="rules.email"
                  ></v-text-field>

                  <v-text-field
                    prepend-icon="mdi-lock"
                    label="Пароль"
                    name="password"
                    type="password"
                    counter
                    v-model.trim="password"
                    :rules="rules.password"
                  ></v-text-field>

                  <v-text-field
                    prepend-icon="mdi-lock"
                    label="Подтверждение пароля"
                    name="confirm-password"
                    type="password"
                    counter
                    v-model.trim="confirmPassword"
                    :rules="rules.confirmPassword"
                  ></v-text-field>
                </v-form>
              </v-card-text>

              <v-card-actions>
                <v-card-text
                  >Уже зарегистрированы?
                  <router-link to="/login">Войти</router-link></v-card-text
                >
                <v-spacer></v-spacer>
                <v-btn
                  color="primary"
                  @click="registerUser"
                  :disabled="!valid"
                  >Зарегистрироваться</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      valid: false,
      name: null,
      email: null,
      password: "",
      confirmPassword: null,
      rules: {
        name: [
          v => !!v || "Поле не может быть пустым",
          v =>
            (v && v.length >= 2) || "Имя должно содержать не менее 2 символов"
        ],
        email: [
          v => !!v || "Поле не может быть пустым",
          v => /.+@.+\..+/.test(v) || "Введите корректный электронный адрес"
        ],
        password: [
          v => !!v || "Поле не может быть пустым",
          v =>
            (v && v.length >= 6) ||
            "Пароль должен содержать не менее 6 символов" 
        ],
        confirmPassword: [
          v => !!v || "Поле не может быть пустым",
          v => v === this.password || "Пароли не совпадают"
        ],
      }
    };
  },
  methods: {
    async registerUser() {
      if (this.$refs.form.validate()) {
        const formData = {
          email: this.email,
          password: this.password,
          name: this.name,
        };
        try {
          await this.$store.dispatch("register", formData);
          this.$router.push("/");
        } catch (e) {}
      }
    }
  }
};
</script>

<style scoped>
.snackbar-text {
  display: flex;
  justify-content: center;
}
</style>
