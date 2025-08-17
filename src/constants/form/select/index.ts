
import type { App } from "vue";
import selectbox from "./selectbox.vue";

export default function (app: App): void {
    app.component("CUSelectbox", selectbox);
}
