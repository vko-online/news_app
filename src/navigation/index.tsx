import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import HomeScreen from 'src/screens/home'
import Detailscreen from 'src/screens/details'
import { RootStack } from './types'
import NavigationBar from './NavigationBar'

const Stack = createNativeStackNavigator<RootStack>()

function Navigator (): JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName='Home'
        screenOptions={{
          header: NavigationBar
        }}
      >
        <Stack.Screen name='Home' options={{ headerTitle: 'Sources' }} component={HomeScreen} />
        <Stack.Screen name='Details' options={{ headerTitle: 'Articles' }} component={Detailscreen} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default Navigator
