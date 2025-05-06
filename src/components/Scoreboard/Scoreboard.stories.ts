import type { Meta, StoryObj } from "@storybook/react";
import { Scoreboard } from "./Scoreboard";
import { LAD } from "../Team/Team.stories";
import { GAME_1ST, GAME_FINAL, GAME_XINN } from "@/_mockdata/mockdata";

const meta = {
  title: "Components/Scoreboard",
  component: Scoreboard,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof Scoreboard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const PreGame: Story = {
  args: {
    status: "Pre-Game",
    innings: [],
    teams: [
      {
        ...LAD.args.team,
        score: { runs: 6, hits: 9, errors: 0, leftOnBase: 0 },
        startingPitcher: {
          jerseyNumber: "86",
          position: "2 — 1",
          fullName: "J. Dreyer",
          id: 676263,
          avatar: "https://midfield.mlbstatic.com/v1/people/676263/spots/120",
          summary: "3.57 ERA, 1.13 WHIP",
        },
      },
      {
        record: { wins: 13, losses: 20, ties: 0, pct: ".394" },
        score: { runs: 1, hits: 5, errors: 1, leftOnBase: 3 },
        name: "Miami Marlins",
        id: 146,
        startingPitcher: {
          jerseyNumber: "22",
          position: "2 — 3",
          fullName: "S. Alcantara",
          id: 645261,
          avatar: "https://midfield.mlbstatic.com/v1/people/645261/spots/120",
          summary: "8.42 ERA, 1.61 WHIP",
        },
        abbreviation: "MIA",
        logo: "https://midfield.mlbstatic.com/v1/team/146/spots/64",
      },
    ],
  },
};

export const InProgress: Story = {
  args: {
    status: GAME_1ST.status,
    innings: GAME_1ST.innings,
    teams: [GAME_1ST.away, GAME_1ST.home],
    isTopInning: true,
  },
};

export const XTraInn: Story = {
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
