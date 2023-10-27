import { defineCustomElement } from "vue";

import MagnetMouseCe from "./MagnetMouse.vue";

const MagnetMouse = defineCustomElement(MagnetMouseCe);

export { MagnetMouse };

export function register(name = "magnet-mouse") {
  customElements.define(name, MagnetMouse);
}

declare module "vue" {
  export interface GlobalComponents {
    MagnetMouse: typeof MagnetMouse;
  }
}
