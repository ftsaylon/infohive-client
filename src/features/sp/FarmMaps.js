import React from 'react'
import { Link } from 'react-router-dom';
import { Map, Marker, Popup, TileLayer } from 'react-leaflet';
import axios from 'axios';
import { Grid, GridColumn, Segment, Header, Divider, Card, Image } from 'semantic-ui-react';


//helpers
import {getUserTag} from '../../sessionhandler'

export default class DeviceMap extends React.Component {
  constructor() {
    super();
    this.state = {
      lat: 12.8797,
      lng: 121.7740,
      zoom: 6,
      farms:[]
    };

    this.isAdmin = this.isAdmin.bind(this);
  }


  isAdmin(){
    axios.post(`/admin`, {user_tag: getUserTag()})
    .then(response => {
      this.setState({isAdmin: true})
      return true
    }) 
    .catch(err => {
      // console.log(err.response)
      if(err.response){
        this.setState({isAdmin: false})
      }
    })
  }

  componentDidMount(){
    this.isAdmin();
    axios.get(`/farm`).then(
			(response)=>{
        // console.log(response.data);
        this.setState({ farms: response.data });
			}
    );
  }

  render() {
    const position = [this.state.lat, this.state.lng];
    return (
      <Grid columns={2}>
      <GridColumn>
        {
          this.state.isAdmin ? (
          <Map center={position} zoom={this.state.zoom} scrollWheelZoom={false}>
            <TileLayer
                attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
            />
            {
              this.state.farms.map((item, index) => {
                return(
                  <Marker position={[item.lat, item.lng] }>
                      <Popup>
                          <Header as={Link} to={"/farm/"+item.id}>{item.name}</Header>
                      </Popup>
                  </Marker>
                )
              })
            }
          </Map>
          ):(
            <Map center={position} zoom={this.state.zoom} scrollWheelZoom={false}>
              <TileLayer
                  attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                  url='http://{s}.tile.osm.org/{z}/{x}/{y}.png'
              />
              {
                this.state.farms.map((item, index) => {
                  return(
                    <Marker position={[item.lat, item.lng] }>
                        <Popup>
                            <Header as={Link} to={"/admin/farm/"+item.id}>{item.name}</Header>
                        </Popup>
                    </Marker>
                  )
                })
              }
            </Map>    
          )
        }        
      </GridColumn>
      <GridColumn>
      <Segment>
        <Header> Bee Farms in the Philippines </Header>
        <Divider/>
          {
            this.state.isAdmin ? (
              <Card.Group>
                  {
                      this.state.farms.map((item, index)=>{
                          return(
                              <Card key={index} as={Link} to={"/admin/farm/"+item.id}>
                                  <Card.Content>
                                      {item.name}
                                      <Image/>    
                                  </Card.Content>
                              </Card>
                          );
                      })
                  }
              </Card.Group>
            ) : (
              <Card.Group>
                {
                    this.state.farms.map((item, index)=>{
                        return(
                            <Card key={index} as={Link} to={"/farm/"+item.id}>
                                <Card.Content>
                                    {item.name}
                                    <Image/>    
                                </Card.Content>
                            </Card>
                        );
                    })
                }
              </Card.Group>
            )
          }
    </Segment>
      </GridColumn>
      </Grid>
    );
  }
}