import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import { setPage } from '../actions/currentPage';

import { addRegion, setRegions, getRegion } from '../actions/regions';

class MapAdd extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			error: ''
		}

		this.addMap = this.addMap.bind(this)
	}

	componentWillMount() {	
	}

	addMap() {
		var r = this.props.regions
		console.log('In MapAdd', this.props)
		fetch(`/api/regions/${r.center.lat}/${r.center.lng}/${r.radius}`, {
          method: 'PUT'
        })
        .then((response) => {
        	if (response.status === 406) {
        		console.log('Region exists')
        		this.setState({
        			error: 'Region already exists'
        		})
        	} else {
        		console.log('Region added successfully')
        		this.props.setPage('regions', response)
        	}
        })
	}

	render() {
		return (
			    <div id='footer-channels'>
			      <i className="ui large plus icon channel-button" onClick={this.addMap} ></i>
			      <i>{this.state.error}</i>
			    </div>
  		);
	}
} 

const mapStateToProps = ({currentPage, regions}) => ({
  currentPage,
  regions
});

const mapDispatchToProps = dispatch => ({
  setPage: page => {
    dispatch(setPage(page));
  },
  addRegion: region => {
    dispatch(addRegion(region));
  },
  setRegions: regions => {
    dispatch(setRegions(regions));
  },
  getRegion: region => {
  	dispatch(getRegion(region));
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MapAdd));