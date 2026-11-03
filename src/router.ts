import { useEffect, useState } from "react";
import { CONFIG, useLang } from "./i18n";

/*
  Hash routing (#/path) so the site works on any static host
  without server rewrite rules.
*/

export interface Route {
  path: string;
  query: URLSearchParams;
}

function readRoute(): Route {
  const h = window.location.hash.replace(/^#/, "");
  const [path, qs = ""] = (h.startsWith("/") ? h : "/").split("?");
  return { path: path.replace(/\/+$/, "") || "/", query: new URLSearchParams(qs) };
}

export function useRoute(): Route {
  const [route, setRoute] = useState(readRoute);
  useEffect(() => {
    const on = () => setRoute(readRoute());
    window.addEventListener("hashchange", on);
    return () => window.removeEventListener("hashchange", on);
  }, []);
  return route;
}

export const to = (path: string) => "#" + path;

export function go(path: string) {
  window.location.hash = path;
}

export function useTitle(title: string) {
  const { b } = useLang();
  const name = b(CONFIG.name);
  useEffect(() => {
    document.title = title ? `${title} | ${name}` : name;
  }, [title, name]);
}
