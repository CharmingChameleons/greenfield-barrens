import React from 'react';
// import {withGoogleMap, GoogleMap, Marker} from 'react-google-maps';

class Gmap extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      center: {
        lat: 37.7453366,
        lng: -122.4127313
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

  }

  radiusChanged() {
    this.setState({
      radius: this.cityCircle.getRadius()
    })
    
    console.log(this.state.radius)
  }

  centerChanged() {
    this.setState({
      center: {
        lat: this.cityCircle.getCenter().lat(),
        lng: this.cityCircle.getCenter().lng()
      }
    })

    console.log(this.state.center)
  }

  render() {
    var style = {
      height: '50%'
    }
    return (
      <div id='mapInside' style={style} >
        <button name="AddRegion">+</button>
      </div>
    )
  }
}

export default Gmap;
    