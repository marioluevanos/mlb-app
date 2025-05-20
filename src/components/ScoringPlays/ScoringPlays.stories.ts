import { ScoringPlays } from './ScoringPlays';
import type { Meta, StoryObj } from '@storybook/react';
import { GAME_XINN } from '@/_mockdata/mockdata';

const meta = {
  title: 'Components/ScoringPlays',
  component: ScoringPlays,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof ScoringPlays>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    onPlayerClick: () => undefined,
    scoringPlays: GAME_XINN.scoringPlays,
  },
};
