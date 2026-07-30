# Directory: src/assets/images

Direktori ini digunakan untuk menyimpan gambar/foto internal proyek portofolio (misalnya foto profil hero, aset visual proyek, dsb).

## Keunggulan meletakkan gambar di `src/assets/images/`

1. **Type-Safety & Build Verification**: Menghindari 404 pada production karena Next.js / Turbopack memverifikasi ketersediaan file saat kompilasi (`npm run build`).
2. **Content Hashing (Cache-Busting)**: Nama file dikompilasi dengan hash unik (misal: `profile.a4f8d9.png`), memastikan pengunjung selalu menerima versi foto terbaru dari CDN.
3. **Ekstraksi Metadata Automatic**: Lebar, tinggi, dan blur placeholder diekstrak secara otomatis oleh modul import Next.js.

## Cara Penggunaan

```tsx
import image from "@/assets/images/image.jpg";
import image2 from "@/assets/images/image2.png";
```
