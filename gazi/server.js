const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors'); // CORS middleware ekleyin
const { Pool } = require('pg');

const app = express();
const port = 7272;

// PostgreSQL bağlantı bilgileri
const pool = new Pool({
  user: 'root',
  host: 'localhost',
  database: 'gazi', // Veritabanı adı
  password: 'root',
  port: 5432 // PostgreSQL portu
});

// Middleware: JSON verilerini işleme için body-parser kullanın
app.use(bodyParser.json());

// CORS middleware'ini kullanın
app.use(cors());

// Kullanıcı girişi için POST endpoint'i
app.post('/api/Controlgazi/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // PostgreSQL sorgusu: Kullanıcıyı email ve password ile ara
    const query = 'SELECT email, password FROM public.admin WHERE email = $1 AND password = $2';
    const { rows } = await pool.query(query, [email, password]);

    // Kullanıcı bulunduysa ve parola doğruysa başarılı döner
    if (rows.length > 0) {
      res.json({ success: true });
    } else {
      res.status(401).json({ success: false, message: 'Email veya parola hatalı' });
    }
  } catch (error) {
    console.error('Veritabanı hatası:', error);
    res.status(500).json({ success: false, error: 'Veritabanı hatası' });
  }
});

// Express uygulamasını belirtilen port üzerinde dinlemeye başlatın
app.listen(port, () => {
  console.log(`Sunucu http://localhost:${port} portunda dinleniyor`);
});
