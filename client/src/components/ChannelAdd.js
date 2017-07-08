// import React from 'react';

// const ChannelAdd = ({}) => {
//   return (
//     <div id='footer-channels'>
//       <i className="ui large plus icon channel-button"></i>
//     </div>
//   )
// }

// export default ChannelAdd;

import React from 'react';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import { setPage } from '../actions/currentPage';

import { addRegion, setRegions, getRegion } from '../actions/regions';

import { addChannel } from '../actions/channels';

class ChannelAdd extends React.Component {
	constructor(props) {
		super(props)

		this.state = {
			error: '',
			value: ''
		}

		this.addChannel = this.addChannel.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}

	componentWillMount() {	
	}

	addChannel() {
		var r = this.props.channels
		console.log('In Add Channel', r, this.state.value)
		this.setState({
			value: ''
		})
		fetch(`/api/channels/${this.props.user.region}/${this.state.value}`, {
          method: 'PUT'
        })
        .then((response) => {
        	if (response.status === 406) {
        		console.log('Channel exists')
        		this.setState({
        			error: 'Channel already exists'
        		})
        	} else { 
        		response.json()
        		.then((channel) => {
        			console.log('Channel added successfully', channel)
        			this.props.addChannel(channel)
        		})
        	}
        })
	}

	handleChange(e) {
		this.setState({
			value: e.target.value
		})
	}

	render() {
		return (
		    <form action="" onSubmit={this.addChannel}>
	        <div id="footer-messages" className="ui menu">
	          <div id="channel-input" className="item">
	            <div className="ui big icon input">
	              <input
	                type="text"
	                placeholder="New Channel"
	                onChange={this.handleChange}
	                value={this.state.value}
	              />
	            </div>
	          </div>
	          <div id="channel-submit" className="right borderless item">
	            <button id="channel-button" className="ui button">
	            <i className="ui large plus icon channel-button" ></i>
	            </button>
	          </div>
	        </div>
	      	</form>
  		);
	}
} 

const mapStateToProps = ({currentPage, regions, channels, user}) => ({
  currentPage,
  regions,
  channels,
  user
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
  },
  addChannel: channel => {
  	dispatch(addChannel(channel));
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(ChannelAdd));