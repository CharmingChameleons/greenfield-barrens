import React from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import RegionListItem from './RegionListItem';

import {setRegions} from '../actions/regions';

/*
TODOS:
  add onClick event for changing channel
  hover-over styling
  styling for current room
*/

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
    }); 
  }

  render() {
    return (
      <div className="channel-list">
        <div className="ui center aligned large header">Regions</div>
          <div className="channel-list">
            <div className="ui piled segments ">
              {this.props.regions.map(region => 
                <RegionListItem 
                  user={this.props.user} 
                  region={region} 
                  setPage={this.props.setPage}
                />
              )}  
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({regions}) => ({
  regions
});

const mapDispatchToProps = dispatch => ({
  setRegions: regions => {
    dispatch(setRegions(regions));
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(RegionList));
