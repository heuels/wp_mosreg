<?php
update_option('siteurl','http://192.168.25.233/wordpress/public_html');
update_option('home','http://192.168.25.233/wordpress/public_html');

add_theme_support( 'post-thumbnails' );

// Registering menus
add_action( 'init', 'my_custom_menus' );
function my_custom_menus() {
   register_nav_menus(
        array(
            'menubar' => __( 'Основная навигация' ),
            'b-anav' => __( 'Внешние ссылки' )
        )
    );
}

add_action( 'init', 'create_posttype' );
function create_posttype() {
  register_post_type( 'dpmo_object',
    array(
      'labels' => array(
        'name' => __( 'Объекты' ),
        'singular_name' => __( 'Объект' )
      ),
      'public' => true,
      'has_archive' => true,
      'rewrite' => array('slug' => 'objects'),
      'supports' => array('title', 'editor', 'thumbnail', 'excerpt', 'revisions'),
    )
  );
}

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
}

function get_featured() {
  $featuredposts = get_option( 'sticky_posts' );
  rsort( $featuredposts );
  $featuredposts = array_slice( $featuredposts, 0, 6 );  
  $i = 0;
  foreach($featuredposts as $featuredpost) {
    // Skipping the first post, since it's already featured as a Promopost.
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

function get_posts_category($id) {
  $posts = get_posts(array(
  'category' => $id,
  'posts_per_page' => 4
  ));
  foreach($posts as $post) {
    $post_date = beautify_date($post->post_date);
    echo '<li>';
    echo '<a href="'.$post->guid.'"><div class="date">'.$post->post_date.'</div><div class="title">'.$post->post_title.'</div></a>';
    echo'</li>';
  }
}

function get_trades() {
  $posts = get_posts(array(
  'category' => 10,
  'posts_per_page' => 4
  ));
  foreach($posts as $post) {
    $post_date = beautify_date($post->post_date);
    echo '<a href="'.get_permalink($post->ID).'" class="program active">';
    echo get_the_post_thumbnail($post->ID, array( 225, 225), array('class' => 'pic'));
    echo '<div class="text"><h4>'.$post->post_title.'</h4><p>'.$post->post_excerpt.'</p></div>';
    echo '</a>';
  }
}

function beautify_date($date) {
    // This function takes a date as crap and turns it into a beauty;
    $dates = explode('.', $date);
    $months = array('дата не указана', 'января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря');
    return $dates[0].' '.$months[(int)$dates[1]].' '.$dates[2].' ';  
}

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

function dpmo_conditional_sidebar() {
  if (is_single()) {
    // this is a post;
    echo '<ul><li class="current"><a href=#>Новости</a><ul class="side-menu_inner">';
    echo wp_list_categories('orderby=name&show_count=0&exclude=1,10&title_li=');
    echo '</ul></li><li><a href=#>Фото</a></li><li><a href=#>Видео</a></li></ul>';
  } elseif (is_page()) {
    //This is a page;
    global $post;

    if ($post->post_parent > 0) {
      // This is a child page;
      echo '<ul>';
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
      // This is a parent page;
      $children = get_children(array('post_parent' => $post->ID, 'post_type' => 'page'));
      foreach ($children as $child) {
        echo '<li><a href="'.get_permalink($child->ID).'">'.$child->post_title.'</a></li>';
      } 
      echo '</ul>';
    }
  }

  if ($post->post_parent)	{
		$ancestors=get_post_ancestors($post->ID);
		$root = count($ancestors)-1;
		$parent = $ancestors[$root];
	} else {
		$parent = $post->ID;
	}
}

add_filter('nav_menu_css_class' , 'special_nav_class' , 10 , 2);
function special_nav_class($classes, $item){
     if( in_array('current-menu-item', $classes) ){
             $classes[] = 'current ';
     }
     return $classes;
}
	