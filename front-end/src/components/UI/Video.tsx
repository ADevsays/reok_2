import { videoURL } from "../../consts/mediaImports";

function Video() {
    return (
        <video className="video-background opacity-70" autoPlay loop muted preload="auto">
            <source src={videoURL} type="video/mp4"/>
            Tu navegador no soporta la etiqueta de video.
        </video>
    );
}

export default Video;