<?php
/**
 * Пользовательский тип записи - мероприятие.
 * 
 * @author Егор Зайцев <zev@rctmo.ru>
 * @package wp_mosreg 
 * @version 0.0.1
 */

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
 