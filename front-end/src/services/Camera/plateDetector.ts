import { baseURL } from "../url";

export default async function plateDetector(stream:MediaStream){
    return new Promise((res, rej)=>{
        const videoElement = document.createElement('video');
        videoElement.srcObject = stream;
        videoElement.play();
        
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');
        if (!context) return;
        let intervalReference:undefined | number = undefined;
    
        videoElement.onloadedmetadata = () => {
            canvas.width = videoElement.videoWidth / 2 || 640; // Valor por defecto si no hay datos
            canvas.height = videoElement.videoHeight / 2 || 480; // Valor por defecto si no hay datos
        
            const sendFrame = async () => {
                if (videoElement.readyState >= videoElement.HAVE_CURRENT_DATA) {
                    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
                    const frame = canvas.toDataURL('image/jpeg');
                    try {
                        const response = await fetch(`${baseURL}/api/plate_lector/`, {
                            method: 'POST',
                            headers: { 'Content-Type': 'application/json' },
                            body: JSON.stringify({ frame })
                        });
                        const dataRes = await response.json();
                        console.log(dataRes)
                        if(dataRes.status){
                            clearInterval(intervalReference);
                            res(dataRes.plate)
                        }
                    } catch (err) {
                        console.error("Error sending frame", err);
                    }
                } else {
                    console.log('Video not ready yet');
                }
            };
        
            intervalReference = setInterval(sendFrame, 4000); // Enviar frame cada segundo
        };
        
        videoElement.onerror = () => {
            console.error('Error loading video');
            rej(new Error("Error al cargar el vídeo"))
        };
    });
    
}