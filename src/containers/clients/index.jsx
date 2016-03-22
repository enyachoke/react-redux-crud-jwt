import React       from 'react'
import { connect } from 'react-redux'
import actions from '../../redux/modules/clients/clients.actions'
import New         from './New.jsx'
import List        from './List.jsx'
const PT           = React.PropTypes

class ClientsIndex extends React.Component {

  componentDidMount() {
    this.fetchClients()
  }

  get dispatch() {
    return this.props.dispatch
  }

  fetchClients() {
    const action = actions.fetch()
    this.dispatch(action)
  }

  render() {
    return (
      <section className='p1'>
        <h2>Clients</h2>
        <New {...this.props} />
        <List {...this.props} />
      </section>
    )
  }
}

ClientsIndex.propTypes = {
  dispatch: PT.func.isRequired,
}

export default connect(state => state)(ClientsIndex);
