// Exact figures from BRIEF.md. Do not edit without updating the app.
export type PeriodId = "monthly" | "quarterly" | "yearly";

export interface Period {
  id: PeriodId;
  label: string;
  price: string;
  perMonth: string;
  billed: string;
  save: number | null;
}

export const PERIODS: Period[] = [
  { id: "monthly", label: "Monthly", price: "$1.29", perMonth: "$1.29", billed: "billed every month", save: null },
  { id: "quarterly", label: "Quarterly", price: "$3.29", perMonth: "$1.10", billed: "billed every 3 months", save: 15 },
  { id: "yearly", label: "Yearly", price: "$9.99", perMonth: "$0.83", billed: "billed every year", save: 35 },
];

export const FREE_FEATURES = [
  "3 notebooks + 1 whiteboard",
  "All writing tools and 2D shapes",
  "PDF import and annotation",
  "Find, PDF search and automatic outlines",
  "Presentation mode",
  "Export",
];

export const PRO_FEATURES = [
  "Unlimited notebooks and whiteboards",
  "Split View: two notebooks side by side",
  "Audio recording linked to handwriting",
  "Graphs, geometry and 3D shapes",
];

type Cell = boolean | string;
export interface CompareGroup { title: string; rows: { label: string; free: Cell; pro: Cell }[] }

export const FREE_VS_PRO: CompareGroup[] = [
  {
    title: "Writing and Files",
    rows: [
      { label: "Notebooks", free: "3", pro: "Unlimited" },
      { label: "Whiteboards", free: "1", pro: "Unlimited" },
      { label: "All writing tools", free: true, pro: true },
      { label: "PDF import and annotation", free: true, pro: true },
      { label: "Export", free: true, pro: true },
      { label: "Find in notebook (match case, regex)", free: true, pro: true },
      { label: "PDF search and automatic outlines", free: true, pro: true },
      { label: "Presentation mode", free: true, pro: true },
    ],
  },
  {
    title: "Pro Tools",
    rows: [
      { label: "Split View (two notebooks side by side)", free: false, pro: true },
      { label: "Audio recording linked to handwriting", free: false, pro: true },
      { label: "Graphs, geometry and 3D shapes", free: false, pro: true },
    ],
  },
];

// Competitor comparison, exactly as BRIEF.md. true = yes, false = not offered, "not yet" = Lilypad gap.
export const COMPETITORS = ["Lilypad Pro", "Goodnotes Essential", "Notability Plus", "CollaNote Premium"] as const;
export const COMPETITOR_ROWS: { label: string; values: Cell[] }[] = [
  { label: "Price", values: ["$9.99/yr", "$11.99/yr", "$15.99/yr (sale; reg. $19.99)", "$13.90 one-time"] },
  { label: "Shorter plans", values: ["monthly, 3-month", false, false, false] },
  { label: "Free tier", values: ["3 notebooks + 1 whiteboard", "3 files", "5 notes", "10 pages/note"] },
  { label: "Sync", values: ["your iCloud", "iCloud", "Notability Cloud", "iCloud Drive"] },
  { label: "Account needed", values: ["Sign in with Apple", "for cloud features", "for cloud", "for collaboration"] },
  { label: "Automatic PDF headings", values: [true, false, false, false] },
  { label: "Regex Find", values: [true, false, false, false] },
  { label: "Split View", values: [true, true, "multi-note", false] },
  { label: "Audio synced to ink", values: [true, false, true, true] },
  { label: "Graphs / geometry / 3D", values: [true, false, false, false] },
  { label: "Handwriting search", values: ["not yet", true, true, false] },
  { label: "AI features", values: [false, "basic", "limited", "AI pen/chat"] },
];
export const COMPETITOR_NOTE = "Competitor details from their public pricing pages, November 2026.";
