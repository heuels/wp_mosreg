<?php
/**
 * Template for displaying all pages
 *
 * This is the template that displays all pages by default.
 * Please note that this is the WordPress construct of pages
 * and that other 'pages' on your WordPress site will use a
 * different template.
 *
 * @package WordPress
 * @subpackage Twenty_Ten
 * @since Twenty Ten 1.0
 */

get_header(); ?>

<section class="inner-grid ">
  <div class="wrapper">

    <aside class="sidebar">
    <?php get_sidebar(); ?>
    </aside><!-- /.sidebar -->
  
    <article class="content">
    <?php
    /*
    * Run the loop to output the post.
    * If you want to overload this in a child theme then include a file
    * called loop-single.php and that will be used instead.
    */
			get_template_part( 'loop', 'page' );
    ?>
    </article><!-- /.content -->
  </div>
</section>

<?php get_footer(); ?>
