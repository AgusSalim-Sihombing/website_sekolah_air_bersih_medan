import React from "react";
import videoOpening from "../../assets/video/promotion.mp4"
const VideoOpening = () => {
    // src = https://mdbootstrap.com/img/video/animation-intro.mp4
    return (
        <div style={{alignItems:"center",display:"flex", justifyContent:"center", width:"100%"}}>
            <video className="w-100" autoPlay loop >
                <source
                    src={videoOpening}
                    type="video/mp4"
                    allowFullScreen

                />
            </video>
        </div>
    )
}

export default VideoOpening;