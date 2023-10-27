import type { Meta, StoryObj } from "@storybook/vue3";

import MagnetMouse from "../../src/components/interact/MagnetMouse/MagnetMouse.vue";

const meta: Meta<typeof MagnetMouse> = {
  component: MagnetMouse,
};

//👇 This default export determines where your story goes in the story list
export default meta;
type Story = StoryObj<typeof MagnetMouse>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  name: "Default",
  render: (args) => ({
    components: { MagnetMouse },
    setup() {
      return { args };
    },
    template: `
    <magnet-mouse v-bind="args">
      <div class="text-4xl">Hover Me</div>
    </magnet-mouse>
    `,
  }),
  args: {
    //👇 The args you need here will depend on your component
    threshold: 120,
    transitionDuration: 0.3,
    strength: 0.45,
  },
};
