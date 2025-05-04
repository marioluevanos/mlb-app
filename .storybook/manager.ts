import { create } from "@storybook/theming/create";
import { addons } from "@storybook/manager-api";

addons.setConfig({
  theme: create({
    base: "light",
    brandTitle: "MLB App",
    brandUrl: "https://mlb-games.web.app",
    brandImage: "/icon.png",
  }),
});
