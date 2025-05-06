import type { Meta, StoryObj } from "@storybook/react";
import { ScoringPlays } from "./ScoringPlays";

const meta = {
  title: "Components/ScoringPlays",
  component: ScoringPlays,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof ScoringPlays>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    scoringPlays: [
      {
        inning: "BOT 1",
        teamAbbreviation: "ATL",
        result: {
          type: "atBat",
          event: "Home Run",
          eventType: "home_run",
          description:
            "Austin Riley homers (7) on a fly ball to left center field. Alex Verdugo scores.",
          rbi: 2,
          awayScore: 0,
          homeScore: 2,
          isOut: false,
        },
        matchup: {
          batter: {
            id: 663586,
            avatar: "https://midfield.mlbstatic.com/v1/people/663586/spots/120",
            fullName: "Austin Riley",
            position: "3B",
            summary: "(2 RBI)",
          },
          pitcher: {
            id: 669160,
            avatar: "https://midfield.mlbstatic.com/v1/people/669160/spots/120",
            fullName: "Dustin May",
            position: "P",
            summary: "(2 RBI)",
          },
        },
      },
      {
        inning: "BOT 3",
        teamAbbreviation: "ATL",
        result: {
          type: "atBat",
          event: "Home Run",
          eventType: "home_run",
          description:
            "Austin Riley homers (8) on a fly ball to center field. Alex Verdugo scores.",
          rbi: 2,
          awayScore: 0,
          homeScore: 4,
          isOut: false,
        },
        matchup: {
          batter: {
            id: 663586,
            avatar: "https://midfield.mlbstatic.com/v1/people/663586/spots/120",
            fullName: "Austin Riley",
            position: "3B",
            summary: "(2 RBI)",
          },
          pitcher: {
            id: 669160,
            avatar: "https://midfield.mlbstatic.com/v1/people/669160/spots/120",
            fullName: "Dustin May",
            position: "P",
            summary: "(2 RBI)",
          },
        },
      },
      {
        inning: "TOP 4",
        teamAbbreviation: "LAD",
        result: {
          type: "atBat",
          event: "Double",
          eventType: "double",
          description:
            "Max Muncy doubles (6) on a line drive to right fielder Eli White. Teoscar Hernández scores.",
          rbi: 1,
          awayScore: 1,
          homeScore: 4,
          isOut: false,
        },
        matchup: {
          batter: {
            id: 571970,
            avatar: "https://midfield.mlbstatic.com/v1/people/571970/spots/120",
            fullName: "Max Muncy",
            position: "3B",
            summary: "(1 RBI)",
          },
          pitcher: {
            id: 693821,
            avatar: "https://midfield.mlbstatic.com/v1/people/693821/spots/120",
            fullName: "Bryce Elder",
            position: "P",
            summary: "(1 RBI)",
          },
        },
      },
      {
        inning: "TOP 6",
        teamAbbreviation: "LAD",
        result: {
          type: "atBat",
          event: "Groundout",
          eventType: "field_out",
          description:
            "Max Muncy grounds out, second baseman Ozzie Albies to first baseman Matt Olson. Mookie Betts scores. Freddie Freeman to 3rd.",
          rbi: 1,
          awayScore: 2,
          homeScore: 4,
          isOut: true,
        },
        matchup: {
          batter: {
            id: 571970,
            avatar: "https://midfield.mlbstatic.com/v1/people/571970/spots/120",
            fullName: "Max Muncy",
            position: "3B",
            summary: "(1 RBI)",
          },
          pitcher: {
            id: 572955,
            avatar: "https://midfield.mlbstatic.com/v1/people/572955/spots/120",
            fullName: "Pierce Johnson",
            position: "P",
            summary: "(1 RBI)",
          },
        },
      },
    ],
  },
};
