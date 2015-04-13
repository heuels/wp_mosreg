<?php
/**
 * Main template file
 *
 * This is the most generic template file in a WordPress theme
 * and one of the two required files for a theme (the other being style.css).
 * It is used to display a page when nothing more specific matches a query.
 * E.g., it puts together the home page when no home.php file exists.
 * Learn more: http://codex.wordpress.org/Template_Hierarchy
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
