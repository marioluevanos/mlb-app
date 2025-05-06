import type { Meta, StoryObj } from "@storybook/react";
import { Team } from "./Team";

const meta = {
  title: "Components/Team",
  component: Team,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof Team>;

export default meta;

type Story = StoryObj<typeof meta>;

export const LAD: Story = {
  args: {
    team: {
      record: { wins: 23, losses: 11, ties: 0, pct: ".676" },
      name: "Los Angeles Dodgers",
      id: 119,
      abbreviation: "LAD",
      logo: "https://midfield.mlbstatic.com/v1/team/119/spots/64",
    },
  },
};
