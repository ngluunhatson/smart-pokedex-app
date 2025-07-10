import type { Meta, StoryObj } from "@storybook/nextjs";
import { Loader } from ".";

const meta = {
  component: Loader,
  title: "Components/Loader",
  args: {
    size: 24,
  },
  argTypes: {
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
      },
    },
  },
} satisfies Meta<typeof Loader>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};
