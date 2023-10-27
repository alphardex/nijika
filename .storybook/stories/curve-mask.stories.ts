import type { Meta, StoryObj } from "@storybook/vue3";

import CurveMask from "../../src/components/transition/CurveMask/CurveMask.vue";

import { ref } from "vue";

const meta: Meta<typeof CurveMask> = {
  component: CurveMask,
};

//👇 This default export determines where your story goes in the story list
export default meta;
type Story = StoryObj<typeof CurveMask>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  name: "Default",
  render: (args) => ({
    components: { CurveMask },
    setup() {
      const curveMaskRef = ref(null);

      const openCurveMask = () => {
        curveMaskRef.value.open();
      };

      const closeCurveMask = () => {
        document.querySelector(".another-scene")?.classList.add("hollow");
        curveMaskRef.value.close();
      };

      const onCurveMaskOpen = () => {
        document.querySelector(".another-scene")?.classList.remove("hollow");
      };

      return {
        curveMaskRef,
        openCurveMask,
        closeCurveMask,
        onCurveMaskOpen,
        args,
      };
    },
    template: `
    <button class="btn btn-primary btn-ghost" @click="openCurveMask">
    Open
  </button>
  <curve-mask v-bind="args" ref="curveMaskRef" @open-end="onCurveMaskOpen"></curve-mask>
  <div
    class="another-scene fixed z-5 top-0 left-0 cover transition-opacity duration-500 hollow"
  >
    <div class="absolute hv-center">
      <button class="btn btn-primary btn-ghost" @click="closeCurveMask">
        Close
      </button>
    </div>
  </div>
    `,
  }),
  args: {
    //👇 The args you need here will depend on your component
    zIndex: 5,
    maskColor: "#3861a6",
  },
};
