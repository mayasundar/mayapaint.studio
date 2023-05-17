import React, { useState } from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';

function onBackward() {
    if (currentIndex > 0) {
        setCurrentIndex(currentIndex - 1);
        setIsPlaying(false);
    }
}

function setCurrentIndex(param) {

}

function onForward() {
    if (currentIndex < images.length - 1) {
        setCurrentIndex(currentIndex + 1);
        setIsPlaying(false);
    }
}

const PlayButton = () => {
    const [isHovered, setIsHovered] = useState(false);

    const handleToggleHover = () => {
        setIsHovered(!isHovered);
    };

    const buttonColor = isHovered ? '#fff' : '#000'; // Customize button color here

    const buttonStyles = [
        styles.playButton,
        isHovered && styles.playButtonHovered,
    ];

    const iconStyles = [
        styles.icon,
        { color: buttonColor },
    ];

    return (
        <View style={styles.buttonContainer}>
            <TouchableOpacity
                style={buttonStyles}
                onPress={onBackward}
                onMouseEnter={handleToggleHover}
                onMouseLeave={handleToggleHover}
            >
                <Ionicons
                    name={'play-skip-back-sharp'}
                    style={iconStyles}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={buttonStyles}
                onPress={() => {
                    // Handle play button press
                }}
                onMouseEnter={handleToggleHover}
                onMouseLeave={handleToggleHover}
            >
                <Ionicons
                    name={'play-circle-sharp'}
                    style={iconStyles}
                />
            </TouchableOpacity>

            <TouchableOpacity
                style={buttonStyles}
                onPress={() => {
                    // Handle forward button press
                }}
                onMouseEnter={handleToggleHover}
                onMouseLeave={handleToggleHover}
            >
                <Ionicons
                    name={'play-skip-forward-sharp'}
                    style={iconStyles}
                />
            </TouchableOpacity>

        </View>
    );
};

const styles = StyleSheet.create({
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    playButton: {
        width: 50,
        height: 50,
        borderRadius: 25,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    playButtonHovered: {
        backgroundColor: 'rgba(0, 0, 0, 0.1)',
    },
    icon: {
        fontSize: 50,
    },
});

export default PlayButton;
