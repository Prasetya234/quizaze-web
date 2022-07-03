import music from '../assets/audio/zapsplat_multimedia_cell_phone_smart_screen_button_press_click_feedback_003_60932.mp3';
import musicStart from '../assets/audio/start-answer.wav'
import musicEnd from '../assets/audio/end-answer.wav'
import trueAnswer from '../assets/audio/true-answer.wav'
import wrongAnswer from '../assets/audio/wrong-answer.wav'

export function play() {
  new Audio(music).play();
}

export function readyAnswer() {
  const music = new Audio(musicStart)
  music.volume = 0.5
  music.play();
}

export function endAnswer() {
  const music = new Audio(musicEnd)
  music.volume = 1
  music.play();
}

export function playAnswerTrue() {
  const music = new Audio(trueAnswer)
  music.play();
}

export function playAnswerFalse() {
  const music = new Audio(wrongAnswer)
  music.play();
}