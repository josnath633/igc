import { initializeApp } from "firebase/app";
import { getFirestore, doc, getDoc } from "firebase/firestore";
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage"; // Firebase Storage Imports

// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDGGCvkkq390S8Dz6PpS5ioz4G_MA98hiU",
  authDomain: "migv-9e8ee.firebaseapp.com",
  databaseURL: "https://migv-9e8ee-default-rtdb.firebaseio.com",
  projectId: "migv-9e8ee",
  storageBucket: "migv-9e8ee.appspot.com",  // Storage Bucket
  messagingSenderId: "988800986643",
  appId: "1:988800986643:web:a80b4aaacc5c22cb9319e6",
  measurementId: "G-M94DXS5EB5"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const storage = getStorage(app); // Initialize Firebase Storage

// Function to retrieve audio files from multiple directories
export const getAudioFiles = async (): Promise<string[]> => {
  try {
    // Define all the folders you want to fetch audio files from
    const folders = [
      'audio/',
      'audios/',
      'potcast/',
      'athmosphereProphetique/',
      'background_images/',
      'migv/',
      'notification/',
      'pasteurAudi/',
      'pasteurlea/',
      'sacrificedelouange/',
      'saint/',
      'video/'
    ];

    const audioUrls: string[] = []; // Array to hold the URLs of the audio files

    // Iterate through each folder and fetch files
    for (const folder of folders) {
      const folderRef = ref(storage, folder); // Get reference to the folder
      const fileList = await listAll(folderRef); // List all files in the folder

      // Loop through all files and get the download URLs
      for (const itemRef of fileList.items) {
        const url = await getDownloadURL(itemRef); // Get the URL of the audio file
        audioUrls.push(url); // Push the URL to the audioUrls array
      }
    }

    return audioUrls; // Return the list of URLs
  } catch (error) {
    console.error("Error fetching audio files:", error);
    return [];
  }
};

// Define types for YouTube configuration data
interface YouTubeConfig {
  apiKey: string;
  videoId: string;
}

// Function to retrieve YouTube API Key and Video ID from Firestore
export const getYouTubeConfig = async (): Promise<YouTubeConfig | null> => {
  try {
    const docRef = doc(db, "config", "youtube");  // Access the youtube document in the config collection
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      const data = docSnap.data();
      return {
        apiKey: data.apiKey,
        videoId: data.videoId,
      };
    } else {
      console.log("No YouTube configuration found!");
      return null;
    }
  } catch (error) {
    console.error("Error fetching YouTube configuration:", error);
    return null;
  }
};
