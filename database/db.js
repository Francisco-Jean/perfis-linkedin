const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./database/profiles.db');

const clearDatabaseOnStart = false;

// Cria a tabela se não existir
db.serialize(() => {

    if (clearDatabaseOnStart) {
        db.run(`DROP TABLE IF EXISTS profiles`);
        console.log('Banco de dados limpo.');
    }

    db.run(`CREATE TABLE IF NOT EXISTS profiles (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        url TEXT UNIQUE,
        name TEXT,
        qrCode TEXT
    )`);
});

// Função para adicionar perfil
exports.addProfile = (url, name, qrCode) => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT OR IGNORE INTO profiles (url, name, qrCode) VALUES (?, ?, ?)`, [url, name, qrCode], function(err) {
            if (err) reject(err);
            resolve();
        });
    });
};

// Função para buscar todos os perfis
exports.getAllProfiles = () => {
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM profiles`, (err, rows) => {
            if (err) reject(err);
            resolve(rows);
        });
    });
};
