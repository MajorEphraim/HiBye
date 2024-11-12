import * as SecureStore from 'expo-secure-store';


const getItem = async(itemName)=>{
    try {
        const item = await SecureStore.getItemAsync(itemName)
        if(item)
            return item
        else
            return null
    } catch (error) {
        return null
    }
}

const removeItem = async(itemName)=>{
    try {
        await SecureStore.deleteItemAsync(itemName);
        return {error:false}
    } catch (error) {
        return { error:true, message: "Something went wrong while signing in: "+ error.message };
    }
}

const setItem = async(itemName, item)=>{
    try {
        await SecureStore.setItemAsync(itemName, item);
        return {error:false}
    } catch (error) {
        return { error:true, message: "Something went wrong while signing in: "+ error.message };
    }
}

export {getItem, removeItem, setItem}