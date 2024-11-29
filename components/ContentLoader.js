import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

const ContentLoader = () => {
    return (
        <View style={styles.container}>
            <ActivityIndicator size="large" color="#A30D5B" />
        </View>
    );
}

export default ContentLoader;

const styles = StyleSheet.create({
    container: {
        flex: 1,  // Make the view take up all available space
        justifyContent: 'center',  // Center vertically
        alignItems: 'center',  // Center horizontally
    }
});
