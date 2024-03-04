import React, { useState, useEffect } from 'react';
/**
 * Home page
 * 
 * This is the code for the home page that will have the main title and
 * a random video link with the title that changes with every refresh
 * 
 * @author Ryan Field
 * @author CHATGPT - Helped with the tailwind styling 
 */

function Home() {
  const [video, setVideo] = useState({ title: '', url: '' });

  useEffect(() => {
    // Function to fetch a random video
    const fetchRandomVideo = async () => {
      try {
        const response = await fetch('https://w20017978.nuwebspace.co.uk/coursework/App/preview?limit=1');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const [data] = await response.json(); // Expecting the PHP to return an array
        setVideo({
          title: data.title,
          url: data.preview_video, 
        });
      } catch (error) {
        console.error("Fetching random video failed:", error);
      }
    };

    fetchRandomVideo();
  }, []);

  //tailwind styling to get it wrapped in a container
  return (
    <div className="container mx-auto my-8 p-8 bg-gray-100 shadow-lg">
      <h1 className="text-3xl font-semibold text-center mb-6">CHI2023</h1>
      <main className="text-center">
        <p className="mb-4">Welcome to the home page! The name of the video is below, and click on the "Watch Video" text to open up the video!</p>
        <h2 className="text-2xl mb-2">{video.title}</h2>
        <a href={video.url} target="_blank" rel="noopener noreferrer" className="text-blue-500 underline">Watch Video</a>
      </main>
      <footer className="mt-8 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} Ryan Field, W20017978 - Coursework assignment for KF6012 Web Application Integration, Northumbria University</p>
      </footer>
    </div>
  );
}

export default Home;
