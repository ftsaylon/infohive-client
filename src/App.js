//React
import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import axios from 'axios';

//Pages
import Product from './features/Product';
import ProductList from './features/ProductList';
import Home from './features/Home';
import Faqs from './features/info/Faqs';
import About from './features/info/About';
import Footer from './features/Footer';
import Banner from './features/Banner';
import Admin from './features/admin/Admin';
import Navbar from './features/Navbar';
import Orders from './features/commerce/Orders';
import AdminNavbar from './features/admin/AdminNavbar';
import FarmInfo from './features/sp/FarmInfo';
import FarmMaps from './features/sp/FarmMaps';
import Bee from './features/sp/Bee';
import ForumPage from './features/sp/ForumPage';
import NewsPage from './features/sp/NewsPage';

// helpers
import {getUserTag} from './sessionhandler'
// import multer from 'multer';
//CSS,,,,,,.l.,.,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,,

//Const for image uploading
// const multerConfig = {
    
//   storage: multer.diskStorage({
//    //Setup where the user's file will go
//    destination: function(req, file, next){
//      next(null, './public/photo-storage');
//      },   
      
//       //Then give the file a unique name
//       filename: function(req, file, next){
          // console.log(file);
//           const ext = file.mimetype.split('/')[1];
//           next(null, file.fieldname + '-' + Date.now() + '.'+ext);
//         }
//       }),   
      
//       //A means of ensuring only images are uploaded. 
//       fileFilter: function(req, file, next){
//             if(!file){
//               next();
//             }
//           const image = file.mimetype.startsWith('image/');
//           if(image){
//             console.log('photo uploaded');
//             next(null, true);
//           }else{
//             console.log("file not supported");
            
//             //TODO:  A better message response to user on failure.
//             return next();
//           }
//       }
//     };

// import './App.css';
class App extends Component {
  constructor(props){
    super(props)

    this.state = {
      loggedIn: getUserTag ? true : false
    }

    this.loggedInStatusHandler = this.loggedInStatusHandler.bind(this);
    this.isAdmin = this.isAdmin.bind(this);
  }

  componentDidMount(){
    this.isAdmin();
  }
  
  render() {
    return (
      <div className="App" style={{height:"100%"}}>
        <Banner style={{height:"20vh"}}/>
        <BrowserRouter style={{height:"60vh"}}>
          <div>
            {
              this.state.isAdmin ?
              (
                <div>
                <Navbar onChange={this.loggedInStatusHandler} searchRedirect ={this.searchRedirect}/>
                <AdminNavbar />
                </div>
              ) :
              (
                <React.Fragment>
                <Navbar onChange={this.loggedInStatusHandler} searchRedirect ={this.searchRedirect} {...this.props}/>
                </React.Fragment>
              )
            }
            <Switch>
            <Route path="/" 
                   exact={true} 
                   component={Home}/>
            <Route path="/faq"
                   exact={true}
                   component={Faqs}/>
            <Route path="/about"
                   exact={true}
                   component={About}/>                 
            <Route path="/orders"
                   exact={true}
                   component={Orders}/>
            <Route path="/:category/product/:id"
                   exact={true}
                   render={(props) => <Product onChange={this.loggedInStatusHandler} {...props}/>}/>
            <Route path="/:category/searchKey=:key"
                   exact={true}
                   component={ProductList}/>
            <Route path="/:category/product/"
                   exact={true}
                   component={ProductList}/>
            <Route path="/:category/searchKey="
                   exact={true}
                   component={ProductList}/>
            <Route path="/farm-maps"
                   exact={true}
                   component={FarmMaps}
            />
            <Route path="/farm/:id"
                   exact={true}
                   component={FarmInfo}
            />
            <Route path="/bee/:id"
                   exact={true}
                   component={Bee}
            />
            <Route path="/forum"
                   exact={true}
                   component={ForumPage}
            />
            <Route path="/news/:id"
                   exact={true}
                   render={(props) => <NewsPage onChange={this.loggedInStatusHandler} {...props}/>}/>
            
            {
              this.state.isAdmin ?
              (
                <Route path="/admin"
                     component={() => <Admin change={this.state.isAdmin}/>}
                     />
              ) :
              (
                <Route path="/" 
                   component={Home}/>
              )
            }
            </Switch>
            <Footer/>
          </div>
        </BrowserRouter>
      </div>
    );
  }

  loggedInStatusHandler(){
    this.isAdmin()
    this.setState({loggedIn: !(this.state.loggedIn) })
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
}



export default App;