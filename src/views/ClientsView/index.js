import Clients from '../../containers/clients/'
import React from 'react'
export default class ClientsComponent extends React.Component {
  render() {
    return (
      <section className='container clearfix'>
        <Clients />
      </section>
    )
  }
}
