import type { Meta, StoryObj } from "@storybook/nextjs";

import { Button } from ".";

const meta = {
  component: Button,
  title: "Components/Button",
  args: {
    variant: "default",
    size: "default",
    children: <div>Button Test</div>,
  },
  argTypes: {
    variant: {
      options: [
        "default",
        "destructive",
        "outline",
        "secondary",
        "ghost",
        "link",
      ],
      type: {
        name: "enum",
        value: [
          "default",
          "destructive",
          "outline",
          "secondary",
          "ghost",
          "link",
        ],
      },
      table: {
        defaultValue: { summary: "default" },
      },
      control: { type: "radio" },
    },
    size: {
      options: ["default", "sm", "lg", "icon"],
      type: {
        name: "enum",
        value: ["default", "sm", "lg", "icon"],
      },
      table: {
        defaultValue: {
          summary: "default",
        },
      },
      control: { type: "radio" },
    },
    asChild: {
      type: "boolean",
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Destructive: Story = {
  args: {
    variant: "destructive",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
  },
};
