import React, { useState, useRef, useEffect } from "react"
import music from "../../assets/audio/holiday-is-coming-11852.mp3"

const Index = ({ played }) => {
    const audioEl = useRef(null);
    let audioPlayer, timeOut;
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
        stopOpPlay()
    }
    const stopOpPlay = async () => {
        if (played) {
            await audioPlayer.play()
            progress()
        } else {
            await audioPlayer.pause()
            clearInterval(timeOut)
        }
    }
    const progress = () => {
        timeOut = setInterval(() => {
            let end = audioPlayer.duration;
            let current = audioPlayer.currentTime;
            if (current === end) {
                audioPlayer.pause();
                audioPlayer.currentTime = 0;
                stopOpPlay()
            }
        }, 1000);
    }
    useEffect(() => {
        initializPlayer()
    }, [played])
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

export default Index;
