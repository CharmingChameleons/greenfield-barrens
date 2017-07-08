import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import { setPage } from '../actions/currentPage';

class RegionAdd extends React.Component {
	constructor(props) {
		super(props)

		this.addRegion = this.addRegion.bind(this)
	}

	componentWillMount() {
	}

	addRegion(e) {
		this.props.setPage('addregion')
	}

	render() {
		return (
	    <div id='footer-channels'>
	      <i className="ui large plus icon channel-button" onClick={this.addRegion}></i>
	    </div>
		);
	}
} 

const mapStateToProps = ({currentPage}) => ({
  currentPage
});

const mapDispatchToProps = dispatch => ({
  setPage: page => {
    dispatch(setPage(page));
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegionAdd));