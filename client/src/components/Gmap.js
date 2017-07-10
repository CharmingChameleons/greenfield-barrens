import React from 'react';
import {Switch, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';;
// import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps';

import { addRegion, setRegions, getRegion } from '../actions/regions';

class Gmap extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      name: this.props.user.region,
      center: {
        lat: parseFloat(this.props.user.lat),
        lng: parseFloat(this.props.user.lng)
      },
      radius: 25
    }

    this.map;

    this.cityCircle;
    this.radiusChanged = this.radiusChanged.bind(this)
    this.centerChanged = this.centerChanged.bind(this)

  }

  componentDidMount() {

    this.map = new window.google.maps.Map(document.getElementById('mapInside'), {
      zoom: 18,
      center: this.state.center,
      mapTypeId: 'roadmap'
    });

    this.cityCircle = new window.google.maps.Circle({
      strokeColor: '#FF0000',
      strokeOpacity: 0.8,
      strokeWeight: 2,
      fillColor: '#FF0000',
      fillOpacity: 0.35,
      map: this.map,
      center: this.state.center,
      radius: this.state.radius,
      editable: true,
      draggable: true,
      radius_changed: this.radiusChanged,
      center_changed: this.centerChanged
    });

    this.marker = new window.google.maps.Marker({
      position: this.state.center,
      map: this.map,
      title: this.props.user.username
    });

    this.props.setRegions(this.state)

  }

  radiusChanged() {
    this.setState({
      radius: this.cityCircle.getRadius()
    })
    
    this.props.setRegions(this.state)
  }

  centerChanged() {
    this.setState({
      center: {
        lat: this.cityCircle.getCenter().lat(),
        lng: this.cityCircle.getCenter().lng()
      }
    })

    this.props.setRegions(this.state)
  }

  render() {
    var style = {
      height: '80%',
      width: '100%'
    }
    return (
        <div id='mapInside' style={style} >
        </div>
    )
  }
}

const mapStateToProps = ({ user, regions }) => ({
  user,
  regions
});

const mapDispatchToProps = dispatch => ({
  addRegion: region => {
    dispatch(addRegion(region));
  },
  setRegions: regions => {
    dispatch(setRegions(regions));
  }
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Gmap));
    