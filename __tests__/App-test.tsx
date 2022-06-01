import 'react-native'
import React from 'react'
import { Provider } from 'react-native-paper'
import SourcesList from '../src/components/SourcesList'

// Note: test renderer must be required after react-native.
import renderer from 'react-test-renderer'

it('SourcesList renders correctly', () => {
  const tree = renderer.create(
    <Provider>
      <SourcesList
        data={[{
          category: '1',
          country: '2',
          description: '3',
          id: '4',
          language: '5',
          name: '6',
          url: '7'
        }]}
        onPress={() => null}
      />
    </Provider>).toJSON()
  expect(tree).toMatchSnapshot()
})
