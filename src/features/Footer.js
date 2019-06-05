import React, { Component } from 'react';
import {NotificationContainer} from 'react-notifications';
import 'react-notifications/lib/notifications.css';
import { Segment } from 'semantic-ui-react';

class Footer extends Component {
  render() {
    return (
      <footer>
      <NotificationContainer/>
      <Segment
        inverted
        vertical
        style={{
          zIndex: 2,
          height: '10vh',
          width: '100%',
          left: 0,
          bottom: 0,
          position: 'relative',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          marginTop:"10%"
        }}>
        <p>
            &copy; UPLB Bee Program InfoHive 2019
        </p>
      </Segment>
      </footer>
    );
  }
}

export default Footer;