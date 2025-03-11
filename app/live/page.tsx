"use client";
import { useEffect, useState } from "react";
import { getYouTubeConfig } from "@/lib/firebase";

interface YouTubeConfig {
  apiKey: string;
  videoId: string;
}

interface VideoData {
  id: string;
  snippet: {
    title: string;
    description: string;
  };
  statistics: {
    viewCount: string;
  };
}

const Page = () => {
  const [videoData, setVideoData] = useState<VideoData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState<string>(""); 
  const [comments, setComments] = useState<string[]>([]); 

  const handleCommentSubmit = () => {
    if (comment.trim()) {
      setComments([...comments, comment]);
      setComment("");
    }
  };

  useEffect(() => {
    const fetchVideoData = async () => {
      try {
        const config = await getYouTubeConfig();
        if (config && config.apiKey && config.videoId) {
          const response = await fetch(
            `https://www.googleapis.com/youtube/v3/videos?part=snippet,contentDetails,statistics&id=${config.videoId}&key=${config.apiKey}`
          );
          const data = await response.json();

          if (data.items && data.items.length > 0) {
            setVideoData(data.items[0]);
          } else {
            setError("Aucune vidéo trouvée.");
          }
        } else {
          setError("Clé API ou Video ID non trouvée.");
        }
      } catch (err) {
        setError("Erreur de récupération des données.");
      }
    };

    fetchVideoData();
  }, []);

  return (
    <div className="flex flex-col lg:flex-row p-5 font-sans min-h-screen">
      {error && <p className="text-red-600 text-lg">{error}</p>}
      {videoData ? (
        <>
          <div className="flex-1 lg:max-w-[70%] mb-5 lg:mb-0">
            <h1 className="text-center text-2xl font-bold">{videoData.snippet.title}</h1>
            <div className="flex justify-center mb-5">
              <iframe
                width="100%" 
                height="500" 
                src={`https://www.youtube.com/embed/${videoData.id}`}
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
            <div className="text-base text-gray-600">
              <p>{videoData.snippet.description}</p>
              <p><strong>Vues :</strong> {videoData.statistics.viewCount}</p>
            </div>
          </div>

          <div className="flex-1 lg:max-w-[30%] lg:border-l lg:border-gray-300 pl-5 max-h-[calc(100vh-40px)] overflow-y-auto">
            <h3 className="text-xl font-bold mb-3">Commentaires</h3>
            <div className="max-h-[350px] overflow-y-scroll mb-3 pr-2">
              {comments.length > 0 ? (
                comments.map((com, index) => (
                  <div key={index} className="p-3 border-b border-gray-300 text-sm">
                    {com}
                  </div>
                ))
              ) : (
                <p>Aucun commentaire pour le moment.</p>
              )}
            </div>

            <div className="flex flex-col">
              <textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Ajouter un commentaire..."
                className="w-full h-24 p-2 border border-gray-300 rounded-md resize-none mb-3 text-sm"
              />
              <button
                onClick={handleCommentSubmit}
                className="bg-red-600 text-white py-2 px-4 rounded-md text-lg"
              >
                Commenter
                
              </button>
            </div>
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center flex-col text-lg text-gray-500 min-h-screen">
          <div className="animate-spin rounded-full border-t-4 border-red-600 border-solid w-16 h-16 mb-3"></div>
          <p>Chargement...</p>
        </div>
      )}
    </div>
  );
};

export default Page;