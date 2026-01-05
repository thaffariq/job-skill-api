# Gunakan image node yang sangat ringan
FROM node:18-alpine

# Set direktori kerja
WORKDIR /app

# Salin file package untuk instalasi dependensi
COPY package*.json ./

# Install dependensi (hanya production untuk menghemat ruang)
RUN npm install --omit=dev

# Salin seluruh source code
COPY . .

# Buat folder database jika belum ada (sesuai DB_PATH di .env)
RUN mkdir -p database

# Ekspos port sesuai dengan .env (6161)
EXPOSE 6161

# Gunakan limit memori Node.js yang ketat sesuai spesifikasi STB
ENV NODE_OPTIONS="--max-old-space-size=96"

# Perintah untuk menjalankan aplikasi
CMD ["node", "src/server.js"]