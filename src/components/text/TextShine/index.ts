import { defineCustomElement } from "vue";

import TextShineCe from "./TextShine.vue";

const TextShine = defineCustomElement(TextShineCe);

export { TextShine };

export function register(name = "text-shine") {
  customElements.define(name, TextShine);
}

declare module "vue" {
  export interface GlobalComponents {
    TextShine: typeof TextShine;
  }
}
