import Vue from "vue";
import VueRouter from "vue-router";
import firebase from "firebase/app";


Vue.use(VueRouter);

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/login",
      name: "Login",
      meta: { layout: 'empty'},
      component: () => import("../views/Login.vue")
    },
    {
      path: "/register",
      name: "Register",
      meta: { layout: 'empty' },
      component: () => import("../views/Register.vue")
    },
    {
      path: "/",
      name: "Home",
      meta: { layout: 'main', auth:true},
      component: () => import("../views/Home.vue")
    },
    {
      path: "/result/:id",
      name: "Result",
      meta: { layout: 'main', auth:true},
      component: () => import("../views/Result.vue")
    },
    {
      path: "/favorites",
      name: "Favorites",
      meta: { layout: 'main', auth: true},
      component: () => import("../views/Favorites.vue")
    }, 
    {
      path: '*',
      name: 'error',
      meta: {layout: 'error'},
      component: () => import('../views/Error.vue')
      }
  ]
});

router.beforeEach((to, from, next)=>{
  const currentUser = firebase.auth().currentUser
  const requireAuth = to.matched.some(record => record.meta.auth)

  if(requireAuth && !currentUser){
    next('/login?message=login')
  }else{
    next()
  }
})

export default router;
