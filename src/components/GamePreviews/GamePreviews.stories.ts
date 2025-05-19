import { createElement } from 'react';
import { MLBProvider } from '../ui/MLBProvider';
import { GamePreviews } from './GamePreviews';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/GamePreviews',
  component: GamePreviews,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {},
} satisfies Meta<typeof GamePreviews>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render() {
    return createElement(MLBProvider, {}, createElement(GamePreviews));
  },
};
