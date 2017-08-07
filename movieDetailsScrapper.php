<?php
    require_once("./simple_html_dom.php"); 
    $descLink = $_GET['desc'];
    $url = 'http://www.imdb.com' . $descLink;
    $html = new simple_html_dom();
    $html->load_file($url); 
    $desc = $html-> find('.summary_text', 0)->plaintext;
    echo $desc
?>