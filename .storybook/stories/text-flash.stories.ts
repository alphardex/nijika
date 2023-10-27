import type { Meta, StoryObj } from "@storybook/vue3";

import TextFlash from "../../src/components/text/TextFlash/TextFlash.vue";

const meta: Meta<typeof TextFlash> = {
  component: TextFlash,
};

//👇 This default export determines where your story goes in the story list
export default meta;
type Story = StoryObj<typeof TextFlash>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  name: "Default",
  render: (args) => ({
    components: { TextFlash },
    setup() {
      return { args };
    },
    template: '<text-flash v-bind="args">Hover Me</text-flash>',
  }),
  args: {
    //👇 The args you need here will depend on your component
    lineColor: "white",
    lineHeight: "1px",
    hoverTextColor: "currentColor",
  },
};
