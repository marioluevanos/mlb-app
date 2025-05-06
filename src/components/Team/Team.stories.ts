import type { Meta, StoryObj } from "@storybook/react";
import { Team } from "./Team";
import teamData from "../../team.json";
import { TeamClub } from "@/types";

const meta = {
  title: "Components/Team",
  component: Team,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof Team>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    team: teamData as unknown as TeamClub,
  },
};
