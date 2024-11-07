import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import HomeTab from './HomeTab';
import AuthStack from './AuthStack';

export default function Navigator() {
  const token = "rfgrgrg"
    return (
        <NavigationContainer>
            {token ? <HomeTab/> : <AuthStack/>}
        </NavigationContainer>
  );
}