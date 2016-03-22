import React from 'react'
import SI from 'seamless-immutable'
import bows from 'bows'
import actions from '../../redux/modules/clients/clients.actions'
import Form from './Form.jsx'

const PT = React.PropTypes
const log = bows('clients--New')

class Comp extends React.Component {

  constructor (props, ctx) {
    super(props, ctx)
    this.state = this.getCleanState()
  }

  getCleanState () {
    return {
      client: SI({
        name: '',
      }),
    }
  }

  onCommit (client) {
    const action = actions.create(client)
    const dispatch = this.props.dispatch
    dispatch(action)
    this.setState(this.getCleanState())
  }

  render () {
    return (
    <section>
      <Form {...this.props} client={this.state.client} onCommit={this.onCommit.bind(this)} />
    </section>
    )
  }

}

Comp.propTypes = {
  dispatch: PT.func.isRequired,
}

export default Comp
