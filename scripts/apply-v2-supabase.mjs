/**
 * apply-v2-supabase.mjs — dijalankan saat user mengatakan "update".
 *
 * Menerapkan dataset v2 ke database Supabase PRODUCTION:
 *  1. Seed project yang belum ada di DB (dari backup/v2-seed-projects.json, teks sudah bersih).
 *  2. Seed experience / certifications / testimonials bila tabel masih kosong
 *     supaya semuanya bisa diedit di Admin.
 *  3. Upsert site copy (42 kunci copy baru v2) dari backup/v2-proposed-site_copy.json.
 *  4. Perbarui bio profil (EN + ID).
 *
 * Jalankan dari root repo:  SB_URL=... SB_SECRET=... node scripts/apply-v2-supabase.mjs
 */
import { createClient } from "@supabase/supabase-js";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const url = process.env.SB_URL;
const key = process.env.SB_SECRET;
if (!url || !key) { console.error("Set SB_URL dan SB_SECRET."); process.exit(1); }

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const read = (f) => JSON.parse(readFileSync(join(root, "backup", f), "utf8"));
const sb = createClient(url, key);
const uid = () => crypto.randomUUID();

// 1. Projects — hanya seed slug yang belum ada
const { data: existing } = await sb.from("projects").select("slug");
const have = new Set((existing ?? []).map((r) => r.slug));
const missing = read("v2-seed-projects.json").filter((p) => !have.has(p.slug));
if (missing.length) {
  const rows = missing.map((p) => ({
    id: uid(), slug: p.slug, title_en: p.title_en, title_id: p.title_id,
    type: p.type, body_en: p.body_en, body_id: p.body_id,
    impact_value: p.impact_value, impact_label_en: p.impact_label_en,
    impact_label_id: p.impact_label_id, tags: p.tags,
    cover_url: p.cover_url, file_url: p.file_url,
    sort_order: p.sort_order, published: p.published,
  }));
  const { error } = await sb.from("projects").insert(rows);
  if (error) { console.error("projects:", error.message); process.exit(1); }
  console.log(`projects: ${rows.length} baris di-seed (${missing.map((p) => p.slug).join(", ")})`);
} else console.log("projects: semua sudah ada");

// 2. Experience / certifications / testimonials bila kosong
const seeds = [
  ["experience", read("v2-seed-experience.json").map((e) => ({ ...e, id: uid() }))],
  ["certifications", read("v2-seed-certifications.json").map((c) => ({ ...c, id: uid() }))],
  ["testimonials", read("v2-seed-testimonials.json").map((t) => ({ ...t, id: uid() }))],
];
for (const [table, rows] of seeds) {
  const { count } = await sb.from(table).select("id", { count: "exact" });
  if ((count ?? 0) > 0) { console.log(`${table}: sudah berisi, dilewati`); continue; }
  const { error } = await sb.from(table).insert(rows);
  if (error) { console.error(`${table}:`, error.message); process.exit(1); }
  console.log(`${table}: ${rows.length} baris di-seed`);
}

// 3. Site copy — upsert semua kunci copy v2
const copyRows = read("v2-proposed-site_copy.json");
const { error: copyErr } = await sb.from("site_copy").upsert(copyRows, { onConflict: "copy_key" });
if (copyErr) { console.error("site_copy:", copyErr.message); process.exit(1); }
console.log(`site_copy: ${copyRows.length} kunci disinkronkan`);

// 4. Profil — bio baru (link CV/foto yang sudah diupload tetap dipakai)
const { data: prof } = await sb.from("profile").select("id").limit(1).maybeSingle();
if (prof) {
  const { error } = await sb.from("profile").update({
    bio_en: "Most of my work starts the same way: a report that eats hours every week. I turn it into something that runs itself.",
    bio_id: "Sebagian besar pekerjaan saya selalu mulai dari hal yang sama: laporan yang memakan waktu berjam-jam setiap minggu. Saya ubah menjadi sistem yang bisa berjalan sendiri.",
  }).eq("id", prof.id);
  if (error) { console.error("profile:", error.message); process.exit(1); }
  console.log("profile: bio diperbarui");
} else console.log("profile: baris tidak ditemukan, dilewati");

console.log("SELESAI — dataset v2 diterapkan.");
