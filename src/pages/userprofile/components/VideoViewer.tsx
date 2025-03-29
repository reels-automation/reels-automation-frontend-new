import React from 'react';

interface VideoViewerProps {
    videoData: any;
    onClose: () => void;
}

export const VideoViewer: React.FC<VideoViewerProps> = ({ videoData, onClose }) => {
    
    // Prevent click inside the modal from closing it
    const handleModalClick = (e: React.MouseEvent) => {
        e.stopPropagation();
    };

    return (
        <div 
            className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
            onClick={onClose} // Close when clicking outside
        >
            <div 
                className="w-full max-w-5xl h-[90vh] bg-gray-900 rounded-lg overflow-hidden flex relative"
                onClick={handleModalClick} // Prevent closing when clicking inside
            >
                {/* Close Button */}
                <button 
                    onClick={onClose} 
                    className="absolute top-4 right-4 text-white bg-red-500 hover:bg-red-600 rounded-full w-8 h-8 flex items-center justify-center text-lg"
                >
                    ✕
                </button>

                {/* Video/Image Section */}
                <div className="w-2/3 bg-black">
                    <img className="w-full h-full object-cover" src={videoData.image} alt="Video" />
                </div>

                {/* JSON Data Section (Formatted as Bullet Points) */}
                <div className="w-1/3 bg-gray-800 p-4 text-white overflow-y-auto">
                    <h2 className="text-lg font-bold mb-4">{videoData.tema}</h2>
                    <ul className="space-y-2">
                        {Object.entries(videoData).map(([key, value]) => (
                            key !== "image" && ( // Exclude image field
                                <li key={key} className="bg-gray-700 p-2 rounded-md text-sm">
                                    <strong>{key.replace(/_/g, ' ')}:</strong> {String(value)}
                                </li>
                            )
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};
