# Live snapshot: profile.thomasoddyc.workers.dev (21 Okt 2026)

Arsip hasil unduh langsung dari website live yang saat itu di-deploy ke
Cloudflare Workers (branch ini di-push ke repo `gooday-lab/thomasoddyc`
sebagai snapshot, bukan source code).

## Isi

- `index.html`, `about/`, `experience/`, `case-studies/`, `projects/`,
  `contact/`, `admin/` — HTML yang di-serve oleh worker (tanpa JS yang
  dijalankan, Next.js di-render di klien untuk bagian interaktif).
- `case-studies/<slug>/`, `projects/<slug>/` — 8 halaman detail project.
- `_next/static/` — CSS, JS chunks, dan asset lain persis seperti di live.
- `og.png`, `favicon.ico`, `portfolio/*.svg`, `downloads/*.zip`,
  `Thomas_Oddy_ATS_CV.docx` — asset statis milik situs.
- `cdn-supabase/` — cover dan file project yang tersimpan di Supabase
  Storage (sumber eksternal situs).
- `assets.txt` — daftar path asset yang ditemukan di halaman live.

## Fakta penting

Semua 17 chunk `_next` di live cocok dengan build lokal `.open-next`
pada repo `thomasoddyc` (commit 49d1564). Artinya versi live saat ini
TIDAK lebih baru dari working copy lokal; hanya perubahan 17 Okt
dulu belum di-commit/di-push ke git.
