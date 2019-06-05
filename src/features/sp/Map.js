import React, { Component } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import styled from 'styled-components';

import { Map, Marker, Popup, TileLayer } from 'react-leaflet'

const Wrapper = styled.div`
    width: ${props => props.width};
    height: ${props => props.height};
`;

const position = [51.505, -0.09]
const map = (
  <Map center={position} zoom={13}>
    <TileLayer
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      attribution="&copy; <a href=&quot;http://osm.org/copyright&quot;>OpenStreetMap</a> contributors"
    />
    <Marker position={position}>
      <Popup>A pretty CSS3 popup.<br />Easily customizable.</Popup>
    </Marker>
  </Map>
)

export default class FarmMaps extends Component{

    componentDidMount(){
        this.map = L.map('map', {
            center: [58, 16],
            zoom: 6,
            zoomControl: false
        });

        L.tileLayer(`https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png`,{
            detectRetina: true,
            maxZoom: 20,
            maxNativeZoom: 17
        }).addTo(this.map);
    }

    render(){
        return <Wrapper width="1280px" height="720px" id="map"/>
    }

}
