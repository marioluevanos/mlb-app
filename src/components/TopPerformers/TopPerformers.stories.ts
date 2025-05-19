import { TopPerformers } from './TopPerformers'
import type { Meta, StoryObj } from '@storybook/react'
import { GAME_FINAL } from '@/_mockdata/mockdata'

const meta = {
  title: 'Components/TopPerformers',
  component: TopPerformers,
  parameters: {},
  argTypes: {},
} satisfies Meta<typeof TopPerformers>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    topPerformers: GAME_FINAL.topPerformers,
  },
}
