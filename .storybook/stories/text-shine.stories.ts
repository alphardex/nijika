import type { Meta, StoryObj } from "@storybook/vue3";

import TextShine from "../../src/components/text/TextShine/TextShine.vue";

const meta: Meta<typeof TextShine> = {
  component: TextShine,
};

//👇 This default export determines where your story goes in the story list
export default meta;
type Story = StoryObj<typeof TextShine>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  name: "Default",
  render: (args) => ({
    components: { TextShine },
    setup() {
      return { args };
    },
    template: '<text-shine v-bind="args"></text-shine>',
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
    stagger: 0.04,
    ease: "ease-in-out",
  },
};
