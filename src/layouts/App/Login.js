import React, { Component } from 'react'
export class Login extends Component {
  static propTypes = {
    children: React.PropTypes.any
  }
  static contextTypes = {
      router: React.PropTypes.object
  }

  render () {
    return (
      <Layout>
              <Panel>
                  <AppBar></AppBar>
                  <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem','minHeight': '100vh'}}>
                      {this.props.children}
                  </div>
              </Panel>
          </Layout>
    )
  }
}
