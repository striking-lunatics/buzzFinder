import React from 'react';

class Loader extends React.Component {

   render() {
      return (
         <div className="loading">
            <div className="glass">
               <div className="beer"></div>
            </div>
            <div className="poignet"></div>
            <div className="mousse_1"></div>
            <div className="mousse_2"></div>
            <div className="mousse_3"></div>
            <div className="mousse_4"></div>
            <div className="mousse_5"></div>
            <div className="mousse_volante"></div>
            <div className="mousse_interieur"></div>
            <div className="mousse_interieur_2"></div>
            <div className="mousse_interieur_3"></div>
            <div className="mousse_interieur_4"></div>
            <p className="beer_text">Loading...</p>
         </div>
      )
   }
}

export default Loader;
