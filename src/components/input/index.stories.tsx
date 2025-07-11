import type { Meta, StoryObj } from "@storybook/nextjs";
import { Input } from ".";

const meta = {
  component: Input,
  title: "Components/Input",
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
