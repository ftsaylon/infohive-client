import React, { Component, Fragment } from 'react';

import { Segment, Header } from 'semantic-ui-react';

class Banner extends Component {
  render() {
    return (
      <Fragment>
        <Segment
          style={{ padding: 80 }}
          textAlign="center"
          inverted color="orange"
          vertical>
            <Header size="huge" inverted textAlign="center"> 
                UPLB Bee Program InfoHive 
                <Header.Subheader>
                    Everything you need to know<br/>about honeybee products in the Philippines 
                </Header.Subheader>
            </Header>
            
        </Segment>
      </Fragment>
    );
  }
}

export default Banner;