import type { Meta, StoryObj } from "@storybook/react";
import { fn } from "@storybook/test";
import { Player } from "./Player";

const meta = {
  title: "Components/Player",
  component: Player,
  parameters: {},
  argTypes: {},
  args: { onClick: fn() },
} satisfies Meta<typeof Player>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Batter: Story = {
  args: {
    player: {
      avatar: "https://midfield.mlbstatic.com/v1/people/657077/spots/120",
      jerseyNumber: "8",
      id: 657077,
      fullName: "Alex Verdugo",
      position: "LF",
      summary: "0-0 | BB",
      note: "16 H, 5 BB, 0 HR",
    },
  },
};

export const Pitcher: Story = {
  args: {
    player: {
      jerseyNumber: "85",
      position: "P",
      fullName: "Dustin May",
      id: 669160,
      avatar: "https://midfield.mlbstatic.com/v1/people/669160/spots/120",
      summary: "0.1 IP, 2 ER, K, BB",
      note: "4.55 ERA, 1.30 WHIP",
    },
  },
};
