import type { Meta, StoryObj } from "@storybook/react";
import { Scoreboard } from "./Scoreboard";
import { LAD } from "../Team/Team.stories";

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
    status: "In Progress",
    innings: [
      {
        num: 1,
        ordinalNum: "1st",
        home: { runs: 0, hits: 0, errors: 0, leftOnBase: 0 },
        away: { runs: 1, hits: 2, errors: 0, leftOnBase: 1 },
      },
      {
        num: 2,
        ordinalNum: "2nd",
        home: { runs: 0, hits: 1, errors: 0, leftOnBase: 2 },
        away: { runs: 0, hits: 0, errors: 0, leftOnBase: 0 },
      },
      {
        num: 3,
        ordinalNum: "3rd",
        home: { runs: 0, hits: 0, errors: 0, leftOnBase: 1 },
        away: { runs: 2, hits: 2, errors: 0, leftOnBase: 1 },
      },
      {
        num: 4,
        ordinalNum: "4th",
        home: { runs: 0, hits: 0, errors: 0, leftOnBase: 0 },
        away: { runs: 0, hits: 0, errors: 0, leftOnBase: 0 },
      },
      {
        num: 5,
        ordinalNum: "5th",
        home: { runs: 0, hits: 1, errors: 0, leftOnBase: 1 },
        away: { runs: 2, hits: 2, errors: 0, leftOnBase: 0 },
      },
    ],
    teams: [
      {
        ...LAD.args.team,
        score: { runs: 5, hits: 6, errors: 0, leftOnBase: 0 },
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
        score: { runs: 0, hits: 1, errors: 1, leftOnBase: 3 },
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

export const Final: Story = {
  args: {
    status: "Final",
    innings: [
      {
        num: 1,
        ordinalNum: "1st",
        home: { runs: 0, hits: 0, errors: 0, leftOnBase: 0 },
        away: { runs: 1, hits: 2, errors: 0, leftOnBase: 1 },
      },
      {
        num: 2,
        ordinalNum: "2nd",
        home: { runs: 0, hits: 1, errors: 0, leftOnBase: 2 },
        away: { runs: 0, hits: 0, errors: 0, leftOnBase: 0 },
      },
      {
        num: 3,
        ordinalNum: "3rd",
        home: { runs: 0, hits: 0, errors: 0, leftOnBase: 1 },
        away: { runs: 2, hits: 2, errors: 0, leftOnBase: 1 },
      },
      {
        num: 4,
        ordinalNum: "4th",
        home: { runs: 0, hits: 0, errors: 0, leftOnBase: 0 },
        away: { runs: 0, hits: 0, errors: 0, leftOnBase: 0 },
      },
      {
        num: 5,
        ordinalNum: "5th",
        home: { runs: 0, hits: 1, errors: 0, leftOnBase: 1 },
        away: { runs: 2, hits: 2, errors: 0, leftOnBase: 0 },
      },
      {
        num: 6,
        ordinalNum: "6th",
        home: { runs: 1, hits: 3, errors: 1, leftOnBase: 2 },
        away: { runs: 1, hits: 3, errors: 0, leftOnBase: 2 },
      },
      {
        num: 7,
        ordinalNum: "7th",
        home: { runs: 0, hits: 2, errors: 0, leftOnBase: 2 },
        away: { runs: 1, hits: 3, errors: 0, leftOnBase: 1 },
      },
      {
        num: 8,
        ordinalNum: "8th",
        home: { runs: 3, hits: 3, errors: 0, leftOnBase: 2 },
        away: { runs: 0, hits: 1, errors: 1, leftOnBase: 1 },
      },
      {
        num: 9,
        ordinalNum: "9th",
        home: { runs: 0, hits: 0, errors: 0, leftOnBase: 0 },
        away: { runs: 0, hits: 0, errors: 0, leftOnBase: 0 },
      },
    ],
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
