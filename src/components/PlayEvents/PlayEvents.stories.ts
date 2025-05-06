import type { Meta, StoryObj } from "@storybook/react";
import { PlayEvents } from "./PlayEvents";
import { GAME_XINN } from "@/_mockdata/mockdata";

const meta = {
  title: "Components/PlayEvents",
  component: PlayEvents,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof PlayEvents>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    events: GAME_XINN.currentPlay?.events,
    result: GAME_XINN.currentPlay?.result,
  },
};
