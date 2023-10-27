import { defineCustomElement } from "vue";

import TextBlinkCe from "./TextBlink.vue";

const TextBlink = defineCustomElement(TextBlinkCe);

export { TextBlink };

export function register(name = "text-blink") {
  customElements.define(name, TextBlink);
}

declare module "vue" {
  export interface GlobalComponents {
    TextBlink: typeof TextBlink;
  }
}
