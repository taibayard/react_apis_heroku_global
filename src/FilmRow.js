import React, {Component} from 'react';
import FilmPoster from './FilmPoster.js';
class FilmRow extends Component{
	handleDetailsClick = (e) => {
		const url = `https://api.themoviedb.org/3/movie/${this.props.id}?api_key=${process.env.REACT_APP_TMDB_API_KEY}&append_to_response=videos,images&language=en`
		fetch(url).then(response => {
			response.json().then(data => {
				console.log(data);
				this.setState({current: data})
			})
		})
	}
	render(){
		return(
			<div className="film-row" onClick={(e)=>this.handleDetailsClick(e)} >
			 	<FilmPoster posterUrl={this.props.posterUrl}/>
			  <div className="film-summary">
			    <h1>{this.props.title}</h1>
			    <p>{this.props.year}</p>
			  </div>
			</div>
		);
	}
}

export default FilmRow;