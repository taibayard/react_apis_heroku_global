import React, {Component} from 'react';
import FilmRow from './FilmRow.js'
class FilmListing extends Component{
	render(){
		const allTitles = this.props.films.map(function(film){
			let date = new Date(film.release_date).getFullYear();
			let imgPath = "https://image.tmdb.org/t/p/w780/"+film.poster_path
			return(
				<FilmRow posterUrl={imgPath} year={date} title={film.title} key={film.id} id={film.id} />
			);
		});
		return(
	        <div className="film-list">
	          <h1 className="section-title">FILMS</h1>
	          {allTitles}
	        </div>
		);
	}
}

export default FilmListing