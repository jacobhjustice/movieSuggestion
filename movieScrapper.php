<?php
    require_once("./simple_html_dom.php"); 
    $url = 'http://www.imdb.com/chart/top';
    $html = new simple_html_dom();
    $html->load_file($url); 
    $table = $html->find('.lister-list', 0);
    $movies = [];
    if(!empty($table)){
    foreach($table->find('tr') as $tableRow) {
        $titleCol = $tableRow->find('.titleColumn', 0) -> plaintext;
        $cutIndex = strpos($titleCol, '.');
        $ranking = substr($titleCol, 0, $cutIndex);
        $titleCol = substr($titleCol, $cutIndex + 1);
        $cutIndex = strrpos($titleCol, '(');
        $title = substr($titleCol, 0, $cutIndex);
        $titleCol = substr($titleCol, $cutIndex);
        $year = substr($titleCol, 1, 4);
        $rating = $tableRow->find('.ratingColumn', 0)->find('strong', 0)->innertext;
        $row['title'] = $title;
        $row['rating'] = $rating;
        $row['ranking'] = $ranking;
        $row['year'] = $year;
        array_push($movies, $row);
    }
    }
    echo json_encode($movies);
 ?>