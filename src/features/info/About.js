import React, { Component } from 'react';
import  { Container, Header, List, Accordion, Icon, Segment } from 'semantic-ui-react';

class Faqs extends Component {
    constructor(props){
        super(props);
        this.state = { activeIndex: 0 }
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index
    
        this.setState({ activeIndex: newIndex })
    }

    render() {
        const { activeIndex } = this.state;

        return (
            <div>
                <br/><br/>
                <Container>
                    <Header as="h1">About</Header>
                    <Container>
                        <Segment>
                        <Accordion>
                        <Accordion.Title as="h4" active={ activeIndex === 0 } index={0} onClick={this.handleClick}>
                            <Icon name='dropdown' />
                            Honeybee Keeping in the Philippines
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 0}>
                            <div>
                                The Philippines is home to four honeybee species: <em>Apis cerana</em>, <em>Apis dorsata</em>, <em>Apis breviligula</em>, <em>Apis andreniformis</em>, and the introduced <em>Apis mellifera</em>. The number of recognized species of stingless bees in the Philippines is six but latest studies suggest that there are in fact 15 species. In the world, there are 11 honey bee species and about 800 species of stingless bees.
                            </div>
                            <div>
                                The modern beekeeping or apiculture was introduced in the Philippines during the American regime. Since then, the beekeeping industry in the country has been growing slowly relative to its neighboring countries such as Vietnam, Thailand, and Taiwan.
                            </div>
                            <div>
                                Today, there are many reasons why the beekeeping industry of the country deserves the support from the government and nongovernment institutions it rightfully deserves. Community-based industries and small to medium enterprises producing honeybee products provide income and employment for many families. Harvesting of honey from the wild also constitute a part of upland dwellers’ and indigenous people’s livelihood.
                            </div>
                            <div>
                                But more than its economic benefits, beekeeping among communities largely contributes to the conservation of the genetic pool of plant food species in the country and the ecological balance supporting food systems as a whole. 
                            </div>
                        </Accordion.Content>    
                        </Accordion>
                        </Segment>
                        <Segment>
                        <Accordion>
                        <Accordion.Title as="h4" active={ activeIndex === 1 } index={1} onClick={this.handleClick}>
                            <Icon name='dropdown' />
                            DA-BAR Info-Hub Project on Bee Products in the Philippines
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 1}>
                            <div>
                                This information hub of honey bee products in the Philippines, also known as DA-BAR’s InfoHive, is initially developed by researchers from the University of the Philippines Los Baños. 
                            </div>
                            <div>
                                Its aim is to provide honeybee producers and distributors in the country an online platform where they can promote their products, services, and related initiatives. Whether one is a small-scale honey bee producer or an established business in the beekeeping industry, everyone has an equal opportunity to sell and promote their product through this DA-BAR project. 
                            </div>
                        </Accordion.Content>    
                        </Accordion>
                        </Segment>
                        <Segment>
                        <Accordion>
                        <Accordion.Title as="h4" active={ activeIndex === 2 } index={2} onClick={this.handleClick}>
                            <Icon name='dropdown' />
                            Intended Users of the DA-BAR InfoHive
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 2}>
                            <div>
                                The DA-BAR InfoHive is intended for prospective honeybee producers, beekeepers, enthusiasts, buyers and sellers of local honeybee products, business industries, enthusiasts, and advocates of honey beekeeping in the Philippines. 
                            </div>
                        </Accordion.Content>
                        </Accordion>
                        </Segment>
                        <Segment>
                        <Accordion>
                        <Accordion.Title as="h4" active={ activeIndex === 3 } index={3} onClick={this.handleClick}>
                            <Icon name='dropdown' />
                            What you can do with the DA-BAR InfoHIve
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 3}>
                            <div>
                                Visitors of the site can:
                                <List>
                                    <List.Content>Look for a particular honeybee product and know how it looks like, its properties (general description and size), and its selling price </List.Content>
                                    <List.Content>Get the contact information of honeybee product producers and distributors</List.Content>
                                    <List.Content>Learn the basic facts about honeybees and bee keeping through the FAQ page</List.Content>
                                    <List.Content>Collaborate and learn from members of the community forum page</List.Content>
                                </List>
                            </div>
                        </Accordion.Content>
                        </Accordion>
                        </Segment>
                    </Container>
                </Container>
            </div>
        );
    }
}   


export default Faqs;