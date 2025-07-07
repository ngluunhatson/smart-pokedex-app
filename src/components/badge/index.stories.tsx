import type { Meta, StoryObj } from "@storybook/nextjs";
import { Badge } from ".";

const meta = {
  component: Badge,
  title: "Components/Badge",
  args: {
    variant: "default",
    children: <div>Badge</div>,
    asChild: false,
  },
  argTypes: {
    variant: {
      options: ["default", "secondary", "destructive", "outline"],
      type: {
        name: "enum",
        value: ["default", "secondary", "destructive", "outline"],
      },
    },
    asChild: {
      type: "boolean",
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Secondary: Story = {
  args: {
    variant: "secondary",
    children: <div>Secondary</div>,
  },
};

export const Destructive: Story = {
  args: {
    variant: "destructive",
    children: <div>Destructive</div>,
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
    children: <div>Outline</div>,
  },
};
