import React from 'react'
import ReactDOM from 'react-dom'
// import Comp from 'cozy-procedures'
import Comp from '../../cozy-procedures/dist'

const App = () => {
  return (
    <div>
      <Comp />
    </div>
  )
}

ReactDOM.render(<App />, document.querySelector('#app'))
