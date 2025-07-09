import type { Meta, StoryObj } from "@storybook/nextjs";
import { DarkModeToggle } from ".";

const meta = {
  component: DarkModeToggle,
  title: "Components/DarkModeToggle",
  args: {},
} satisfies Meta<typeof DarkModeToggle>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
