import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const PlayButton = ({ video }) => {
    return (
        <View style={styles.buttonContainer}>
            {video && (
                <TouchableOpacity style={[styles.playButton, styles.playButtonHovered]}>
                    <Ionicons name={'play-circle-sharp'} style={styles.icon} />
                </TouchableOpacity>
            )}

            <TouchableOpacity style={[styles.playButton, styles.playButtonHovered]}>
                <Ionicons name={'play-skip-back-sharp'} style={styles.icon} />
            </TouchableOpacity>

            <TouchableOpacity style={[styles.playButton, styles.playButtonHovered]}>
                <Ionicons name={'play-skip-forward-sharp'} style={styles.icon} />
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
        width: 80,
        height: 80,
        borderRadius: 40,
        backgroundColor: 'transparent',
        justifyContent: 'center',
        alignItems: 'center',
    },
    playButtonHovered: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    icon: {
        fontSize: 50,
    },
});

export default PlayButton;
