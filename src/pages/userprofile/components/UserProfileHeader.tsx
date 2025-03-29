import React from 'react';

interface UserProfileHeaderProps {
    name: string;
    username: string;
    role: string;
    avatar: string;
    coverImage: string;
    bio: string;
    location: string;
    website: string;
    joinedDate: string;
}

export const UserProfileHeader: React.FC<UserProfileHeaderProps> = ({
    name,
    username,
    role,
    avatar,
    coverImage,
    bio,
    location,
    website,
    joinedDate
}) => {

    const roleColor = {
        User: "bg-gray-300 text-gray-800",
        Admin: "bg-red-500 text-white",
        Moderator: "bg-blue-500 text-white",
    }[role] || "bg-gray-300 text-gray-800";

    return (
        <div className="w-full max-w-3xl bg-white rounded-lg shadow-md dark:bg-gray-800 dark:border-gray-700">
            <div className="relative">
                <img className="w-full h-56 object-cover rounded-t-lg" src={coverImage} alt="Cover" />
                <img className="w-32 h-32 rounded-full border-4 border-white dark:border-gray-800 absolute -bottom-16 left-6" src={avatar} alt="User Avatar" />
            </div>

            <div className="p-6 pt-16">
                <div className="flex justify-between items-center">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">{name}</h1>
                        <p className="text-lg text-gray-500 dark:text-gray-400">{username}</p>
                    </div>
                    <span className={`px-3 py-1 text-sm font-medium rounded-full ${roleColor}`}>{role}</span>
                </div>
                <p className="mt-4 text-lg text-gray-700 dark:text-gray-300">{bio}</p>

                <div className="flex flex-wrap gap-4 text-sm text-gray-500 dark:text-gray-400 mt-4">
                    <p>📍 {location}</p>
                    <a href={website} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">
                        🌐 {website}
                    </a>
                    <p>📅 {joinedDate}</p>
                </div>

                <div className="mt-4 flex gap-4">
                    <p><span className="font-bold">534</span> Following</p>
                    <p><span className="font-bold">1,200</span> Followers</p>
                </div>
            </div>
        </div>
    );
};
