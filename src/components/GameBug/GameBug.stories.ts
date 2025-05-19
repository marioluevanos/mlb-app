import { Batter } from '../Player/Player.stories';
import { GameBug } from './GameBug';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/GameBug',
  component: GameBug,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof GameBug>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: {
      balls: 3,
      strikes: 2,
      outs: 2,
    },
    runners: {
      third: Batter.args?.player,
    },
    currentInning: 'BOT 9th',
  },
};
