import type { Meta, StoryObj } from "@storybook/nextjs";
import { Sidebar } from ".";

const meta = {
  component: Sidebar,
  title: "Components/Sidebar",
  parameters: {
    layout: "padded",
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
      <div className="flex h-[400px] w-full p-4">
        <Sidebar width={width}>Sidebar Content</Sidebar>
        <div className="flex-1">Content</div>
      </div>
    );
  },
};
