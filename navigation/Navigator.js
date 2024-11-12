import { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import { AuthContext } from '../context/AuthContext'
import { AccountContext } from '../context/AccountContext'

export default function Navigator() {
  const { userId, useLocalUserId} = useContext(AuthContext)
  const { updateAccount } = useContext(AccountContext)

  useEffect(()=>{
    const initiateData = () => {
      try {
        useLocalUserId(); 
      } catch (error) {
        console.error("Error during data initialization:", error.message);
      }
    };
    initiateData()
    },[])

  useEffect(()=>{
    const initiateData =  () => {

      try {
         updateAccount();  
      } catch (error) {
        console.error("Error during data initialization:", error.message);
      }
    };
  

    initiateData()

  },[userId])

    return (
        <NavigationContainer>
            {userId ? <HomeStack/> : <AuthStack/>}
        </NavigationContainer>
  );
}