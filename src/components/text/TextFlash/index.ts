import { defineCustomElement } from "vue";

import TextFlashCe from "./TextFlash.vue";

const TextFlash = defineCustomElement(TextFlashCe);

export { TextFlash };

export function register(name = "text-flash") {
  customElements.define(name, TextFlash);
}

declare module "vue" {
  export interface GlobalComponents {
    TextFlash: typeof TextFlash;
  }
}
