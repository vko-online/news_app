import { NavigationProp, useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { getSources, Source } from 'src/services/transport'
import { Caption, ActivityIndicator } from 'react-native-paper'
import { RootStack } from 'src/navigation/types'
import SourcesList from 'src/components/SourcesList'

interface Props {
  navigation: NavigationProp<RootStack, 'Home'>
}
export default function HomeScreen ({ navigation }: Props): JSX.Element {
  const [sources, setSources] = useState<Source[]>([])
  const [error, setError] = useState<string>()
  const [loading, setLoading] = useState(false)

  const fetchData = useCallback(async () => {
    const response = await getSources()
    setSources(response)
  }, [])
  console.log('error', error)

  useFocusEffect(useCallback(() => {
    setLoading(true)
    fetchData()
      .catch(msg => setError(msg.message))
      .finally(() => setLoading(false))
  }, []))

  if (loading) {
    return (
      <View style={s.container}>
        <ActivityIndicator />
      </View>
    )
  }

  if (error != null) {
    return (
      <View style={s.container}>
        <Caption>{error}</Caption>
      </View>
    )
  }

  return (
    <View>
      <SourcesList
        data={sources}
        onPress={(item) => navigation.navigate('Details', { sourceId: item.id })}
      />
    </View>
  )
}

const s = StyleSheet.create({
  container: {
    padding: 20,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})
