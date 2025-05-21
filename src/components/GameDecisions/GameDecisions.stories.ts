import { GameDecisions } from './GameDecisions';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/GameDecisions',
  component: GameDecisions,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof GameDecisions>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
