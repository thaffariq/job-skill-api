# Job-Skill Requirements API

### **Ujian Akhir Semester II3160 - Teknologi Sistem Terintegrasi**

**Disusun Oleh:** Thaffariq Azka Rahmat (18223048)

---

Job-Skill Requirements API adalah Layanan microservice ringan untuk katalog data keahlian pekerjaan (*Job-Skills*), dioptimalkan khusus untuk berjalan pada perangkat dengan sumber daya terbatas seperti **Set-Top Box (STB)**. Proyek ini menggunakan pendekatan **Domain-Driven Design (DDD)** untuk menyediakan data keahlian yang dibutuhkan pekerjaan yang akan digabungkan dengan API Katalog Pekerjaan.

## 🚀 Fitur Utama

* **Optimasi Memori**: Konfigurasi Node.js dibatasi hingga 96MB (`--max-old-space-size=96`) agar tetap stabil di lingkungan STB yang memiliki RAM terbatas.
* **Database SQLite**: Menggunakan `sql.js` untuk manajemen database lokal yang efisien tanpa memerlukan proses server database terpisah.
* **Keamanan API Key**: Proteksi terhadap endpoint privat menggunakan middleware autentikasi melalui header `x-api-key`.
* **Penyajian Data Terpadu**: Menyediakan data keahlian yang sudah ter-parse dari format string SQLite menjadi array JSON yang siap dikonsumsi frontend.
* **Docker Ready**: Konfigurasi Dockerfile dan Docker Compose yang sudah disesuaikan untuk isolasi aplikasi dan kemudahan deployment.

## 🛠️ Stack Teknologi

* **Runtime**: Node.js >= 18.0.0
* **Framework**: Express.js
* **Database**: SQLite (via `sql.js`)
* **Middleware**: CORS (Cross-Origin Resource Sharing), Compression (Gzip), Dotenv

## 📁 Struktur Proyek

```
job-skill-api/
├── src/
│   ├── domain/             # Logic Bisnis (Entity JobSkill & Interface)
│   ├── infrastructure/     # Implementasi Database & Repository (SQLite)
│   ├── interfaces/         # Controller & Routes API
│   ├── middleware/         # Auth (API Key) & Global Error Handling
│   ├── app.js              # Express Configuration (Middleware & Global Routes)
│   └── server.js           # Entry Point & Database Initialization
├── database/               # Direktori File SQLite (.db)
├── .env                    # Environment Variables (Konfigurasi)
├── Dockerfile              # Docker Image Configuration
└── docker-compose.yml      # Deployment Orchestration

```

## ⚙️ Konfigurasi Environment (`.env`)

Salin file `.env.example` menjadi `.env` dan sesuaikan nilainya:

* `PORT`: Port aplikasi (Default: `6161`).
* `API_KEY`: Kunci rahasia untuk autentikasi (Default: `tst-uas-fariq-2026`).
* `DB_PATH`: Lokasi file database SQLite (Default: `./database/jobs_skills_catalog.db`).
* `ALLOWED_ORIGINS`: Daftar domain yang diizinkan melakukan request (CORS).
* `NODE_OPTIONS`: Limit memori Node.js (Default: `--max-old-space-size=96`).

## 📦 Instalasi & Menjalankan

### Menggunakan Docker (Rekomendasi STB)

1. **Clone Repositori**:
```bash
git clone https://github.com/username/job-skill-api.git
cd job-skill-api

```
2. **Setup .env**: Buat file `.env` manual dan isi sesuai konfigurasi lingkungan Anda.
3. **Build dan Jalankan**:
```bash
docker compose up -d --build

```

### Jalankan Lokal

1. **Install Dependensi**: `npm install`.
2. **Jalankan Aplikasi**: `npm start`.
3. **Mode Pengembangan**: `npm run dev` (menggunakan mode watch).

## 📖 Dokumentasi API

Semua endpoint (kecuali `/` dan `/api/health`) memerlukan header `x-api-key`.

| Method | Endpoint | Deskripsi |
| --- | --- | --- |
| **GET** | `/` | Menampilkan deskripsi layanan dan daftar endpoint. |
| **GET** | `/api/health` | Status kesehatan sistem (Public). |
| **GET** | `/api/skills` | Daftar katalog keahlian (Protected). |
| **GET** | `/api/skills/:id` | Detail keahlian berdasarkan ID pekerjaan. |

### Parameter Query (`/api/skills`)

Endpoint ini mendukung filter untuk memudahkan integrasi:

* `page`: Nomor halaman (Default: 1).
* `limit`: Jumlah data per halaman (Default: 10).
* `category`: Filter berdasarkan kategori pekerjaan (Contoh: `INFORMATION-TECHNOLOGY` atau `HUMAN-RESOURCES`).

### Contoh Request (cURL)

```bash
curl -H "x-api-key: tst-uas-fariq-2026" \
     "https://fariq.ibayderikfariqalghanzaka.my.id/api/skills?category=INFORMATION-TECHNOLOGY"

```