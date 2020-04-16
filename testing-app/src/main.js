import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import axios from "axios";

Vue.config.productionTip = false;

Vue.prototype.$http = axios;

//click outside directive
//usage in component:
//v-click-outside="[ref1, ref2, ref3]"
//add handler method for the click outside event
//clickedOutside
//when clicking outside ref1, ref2, ref3, the clickedOutside method is called
let handleOutsideClick;
Vue.directive("click-outside", {
  bind: function(el, binding, vnode) {
    handleOutsideClick = e => {
      e.stopPropagation();
      const exclude = binding.value;
      const handler = "clickedOutside";
      let clickedOnExcludedEl = false;
      if (Array.isArray(exclude)) {
        exclude.forEach(refName => {
          if (!clickedOnExcludedEl) {
            const excludedEl = vnode.context.$refs[refName];
            if (excludedEl) {
              clickedOnExcludedEl = excludedEl.contains(e.target);
            }
          }
        });
        if (!el.contains(e.target) && !clickedOnExcludedEl) {
          vnode.context[handler]();
        }
      }
    };
    document.addEventListener("click", handleOutsideClick);
  },
  unbind() {
    document.removeEventListener("click", handleOutsideClick);
  }
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
