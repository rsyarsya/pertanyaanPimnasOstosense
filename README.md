# OSTOSENSE — Ruang latihan reviewer

Website HTML lokal untuk latihan tanya jawab PKM-KC: 61 pertanyaan, tujuh bidang,
roulette tanpa pengulangan dalam sesi, jawaban tersembunyi, pertanyaan lanjutan,
pencarian bank pertanyaan, timer opsional, dan progres tersimpan di browser.

## Membuka website

`index.html` dapat dibuka langsung di browser, tanpa instalasi library dan tanpa internet.
Untuk menjalankan server lokal dengan Node.js, buka terminal di folder ini:

```powershell
node server.mjs
```

Buka http://127.0.0.1:4173. Server hanya mendengarkan koneksi dari komputer ini.
Hentikan dengan Ctrl+C di terminal yang menjalankannya. Jika port sudah dipakai
oleh server website ini, gunakan server yang sedang berjalan.

## Mengubah pertanyaan

Bank pertanyaan berada pada variabel `raw` di `build.py`, dengan format:

```text
kategori|judul|pertanyaan|contoh jawaban|pertanyaan lanjutan|rujukan
```

Setelah mengubah bank pertanyaan atau `template.html`, bangun ulang HTML:

```powershell
node build.mjs
```

Muat ulang halaman browser untuk melihat perubahan. Node.js hanya diperlukan untuk
server dan pembangunan ulang; HTML hasilnya tidak memerlukan Node.js.

## Deploy ke Vercel

Konfigurasi `vercel.json` menjalankan `node build.mjs` dan menerbitkan folder
`dist/`. Hanya HTML hasil build yang disajikan sebagai website.
`index.html` di root tetap tersedia untuk dibuka langsung secara offline.

```powershell
vercel --prod
```

Contoh jawaban merupakan bahan latihan, bukan pembuktian baru atas klaim teknis,
medis, atau administrasi. Rujukan pada kartu membantu tim menyiapkan bukti.
