import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from '../redux/modules/auth/auth.actions';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import Paper from 'material-ui/lib/paper';

import {validateEmail} from '../redux/utils/misc'

function mapStateToProps(state) {
    return {
        isRegistering: state.auth.isRegistering,
        registerStatusText: state.auth.registerStatusText
    }
};

function mapDispatchToProps(dispatch) {
    return bindActionCreators(actionCreators, dispatch)
};

 class Analytics extends React.Component {

    constructor(props) {
        super(props);

    }

    render() {
        return (
            <div className='col-md-8'>
                <h1>Analytics</h1>
                <hr/>
            </div>
        );

    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Analytics)
