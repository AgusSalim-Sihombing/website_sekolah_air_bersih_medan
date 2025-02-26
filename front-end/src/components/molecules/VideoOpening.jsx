// import React from "react";
// import videoOpening from "../../assets/video/promotion.mp4"
// const VideoOpening = () => {
//     return (
//         <div style={{alignItems:"center",display:"flex", justifyContent:"center", width:"100%", marginTop:"10px"}}>
//             <video className="w-100" autoPlay loop>
//                 <source
//                     src={videoOpening}
//                     type="video/mp4"
//                     allowFullScreen

//                 />
//             </video>
//         </div>
//     )
// }

// export default VideoOpening;

import React, { useRef, useState } from "react";
import videoOpening from "../../assets/video/promotion.mp4";

const VideoOpening = () => {
    const videoRef = useRef(null); // Reference untuk video
    const [isPlaying, setIsPlaying] = useState(true); // State untuk cek apakah video sedang diputar

    // Fungsi untuk toggle pause/play
    const toggleVideo = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying); // Ubah state
        }
    };

    return (
        <div style={{ alignItems: "center", display: "flex", justifyContent: "center", width: "100%", marginTop: "10px", position: "relative" }}>
            {/* Video */}
            <video ref={videoRef} className="w-100" autoPlay loop>
                <source src={videoOpening} type="video/mp4" />
            </video>

            {/* Tombol Pause/Play */}
            <button
                onClick={toggleVideo}
                style={{
                    position: "absolute",
                    bottom: "20px",
                    right: "20px",
                    background: "rgba(0,0,0,0.6)",
                    color: "white",
                    border: "none",
                    padding: "10px 15px",
                    cursor: "pointer",
                    borderRadius: "5px",
                    fontSize: "16px",
                }}
            >
                {isPlaying ? "Pause" : "Play"}
            </button>
        </div>
    );
};

export default VideoOpening;
