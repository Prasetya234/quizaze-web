import music from "../audio/holiday-is-coming-11852.mp3"

let audio

export function play() {
    audio = document.createElement("AUDIO")
    document.body.appendChild(audio);
    audio.src = music
    document.body.addEventListener("mousemove", function () {
        audio.play()
    })
}

export function stop() {
    audio.pause();
    audio.currentTime = 0;
}