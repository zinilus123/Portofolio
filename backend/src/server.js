//1. Import librabry yang dibutuhkan
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

//2. Load file konfigurasi .env
dotenv.config();

// Load koneksi ke database
const db = require('./config/db');

//3. Inisialisasi aplikasi
const app = express();
const PORT = process.env.PORT;

//4. Middleware dasar
app.use(cors()); // Mengizinkan request dari domain lain (Frontend)
app.use(express.json()); // Membaca body request bertipe JSON
app.use(express.urlencoded({ extended: true })); // Membaca body request bertipe form-data/url-encoded

//5. Endpoint dasar(Testing server)
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Selamat datang di API Portofolio Dinamis!',
        version: '1.0.0'
    });
});

// Endpoint untuk cek status API
app.get('/api/status', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Server dalam keadaan sehat dan aktif.',
        timestamp: new Date().toISOString()
    });
});
// Tugas- Tantangan 1
app.get('/api/biodata', (req, res) => {
    res.status(200).json({
        "status": true,
        "data": {
            "nama": "Kailah Balqis Matondang", 
            "kelas": "XI RPL 1",
            "cita-cita": "Filmmaker & Fullstack",
            "hobi": "Berkarya"
        },
    });
});

//==========================================================
// ROUTES API (Mendaftarkan route dari folder routes/)
//==========================================================
const profileRoutes = require('./routes/profileRoutes');
app.use('/api/profile', profileRoutes);

//6. Middleware untuk menangani route yang tidak ditemukan (404 Not Found)
 app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: 'Endpoint tidak ditemukan!',
    });
 });

 //7. Menjalankan Server
 app.listen(PORT, () => {
    console.log(`======================================`);
    console.log(`Server berjalan di: http://localhost:${PORT}`);
    console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
    console.log(`======================================`);
 });
 