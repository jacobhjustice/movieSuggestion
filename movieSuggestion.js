var Movies = {
    movieList: [],
    
    
    load: function(){
        $.ajax({
            type:"get",
            url:"movieScrapper.php",
            success: function(data) {
                Movies.movieList = JSON.parse(data);
                Movies.bindEvents();
            }, 
            error: function(){
                Movies.movieList = [{title: "test", rating: "5", ranking: "7", year: "2008"}];
                Movies.bindEvents();
            }
        });
    },
    bindEvents: function(){
        $("#generateNew").on("click", function(){
            var movie = Movies.getMovie();
            Movies.loadTemplate(movie);
        });
    },
    getMovie: function(){
        var index = Math.floor(Math.random() * Movies.movieList.length);
        var movie = Movies.movieList[index];
        Movies.movieList.splice(index, 1);
        $.ajax({
            type:"get",
            url:"movieDetailsScrapper.php",
            data: {
                "desc": movie.desc    
            },
            success: function(data) {
                movie.description = data;
            }
        });
        return movie;
    },
    loadTemplate: function(movie){
        $("#year").html(movie.year.trim());
        $("#rating").html(movie.rating.trim() + "/10");
        $("#number").html("#" + movie.ranking.trim());
        $("#name").html(movie.title.trim());
    }
};

$(document).ready(function(){
    Movies.load();
});