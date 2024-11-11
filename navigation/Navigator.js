import { useContext, useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import { AuthContext } from '../context/AuthContext'

export default function Navigator() {
  const { userId, useLocalUserId} = useContext(AuthContext)

  useEffect(()=>{
    useLocalUserId()
  },[])
  
    return (
        <NavigationContainer>
            {userId ? <HomeStack/> : <AuthStack/>}
        </NavigationContainer>
  );
}