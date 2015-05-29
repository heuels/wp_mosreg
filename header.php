<?php
/**
 * Header 
 *
 * Displays all of the <head> section and everything up till <div id="main">.
 *
 * @package WordPress
 * @subpackage dpmo
 * @since ??
 */
?>
<!DOCTYPE html>
<html <?php language_attributes(); ?>>
<head>
<meta charset="<?php bloginfo( 'charset' ); ?>" />
<title><?php
	/*
	 * Print the <title> tag based on what is being viewed.
	 */
	global $page, $paged;

	wp_title( '|', true, 'right' );

	// Add the blog name.
	bloginfo( 'name' );

	// Add the blog description for the home/front page.
	$site_description = get_bloginfo( 'description', 'display' );
	if ( $site_description && ( is_home() || is_front_page() ) )
		echo " | $site_description";

	// Add a page number if necessary:
	if ( ( $paged >= 2 || $page >= 2 ) && ! is_404() )
		echo ' | ' . sprintf( __( 'Page %s', 'twentyten' ), max( $paged, $page ) );

	?></title>
<link rel="stylesheet" type="text/css" media="all" href="<?php bloginfo( 'stylesheet_url' ); ?>" />
<link rel="stylesheet" type="text/css" media="all" href="<?php echo get_template_directory_uri(); ?>/css/slick.css" />
<link rel="pingback" href="<?php bloginfo( 'pingback_url' ); ?>" />
<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/jquery-2.1.3.min.js"></script>
<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/plugins.js"></script>
<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/carousel.js"></script>
<script type="text/javascript" src="<?php echo get_template_directory_uri(); ?>/js/slick.js"></script>
  
<?php
	/*
	 * Always have wp_head() just before the closing </head>
	 * tag of your theme, or you will break many plugins, which
	 * generally use this hook to add elements to <head> such
	 * as styles, scripts, and meta tags.
	 */
	wp_head();
?>
</head>

<body <?php body_class(); ?>> <?// home page ?>

<div class="b-anavw">
  <ul class="b-anav">
    <?php wp_nav_menu( array( 'theme_location' => 'b-anav', 'items_wrap' => '%3$s', 'container' => '') ); ?>
  </ul>
</div>
<div class="site-title">
  <div class="wrapper st-wrapper">
    <a href="<?php echo home_url( '/' ); ?>"><?php bloginfo( 'name' ); ?></a>
    <a href="http://mosreg.ru" target="_blank" class="gov_logo"><img src="<?php echo get_template_directory_uri(); ?>/img/gov_logo.png"></a>
  </div>
</div>
<div class="header" style="top: 40px;">
  <header class="clearfix">
    <div class="wrapper">
      <div class="mainnav">
        <nav class="mainmenu">
          <?php wp_nav_menu( array( 'theme_location' => '', 'items_wrap' => '%3$s', 'container' => '', 'depth' => 1 ) ); ?>
        </nav>
      </div>
    </div>
  </header>
</div>

<div class="main" role="main">