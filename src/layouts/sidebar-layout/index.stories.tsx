import type { Meta, StoryObj } from "@storybook/nextjs";
import { SidebarLayout, SidebarLayoutContent, SidebarLayoutPanel } from ".";

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
  args: {
    children: (
      <>
        <SidebarLayoutPanel>Sidebar Content</SidebarLayoutPanel>
        <SidebarLayoutContent>
          Content
          <div className="absolute top-2 right-2">Right Side Content</div>
        </SidebarLayoutContent>
      </>
    ),
  },
};
