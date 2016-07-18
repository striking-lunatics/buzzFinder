import React from 'react';
import BreweryItem from './BreweryItem.jsx';
import BreweryView from './BreweryView.jsx';
import $ from 'jquery';
import Loader from './loadingComponent.jsx';
const request = require('request');

// This is the brewery list on the main page
export default class BreweryList extends React.Component {

   constructor(props) {
     super(props);
     this.state = {
      // activeId reflects the brewery the user clicks on
       activeId: undefined
     }
   }

   render() {

      const activeId = this.state.activeId;
      let company;
      if (activeId === undefined) {
        company = undefined;
      } else {
        company = this.props.brewerys[activeId];
      }

      let breweryView;
      if (company === undefined) {
        breweryView = null;
        $("body").removeClass("modal-open");
      } else {
        breweryView = <BreweryView
                company={company}
                closeView={this.closeView.bind(this)} 
                nextView={this.nextView.bind(this)} 
                prevView={this.prevView.bind(this)}
              />;
      }
    
      return (
         <div className='breweryList'>
            {this._createBreweryView()}
            {breweryView}
         </div>
      )
   }

   _createBreweryView() {
    if (this.props.brewerys) {
      return this.props.brewerys.map((beer, index) => {
        return <BreweryItem 
          likes={beer.brewery.likes}
          key={index}
          viewId={index}
          breweryID={beer.id}
          url={beer.brewery.website}
          name={beer.brewery.name}
          description={beer.brewery.description}
          address={beer.streetAddress}
          zipcode={beer.postalCode}
          distance={beer.distance}
          type={beer.locationType}
          icon={beer.brewery.images.icon}
          image={beer.brewery.images.squareMedium}
          socialAccounts={beer.brewery.socialAccounts}
          selectView={this.selectView.bind(this)}/>
      });
    } else {
      return <Loader />
    }
   }

   // Below are the helper functions that are used in the BreweryView
   closeView() {
     this.setState({
       activeId: undefined
     });
     $("body").removeClass("modal-open")
   }

   nextView() {
     this.setState({
       activeId: this.state.activeId + 1
     })
   }

   prevView() {
     this.setState({
       activeId: this.state.activeId - 1
     })
   }

   selectView(activeViewId) {
     this.setState({
       activeId: activeViewId
     });
   }
}
