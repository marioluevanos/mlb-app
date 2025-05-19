import type { Meta, StoryObj } from '@storybook/react';
import { PlayEvents } from './PlayEvents';
import { GAME_1ST } from '@/_mockdata/mockdata';

const meta = {
  title: 'Components/PlayEvents',
  component: PlayEvents,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof PlayEvents>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    events: GAME_1ST.currentPlay?.events,
    result: GAME_1ST.currentPlay?.result,
  },
};
