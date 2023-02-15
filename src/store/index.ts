import { createStore } from "vuex";
import getters from "./getters";
import overview from "./modules/overview";
const store = createStore({
    modules: {
        overview
    },
    getters,
});
export default store;
