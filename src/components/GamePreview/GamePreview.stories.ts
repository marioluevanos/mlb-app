import type { Meta, StoryObj } from "@storybook/react";
import { GamePreview } from "./GamePreview";

const meta = {
  title: "Components/GamePreview",
  component: GamePreview,
  parameters: {
    layout: "fullscreen",
  },
  argTypes: {},
} satisfies Meta<typeof GamePreview>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    gamePreview: {
      id: 778375,
      feed: "https://statsapi.mlb.com/api/v1.1/game/778375/feed/live",
      content: "https://statsapi.mlb.com/api/v1/game/778375/content",
      status: "Final",
      gameNumber: 1,
      doubleHeader: "N",
      venue: "Progressive Field",
      away: {
        logo: "https://midfield.mlbstatic.com/v1/team/118/spots/64",
        record: { wins: 7, losses: 7, pct: ".500" },
        name: "KC",
        id: 118,
        isWinner: false,
        score: { runs: 14, hits: 1, errors: 4, leftOnBase: 0 },
      },
      home: {
        logo: "https://midfield.mlbstatic.com/v1/team/114/spots/64",
        record: { wins: 7, losses: 6, pct: ".538" },
        name: "CLE",
        id: 114,
        isWinner: true,
        score: { runs: 1, hits: 37, errors: 10, leftOnBase: 0 },
      },
    },
  },
};
