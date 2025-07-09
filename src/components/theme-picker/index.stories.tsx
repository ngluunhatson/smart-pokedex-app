import type { Meta, StoryObj } from "@storybook/nextjs";
import { ThemePicker } from ".";

const meta = {
  component: ThemePicker,
  title: "Components/ThemePicker",
} satisfies Meta<typeof ThemePicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
