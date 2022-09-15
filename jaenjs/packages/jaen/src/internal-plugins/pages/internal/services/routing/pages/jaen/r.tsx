import {Router} from '@reach/router'
import Dynamic from '../dynamic'

const _ = () => {
  if (typeof window !== 'undefined') {
    return (
      <Router primary={false}>
        <Dynamic path="/jaen/r" />
      </Router>
    )
  }

  return null
}

export default _
