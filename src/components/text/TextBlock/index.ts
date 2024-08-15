import { defineCustomElement } from "vue";

import TextBlockCe from "./TextBlock.vue";

const TextBlock = defineCustomElement(TextBlockCe);

export { TextBlock };

export function register(name = "text-block") {
  customElements.define(name, TextBlock);
}

declare module "vue" {
  export interface GlobalComponents {
    TextBlock: typeof TextBlock;
  }
}
