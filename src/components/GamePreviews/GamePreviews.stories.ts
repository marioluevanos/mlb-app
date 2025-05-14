import type { Meta, StoryObj } from "@storybook/react";
import { GamePreviews } from "./GamePreviews";

const meta = {
  title: "Components/GamePreviews",
  component: GamePreviews,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof GamePreviews>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
