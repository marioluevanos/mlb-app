import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./Header";
import { createElement } from "react";

const meta = {
  title: "UI/Header",
  component: Header,
  parameters: {
    layout: "fullscreen",
  },
  args: {},
} satisfies Meta<typeof Header>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    children: createElement(Header.Nav, {
      isLoading: false,
      date: new Date().toISOString(),
    }),
  },
};
