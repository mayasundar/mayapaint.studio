import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const Painting = ({ image }) => {
    return (
        <View style={styles.container}>
            <View style={styles.imageContainer}>
                <Image source={image} style={styles.image} resizeMode="contain" />
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#FFF',
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    imageContainer: {
        borderWidth: 1,
        borderColor: '#FFF',
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: '100%',
    },
});

export default Painting;
