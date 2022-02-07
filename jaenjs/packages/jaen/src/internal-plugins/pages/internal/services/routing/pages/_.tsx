import {createHistory, HistorySource, Router} from '@reach/router'
import createHashSource from 'hash-source'
import Dynamic from './dynamic'

const _ = () => {
  if (typeof window !== 'undefined') {
    const source = createHashSource()
    const history = createHistory(source as HistorySource)

    return (
      <Router primary={false}>
        <Dynamic path="/_" />
      </Router>
    )
  }

  return null
}

export default _
