import type { Meta, StoryObj } from "@storybook/nextjs";
import { Tooltip, TooltipContent, TooltipTrigger } from ".";
import { Button } from "../button";

const meta = {
  component: Tooltip,
  title: "Components/Tooltip",
} satisfies Meta<typeof Tooltip>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <Button variant="outline">Hover</Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Add to library</p>
        </TooltipContent>
      </Tooltip>
    );
  },
};
