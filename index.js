// Importieren von Express
const express = require('express')

// Server erstellen / initialisieren
const app = express()

// Port festlegen
// So schauen wir, ob wir live sind, wenn ja kommt die PORT Varaible dorther
// Ansonten nehmen wir die 3000
const PORT = process.env.PORT || 3000

// statische Dateien servieren
app.use(express.static('public'))


// Wir definieren, mit welcher Methode die Anfrage kommt: .get
// Aufbau (PFAD, CALLBACK)
app.get('/', (req, res) => {
    // res.send("<h1>Hallo from express</h1>")

    // sendFile nur für HTML
    // (PFAD, { OPTIONENKEY: OPTIONENVALUE, ... })
    res.sendFile('./views/index.html', { root: __dirname })
})
app.get('/about', (req, res) => {
    res.sendFile('./views/about.html', { root: __dirname })
})
app.get('/about-me', (req, res) => {
    // Weiterleitung zu einer URL
    res.redirect('/about')
})
const heros = [
    { name: "Superman", age: 22 },
    { name: "Batman", age: 42 }
]
app.get('/api', (req, res) => {
    // res.json([
    //     { name: "Superman", age: 22 },
    //     { name: "Batman", age: 42 }
    // ])
    res.json(heros)
})

app.get('/api/:egal', (req, res) => {
    // console.log(req)
    // console.log(req.params)
    console.log(req.params.egal)
    // res.send(req.params.egal)
    res.json(heros[req.params.egal])
})

app.use((req, res) => {
    // Status setzten
    // res.status(404)
    // res.sendFile('./views/404.html', { root: __dirname })

    // Verketten von Methoden
    res.status(404).sendFile('./views/404.html', { root: __dirname })
})

app.listen(PORT, () => console.log(`Running on http://localhost:${PORT}`))