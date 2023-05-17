import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import PlayButton from './components/PlayButton';
import React, { useState } from 'react';
import Painting from './components/Painting';

const App = () => {
  const images = [
    {
      image: ('./images/image1.jpg'),
      video: ('./videos/video1.mp4'),
    },
    {
      image: ('./images/image2.jpg'),
      video: ('./videos/video2.mp4'),
    },
    // Add more images and videos as needed
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const currentImage = images[currentIndex].image;
  const currentVideo = images[currentIndex].video;

  const handleForward = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBackward = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
      <View style={{ flex: 1 }}>
        <Painting image={currentImage} video={currentVideo} />
        <PlayButton onForward={handleForward} onBackward={handleBackward} />
      </View>
  );
};

export default App;



