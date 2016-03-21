import React, { Component } from 'react'
import {connect} from 'react-redux'
import * as actionCreators from '../../redux/modules/auth/auth.actions'
import { bindActionCreators } from 'redux'
import AppBar from 'material-ui/lib/app-bar'
import LeftNav from 'material-ui/lib/left-nav'
import MenuItem from 'material-ui/lib/menus/menu-item'
import FlatButton from 'material-ui/lib/flat-button'
import listensToClickOutside from 'react-onclickoutside/decorator'
import Divider from 'material-ui/lib/divider'
import { browserHistory } from 'react-router'

function mapStateToProps (state) {
  return {
    token: state.auth.token,
    userName: state.auth.userName,
    isAuthenticated: state.auth.isAuthenticated
  }
};

function mapDispatchToProps (dispatch) {
  return bindActionCreators(actionCreators, dispatch)
};

@connect(mapStateToProps, mapDispatchToProps)
@listensToClickOutside()
export class Header extends Component {
  static propTypes = {
    logoutAndRedirect: React.PropTypes.fun,
    isAuthenticated: React.PropTypes.func
  };
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
  }

  dispatchNewRoute (route) {
    browserHistory.push(route)
    this.setState({
      open: false
    })
  }

  handleClickOutside (event) {
    this.setState({
      open: false
    })
  }

  logout (e) {
    e.preventDefault()
    this.props.logoutAndRedirect()
    this.setState({
      open: false
    })
  }

  openNav () {
    this.setState({
      open: true
    })
  }

  render () {
    return (
      <header>
        <LeftNav open={this.state.open}>
            {
                !this.props.isAuthenticated
                ? <div>
                  <MenuItem onClick={function (e) { return this.dispatchNewRoute('/login') }}>
                          Login
                  </MenuItem>
                </div>

                : <div>

                  <MenuItem onClick={function (e) { return this.dispatchNewRoute('/analytics') }}>
                      Analytics
                  </MenuItem>
                  <Divider />

                  <MenuItem onClick={function (e) { return this.logout(e) }}>
                      Logout
                  </MenuItem>
                </div>
            }
        </LeftNav>
        <AppBar
          title='React-Redux-Flask'
          onLeftIconButtonTouchTap={function () { return this.openNav() }}
          iconElementRight={

            <FlatButton label='Home' onClick={function () { return this.dispatchNewRoute('/') }} />
          }
        />
      </header>

    )
  }
}
