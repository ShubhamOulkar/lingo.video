"use client";

import { useId } from "react";
import styles from "./LangPicker.module.css";

interface Prop {
  currentLocale: string;
  callback: (code: string) => void;
}

export default function LangPicker({ currentLocale, callback }: Prop) {
  const id = useId();

  const locales = [
    { code: "en", name: "English" },
    { code: "es", name: "Spanish" },
    { code: "de", name: "German" },
    { code: "fr", name: "French" },
    { code: "hi", name: "Hindi" },
    { code: "ja", name: "Japanese" },
  ];

  const changeLocale = (code: string) => callback(code);

  return (
    <div className={styles.lang_select_container}>
      <select
        id={`locale-select-${id}`}
        value={currentLocale}
        onChange={(e) => changeLocale(e.target.value)}
        className={styles.lang_select_dropdown}
      >
        {locales.map((l) => (
          <option key={`${id}-${l.code}`} value={l.code}>
            {l.name} ({l.code.toUpperCase()})
          </option>
        ))}
      </select>
    </div>
  );
}
