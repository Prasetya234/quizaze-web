import { useEffect } from "react";
import { React, useState, useRef } from "react"
import music from "../../audio/holiday-is-coming-11852.mp3"

export default ({ audio }) => {
    const audioEl = useRef(null);
    let audioPlayer;
    const [isLoaded, setIsLoaded] = useState(false);
    const [isPlayed, setIsPlayed] = useState(false);
    const initializPlayer = () => {
        audioPlayer = audioEl.current
        audioPlayer.addEventListener("loadeddata", () => {
            setIsLoaded(true);
        });
        audioPlayer.addEventListener("play", () => {
            setIsPlayed(true);
        });
        audioPlayer.addEventListener("pause", () => {
            setIsPlayed(false);
        });
        console.log(document.getElementById('music').currentTime);
        stopOpPlay()
    }
    const stopOpPlay = () => {
        isPlayed ? audioPlayer.pause() : audioPlayer.play()
    }
    useEffect(() => {
        initializPlayer()
    }, [audio])
    return (
        <audio
            id="music"
            style={{ display: 'none' }}
            ref={audioEl}
            preload="auto"
            src={music}
            autoPlay={true}
            controls
        >Your browser does not support the audio element.</audio>
    )
}
