import type { Meta, StoryObj } from "@storybook/react";
import { GameMatchup } from "./GameMatchup";
import { Batter, Pitcher } from "../Player/Player.stories";
import { createElement } from "react";
import { GameBug } from "../GameBug/GameBug";

const meta = {
  title: "Components/GameMatchup",
  component: GameMatchup,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof GameMatchup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render() {
    return createElement(
      GameMatchup,
      {
        matchup: {
          pitcher: { ...Pitcher.args?.player, throws: "R" },
          batter: { ...Batter.args?.player, bats: "L" },
        },
      },
      createElement(GameBug, {
        count: {
          balls: 3,
          strikes: 2,
          outs: 2,
        },
        runners: {
          third: Batter.args?.player,
        },
        currentInning: "BOT 9th",
      })
    );
  },
};
