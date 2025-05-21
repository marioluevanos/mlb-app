import { CurrentInning } from './CurrentInning';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/CurrentInning',
  component: CurrentInning,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof CurrentInning>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    currentInning: 'BOT 9th',
  },
};
