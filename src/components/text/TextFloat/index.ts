import { defineCustomElement } from "vue";

import TextFloatCe from "./TextFloat.vue";

const TextFloat = defineCustomElement(TextFloatCe);

export { TextFloat };

export function register(name = "text-float") {
  customElements.define(name, TextFloat);
}

declare module "vue" {
  export interface GlobalComponents {
    TextFloat: typeof TextFloat;
  }
}
