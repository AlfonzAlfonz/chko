"use client";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import CssBaseline from "@mui/joy/CssBaseline";
import { CssVarsProvider, extendTheme } from "@mui/joy/styles";
import { useServerInsertedHTML } from "next/navigation";
import { ReactNode, useState } from "react";

interface Props {
  children: ReactNode;
}

// This implementation is from emotion-js
// https://github.com/emotion-js/emotion/issues/2928#issuecomment-1319747902
export const ThemeRegistry = ({ children }: Props) => {
  const [{ cache, flush }] = useState(() => {
    const cache = createCache({ key: "joy" });
    cache.compat = true;
    const prevInsert = cache.insert;
    let inserted: string[] = [];
    cache.insert = (...args) => {
      const serialized = args[1];
      if (cache.inserted[serialized.name] === undefined) {
        inserted.push(serialized.name);
      }
      return prevInsert(...args);
    };
    const flush = () => {
      const prevInserted = inserted;
      inserted = [];
      return prevInserted;
    };
    return { cache, flush };
  });

  useServerInsertedHTML(() => {
    const names = flush();
    if (names.length === 0) {
      return null;
    }
    let styles = "";
    for (const name of names) {
      styles += cache.inserted[name];
    }
    return (
      <style
        key={cache.key}
        data-emotion={`${cache.key} ${names.join(" ")}`}
        dangerouslySetInnerHTML={{
          __html: styles,
        }}
      />
    );
  });

  return (
    <CacheProvider value={cache}>
      <CssVarsProvider theme={theme}>
        <CssBaseline />
        {children}
      </CssVarsProvider>
    </CacheProvider>
  );
};

const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          900: "#12536C",
          800: "#187E85",
          700: "#1E9D8A",
          600: "#26B581",
          500: "#2ECC71",
          400: "#48D569",
          300: "#62DE68",
          200: "#8BE57D",
          100: "#B3EC99",
          50: "#D4F2B5",
        },
      },
    },
  },
});
