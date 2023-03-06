import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import diy from "./store/diy";

import "./assets/styles/tailwind.css";
import "./assets/styles/global.css";

import { registerGlobalComponents } from "./utils/import";

const app = createApp(App);

app.provide("diy", diy);

registerGlobalComponents(app);

app.use(router);

app.mount("#app");
