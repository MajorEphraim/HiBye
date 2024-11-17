import React from "react";
import { StatusBar } from "expo-status-bar";
import { View, Image, StyleSheet } from "react-native";
import splash from "../assets/splash.png";

const SplashScreen = () => {
  return (
    <View style={styles.container}>
      {/* Configure only the StatusBar */}
      <StatusBar style="light" backgroundColor="transparent" translucent />
      <Image source={splash} style={styles.image} />
    </View>
  );
};

export default SplashScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center", // Center the content vertically
    alignItems: "center", // Center the content horizontally
  },
  image: {
    resizeMode: "contain",
  },
});
