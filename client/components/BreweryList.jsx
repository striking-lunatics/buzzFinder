import React from 'react';
import BreweryItem from './BreweryItem.jsx';
import BreweryView from './BreweryView.jsx';
import $ from 'jquery';
import Loader from './loadingComponent.jsx';
const request = require('request');

export default class BreweryList extends React.Component {

   constructor(props) {
     super(props);
     this.state = {
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
        console.log('this.props.brewerys~~', this.props.brewerys)
        console.log('activeId is~~~~' , activeId)
      }

      let breweryView;
      if (company === undefined) {
        breweryView = null;
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
            {this._createBreweryComponents()}
            {breweryView}
         </div>
      )
   }

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
     // console.log('handling change' + activeViewId);
     this.setState({
       activeId: activeViewId
     });
   }

   _createBreweryComponents() {
      //  map brewerys data -> create BreweryItem for each brewery
      if (this.props.brewerys) {
         return this.props.brewerys.filter((beer) => beer.streetAddress && beer.openToPublic == "Y" && beer.locationType != "office" && beer.brewery.images && beer.brewery.images.squareMedium).map((beer, index) => {
            return <BreweryItem
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
}
