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
        $("#viewDetails").css('visibility', 'hidden');
        $.ajax({
            type:"get",
            url:"movieDetailsScrapper.php",
            data: {
                "desc": movie.desc    
            },
            success: function(data) {
                movie.description = data;
                $("#viewDetails").css('visibility', 'visible');
            }
        });
        return movie;
    },
    loadTemplate: function(movie){
        $("#year").html(movie.year.trim());
        $("#number").html("#" + movie.ranking.trim());
        $("#name").html(movie.title.trim());
        $("#viewDetails").on("click", function(){
            Movies.popup($("#details"), "closeDetails");
            $("#detailText").html(movie.description);
            $("#rating").html(movie.rating.trim() + "/10");
        });
    },
    popup: function($overlay, close){
        $("#JSwagBackdropDimmer").remove();
        var $div = $('<div>').attr('id', 'JSwagBackdropDimmer');
        $div.css('width', '100vw').css('height', '100vh').css('position', 'fixed').css('background-color', 'rgba(25, 25, 25, .5)').css('z-index', '100');
        
        var $popup = $("<div>").css('position', 'fixed');
        $popup.html($overlay.html()).attr('id', 'JSwagPopoverHTML');
        $div.append($popup);
        $("html").prepend($div);
        var h = $popup.css('height');
        var w = $popup.css('width');
        $("#JSwagPopoverHTML").css('left', '50%').css('left', '-=' + parseInt(w)/2 + 'px').css('top', '50%').css('top', '-=' + parseInt(h)/2 + 'px');
        $("#" + close).css('cursor', 'pointer').on('click', function(){
            $("#JSwagBackdropDimmer").remove();
        });
         
     }
};

$(document).ready(function(){
    Movies.load();
});
