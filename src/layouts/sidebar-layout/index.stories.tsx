import type { Meta, StoryObj } from "@storybook/nextjs";
import { SidebarLayout } from ".";

const meta = {
  component: SidebarLayout,
  title: "Layouts/SidebarLayout",
  parameters: {
    layout: "padded",
  },
  args: {},
} satisfies Meta<typeof SidebarLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <SidebarLayout
        className="relative h-[500px]"
        sidebar={{ children: "Sidebar Content" }}
      >
        Content
        <div className="absolute top-2 right-2">Right Side Content</div>
      </SidebarLayout>
    );
  },
};
