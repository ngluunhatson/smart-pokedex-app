import type { Meta, StoryObj } from "@storybook/nextjs";
import { Icon, IconNameArray } from ".";

const meta = {
  component: Icon,
  title: "Components/Icon",
  args: {
    name: "clock",
    size: 16,
    color: "red",
  },
  argTypes: {
    name: {
      table: {
        type: {
          summary: "string",
        },
        defaultValue: {
          summary: "null",
        },
      },
      options: IconNameArray,
      control: {
        type: "select",
      },
    },
  },
} satisfies Meta<typeof Icon>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
