import React, { Component } from 'react'
import './styles/app.scss'
import { Header } from '../Header'
import { Footer } from '../Footer'
import { AppBar, Checkbox, IconButton } from 'react-toolbox';
import { Layout, NavDrawer, Panel, Sidebar } from 'react-toolbox';
import { List, ListItem, ListSubHeader, ListDivider, ListCheckbox } from 'react-toolbox';
import style from './navigation.scss';
import components from './components';
export class App extends Component {
  static propTypes = {
    children: React.PropTypes.any
  }
  static contextTypes = {
      router: React.PropTypes.object
  }
  handleNavigation(value) {
    this.context.router.push(value)
  }
  componentDidMount () {
   console.log(this.context.router.isActive('analytics'))
 }
 renderDrawerItems = () =>{
   return Object.keys(components).map((key) => {
     const ToolboxComponent = components[key];
     let className = style.item;
     if (this.context.router.isActive(ToolboxComponent.path)) {
       className += ` ${style.active}`;
     }

     return (
       <ListItem
         key={key}
         caption={ToolboxComponent.name}
         className={className}
         selectable
         onClick={this.handleNavigation.bind(this, ToolboxComponent.path)}
       />
     );
   });
 }
  render () {
    return (
      <Layout>
              <NavDrawer active={true}
                  pinned={true} permanentAt='xxxl'
                  onOverlayClick={ this.toggleDrawerActive }>
                  <List className={style.list} selectable ripple>
                  {this.renderDrawerItems()}
                  </List>
              </NavDrawer>
              <Panel>
                  <AppBar><IconButton icon='menu' inverse={ true } onClick={ this.toggleDrawerActive }/></AppBar>
                  <div style={{ flex: 1, overflowY: 'auto', padding: '1.8rem','minHeight': '100vh' }}>
                      {this.props.children}
                  </div>
              </Panel>
          </Layout>
    )
  }
}
