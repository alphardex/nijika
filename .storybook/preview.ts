import type { Preview } from "@storybook/vue3";

import "@alphardex/aqua.css/dist/aqua.min.css";
import "../src/style.css";

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: "^on[A-Z].*" },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    layout: "centered",
  },
};

export default preview;
