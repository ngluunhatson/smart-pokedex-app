import type { Meta, StoryObj } from "@storybook/nextjs";
import { Icon, IconNameArray } from ".";

const meta = {
  component: Icon,
  title: "Components/Icon",
  args: {
    name: "clock",
    size: 24,
    color: "black",
  },
  argTypes: {
    name: {
      type: {
        name: "enum",
        value: IconNameArray,
        required: true,
      },
    },
    size: {
      table: {
        type: {
          summary: "number",
        },
        defaultValue: {
          summary: "24",
        },
      },
    },
    color: {
      type: {
        name: "string",
        required: true,
      },
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
