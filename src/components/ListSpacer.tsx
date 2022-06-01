import React from 'react'
import { View } from 'react-native'

interface Props {
  size?: number
}
export default function ListSpacer ({ size = 10 }: Props): JSX.Element {
  return <View style={{ height: size }} />
}
