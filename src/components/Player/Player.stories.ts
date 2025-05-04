import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Player } from "./Player";

// More on how to set up stories at: https://storybook.js.org/docs/writing-stories#default-export
const meta = {
  title: "Components/Player",
  component: Player,
  parameters: {},
  argTypes: {},
  args: { onClick: fn() },
} satisfies Meta<typeof Player>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    player: {
      fullName: "Joe Blow",
      id: 1,
      jerseyNumber: "12",
      avatar: "",
    },
  },
};
