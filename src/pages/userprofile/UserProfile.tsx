import React from 'react';
import { UserProfileHeader } from './components/UserProfileHeader';
import { VideoSection } from './components/VideoSection';

const UserProfile = () => {
    const userProfileData = {
        name: "John Doe",
        username: "@johndoe",
        role: "Admin",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        coverImage: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&q=80&w=1200",
        bio: "Building cool things with code. Full-stack developer, coffee enthusiast, and tech nerd.",
        location: "San Francisco, CA",
        website: "https://johndoe.dev",
        joinedDate: "Joined January 2022"
    };

    return (
        <section className="bg-gray-50 dark:bg-gray-900 min-h-screen flex flex-col items-center">
            <UserProfileHeader {...userProfileData} />
            <VideoSection />
        </section>
    );
};

export default UserProfile;
