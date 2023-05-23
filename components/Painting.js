import React, { useRef, useState } from 'react';
import { Video } from 'expo-av';
import { View, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import {Asset} from "expo-asset";
import { widthPercentageToDP as wp } from 'react-native-responsive-screen';

const Painting = () => {
  const [currentPaintingIndex, setCurrentPaintingIndex] = useState(0);
  const videoRef = useRef(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const handlePlaybackStatusUpdate = (status) => {
    if (status.didJustFinish) {
      setIsVideoPlaying(false);
    }
  };

  const paintings = [
    {
      image: require('../paintings/image1.png'),
      video: () => import('../paintings/image1.mp4'),
    },
    {
      image: require('../paintings/image2.png'),
      video: () => import('../paintings/image2.mp4'),
    },
  ];

  const handlePlay = async () => {
    if (videoRef.current) {
      const video = videoRef.current;
      if (isVideoPlaying) {
        setIsVideoPlaying(false);
        if (Platform.OS === 'web') {
          video.pause();
        } else {
          await video.pauseAsync();
        }
      } else {
        setIsVideoPlaying(true);
        if (Platform.OS === 'web') {
          video.play();
        } else {
          await video.playAsync();
        }
      }
    }
  };

  const handleForward = async () => {
    setCurrentPaintingIndex((prevIndex) =>
        prevIndex === paintings.length - 1 ? 0 : prevIndex + 1
    );
    setIsVideoPlaying(false);

    if (videoRef.current && isVideoPlaying) {
      await videoRef.current.stopAsync();
      await videoRef.current.setPositionAsync(0);
    }
  };

  const handleBackward = async () => {
    setCurrentPaintingIndex((prevIndex) =>
        prevIndex === 0 ? paintings.length - 1 : prevIndex - 1
    );
    setIsVideoPlaying(false);

    if (videoRef.current && isVideoPlaying) {
      await videoRef.current.stopAsync();
      await videoRef.current.setPositionAsync(0);
    }
  };

  const currentPainting = paintings[currentPaintingIndex];
  const hasVideo = currentPainting.video !== null;
  const videoSource = Platform.OS === 'web' ? Asset.fromModule(currentPainting.video).uri : currentPainting.video;

  const LazyVideoComponent = React.lazy(currentPainting.video);

  return (
      <View style={styles.container}>
        <View style={styles.paddingContainer}>
          <View
              style={[
                styles.mediaContainer,
                Platform.OS === 'web' ? styles.webMediaContainer : { width: wp('80%'), height: wp('80%') },
              ]}
          >
            {currentPainting.video ? (
                <Suspense fallback={<Image source={currentPainting.image} style={styles.media} resizeMode="cover" />}>
                  {Platform.OS === 'web' ? (
                      <video
                          ref={videoRef}
                          src={Asset.fromModule(currentPainting.video()).uri}
                          style={styles.media}
                          onEnded={() => setIsVideoPlaying(false)}
                          autoPlay={isVideoPlaying}
                      />
                  ) : (
                      <LazyVideoComponent
                          ref={videoRef}
                          source={currentPainting.video}
                          style={styles.media}
                          resizeMode="cover"
                          onPlaybackStatusUpdate={handlePlaybackStatusUpdate}
                      />
                  )}
                </Suspense>
            ) : (
                <Image source={currentPainting.image} style={styles.media} resizeMode="cover" />
            )}
          </View>
        </View>
        <View style={styles.navigationButtonsContainer}>
          {Platform.OS === 'web' ? (
              <button style={styles.navigationButton} onClick={handleBackward}>
                <Ionicons name="play-skip-back" size={30} color="#000" />
              </button>
          ) : (
              <TouchableOpacity
                  style={styles.navigationButton}
                  onPress={handleBackward}
              >
                <Ionicons name="play-skip-back" size={30} color="#000" />
              </TouchableOpacity>
          )}

          {hasVideo && (
              <TouchableOpacity style={styles.navigationButton} onPress={handlePlay}>
                {Platform.OS === 'web' ? (
                    <Ionicons
                        name={isVideoPlaying ? 'pause-circle' : 'play-circle'}
                        size={60}
                        color="#000"
                    />
                ) : (
                    <Ionicons name={isVideoPlaying ? 'pause' : 'play'} size={60} color="#000" />
                )}
              </TouchableOpacity>
          )}

          {Platform.OS === 'web' ? (
              <button style={styles.navigationButton} onClick={handleForward}>
                <Ionicons name="play-skip-forward" size={30} color="#000" />
              </button>
          ) : (
              <TouchableOpacity style={styles.navigationButton} onPress={handleForward}>
                <Ionicons name="play-skip-forward" size={30} color="#000" />
              </TouchableOpacity>
          )}
        </View>
      </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },
  paddingContainer: {
    padding: 50,
  },
  mediaContainer: {
    width: 400,
    height: 400,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,

  },
  media: {
    flex: 1,
    width: undefined,
    height: undefined,
    ...Platform.select({
      web: {
        width: '100%',
        height: '100%',
      },
    }),
  },
  navigationButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  navigationButton: {
    padding: 10,
    backgroundColor: 'transparent',
    borderColor: 'transparent',
  },
});

export default Painting;
