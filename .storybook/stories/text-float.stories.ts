import type { Meta, StoryObj } from "@storybook/vue3";

import TextFloat from "../../src/components/text/TextFloat/TextFloat.vue";

const meta: Meta<typeof TextFloat> = {
  component: TextFloat,
};

//👇 This default export determines where your story goes in the story list
export default meta;
type Story = StoryObj<typeof TextFloat>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  name: "Default",
  render: (args) => ({
    components: { TextFloat },
    setup() {
      return { args };
    },
    template: '<text-float v-bind="args"></text-float>',
  }),
  args: {
    //👇 The args you need here will depend on your component
    text: "Hover Me",
    textColor: "white",
    textSize: "1rem",
    textWeight: "normal",
    textFont: "",
    textLeading: "normal",
    textStyle: "normal",
    textWhiteSpace: "pre",
    stagger: 0,
  },
};

export const Stagger: Story = {
  render: (args) => ({
    components: { TextFloat },
    setup() {
      return { args };
    },
    template: '<text-float v-bind="args"></text-float>',
  }),
  args: {
    ...Primary.args,
    stagger: 1,
  },
};
