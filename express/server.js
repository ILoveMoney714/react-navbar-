const express = require("express");
const app = express();
const mysql = require("mysql");

const db = mysql.createConnection({
    user: "root",
    host: "127.0.0.1",
    port: 3307,
    password: "",
    database: "fogado",
}); 



app.get("/", (req, res) => {
    res.send("Működik a szerver.");
})

app.get("/a", (req, res) => {
    const sql = "SELECT szobak.sznev AS Szobanev, szobak.agy AS Agyak_Szama FROM SZOBAK ";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({error: err.message});
        return res.json(result)
    })
})  

app.get("/b", (req, res) => {
    const sql = "SELECT COUNT(foglalasok.vendeg) AS vendégek, SUM(DATEDIFF(foglalasok.tav, foglalasok.erk)) AS vendégéjszakák FROM foglalasok INNER JOIN szobak ON foglalasok.szoba = szobak.szazon GROUP BY szobak.sznev ORDER BY vendégéjszakák ASC, vendégek ASC";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({error: err.message});
        return res.json(result)
    })
})  

app.get("/c", (req, res) => {
    const sql = "SELECT vendegek.vnev AS nev, DATE_FORMAT(foglalasok.erk, '%Y-%m-%d') AS erkezes, DATE_FORMAT(foglalasok.tav, '%Y-%m-%d') AS tavozas FROM foglalasok INNER JOIN vendegek ON foglalasok.vendeg = vendegek.vsorsz ORDER BY vendegek.vnev ASC";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({error: err.message});
        return res.json(result)
    })
})  

app.listen(3000, () => {
    console.log("fut");
}); 