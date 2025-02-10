import React from "react";
import videoOpening from "../../assets/video/opening.mp4"
const VideoOpening = () => {
    // src = https://mdbootstrap.com/img/video/animation-intro.mp4
    return (
        <video className="w-100" autoPlay loop muted>
            <source
                src={videoOpening}
                type="video/mp4"
                allowFullScreen
            />
        </video>
    )
}

export default VideoOpening;