import { createElement } from 'react';
import { Batter } from '../Player/Player.stories';
import { GameBug } from '../GameBug/GameBug';
import { GameMatchup } from './GameMatchup';
import type { Meta, StoryObj } from '@storybook/react';
import { GAME_XINN } from '@/_mockdata/mockdata';

const meta = {
  title: 'Components/GameMatchup',
  component: GameMatchup,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof GameMatchup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render() {
    return createElement(
      GameMatchup,
      {
        matchup: GAME_XINN.currentPlay?.matchup,
      },
      createElement(GameBug, {
        count: {
          balls: 3,
          strikes: 2,
          outs: 2,
        },
        runners: {
          third: Batter.args?.player,
        },
        currentInning: 'BOT 9th',
      }),
    );
  },
};
