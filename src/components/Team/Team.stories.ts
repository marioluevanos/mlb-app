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
      name: "Los Angeles Dodgers",
      id: 119,
      logo: "https://midfield.mlbstatic.com/v1/team/119/spots/64",
    },
  },
};
