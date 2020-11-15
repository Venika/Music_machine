const WHITE=['a','s','d','f','g','h','j','k','z','x','c','v','b','n']
const BLACK=['q','w','e','r','t','y','u','i','o','p']

const recordButton = document.querySelector('.recordBtn')
const playButton = document.querySelector('.playBtn')
const saveButton = document.querySelector('.saveBtn')
const songLink = document.querySelector('.songLink')
const keys = document.querySelectorAll('.key')
const whiteKeys = document.querySelectorAll('.key.white')
const blackKeys = document.querySelectorAll('.key.black')

let recordingStartTime
let songNotes = currentSong && currentSong.notes

//Will return key for the notes
const keyMap = [...keys].reduce((map, key) =>{
    map[key.dataset.note]= key
    return map
}, {})


keys.forEach(key => {
    key.addEventListener('click', () => playNote(key))
})

if (recordButton){
    recordButton.addEventListener('click', togglerRecording)
}

if(saveButton){
    saveButton.addEventListener('click', saveSong)
}

playButton.addEventListener('click', playSong)


//Bind keyboard keys to computer keys
document.addEventListener('keydown', e =>{
    if(e.repeat) return
    const key = e.key
    const whiteIndex=WHITE.indexOf(key)
    const blackIndex=BLACK.indexOf(key)

    if (whiteIndex > -1) playNote(whiteKeys[whiteIndex])
    if (blackIndex > -1) playNote(blackKeys[blackIndex])
})

function togglerRecording(){
    recordButton.classList.toggle('active')
    if (isRecording()){
        startRecording()
    } else {
        stopRecording()
    }
}

function isRecording() {
    return recordButton != null && recordButton.classList.contains('active')
}

function startRecording() {
    recordingStartTime = Date.now()
    songNotes = []
    playButton.classList.remove('show')
    saveButton.classList.remove('show')
}

function stopRecording() {
    playSong()
    playButton.classList.add('show')
    saveButton.classList.add('show')
}

function playSong() {
    if(songNotes.length == 0) return
    songNotes.forEach(note =>{
        setTimeout(() => {
            playNote(keyMap[note.key])
        }, note.startTime)
    })
}

function playNote(key) {
    if (isRecording()) recordNote(key.dataset.note)
    const noteAudio = document.getElementById(key.dataset.note)
    noteAudio.currentTime=0
    noteAudio.play()
    key.classList.add('active')
    noteAudio.addEventListener('ended', () =>{
        key.classList.remove('active')
    })

}

function recordNote(note) {
    songNotes.push({
        key: note,
        startTime: Date.now() - recordingStartTime
    })
}

function saveSong(){
    axios.post('/songs', { songNotes: songNotes}).then(res => {
        songLink.classList.add('show')
        songLink.href= `/songs/${res.data._id}`
        
    })
}