import type { Meta, StoryObj } from "@storybook/nextjs";
import { LocalePicker } from ".";

const meta = {
  component: LocalePicker,
  title: "Components/LocalePicker",
  args: {
    localeTitleMap: {
      en: "English",
      vi: "Tiếng Việt",
    },
  },
} satisfies Meta<typeof LocalePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
