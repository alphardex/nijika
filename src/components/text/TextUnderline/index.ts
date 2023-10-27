import { defineCustomElement } from "vue";

import TextUnderlineCe from "./TextUnderline.vue";

const TextUnderline = defineCustomElement(TextUnderlineCe);

export { TextUnderline };

export function register(name = "text-underline") {
  customElements.define(name, TextUnderline);
}

declare module "vue" {
  export interface GlobalComponents {
    TextUnderline: typeof TextUnderline;
  }
}
