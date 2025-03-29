import React from 'react';

interface VideoItemProps {
    image: string;
    onClick: () => void;
}

export const VideoItem: React.FC<VideoItemProps> = ({ image, onClick }) => {
    return (
        <div onClick={onClick} className="w-full bg-gray-800 rounded-lg overflow-hidden shadow-md cursor-pointer hover:opacity-90 transition">
            <img className="w-full h-80 object-cover" src={image} alt="Video" />
        </div>
    );
};
