import { readFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

/* One icon family for the whole site: Phosphor (MIT), inlined as SVG at
   build time so pages need no icon font or runtime script. Content refers
   to icons by these short names. */
const map = {
  "arrow-left": "arrow-left",
  "arrow-up-left": "arrow-up-left",
  article: "article",
  book: "book-open-text",
  broadcast: "broadcast",
  calendar: "calendar-dots",
  "caret-down": "caret-down",
  "caret-left": "caret-left",
  "caret-right": "caret-right",
  chart: "chart-line-up",
  chats: "chats-circle",
  check: "check-circle",
  clock: "clock",
  code: "code",
  compass: "compass",
  cube: "cube",
  mobile: "device-mobile",
  envelope: "envelope",
  film: "film-slate",
  graduation: "graduation-cap",
  handshake: "handshake",
  headphones: "headphones",
  instagram: "instagram-logo",
  lightbulb: "lightbulb",
  linkedin: "linkedin-logo",
  menu: "list",
  search: "magnifying-glass",
  pin: "map-pin",
  megaphone: "megaphone",
  mic: "microphone",
  "monitor-play": "monitor-play",
  brush: "paint-brush",
  send: "paper-plane-tilt",
  pen: "pen-nib",
  phone: "phone",
  play: "play",
  presentation: "presentation-chart",
  rocket: "rocket",
  shield: "shield-check",
  sparkle: "sparkle",
  stack: "stack",
  target: "target",
  telegram: "telegram-logo",
  users: "users-three",
  video: "video-camera",
  warning: "warning",
  wrench: "wrench",
  close: "x",
  x: "x-logo",
  arrow: "arrow-left",
};

const root = join(dirname(fileURLToPath(import.meta.url)), "..", "node_modules", "@phosphor-icons", "core", "assets");
const cache = new Map();

/**
 * @param {keyof typeof map} name
 * @param {{size?: number, weight?: "regular"|"bold"|"fill"|"duotone", cls?: string, label?: string}} [o]
 */
export function icon(name, o = {}) {
  const { size = 20, weight = "regular", cls = "", label } = o;
  const file = map[name];
  if (!file) throw new Error(`Unknown icon: ${name}`);
  const key = `${file}:${weight}`;
  if (!cache.has(key)) {
    const suffix = weight === "regular" ? "" : `-${weight}`;
    const svg = readFileSync(join(root, weight, `${file}${suffix}.svg`), "utf8");
    cache.set(key, svg.replace(/^<svg[^>]*>/, "").replace(/<\/svg>\s*$/, ""));
  }
  const a11y = label ? `role="img" aria-label="${label}"` : `aria-hidden="true" focusable="false"`;
  return `<svg class="i${cls ? ` ${cls}` : ""}" width="${size}" height="${size}" viewBox="0 0 256 256" fill="currentColor" ${a11y}>${cache.get(key)}</svg>`;
}
