import "@/styles/globals.css";
import { withThemeByClassName } from "@storybook/addon-themes";
import type { Preview } from "@storybook/nextjs";
import nextIntl from "./next-intl";

const preview: Preview = {
  parameters: {
    layout: "centered",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    nextIntl,

    a11y: {
      /*
       * Axe's context parameter
       * See https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#context-parameter
       * to learn more. Typically, this is the CSS selector for the part of the DOM you want to analyze.
       */
      context: "#storybook-root",
      /*
       * Axe's configuration
       * See https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#api-name-axeconfigure
       * to learn more about the available properties.
       */
      config: {},
      /*
       * Axe's options parameter
       * See https://github.com/dequelabs/axe-core/blob/develop/doc/API.md#options-parameter
       * to learn more about the available options.
       */
      options: {},
    },
  },
  tags: ["autodocs"],
  decorators: [
    withThemeByClassName({
      themes: {
        Default: "default",
        "Default Dark": "default-dark",
        Red: "red",
        "Red Dark": "red-dark",
        Rose: "rose",
        "Rose Dark": "rose-dark",
        Orange: "orange",
        "Orange Dark": "orange-dark",
        Green: "green",
        "Green Dark": "green-dark",
        Yellow: "yellow",
        "Yellow Dark": "yellow-dark",
        Blue: "blue",
        "Blue Dark": "blue-dark",
        Violet: "violet",
        "Violet Dark": "violet-dark",
      },
      defaultTheme: "Default",
    }),
  ],
  initialGlobals: {
    locale: "en",
    locales: {
      en: { icon: "us", title: "English", right: "EN" },
      vi: { icon: "vi", title: "Tiếng Việt", right: "VI" },
    },
  },
};

export default preview;
