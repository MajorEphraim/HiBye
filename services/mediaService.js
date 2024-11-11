import * as ImagePicker from 'expo-image-picker';

export const pickImage = async () => {
  const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

  if (permissionResult.status !== 'granted') {
    alert('Permission to access camera roll is required!');
    return null;
  }

  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: true,
    quality: 1,
    base64: true, // if you need base64 format for uploading
  });

  if (!result.canceled) {
    return result.assets[0].uri; // or result.base64 if needed
  }
  return null;
};


