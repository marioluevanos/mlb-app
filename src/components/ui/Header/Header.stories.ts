import { createElement } from 'react';
import { MLBProvider } from '../MLBProvider';
import { Header } from './Header';
import type { Meta, StoryObj } from '@storybook/react';

const meta = {
  title: 'UI/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
  args: {},
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render() {
    return createElement(MLBProvider, {}, createElement(Header));
  },
};
