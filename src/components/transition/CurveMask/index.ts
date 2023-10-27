import { defineCustomElement } from "vue";

import CurveMaskCe from "./CurveMask.vue";

// @ts-ignore
const CurveMask = defineCustomElement(CurveMaskCe);

export { CurveMask };

export function register(name = "curve-mask") {
  customElements.define(name, CurveMask);
}

declare module "vue" {
  export interface GlobalComponents {
    CurveMask: typeof CurveMask;
  }
}
