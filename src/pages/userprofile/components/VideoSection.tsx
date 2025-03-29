import React, { useState } from 'react';
import { VideoItem } from './videoItem';
import { VideoViewer } from './VideoViewer';

const videoData = [
    {
        image: "https://th.bing.com/th/id/R.39928ef71f5fa16f2c51031b4e182aab?rik=8O1Usrx4O2rbJQ&pid=ImgRaw&r=0",
        tema: "Quien es gogo",
        personaje: "Homero Simpson",
        script: "Hola soy Homero y esta es mi historia.",
        tts_audio_name: "audio1.mp3",
        author: "Mi amigo el galofa",
        instagram_account: "aprendiendo.con.personajes",
        gameplay_name: "juego1"
    },
    {
        image: "https://th.bing.com/th/id/R.39928ef71f5fa16f2c51031b4e182aab?rik=8O1Usrx4O2rbJQ&pid=ImgRaw&r=0",
        tema: "La historia de Bart",
        personaje: "Bart Simpson",
        script: "Yo soy Bart, y no me gustan las reglas.",
        tts_audio_name: "audio2.mp3",
        author: "El buen Bartolo",
        instagram_account: "aprendiendo.con.personajes",
        gameplay_name: "juego2"
    },
    {
        image: "https://th.bing.com/th/id/R.39928ef71f5fa16f2c51031b4e182aab?rik=8O1Usrx4O2rbJQ&pid=ImgRaw&r=0",
        tema: "El jefe Gorgory en acción",
        personaje: "Jefe Gorgory",
        script: "A veces la justicia necesita una siesta.",
        tts_audio_name: "audio3.mp3",
        author: "El comisario",
        instagram_account: "aprendiendo.con.personajes",
        gameplay_name: "juego3"
    }
];

export const VideoSection: React.FC = () => {
    const [selectedVideo, setSelectedVideo] = useState<any | null>(null);

    const handleVideoClick = (video: any) => {
        setSelectedVideo(video);
    };

    const handleCloseViewer = () => {
        setSelectedVideo(null);
    };

    return (
        <div className="w-full max-w-3xl mx-auto grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-4">
            {videoData.map((video, index) => (
                <VideoItem key={index} image={video.image} onClick={() => handleVideoClick(video)} />
            ))}
            {selectedVideo && <VideoViewer videoData={selectedVideo} onClose={handleCloseViewer} />}
        </div>
    );
};
