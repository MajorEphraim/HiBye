import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeTab from './HomeTab';
import AuthStack from './AuthStack';
import HomeStack from './HomeStack';

export default function Navigator() {
  const token = "rfgrgrg"
    return (
        <NavigationContainer>
            {token ? <HomeStack/> : <AuthStack/>}
        </NavigationContainer>
  );
}