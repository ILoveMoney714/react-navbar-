
// Betöltjük az Express keretrendszert
const express = require("express");
const app = express();

// Betöltjük a MySQL modult
const mysql = require("mysql");

// Létrehozzuk az adatbázis kapcsolatot
const db = mysql.createConnection({
    user: "root", // Felhasználónév az adatbázishoz
    host: "127.0.0.1", // Helyi gép IP címe
    port: 3307, // Az adatbázis szerver portja
    password: "", // Jelszó 
    database: "fogado", // Az adatbázis neve
}); 

// Alap útvonal: ha valaki meglátogatja a gyökér URL-t, akkor ezt az üzenetet kapja.
app.get("/", (req, res) => {
    res.send("Működik a szerver.");
})

// "/a" útvonal: lekérdezi a szobák nevét és az ágyak számát.
app.get("/a", (req, res) => {
    const sql = "SELECT szobak.sznev AS Szobanev, szobak.agy AS Agyak_Szama FROM SZOBAK ";
    // Lefuttatjuk az SQL lekérdezést
    db.query(sql, (err, result) => {
        // Ha hiba van, visszaküldjük a hibát JSON formátumban
        if (err) return res.status(500).json({error: err.message});
        // Ha sikeres, visszaküldjük az eredményt JSON formátumban
        return res.json(result)
    })
})  

// "/b" útvonal: lekérdezi, hogy hány vendég volt és hány vendégéjszaka történt szobánként.
app.get("/b", (req, res) => {
    const sql = "SELECT COUNT(foglalasok.vendeg) AS vendégek, SUM(DATEDIFF(foglalasok.tav, foglalasok.erk)) AS vendégéjszakák FROM foglalasok INNER JOIN szobak ON foglalasok.szoba = szobak.szazon GROUP BY szobak.sznev ORDER BY vendégéjszakák ASC, vendégek ASC";
    // Lefuttatjuk az SQL lekérdezést
    db.query(sql, (err, result) => {
        // Hiba esetén visszaküldjük a hibát
        if (err) return res.status(500).json({error: err.message});
        // Siker esetén visszaküldjük az eredményt
        return res.json(result)
    })
})  

// "/c" útvonal: lekérdezi a vendégek nevét és foglalásuk időpontját.
app.get("/c", (req, res) => {
    const sql = "SELECT vendegek.vnev AS nev, DATE_FORMAT(foglalasok.erk, '%Y-%m-%d') AS erkezes, DATE_FORMAT(foglalasok.tav, '%Y-%m-%d') AS tavozas FROM foglalasok INNER JOIN vendegek ON foglalasok.vendeg = vendegek.vsorsz ORDER BY vendegek.vnev ASC";
    // Lefuttatjuk az SQL lekérdezést
    db.query(sql, (err, result) => {
        // Hiba esetén visszaküldjük a hibát
        if (err) return res.status(500).json({error: err.message});
        // Siker esetén visszaküldjük az eredményt
        return res.json(result)
    })
})  

// Elindítjuk a szervert a 3000-es porton
app.listen(3000, () => {
    console.log("fut");
});


//Az AI segítségét használtam a b, és a c lekérdezéshez, mert 11. osztály óta sokat felejtettem az sql-ből.