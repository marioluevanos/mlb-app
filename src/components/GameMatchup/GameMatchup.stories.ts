import type { Meta, StoryObj } from "@storybook/react";
import { GameMatchup } from "./GameMatchup";
import { Batter, Pitcher } from "../Player/Player.stories";

const meta = {
  title: "Components/GameMatchup",
  component: GameMatchup,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof GameMatchup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    matchup: {
      pitcher: { ...Pitcher.args?.player, throws: "R" },
      batter: { ...Batter.args?.player, bats: "L" },
    },
  },
};
