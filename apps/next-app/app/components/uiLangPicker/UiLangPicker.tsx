"use client";

import { useLingoLocale, setLingoLocale } from "lingo.dev/react/client";
import LangPicker from "../common/LangPicker";

export default function UiLangPicker() {
  const currentLocale = useLingoLocale();

  const resolveLocale = currentLocale ?? "en";

  const changeLocale = (code: string) => setLingoLocale(code);

  return <LangPicker currentLocale={resolveLocale} callback={changeLocale} />;
}
