import React from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import RegionListItem from './RegionListItem';

import { changeRegion, changeChannel } from '../actions/user';

import { setRegions } from '../actions/regions';

class RegionList extends React.Component{
  constructor(props) {
    super(props)
  }

  componentWillMount() {
    console.log(this.props.user)
    fetch(`/api/regions/${this.props.user.lat}/${this.props.user.lng}`, {
            method: 'GET'})
    .then((response) => {
      return response.json()
    })
    .then((regions) => {
      this.props.setRegions(regions)
      for (var i = 0; i < regions; i ++) {
        socket.emit('subscribe', regions[i]);
      }
    });
  }

  render() {
    if (this.props.regions.length > 0) {
      return (
        <div className="channel-body">
          <div></div>
          <div className="ui center aligned large header">Regions</div>
            <div className="channel-list">
              <div className="ui piled segments ">
                {this.props.regions.map(region =>
                  <RegionListItem
                    user={this.props.user}
                    region={region}
                    changeRegion={this.props.changeRegion}
                    changeChannel={this.props.changeChannel}
                    setPage={this.props.setPage}
                    socket={this.props.socket}
                  />
                )}
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          Loading...
        </div>
      )
    }
  }
}

const mapStateToProps = ({user, regions}) => ({
  user,
  regions
});

const mapDispatchToProps = dispatch => ({
  changeRegion: region => {
    dispatch(changeRegion(region));
  },
  setRegions: regions => {
    dispatch(setRegions(regions));
  },
  changeChannel: channel => {
    dispatch(changeChannel(channel));
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegionList));
