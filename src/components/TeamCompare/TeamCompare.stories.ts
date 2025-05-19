import type { Meta, StoryObj } from '@storybook/react';
import { TeamCompare } from './TeamCompare';
import { GAME_FINAL } from '@/_mockdata/mockdata';

const meta = {
  title: 'Components/TeamCompare',
  component: TeamCompare,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof TeamCompare>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    away: GAME_FINAL.away,
    home: GAME_FINAL.home,
  },
};
