import React from 'react'
import { FlatList, StyleSheet } from 'react-native'
import { Card, Title, Paragraph, Caption } from 'react-native-paper'
import { Source } from 'src/services/transport'

interface Props {
  data: Source[]
  onPress: (item: Source) => void
}
export default function SourcesList ({ data, onPress }: Props): JSX.Element {
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Card style={s.card} onPress={() => onPress(item)}>
          <Card.Content>
            <Title>{item.name}</Title>
            <Paragraph>{item.description}</Paragraph>
          </Card.Content>
          <Card.Actions style={s.actions}>
            <Caption>{item.url}</Caption>
          </Card.Actions>
        </Card>
      )}
    />
  )
}

const s = StyleSheet.create({
  card: {
    margin: 5
  },
  actions: {
    paddingLeft: 20
  }
})
