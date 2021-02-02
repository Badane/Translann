import Vue from "vue";
import Router from "vue-router";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      alias: "/projects",
      name: "projects",
      component: () => import("./components/ProjectsList")
    },
    {
      path: "/projects/:idProject",
      name: "project-details",
      component: () => import("./components/ProjectDetails")
    },
    {
      path: "/projects/:idProject/:idTranslation",
      name: "translation-details",
      component: () => import("./components/Translation")
    },
    {
      path: "/add-project",
      name: "add-project",
      component: () => import("./components/AddProject")
    },
    {
      path: "/add-translation",
      name: "add-translation",
      component: () => import("./components/AddTranslation")
    }
  ]
});