import NextI18Next from "next-i18next";

const NextI18NextInstance = new NextI18Next({
  defaultLanguage: "en",
  otherLanguages: ["ch"],
  localePath: "public/static/locales",
});

export default NextI18NextInstance;
