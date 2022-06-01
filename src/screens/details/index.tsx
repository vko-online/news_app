import { NavigationProp, RouteProp, useFocusEffect } from '@react-navigation/native'
import React, { useCallback, useState } from 'react'
import { FlatList, StyleSheet, useWindowDimensions, View } from 'react-native'
import { Article, getArticles } from 'src/services/transport'
import { ActivityIndicator, Caption, Card } from 'react-native-paper'
import RenderHtml from 'react-native-render-html'
import { RootStack } from 'src/navigation/types'

const PAGE_SIZE = 5
const INITIAL_PAGE = 1

interface Props {
  navigation: NavigationProp<RootStack, 'Home'>
  route: RouteProp<RootStack, 'Details'>
}
export default function DetailsScreen ({ navigation, route }: Props): JSX.Element {
  const [articles, setArticles] = useState<Article[]>([])
  const { width } = useWindowDimensions()
  const [loading, setLoading] = useState(false)
  const [page, setPage] = useState(INITIAL_PAGE)

  const fetchData = useCallback(async (): Promise<void> => {
    const response = await getArticles(route.params?.sourceId, { pageSize: PAGE_SIZE, page })
    setArticles(articles?.concat(response))
  }, [route.params?.sourceId, page])

  useFocusEffect(useCallback(() => {
    setLoading(true)
    fetchData()
      .catch(console.warn)
      .finally(() => setLoading(false))
  }, []))

  if (loading) {
    return (
      <View style={s.container}>
        <ActivityIndicator />
      </View>
    )
  }

  return (
    <View>
      <FlatList
        data={articles}
        onEndReached={() => {
          setPage(page + 1)
          fetchData().catch(console.warn)
        }}
        keyExtractor={(item) => item.url}
        renderItem={({ item }) => (
          <Card style={s.card}>
            <Card.Title title={item.title} />
            <Card.Cover source={{ uri: item.urlToImage }} />
            <View style={s.content}>
              <RenderHtml
                contentWidth={width}
                source={{ html: item.description }}
              />
              <View style={s.actions}>
                <Caption>{item.author}</Caption>
                <Caption>{new Date(item.publishedAt).toDateString()}</Caption>
              </View>
            </View>
          </Card>
        )}
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
  },
  card: {
    margin: 10
  },
  content: {
    padding: 10
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  }
})
