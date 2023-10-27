import type { Meta, StoryObj } from "@storybook/vue3";

import TextUnderline from "../../src/components/text/TextUnderline/TextUnderline.vue";

const meta: Meta<typeof TextUnderline> = {
  component: TextUnderline,
};

//👇 This default export determines where your story goes in the story list
export default meta;
type Story = StoryObj<typeof TextUnderline>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  name: "Default",
  render: (args) => ({
    components: { TextUnderline },
    setup() {
      return { args };
    },
    template: '<text-underline v-bind="args">Hover Me</text-underline>',
  }),
  args: {
    //👇 The args you need here will depend on your component
    lineColor: "white",
    lineHeight: "3px",
    hoverTextColor: "currentColor",
  },
};
