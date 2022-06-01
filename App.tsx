import React from 'react'
import Navigator from 'src/navigation'
import { Provider } from 'react-native-paper'

export default function App (): JSX.Element {
  return (
    <Provider>
      <Navigator />
    </Provider>
  )
}
