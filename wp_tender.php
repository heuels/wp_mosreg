<?php

add_action('init', 'tender_register');
 
function tender_register() {
 
	$labels = array(
		'name' => _x('Каталог объектов', 'post type general name'),
		'singular_name' => _x('Торги', 'post type singular name'),
		'add_new' => _x('Добавить объект', 'tender item'),
		'add_new_item' => __('Добавить новый объект торгов'),
		'edit_item' => __('Изменить объект'),
		'new_item' => __('Новый объект торгов'),
		'view_item' => __('Открыть объект торгов'),
		'search_items' => __('Поиск в каталоге объектов'),
		'not_found' =>  __('Ничего не найдено'),
		'not_found_in_trash' => __('В корзине ничего не найдено'),
		'parent_item_colon' => ''
	);
 
	$args = array(
		'labels' => $labels,
		'public' => true,
		'publicly_queryable' => true,
		'show_ui' => true,
		'query_var' => true,
		'menu_icon' => get_stylesheet_directory_uri() . '/article16.png',
		'rewrite' => true,
		'capability_type' => 'post',
		'hierarchical' => false,
		'menu_position' => null,
		'supports' => array('title','editor','thumbnail')
	  ); 
 
	register_post_type( 'wp_tender' , $args );
}

register_taxonomy("Вид торгов", array("wp_tender"), array("hierarchical" => true, "label" => "Вид торгов", "singular_label" => "Вид торгов", "rewrite" => true));

add_action("admin_init", "admin_init");
 
function admin_init(){
  add_meta_box("tender_campain-meta", "Заявочная кампания", "tender_campain", "wp_tender", "side", "low");
  add_meta_box("tender_info-meta", "Дополнительная информация", "tender_info", "wp_tender", "normal", "low");
}
 
function tender_campain(){
  global $post;
  $custom = get_post_custom($post->ID);
  $apply_start = $custom["tender_begin"][0];
  $apply_finish = $custom["tender_finish"][0];
  $auction_date = $custom["tender_date"][0];
  
  ?>
  <p><label>Дата начала приема заявок:</label>
  <input type="date" name="tender_begin" value="<?php echo $tender_begin; ?>" /></p>
  <p><label>Дата окончания приема заявок:</label>
  <input type="date" name="tender_finish" value="<?php echo $tender_finish; ?>" /></p>
  <p><label>Дата аукциона:</label>
  <input type="date" name="tender_date" value="<?php echo $tender_date; ?>" /></p>
  <?php
}
 
function tender_info() {
  global $post;
  $custom = get_post_custom($post->ID);  
  $tender_address = $custom["tender_address"][0];
  $tender_longlat = $custom["tender_longlat"][0];
  $tender_center = $custom["tender_center"][0];
  $tender_lgimg = $custom["tender_lgimg"][0];
  $tender_smimg = $custom["tender_smimg"][0];
  
  if ($tender_address != '') {
    if ($tender_center == '') {
      $tender_place = preg_replace('/\s+/', '', $tender_address);
    } else {
      $tender_place = preg_replace('/\s+/', '', $tender_center);
    }
    $tender_lgimg = "https://maps.googleapis.com/maps/api/staticmap?center=".$tender_place."&zoom=12&size=550x300&scale=2&style=feature:landscape.man_made|element:geometry|color:0xf7f1df&style=feature:landscape.natural|element:geometry|color:0xd0e3b4&style=feature:landscape.natural.terrain|element:geometry|visibility:off&style=feature:poi|element:labels|visibility:off&style=feature:poi.business|element:all|visibility:off&style=feature:poi.medical|element:geometry|color:0xfbd3da&style=feature:poi.park|element:geometry|color:0xbde6ab&style=feature:road|element:geometry.stroke|visibility:off&style=feature:road|element:labels|visibility:off&style=feature:road.highway|element:geometry.fill|color:0xffe15f&style=feature:road.highway|element:geometry.stroke|color:0xefd151&style=feature:road.arterial|element:geometry.fill|color:0xffffff&style=feature:road.local|element:geometry.fill|color:black&style=feature:transit.station.airport|element:geometry.fill|color:0xcfb2db&style=feature:water|element:geometry|color:0xa2daf2";
    $tender_smimg = "https://maps.googleapis.com/maps/api/staticmap?center=".$tender_place."&zoom=12&size=225x150&scale=2&style=feature:landscape.man_made|element:geometry|color:0xf7f1df&style=feature:landscape.natural|element:geometry|color:0xd0e3b4&style=feature:landscape.natural.terrain|element:geometry|visibility:off&style=feature:poi|element:labels|visibility:off&style=feature:poi.business|element:all|visibility:off&style=feature:poi.medical|element:geometry|color:0xfbd3da&style=feature:poi.park|element:geometry|color:0xbde6ab&style=feature:road|element:geometry.stroke|visibility:off&style=feature:road|element:labels|visibility:off&style=feature:road.highway|element:geometry.fill|color:0xffe15f&style=feature:road.highway|element:geometry.stroke|color:0xefd151&style=feature:road.arterial|element:geometry.fill|color:0xffffff&style=feature:road.local|element:geometry.fill|color:black&style=feature:transit.station.airport|element:geometry.fill|color:0xcfb2db&style=feature:water|element:geometry|color:0xa2daf2";
  }
  
  ?>
  <p><label>Адресные ориентиры объекта:</label><br />
  <textarea cols="100" name="tender_address" placeholder="Московская область, Шаховской район"><?php echo $tender_address; ?></textarea></p>
  <!--<p><label>Географические координаты точек, которые необходимо отметить на карте (необязательно):</label><br />
  <textarea cols="100" name="tender_longlat" placeholder="55.867897, 37.402898; 55.816020, 37.381161"><?php echo $tender_longlat; ?></textarea></p>-->
  <p><label>Центрировать карту относительно:</label><br />
  <textarea cols="100" rows="1" name="tender_center" placeholder="Шаховская"><?php echo $tender_center; ?></textarea></p>
  <p><label>Ссылка на скриншот карты для новости:</label><br />
  <textarea cols="100" rows="5" name="tender_lgimg" placeholder="Ссылка появится после добавления адресных ориентиров и сохранения объекта" onclick="this.focus();this.select()" readonly="readonly"><?php echo $tender_lgimg; ?></textarea></p>
  <p><label>Ссылка на скриншот карты для каталога объектов:</label><br />
  <textarea cols="100" rows="5" name="tender_smimg" placeholder="Ссылка появится после добавления адресных ориентиров и сохранения объекта" onclick="this.focus();this.select()" readonly="readonly"><?php echo $tender_smimg; ?></textarea></p>
  <?php
}

add_action('save_post', 'save_details');

function save_details(){
  global $post;
 
  update_post_meta($post->ID, "tender_begin", $_POST["tender_begin"]);
  update_post_meta($post->ID, "tender_finish", $_POST["tender_finish"]);
  update_post_meta($post->ID, "tender_date", $_POST["tender_date"]);
  update_post_meta($post->ID, "tender_address", $_POST["tender_address"]);
  update_post_meta($post->ID, "tender_longlat", $_POST["tender_longlat"]);
  update_post_meta($post->ID, "tender_center", $_POST["tender_center"]);
  update_post_meta($post->ID, "tender_lgimg", $_POST["tender_lgimg"]);
  update_post_meta($post->ID, "tender_smimg", $_POST["tender_smimg"]);
}
?>