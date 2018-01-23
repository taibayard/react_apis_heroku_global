import React, {Component} from 'react';

class FilmPoster extends Component{
	render(){
		return(
			<div className="film-poster">
          		<img src={this.props.posterUrl} alt="" />
        	</div>
		);
	}
}

export default FilmPoster