import { GameMatchup } from './GameMatchup';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/GameMatchup',
  component: GameMatchup,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof GameMatchup>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};
