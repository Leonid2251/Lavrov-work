import Vue from "vue";
import App from "./App.vue";
import "./registerServiceWorker";
import router from "./router";
import store from "./store";
import vuetify from "./plugins/vuetify";

import firebase from "firebase/app";
import "firebase/auth";
import "firebase/database";

//import 'materialize-css/dist/js/materialize.min'  //используем только для плагина сообщений

Vue.config.productionTip = false;

firebase.initializeApp({
	apiKey: "AIzaSyAFu1dauQnv2d09HIpxgjc9cIqsSRoadao",
	authDomain: "lavrov-work.firebaseapp.com",
	databaseURL: "https://lavrov-work.firebaseio.com",
	projectId: "lavrov-work",
	storageBucket: "lavrov-work.appspot.com",
	messagingSenderId: "396459634290",
	appId: "1:396459634290:web:216408e1efde4a3d37dceb",
	measurementId: "G-5C8LXX3CVW"
});

let app;
firebase.auth().onAuthStateChanged(() => {
  if (!app) { //если еще не вошел
    app = new Vue({
      router,
      store,
      vuetify,
      render: h => h(App)
    }).$mount("#app");
  }
}); //автоавторизация если найдется пользователь
