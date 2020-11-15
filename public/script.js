const WHITE=['a','s','d','f','g','h','j','k','z','x','c','v','b','n']
const BLACK=['q','w','e','r','t','y','u','i','o','p']

const keys = document.querySelectorAll('.key')
const whiteKeys = document.querySelectorAll('.key.white')
const blackKeys = document.querySelectorAll('.key.black')

keys.forEach(key => {
    key.addEventListener('click', () => playNote(key))
})

//Bind keyboard keys to computer keys
document.addEventListener('keydown', e =>{
    if(e.repeat) return
    const key = e.key
    const whiteIndex=WHITE.indexOf(key)
    const blackIndex=BLACK.indexOf(key)

    if (whiteIndex > -1) playNote(whiteKeys[whiteIndex])
    if (blackIndex > -1) playNote(blackKeys[blackIndex])
})

function playNote(key) {
    const noteAudio = document.getElementById(key.dataset.note)
    noteAudio.currentTime=0
    noteAudio.play()
    key.classList.add('active')
    noteAudio.addEventListener('ended', () =>{
        key.classList.remove('active')
    })

}