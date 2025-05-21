import { PlayEvents } from './PlayEvents';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'Components/PlayEvents',
  component: PlayEvents,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof PlayEvents>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {},
};
