import React, { Component } from 'react';
import  { List, Container, Header, Segment } from 'semantic-ui-react';


class Faqs extends Component {
   
    render() {
        return (
            <div  textAlign="justified">
                <br/><br/>
                <Container>
                    <Header as="h1">Frequently Asked Questions</Header>
                    
                    <Container>
                        <Segment>
                            <Header as="h4">How many hives should I start with?</Header>    
                            <p>The number of hives depend on the species of bees you want to keep.</p>
                            <p> For Asian honey bees, <em>Apis cerana Fab.</em>, the number is 20-50 colonies which, given a good foraging area, will give a yield of 40-100 kilos of honey. For European honey bees, <em>Apis mellifera Linn.</em>, 10 colonies are needed to produce around 200 kilos of honey; and for 50-100 colonies for stingless bee, <em>Tetragonula spp.</em>, that will give about 25-50 kilos of honey. Based on the experiences of many honey bee producers in the Philippines, the said amount of honey harvests may generate enough income to recover at least the operational cost for the first year.</p>                    
                        </Segment>
                        <Segment>
                            <Header as="h4">Where do I get stocks of bees?</Header> 
                            <p>Colonies of <em>A. cerana and Tetragonula</em> can be transferred from the wild and costs relatively nothing. However, there are also colonies for sale. An established hived  colony of <em>A. cerana</em> is priced between &#8369;3,000-3,500 while <em>Tetragonula</em> sells at &#8369;2,000-2,500 per colony.</p>
                            <p><em>Apis mellifera colonies</em> sell from &#8369;7,000-12,000 from select suppliers with good brood and queen programs.</p>
                        </Segment>
                        <Segment>
                            <Header as="h4">How much will it cost to produce substantial amount of honey?</Header> 
                            <p>Again, this will depend on the species of bees and the approach to beekeeping.</p>
                            <p><em>Apis mellifera</em> bees are the most expensive to acquire and maintain, requiring between &#8369;20,000 - 30,000 per colony. These include the price of the colony itself, feeding support materials excluding transport costs for migratory beekeeping. Each colony produce about 20-25 kilos of honey.</p>
                            <p>For the native bees Apis cerana, colony cost maybe less when transferring from the wild, and making hives with locally available materials. Cost to produce two kilos of honey is &#8369;500-2000 including feeding costs. However, when opting to buy colonies and equipment, the cost goes up to &#8369;6000 per colony.</p>
                            <p>Stingless bee colonies require very little feeding, but colony costs between &#8369;3500-5000. A colony produces roughly 750 mL of honey per season so you will need a lot  of colonies to produce substantial amount.</p>
                        </Segment>
                        <Segment>
                            <Header as="h4">What are the common pests or diseases that affect the Philippine honey bees? How do I manage pests and diseases in my bees stocks?</Header> 
                            <List.Content>
                                <Segment>
                                    <strong>Varroa mites</strong> - use miticide (for <em>A. mellifera</em>), <em>A. cerana</em> exhibits grooming behavior when mites are present and does not need one
                                </Segment>
                            </List.Content>
                            <List.Content>
                                <Segment>
                                    <strong>Birds</strong> -  (bee-eaters, swifts, needle tails and other insectivorous birds) - distribute colonies in several sites at least four kilometers apart and practice migratory beekeeping.
                                </Segment>
                                <Segment>
                                    <strong>Wax moth</strong> - cleaning of bottom boards and apiary area
                                </Segment>
                                <Segment>
                                    <strong>Frogs, toads and lizards</strong> - reduce entrance area or kill these predators
                                </Segment>
                                <Segment>
                                    <strong>Small hive beetle</strong> - baited traps and burning of infested hives
                                </Segment>
                                <Segment>
                                    <strong>Chalkbrood</strong> - burning of severely infested combs and disinfection of contaminated hives. Compression of colonies and feeding also helps.
                                </Segment>
                            </List.Content>
                        </Segment>
                        <Segment>
                            <Header as="h4">How much money will I get my first year?</Header> 
                            <p>Based on the experiences of many honey bee producers in the Philippines, usually, it is breakeven in the first year. Earnings come in on the second year. Full capital recovery in three years.</p>
                        </Segment>
                        <Segment>
                            <Header as="h4">Are there minimum honey standards and certifications required by the Philippine government?</Header> 
                            
                            <Header as="h6">
                                <p>Philippine standards for honey is set by the Bureau of Product Standards as  prescribed in R.A. No. 10611 and governed by the  Food and Drug Administration Philippines</p>
                                <p>In the world, there are 11 honey bee species and about 800 species of stingless bees. &raquo; <a href="http://www.gov.ph/2013/08/23/republic-act-no-10611/)(http://www.occpphils.org/PNS_07-2003_Organic_Agriculture_Processing.pdf, http://www.fda.gov.ph/issuances-2/food-laws-and-regulations-pertaining-to-all-regulated-food-products-and-supplements/food-fda-circular" target="_blank" rel="noopener noreferrer">Read More</a></p>
                            </Header>
                        </Segment>
                        <Segment> 
                            <Header as="h4">How many species of bees are there in the Philippines? In the world?</Header> 
                            <p>There are four  honey bee species in the Philippines, <em>Apis cerana</em>, <em>Apis dorsata</em>, <em>Apis breviligula</em>, <em>Apis andreniformis</em>, and the introduced <em>Apis mellifera</em>. The number of recognized species of stingless bees in the Philippines is six but latest studies suggest that there are in fact 15 species!</p>
                            <p>In the world, there are 11 honey bee species and about 800 species of stingless bees.</p>
                        </Segment>
                        <Segment>
                            <Header as="h4">Is there such a thing as "stingless" bees?</Header> 
                            <p>Stingless bees are not "stingless" in the general sense. They have vestigial  or not fully developed stingers. The do "bite" for defense.</p>
                        </Segment>
                        <Segment>
                            <Header as="h4">Can we harvest honey from stingless bees?</Header> 
                            <p>Yes. Stingless bees produce honey that is sweet with a hint of sourness similar to notes of a sweet tamarind.</p>
                        </Segment>
                        <Segment>
                            <Header as="h4">Can stingless bees be used for pollination?</Header> 
                            <p>Yes. Stingless bees are good pollinators of mango (Fajardo et al., 2008), rambutan (Rabanales et.al, unpublished), pepper (Meeuwsen, 2005), coconut (Heard, 1999), and avocado (Can-Alonzo et al., 2005), among others.</p>
                        </Segment>
                        <Segment>
                            <Header as="h4">How do we keep Asian honey bee from absconding or fleeing from the controlled hives?</Header> 
                            <p>First, let us ask ourselves, “Why bees abscond? Absconding is triggered by a number of factors namely, 1) dearth of food or hunger, 2) severe pest infestation, 3) severe predation, 4) disease infection, and 5) genetics.
                            </p>
                            <p>The first four are a matter of management. Providing food, protection from pest and predators and keeping the colonies  clean by avoiding contact with diseased colonies will help mitigate or limit absconding. Genetics, on the other hand, is also crucial and getting colonies from a breeding population with minimal absconding tendencies is vital.</p>
                            
                        </Segment>
                    </Container>
                </Container>
            </div>
        );
    }
}   


export default Faqs;