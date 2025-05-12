import type { Meta, StoryObj } from "@storybook/react";
import { Scoreboard } from "./Scoreboard";
import { GAME_1ST, GAME_FINAL, GAME_XINN } from "@/_mockdata/mockdata";

const meta = {
  title: "Components/Scoreboard",
  component: Scoreboard,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof Scoreboard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const InProgress: Story = {
  args: {
    status: GAME_1ST.status,
    innings: GAME_1ST.innings,
    teams: [GAME_1ST.away, GAME_1ST.home],
    isTopInning: true,
  },
};

export const ExtraInnings: Story = {
  args: {
    status: GAME_XINN.status,
    innings: GAME_XINN.innings,
    teams: [GAME_XINN.away, GAME_XINN.home],
    isTopInning: true,
  },
};

export const Final: Story = {
  args: {
    status: GAME_FINAL.status,
    innings: GAME_FINAL.innings,
    teams: [GAME_FINAL.away, GAME_FINAL.home],
  },
};
