import type { Meta, StoryObj } from "@storybook/react";
import { TopPerformers } from "./TopPerformers";
import { GAME_FINAL } from "@/_mockdata/mockdata";

const meta = {
  title: "Components/TopPerformers",
  component: TopPerformers,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof TopPerformers>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LAD: Story = {
  args: {
    players: GAME_FINAL.topPerformers,
  },
};
