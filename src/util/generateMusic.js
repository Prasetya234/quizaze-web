import music from "../audio/zapsplat_multimedia_cell_phone_smart_screen_button_press_click_feedback_003_60932.mp3"

let audio

export function play() {
    new Audio(music).play();
}

export function stop() {
    audio.pause();
    audio.currentTime = 0;
}