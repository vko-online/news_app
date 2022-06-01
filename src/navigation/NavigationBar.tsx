import { NativeStackHeaderProps } from '@react-navigation/native-stack'
import React from 'react'
import { Appbar } from 'react-native-paper'

export default function NavigationBar ({ route, navigation, back, options }: NativeStackHeaderProps): JSX.Element {
  return (
    <Appbar.Header>
      {back != null ? <Appbar.BackAction onPress={() => navigation.goBack()} /> : null}
      <Appbar.Content title={options.headerTitle} />
    </Appbar.Header>
  )
}
