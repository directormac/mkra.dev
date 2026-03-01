export const SITE = {
  website: "https://mkra.dev",
  author: "Mac",
  profile: "https://github.com/directormac",
  desc: "My little space of existence on the web",
  title: "mkra.dev",
  ogImage: "devosfera-og.webp",
  lightAndDarkMode: true,
  postPerIndex: 6,
  postPerPage: 8,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: false,
  showGalleries: false,
  showBackButton: true, // show back button in post detail
  editPost: {
    enabled: false,
    text: "Edit post",
    url: "https://github.com/directormac/mkra.dev/edit/main/",
  },
  dynamicOgImage: true,
  dir: "ltr", // "rtl" | "auto"
  lang: "en", // html lang code. Set this empty and default will be "en"
  timezone: "Asia/Manila", // Default global timezone (IANA format) https://en.wikipedia.org/wiki/List_of_tz_database_time_zones
  introAudio: {
    enabled: false,
    src: "/audio/intro-web.mp3",
    label: "INTRO.MP3",
    duration: 30,
  },
} as const;
