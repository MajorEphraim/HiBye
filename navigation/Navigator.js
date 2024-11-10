import { useContext, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';
import { AuthContext } from '../context/AuthContext'

export default function Navigator() {
  
  const { userToken} = useContext(AuthContext)
    return (
        <NavigationContainer>
            {userToken ? <HomeStack/> : <AuthStack/>}
        </NavigationContainer>
  );
}