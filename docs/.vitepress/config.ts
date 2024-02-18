import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "ZCalendar",
  description: "Vue3 Luxon Calendar",
  base: "/zcalendar/",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: "Home", link: "/" },
      { text: "Docs", link: "/intro/index" },
    ],

    sidebar: [
      {
        text: "Intro",
        items: [
          { text: "Intro", link: "/intro/index" },
          { text: "Install", link: "/intro/install" },
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
        text: "Config",
        items: [{ text: "Intro", link: "/config/index" }],
      },
    ],

    socialLinks: [{ icon: "github", link: "https://github.com/mehotkhan/zcalendar" }],
  },
  // locales: {
  //   root: {
  //     label: 'English',
  //     lang: 'en'
  //   },
  //   fr: {
  //     label: 'Persian',
  //     lang: 'fa', // optional, will be added  as `lang` attribute on `html` tag
  //     link: '/fa/guide/' // default /fr/ -- shows on navbar translations menu, can be external

  //   }
  // }
});
