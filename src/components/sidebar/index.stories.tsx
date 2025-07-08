import type { Meta, StoryObj } from "@storybook/nextjs";
import { Sidebar } from ".";

const meta = {
  component: Sidebar,
  title: "Components/Sidebar",
  parameters: {
    layout: "padded",
  },
  args: {
    width: 200,
  },
} satisfies Meta<typeof Sidebar>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    width: 200,
  },
  render: ({ width }) => {
    return (
      <div className="flex h-[400px] w-full">
        <Sidebar width={width}>Sidebar Content</Sidebar>
      </div>
    );
  },
};
