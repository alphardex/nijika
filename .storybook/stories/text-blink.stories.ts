import type { Meta, StoryObj } from "@storybook/vue3";

import TextBlink from "../../src/components/text/TextBlink/TextBlink.vue";

const meta: Meta<typeof TextBlink> = {
  component: TextBlink,
};

//👇 This default export determines where your story goes in the story list
export default meta;
type Story = StoryObj<typeof TextBlink>;

/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  name: "Default",
  render: (args) => ({
    components: { TextBlink },
    setup() {
      return { args };
    },
    template: '<text-blink v-bind="args"></text-blink>',
  }),
  args: {
    //👇 The args you need here will depend on your component
    text: "Blingbling",
    textColor: "white",
    textSize: "1rem",
    textWeight: "normal",
    textFont: "",
    textLeading: "normal",
    textStyle: "normal",
    textWhiteSpace: "pre",
  },
};
