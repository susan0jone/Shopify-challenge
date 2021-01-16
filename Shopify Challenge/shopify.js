$(function () {
    let inputVal;
    $('.nomination-title').click( function (){
       $('.nomination').slideToggle();
       $('html, body').animate({
        scrollTop: $(".nomination").offset().top
    }, 500);
     });
	 $('#target').submit(function (e) {
		$('input').keyup(function () {
			if ($(this).val() !== '') {
				inputVal = $(this).val().toLowerCase();
			
				console.log(inputVal);
			}
         });
         
         getMOvies(inputVal);
         e.preventDefault();
    });
   

});

	const getMOvies = (Val) => {
		fetch('http://www.omdbapi.com/?apikey=f92e477b&s=batman')
			.then((res) => res.json())
			.then((response) => {
				console.log(response.Search);
				let movies = response.Search;
				let filteredMov = movies.filter((movie) => {
					return movie.Title.toLowerCase().includes(Val);
				});
				console.log(filteredMov);
				if (filteredMov.length === 0) {
					$('.content').html('<div class="feedback">No Results</div>');
				} else {
					let displayMovie = '';
					$.each(filteredMov, function (index, movie) {
						displayMovie += `
                    <li class="movie-wrapper">
                    <img src=${movie.Poster}/>
                    <div class="title">${movie.Title}</div>
                    <div>${movie.Year}</div>
                    <div class="Select" onclick="movieSelected('${movie.imdbID}', '${index}')">Nominate</div></li>`;
					}).join('');
					$('.content').html(displayMovie);
                }
                $('html, body').animate({
                    scrollTop: $(".content").offset().top
                }, 500);
              
            });
           
	};
 const movieSelected = (id , ind) => {
  
        let movieIndex = ind;
        let Select = document.getElementsByClassName("Select");
        Select[ind].style.backgroundColor = "#cccccc";
        Select[ind].style.color = "#666666";
        if($(".movie-display").length >= 0){
           $(".placeholder").hide();
        }
        if($(".movie-display").length === 4){
            $('.notification').show();
         }
     
        fetch('http://www.omdbapi.com/?apikey=f92e477b&s=batman')
                .then((res) => res.json())
                .then((response) => {
                    console.log(response.Search);
                    let movies = response.Search;
                    let filteredMov = movies.filter((movie) => {
                        return movie.imdbID === id;
                    });
                    let displayMovie = '';
                        $.each(filteredMov, function (index, movie) {
                            displayMovie += `
                        <li class="movie-display">
                        <img src=${movie.Poster}/>
                        <div class="title">${movie.Title}</div>
                        <div>${movie.Year}</div>
                        <div class="Remove"  onclick="clicked('${movieIndex}')">Remove</div></li>`;
                        }).join('');
                        $('.nomination').append(displayMovie);
                       
                });
                $('.done-button').show();  

    }
  


 


 const clicked = (id) => {
     if($(".movie-display").length == 1){
        $(".placeholder").show();
     }
     console.log($(".movie-display").length )
     if($(".movie-display").length < 6){
        $('.notification').hide();
     }
    let Select = document.getElementsByClassName("Select");
     for(let i = 0; i < $(".movie-display").length; i++)
     {
        $(".movie-display")[i].onclick = function(){
            $(".movie-display")[i].remove();
            Select[id].style.backgroundColor = "#E8D5B5";
            Select[id].style.color = "black";
     
         };
     }
    
 }
 