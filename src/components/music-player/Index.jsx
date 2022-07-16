import React, { useRef, useEffect } from "react"
import music from "../../assets/audio/holiday-is-coming-11852.mp3"

const Index = ({ played }) => {
    const audioEl = useRef(null);
    let audioPlayer, timeOut;
    const initializPlayer = () => {
        audioPlayer = audioEl.current
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
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [played])
    return (
        <audio
            id="music"
            style={{ display: 'none' }}
            ref={audioEl}
            preload="auto"
            src={"https://skyline.github.com/_nuxt/assets/sound/music-807dfe09ce23793891674eb022b38c1b.mp3" || music}
            autoPlay={true}
            controls
        >Your browser does not support the audio element.</audio>
    )
}

export default Index;
