const express = require('express')
const mongoose = require('mongoose')
const Song = require('./models/song.js')
const app = express()
const mongodb = require('mongodb');
const http = require('http');
const nconf = require('nconf');
nconf.argv().env().file('keys.json');

const user = nconf.get('mongoUser');
const pass = nconf.get('mongoPass');
const host = nconf.get('mongoHost');

let uri = `mongodb+srv://${user}:${pass}@${host}`;

mongoose.connect(uri, {
    useNewUrlParser: true, useUnifiedTopology: true
})



app.set('view engine', 'ejs')
app.use(express.json())
app.use(express.static('public'))

app.get('/', (req, res)=>{
    res.render('index')
})

app.post('/songs', async (req, res)=> {
    const song = new Song({
        notes: req.body.songNotes
    })

    await song.save()

    res.json(song)
})

app.get('/songs/:id', async(req, res) => {
    let song
    try {
        song = await Song.findById(req.params.id)
     } catch (e){
         song = undefined
     }  
     res.render('index', {song: song})     
})

var port_number = server.listen(process.env.PORT || 3000);
app.listen(port_number);