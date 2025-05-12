import type { Meta, StoryObj } from "@storybook/react";
import { BoxScore } from "./BoxScore";
import { GAME_XINN } from "@/_mockdata/mockdata";

const meta = {
  title: "Components/BoxScore",
  component: BoxScore,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
} satisfies Meta<typeof BoxScore>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    away: GAME_XINN.away,
    home: GAME_XINN.home,
    currentInning: GAME_XINN.currentInning,
    matchup: {
      batterId: GAME_XINN.currentPlay?.matchup.batter.id,
      pitcherId: GAME_XINN.currentPlay?.matchup.pitcher.id,
    },
  },
};
