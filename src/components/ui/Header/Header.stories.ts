import type { Meta, StoryObj } from "@storybook/react";
import { Header } from "./Header";
import { createElement } from "react";
import { MLBProvider } from "../MLBProvider";

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
  render() {
    return createElement(MLBProvider, {}, createElement(Header));
  },
};
