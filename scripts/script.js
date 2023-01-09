const inputBox = document.querySelector('.input-box');
const main = document.querySelector('.main');
let input = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c';
getData(input);

inputBox.addEventListener('submit', () => {
	event.preventDefault();
})

function getN(value) {
	input = value
	getData(`https://api.themoviedb.org/3/search/movie?query=${input}&api_key=123ede17028baf0ee724c1e0d5cbf942`);
}

function getData(input) {
	fetch(input)
	.then((res) => res.json())
	.then((data) => {
		main.textContent = '';
		data.results.map((value) => {
			const div = document.createElement('div');
			div.classList.add('movie')
			main.append(div);

			const img = document.createElement('img');
			img.src = `https://image.tmdb.org/t/p/w1280${value.poster_path}`;
			img.alt = `${value.original_title}`;
			div.append(img);

			const div1 = document.createElement('div');
			div1.classList.add('movie-info')
			div.append(div1);

			const h3 = document.createElement('h3');
			div1.append(h3);
			h3.textContent = `${value.original_title}`;

			const span = document.createElement('span');
			if(value.vote_average >= 8){
				span.classList.add('green');
				div1.append(span);
			} else if (value.vote_average < 5){
				span.classList.add('red');
				div1.append(span);
			} else {
			span.classList.add('orange');
			div1.append(span);
			}
			span.textContent = value.vote_average;

			const div2 = document.createElement('div');
			div2.classList.add('movie-desc')
			div.append(div2);

			div2.innerHTML = `<h3>Overview</h3>${value.overview}`;
			


			const movie = document.querySelectorAll('.movie');
			const movieD = document.querySelectorAll('.movie-desc');

			movie.forEach((element, index) => element.addEventListener('mouseenter', () => movieD[index].classList.add('active')))
			movie.forEach((element, index) => element.addEventListener('mouseleave', () => movieD[index].classList.remove('active')))

		})
	})
}
