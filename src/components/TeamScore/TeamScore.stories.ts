import type { Meta, StoryObj } from "@storybook/react";
import { TeamScore } from "./TeamScore";

const meta = {
  title: "Components/TeamScore",
  component: TeamScore,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof TeamScore>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    score: {
      errors: 0,
      hits: 10,
      leftOnBase: 0,
      runs: 3,
    },
  },
};
