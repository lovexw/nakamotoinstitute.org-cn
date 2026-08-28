import { canonicalLocales, defaultLocale } from "@/i18n";

export const fallbackLng = "zh-cn";
export const defaultNS = "common";

type KeySeparator = string | false | undefined;

export function getOptions(
  lng = fallbackLng,
  ns: string | string[] = defaultNS,
) {
  return {
    // debug: true,
    supportedLngs: canonicalLocales,
    keySeparator: false as KeySeparator,
    fallbackLng: defaultLocale,
    lng,
    fallbackNS: defaultNS,
    returnEmptyString: false,
    defaultNS,
    ns,
  };
}
