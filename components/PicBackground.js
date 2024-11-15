import React from 'react';
import { View, Image, StyleSheet, Dimensions } from 'react-native';

export default function PicBackground({ pic }) {
    return (
            <View style={styles.picContainer}>
                <Image style={styles.pic} source={{uri:pic}} />
            </View>
    );
}

const styles = StyleSheet.create({

    whiteContainer: {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        opacity: 0.65,
        zIndex: 2,
    },
    picContainer: {
        width: '100%',
        height: '100%',
    },
    pic: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        opacity:.2
    }
});
