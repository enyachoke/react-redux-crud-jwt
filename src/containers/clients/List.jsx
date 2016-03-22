import React          from 'react'
import { connect }    from 'react-redux'
import actions from '../../redux/modules/clients/clients.actions'
import Icon           from 'react-fa'
import bows           from 'bows'

const PT              = React.PropTypes
const baseClass       = 'clients--List'
const log             = bows(baseClass)

class ClientsList extends React.Component {

  get dispatch() {
    return this.props.dispatch
  }

  onToggle(client, done, event) {
    event.preventDefault()
    client = client.merge({done})
    const action = actions.update(client)
    this.dispatch(action)
  }

  onDelete(client, event) {
    event.preventDefault()
    const action = actions.delete(client)
    this.dispatch(action)
  }
  renderTodos() {
    return _.map(this.props.clients, (client,i) => {
      return (
        <tr key={i}>
          <td>
            {client.name}
          </td>
          <td>
            <a className='btn regular blue'
              href='javascript://'
              onClick={this.onDelete.bind(this, client)}><Icon name='trash' /></a>
          </td>
        </tr>
      )
    })
  }

  render() {
    return (
      <section className=''>
        <table className='table-light'>
          <thead>
            <tr>
              <th>Title</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {this.renderTodos()}
          </tbody>
        </table>
      </section>
    )
  }
}

ClientsList.propTypes = {
  clients: PT.array.isRequired,
  dispatch: PT.func.isRequired,
}

export default ClientsList
