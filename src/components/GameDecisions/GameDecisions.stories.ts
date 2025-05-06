import type { Meta, StoryObj } from "@storybook/react";
import { GameDecisions } from "./GameDecisions";
import { GAME_FINAL } from "@/_mockdata/mockdata";

const meta = {
  title: "Components/GameDecisions",
  component: GameDecisions,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof GameDecisions>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    decisions: GAME_FINAL.decisions,
  },
};
