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
import {Link} from 'react-router'

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
    logoutAndRedirect: React.PropTypes.any,
    isAuthenticated: React.PropTypes.any
  };
  constructor (props) {
    super(props)
    this.state = {
      open: false
    }
  }
  closeNav = () => {
    this.setState({
      open: false
    })
  }

  handleClickOutside (event) {
    this.setState({
      open: false
    })
  }

  logout = (e) => {
    e.preventDefault()
    this.props.logoutAndRedirect()
    this.setState({
      open: false
    })
  }

  openNav = (e) => {
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
                  <MenuItem onClick={this.closeNav} linkButton containerElement={<Link to='/login' />}>
                      Login
                  </MenuItem>
                </div>

                : <div>

                  <MenuItem onClick={this.closeNav} linkButton containerElement={<Link to='/analytics' />}>
                      Analytics
                  </MenuItem>

                  <Divider />

                  <MenuItem onClick={this.logout}>
                      Logout
                  </MenuItem>
                </div>
            }
        </LeftNav>
        <AppBar
          title='React-Redux-JWT'
          onLeftIconButtonTouchTap={this.openNav}
          iconElementRight={
            <FlatButton label={'Home'} containerElement={<Link to='/'/>} />
          }
        />
      </header>

    )
  }
}
