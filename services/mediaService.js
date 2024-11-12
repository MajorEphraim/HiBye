import * as ImagePicker from 'expo-image-picker';
import { storage, ref, uploadBytesResumable, getDownloadURL, deleteObject } from '../firebase/configs'

const pickImage = async () => {
 try {
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
  return({error:true, message:"Something went wrong"})
 } catch (error) {
  return({error:true, message:error.message})
 }
};

const uploadImage = async(userId, imageName, imageUri)=>{
  try {
    const imagePath = userId === imageName ?
               `profilePics/${userId}.jpg` :
               `pictures/${userId}.jpg`

    const spaceRef = ref(storage,imagePath) 
    const response = await fetch(imageUri)
    const blob = await response.blob()

    const uploadTask = uploadBytesResumable(spaceRef, blob)
    await uploadTask

    const url = await getDownloadURL(uploadTask.snapshot.ref)
    return url
  } catch (error) {
    return({error:true, message:error.message})
  }
}

const deleteImage = async(userId, imageName)=>{
  try {
    const imagePath = userId === imageName ?
               `profilePics/${imageName}.jpg` :
               `pictures/${imageName}.jpg`

    const imageRef = ref(storage,imagePath) 
    await deleteObject(imageRef);
    return url
  } catch (error) {
    return({error:true, message:error.message})
  }
}


export {pickImage, uploadImage, deleteImage}


