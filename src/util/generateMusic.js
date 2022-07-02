import music from '../assets/audio/zapsplat_multimedia_cell_phone_smart_screen_button_press_click_feedback_003_60932.mp3';
import musicStart from '../assets/audio/start-answer.wav'


export function play() {
  new Audio(music).play();
}

export function readyAnswer() {
  const music = new Audio(musicStart)
  music.volume = 0.5
  music.play();
}
