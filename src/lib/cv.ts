/**
 * CV facts: impact metrics, work history, and skills.
 * These describe real career data rather than greetings, so they live here
 * instead of the admin-editable site copy.
 */

export const impact = [
  { value: "8+", label: "years in banking", id: "tahun di perbankan" },
  { value: "50K+", label: "credit records managed", id: "data kredit dikelola" },
  { value: "75%", label: "faster reporting", id: "reporting lebih cepat" },
  { value: "4 → 1", label: "days for weekly reporting", id: "hari untuk reporting mingguan" },
];

export const experience = [
  {
    years: "Mar 2022 — Aug 2026",
    company: "PT. Bank Maspion Indonesia Tbk",
    role: "Credit Reporting",
    body: "Prepared and validated 50,000+ credit records for regulatory and internal reporting. Built Excel VBA workflows for reconciliation, validation, file processing, and recurring reports.",
    result: "Reporting time reduced from 8 hours to 2 hours.",
  },
  {
    years: "Mar 2018 — Mar 2022",
    company: "PT. Bank Pan Indonesia Tbk",
    role: "Branch Support",
    body: "Streamlined disbursement and loan settlement reporting while analyzing pipeline, disbursement, settlement, and NPL indicators for branch performance monitoring.",
    result: "Weekly reporting reduced from 4 days to 1 day.",
  },
  {
    years: "Aug 2017 — Sep 2017",
    company: "PT. Telkom Indonesia",
    role: "IT Support Intern",
    body: "Supported the development of a web-based application for monitoring Telkom device distribution, including PHP and MySQL-related activities.",
    result: "First step into building useful systems.",
  },
];

export const skills = [
  { group: "Data & reporting", items: ["Data analysis", "Regulatory reporting", "SLIK reporting", "Data reconciliation", "Validation", "Forecasting"] },
  { group: "Automation", items: ["Excel VBA", "Macro development", "TXT import / export", "File processing", "Pivot tables", "Advanced formulas"] },
  { group: "Working style", items: ["Detail-oriented", "Process improvement", "Problem solving", "Performance monitoring", "Business reporting", "Target planning"] },
];
