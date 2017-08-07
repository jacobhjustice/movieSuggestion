<?php
    require_once("./simple_html_dom.php"); 
    $url = 'http://www.imdb.com/chart/top';
    $html = new simple_html_dom();
    $html->load_file($url); 
    $table = $html->find('.lister-list', 0);
    $movies = [];
    if(!empty($table)){
    foreach($table->find('tr') as $tableRow) {
        //Scrapes all basic info about each movie
        $titleWrap = $tableRow->find('.titleColumn', 0);
        $titleCol = $titleWrap -> plaintext;
        $cutIndex = strpos($titleCol, '.');
        $ranking = substr($titleCol, 0, $cutIndex);
        $titleCol = substr($titleCol, $cutIndex + 1);
        $cutIndex = strrpos($titleCol, '(');
        $title = substr($titleCol, 0, $cutIndex);
        $titleCol = substr($titleCol, $cutIndex);
        $year = substr($titleCol, 1, 4);
        $rating = $tableRow->find('.ratingColumn', 0)->find('strong', 0)->innertext;
        $desc =  $titleWrap -> find('a', 0) -> href;
        //Return Data
        $row['title'] = $title;
        $row['rating'] = $rating;
        $row['ranking'] = $ranking;
        $row['year'] = $year;
        $row['desc'] = $desc;
        array_push($movies, $row);
        
    }
    }
    echo json_encode($movies);
 ?>