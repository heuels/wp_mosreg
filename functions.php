<?php

/**
 * Включение поддержки титульных изображений к записям;
 */

add_theme_support( 'post-thumbnails' );

/**
 * Регистрируем два места размещения меню;
 */

add_action( 'init', 'my_custom_menus' );

function my_custom_menus() {
   register_nav_menus(
        array(
            'menubar' => __( 'Основная навигация' ),
            'b-anav' => __( 'Внешние ссылки' )
        )
    );
}

/**
 * Отключение поддержки комментирования страниц, записей и т.д.;
 */

add_action( 'init', 'remove_comment_support', 100 );
add_action( 'admin_menu', 'my_remove_admin_menus' );
add_action( 'wp_before_admin_bar_render', 'mytheme_admin_bar_render' );

// Отключение комментариев в боковом меню;
function my_remove_admin_menus() {
    remove_menu_page( 'edit-comments.php' );
}

// Отключение комментариев для страниц и записей;
function remove_comment_support() {
    remove_post_type_support( 'post', 'comments' );
    remove_post_type_support( 'page', 'comments' );
}

// Отключение комментариев в админ-панели;
function mytheme_admin_bar_render() {
    global $wp_admin_bar;
    $wp_admin_bar->remove_menu('comments');
}

/**
 * Добавление новых видов объектов;
 */

add_action( 'init', 'wp_mosreg_dpmo_object' ); // Устаревший ;
add_action( 'init', 'wp_mosreg_event' );

function wp_mosreg_dpmo_object() {
  register_post_type( 'dpmo_object',
    array(
      'labels' => array(
        'name' => __( 'Объекты' ),
        'singular_name' => __( 'Объект' )
      ),
      'public' => true,
      'has_archive' => true,
      'rewrite' => array('slug' => 'objects'),
      'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'revisions', 'custom-fields'),
    )
  );
}

// Регистрания нового вида объекта - Мероприятие;
function wp_mosreg_event() {
  register_post_type( 'wp_mosreg_event',
    array(
      'labels' => array(
        'name' => __( 'Мероприятия' ),
        'singular_name' => __( 'Мероприятие' )
      ),
      'public' => true,
      'has_archive' => true,
      'rewrite' => array('slug' => 'events'),
      'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'custom-fields'),
    )
  );
}

/**
 * 
 */

// Показывает последнюю прилепленную запись независимо от категории;
// TODO: Проверять статус (опубликовано/черновик);
function get_promoevent() {
  $promopost = get_option( 'sticky_posts' );
  rsort( $promopost );
  $promopost = array_slice( $promopost, 0, 1 );  
  $promopost_thumbnail = get_the_post_thumbnail($promopost[0], array( 540, 360), array('class' => 'pic'));
  $promopost_date = beautify_date(get_the_date("d.m.Y", $promopost[0]));
  $promopost_title = get_the_title($promopost[0]);
  $promopost_link = get_permalink($promopost[0]);
  echo '<a class="promoevent" href="'.$promopost_link.'">'.$promopost_thumbnail;
  echo '<div class="text"><div class="date">'.$promopost_date.'</div><div class="title">'.$promopost_title.'</div></div>';
  echo '</a>';
  
  /*
  
  $args = array(
    'posts_per_page' => 1,
    'post__in'  => get_option( 'sticky_posts' ),
    'ignore_sticky_posts' => 1
  );
  $query = new WP_Query( $args );
  
  */
}

// Показывает пять последних прилепленных записей независимо от категории;
function get_featured() {
  $featuredposts = get_option( 'sticky_posts' );
  rsort( $featuredposts );
  $featuredposts = array_slice( $featuredposts, 0, 6 );  
  $i = 0;
  foreach($featuredposts as $featuredpost) {
    // Первая запись пропускается, т.к. она уже отображается как главная;
    if ($i !== 0) {
      $featuredpost_title = get_the_title($featuredpost);
      $featuredpost_date = beautify_date(get_the_date("d.m.Y", $featuredpost));
      $featuredpost_link = get_permalink($featuredpost);
      echo '<li>';
      echo '<a href="'.$featuredpost_link.'"><div class="date">'.$featuredpost_date.'</div><div class="title">'.$featuredpost_title.'</div></a>';
      echo '</li>';
    }
    $i++;
  }
}

function get_sticky_posts_count() {
 global $wpdb;
 $sticky_posts = array_map( 'absint', (array) get_option('sticky_posts') );
 return count($sticky_posts) > 0 ? $wpdb->get_var( $wpdb->prepare( "SELECT COUNT( 1 ) FROM $wpdb->posts WHERE post_type = 'post' AND post_status = 'publish' AND ID IN (".implode(',', $sticky_posts).")" ) ) : 0;
}

// Показывает последние пять записей из заданной категории с заданным отступом;
function get_posts_category($id, $offset) {
  if (!isset($offset)) $offset = 0;
  $posts = get_posts(array(
  'category' => $id,
  'posts_per_page' => 5,
  'offset' => $offset,
  'post_status' => 'publish'
  ));
  foreach($posts as $post) {
    $post_date = beautify_date($post->post_date);
    echo '<li>';
    echo '<a href="'.$post->guid.'"><div class="date">'.$post->post_date.'</div><div class="title">'.$post->post_title.'</div></a>';
    echo'</li>';
  }
}

// Показывает торги;
function get_trades() {
  $posts = get_posts(array(
  'category' => 11,
  'posts_per_page' => 100,
  'post_status' => 'publish'
  ));
  foreach($posts as $post) {
    $post_date = beautify_date($post->post_date);
    $post_status = wp_mosreg_get_auction_status(get_post_meta( $post->ID, 'Дата начала приема заявок', TRUE ), get_post_meta( $post->ID, 'Дата окончания приема заявок', TRUE ), get_post_meta( $post->ID, 'Дата аукциона', TRUE ));
    $trade_type = get_post_meta( $post->ID, 'Предмет аукциона', TRUE );
    if ($post_status == 'oops') continue;
    if ($post_status == 'Завершен') continue;
    // Ссылка на страницу с информацией о торгах или на "Каталог объектов" (если страница пустая). Когда будет интеграция с ЕПТ, вставлять ссылку на ЕПТ.
    echo ($post->post_content == '') ? '<a href="http://rctmo.ru/?page_id=542" class="program">' : '<a href="'.get_permalink($post->ID).'" class="program">';
    echo get_the_post_thumbnail($post->ID, array( 225, 225), array('class' => 'pic'));
    echo '<div class="text"><h4>'.$post->post_title.'</h4><p>'.$post->post_excerpt.'</p>';
    if ($post_status) echo '<span class="tType">'.$post_status.'</span> ';
    if ($trade_type) echo '<span class="tType">'.$trade_type.'</span>';
    echo '</div></a>';
  }
}

// Определяет статус торгов;
function wp_mosreg_get_auction_status($start, $end, $auction) {
  $today = strtotime('now');
  if ($today < strtotime($start)) { 
    return 'oops'; // Торги еще не опубликованы?;
  } elseif ($today >= strtotime($start) && $today < strtotime($end)) {
    return 'Прием заявок';
  } elseif ($today >= strtotime($end) && $today < strtotime($auction)) {
    return 'Рассмотрение заявок';
  } elseif ($today >= strtotime('+1 day', strtotime($auction))) {
    return 'Завершен';
  } else {
    return 'Аукцион';
  }
}

// Берет какашечную дату и превращает в красивую;
function beautify_date($date) {
    $dates = explode('.', $date);
    $months = array('дата не указана', 'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря');
    return $dates[0].' '.$months[(int)$dates[1]].' '.$dates[2].' ';  
}

// Неработающая реализация красивого выпадающего многоуровневого меню;
class Walker_dpmo extends Walker {
    var $db_fields = array( 'parent' => 'parent_id', 'id' => 'object_id' );
    
    function start_lvl(&$output, $depth=0, $args=array()) {
      $output .= "\n<ul>\n";
    }
  
    function end_lvl(&$output, $depth=0, $args=array()) {
      $output .= "</ul>\n";
    }
    
    function start_el(&$output, $depth=0, $args=array()) {
      $output .= "<li><span></span>".esc_attr($item->label);
    }
    
    function end_el(&$output, $depth=0, $args=array()) {
      $output .= "</li>\n";
    }
    
}

/**
 * Генератор условной боковой панели (tm);
 */

// Показывает различное содержимое боковой панели для различных типов страниц;
function dpmo_conditional_sidebar() {
  if (is_single()) {
    // Если запись;
    // Первый пункт меню - Новости, под ним перечисляются категории новостей (Официальная хроника, Новости Подмосковья);
    echo '<ul><li class="current"><a href=#>Новости</a><ul class="side-menu_inner">';
    echo wp_list_categories('orderby=name&show_count=0&exclude=1,10&title_li=');
    echo '</ul></li><li><a href=#>Фото</a></li><li><a href=#>Видео</a></li></ul>';
  } elseif (is_page()) {
    // Если страница;
    // Уточняем, родительская страница или дочерняя, чтобы по-разному формировать боковую панель;
    global $post;

    if ($post->post_parent > 0) {
      // Если дочерняя страница;
      echo '<ul>';
      echo '<li><a href="'.get_permalink($post->post_parent).'">'.get_the_title($post->post_parent).'</a></li>'; 
      $children = get_children(array('post_parent' => $post->post_parent, 'post_type' => 'page'));
      foreach ($children as $child) {
        if ($post->ID == $child->ID) {
          echo '<li class="current"><a href="'.get_permalink($child->ID).'">'.$child->post_title.'</a></li>';
        } else {
          echo '<li><a href="'.get_permalink($child->ID).'">'.$child->post_title.'</a></li>';          
        } 
      }
      echo '</ul>';
    } else {
      echo '<ul>';
      // Если родительская страница;
      echo '<li class="current"><a href="'.get_permalink($post->ID).'">'.get_the_title($post->ID).'</a></li>'; 
      $children = get_children(array('post_parent' => $post->ID, 'post_type' => 'page'));
      foreach ($children as $child) {
        echo '<li><a href="'.get_permalink($child->ID).'">'.$child->post_title.'</a></li>';
      } 
      echo '</ul>';
    }
  }

  // Надо разобраться;
  if ($post->post_parent)	{
		$ancestors=get_post_ancestors($post->ID);
		$root = count($ancestors)-1;
		$parent = $ancestors[$root];
	} else {
		$parent = $post->ID;
	}
}

/**
 * Добавляет активному пункту меню класс "current";
 */
 
add_filter('nav_menu_css_class' , 'special_nav_class' , 10 , 2);

function special_nav_class($classes, $item){
     if( in_array('current-menu-item', $classes) ){
             $classes[] = 'current ';
     }
     return $classes;
}
	
include 'wp_tender.php';