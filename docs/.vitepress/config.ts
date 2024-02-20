import { defineConfig } from "vitepress";
import { version } from "../../package.json";

export default defineConfig({
  title: "Z Calendar",
  lastUpdated: true,
  description: "Components, composables and configurations for Vue 3",
  base: "/zcalendar/",
  themeConfig: {
    nav: [
      { text: "Home", link: "/" },
      { text: "Get Started", link: "/installation" },
      { text: "Demo", link: "/demo" },
      {
        text: version,
        items: [
          {
            text: "Changelog",
            link: "https://github.com/mehotkhan/zcalendar/releases",
          },
        ],
      },
    ],
    search: {
      provider: "local",
    },
    editLink: {
      pattern: "https://github.com/mehotkhan/zcalendar/edit/master/docs/:path",
    },
    socialLinks: [
      { icon: "github", link: "https://github.com/mehotkhan/zcalendar" },
    ],
    footer: {
      message: "Released under the MIT License.",
      copyright: `Copyright © ${new Date().getFullYear()} Ali Zemani`,
    },
    sidebar: [
      {
        text: "Get Started",
        items: [
          { text: "Installation", link: "/installation" },
          { text: "Demo", link: "/demo" },
        ],
      },
      {
        text: "Date Picker",
        items: [{ text: "Intro", link: "/datepicker/index" }],
      },
      {
        text: "Calendar",
        items: [{ text: "Intro", link: "/calendar/index" }],
      },
      {
        text: "Customization",
        items: [
          { text: "Theming options", link: "/theming-options" },
          { text: "Props", link: "/props" },
          { text: "Events", link: "/events" },
          { text: "Advanced Features", link: "/advanced-features" },
        ],
      },
    ],
  },
  vite: {
    optimizeDeps: {
      include: ["@headlessui/vue", "luxon"],
      exclude: [],
    },
  },
});
