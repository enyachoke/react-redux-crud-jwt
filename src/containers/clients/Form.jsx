import React          from 'react'
import actions from '../../redux/modules/clients/clients.actions'
import bows           from 'bows'
import Icon           from 'react-fa'

const PT              = React.PropTypes
const log             = bows('clients--Form')

class ClientForm extends React.Component {

  constructor(props, ctx) {
    super(props, ctx)
    this.state = this.getCleanState(props)
  }

  componentWillReceiveProps(nextProps) {
    this.setState(this.getCleanState(nextProps))
  }

  getCleanState(props) {
    const client = props.client
    return {
      name: client.name,
    }
  }

  onChange(event) {
    const { value } = event.target
    this.setState({
      name: value,
    })
  }

  onSave(event) {
    event.preventDefault()
    let client = this.props.client
    client = client.merge(this.state)

    this.props.onCommit(client)
  }

  render() {
    return (
      <section>
        <form>
          <input
            type='text'
            value={this.state.client}
            onChange={this.onChange.bind(this)}
            className='field col-5' />&nbsp;
          <button type='submit' onClick={this.onSave.bind(this)} className='btn btn-outline'><Icon name='save' /></button>
        </form>
      </section>
    )
  }

}

ClientForm.propTypes = {
  dispatch: PT.func.isRequired,
  onCommit: PT.func.isRequired,
  client: PT.object.isRequired,
}

export default ClientForm
