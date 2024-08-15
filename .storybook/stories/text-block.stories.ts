import type { Meta, StoryObj } from "@storybook/vue3";

import TextBlock from "../../src/components/text/TextBlock/TextBlock.vue";

const meta: Meta<typeof TextBlock> = {
  component: TextBlock,
};

//👇 This default export determines where your story goes in the story list
export default meta;
type Story = StoryObj<typeof TextBlock>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  name: "Default",
  render: (args) => ({
    components: { TextBlock },
    setup() {
      return { args };
    },
    template: '<text-block v-bind="args">Hover Me</text-block>',
  }),
  args: {
    //👇 The args you need here will depend on your component
    blockColor: "#5e5e5e",
    hoverTextColor: "currentColor",
    textPadding: "0 2px",
    blockTransformOrigin: "bottom",
  },
};
