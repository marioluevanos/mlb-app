import type { Meta, StoryObj } from "@storybook/react";
import { GamePreview } from "./GamePreview";

const meta = {
  title: "Components/GamePreview",
  component: GamePreview,
  parameters: {},
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
        // score: 1,
      },
      home: {
        logo: "https://midfield.mlbstatic.com/v1/team/114/spots/64",
        record: { wins: 7, losses: 6, pct: ".538" },
        name: "CLE",
        id: 114,
        isWinner: true,
        // score: 3,
      },
    },
  },
};
