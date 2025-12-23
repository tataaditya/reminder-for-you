# SuratBunga: Taman Virtual & Buku Tamu

Aplikasi web sederhana namun manis yang menampilkan animasi bunga bermekaran di malam hari, dilengkapi dengan buku tamu *real-time* untuk pengunjung meninggalkan pesan harapan.

## Fitur
- **Animasi CSS Murni**: Bunga yang tumbuh dan bergoyang tertiup angin.
- **Buku Tamu Real-time**: Menggunakan Firebase Realtime Database.
- **Simpan Kenangan**: Fitur screenshot unuk menyimpan tampilan taman saat ini.
- **Responsive**: Tampilan menyesuaikan desktop dan mobile.

## Struktur Project
```
SuratBunga/
├── index.html          # Halaman utama
├── assets/
│   ├── css/
│   │   └── styles.css  # Style animasi & UI
│   └── js/
│       └── app.js      # Logika aplikasi (Firebase & Capture)
├── firebase.json       # Konfigurasi hosting
└── README.md           # Dokumentasi ini
```

## Cara Menjalankan (Local)

1. **Clone atau Download** project ini.
2. Jika belum ada Firebase Project:
   - Buka [Firebase Console](https://console.firebase.google.com/).
   - Buat project baru.
   - Buat **Realtime Database** (pilih mode *test* untuk awal).
   - Buat aplikasi **Web** di project settings, lalu salin `firebaseConfig`.
3. Update `assets/js/app.js`:
   - Cari bagian `const firebaseConfig = { ... }`.
   - Ganti dengan config milikmu.
4. Jalankan server lokal. Bisa menggunakan Live Server (VS Code) atau:
   ```bash
   npx serve .
   ```
5. Buka `http://localhost:3000` (atau port yang sesuai).

## Cara Deploy ke Firebase Hosting

1. **Install Firebase CLI**:
   ```bash
   npm install -g firebase-tools
   ```
2. **Login**:
   ```bash
   firebase login
   ```
3. **Inisialisasi Project** (jika belum):
   ```bash
   firebase init hosting
   ```
   - Pilih project yang sudah dibuat.
   - Public directory: `.` (titik - direktori saat ini) atau biarkan default `public` jika ingin memindahkan file HTML kesana. *Untuk project ini, struktur flat (root) lebih mudah, jadi saat ditanya "What do you want to use as your public directory?", ketik `.` (tanpa kutip).*
   - Configure as single-page app? `No`.
4. **Deploy**:
   ```bash
   firebase deploy
   ```

## Alternatif: Vercel / GitHub Pages

- **GitHub Pages**: Upload ke repo GitHub, masuk Settings > Pages, pilih branch main. (Catatan: Rahasia Firebase Config akan terlihat publik di source code, yang wajar untuk aplikasi klien-sisi seperti ini, tapi pastikan mengaktifkan *App Check* atau *Security Rules* di Firebase jika ingin lebih aman).
- **Vercel**: Install Vercel CLI atau hubungkan repo GitHub di dashboard Vercel.

## Konfigurasi Keamanan (Firebase Rules)

Di Firebase Console > Realtime Database > Rules, gunakan aturan ini untuk mencegah spam sederhana dan memastikan validasi data:

```json
{
  "rules": {
    "messages": {
      ".read": true,
      ".write": "newData.hasChildren(['name', 'text', 'timestamp']) && newData.child('text').val().length > 0 && newData.child('text').val().length <= 140",
      "$messageId": {
        ".validate": "newData.child('timestamp').val() <= now"
      }
    }
  }
}
```
