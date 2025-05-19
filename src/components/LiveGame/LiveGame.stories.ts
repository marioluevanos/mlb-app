import type { Meta, StoryObj } from '@storybook/react';
import { LiveGame } from './LiveGame';

const meta = {
  title: 'Components/LiveGame',
  component: LiveGame,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {},
} satisfies Meta<typeof LiveGame>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
