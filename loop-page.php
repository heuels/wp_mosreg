<?php
/**
 * Стандартный шаблон страницы.
 *
 * Документация по методам:
 * http://codex.wordpress.org/The_Loop
 * http://codex.wordpress.org/Template_Tags
 *
 * Может быть переопределен в файле loop-page.php.
 *
 * @author Егор Зайцев
 * @package wp_mosreg
 * @version 0.0.1
 */
?>

<?php if ( have_posts() ) while ( have_posts() ) : the_post(); ?>

				<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
					<?php if ( is_front_page() ) { ?>
						<h2 class="entry-title"><?php the_title(); ?></h2>
					<?php } else { ?>
						<h1 class="entry-title"><?php the_title(); ?></h1>
					<?php } ?>

					<div class="entry-content">
						<?php the_content(); ?>
						<?php
              // TODO: Let go of twentyten.
              wp_link_pages( array( 'before' => '<div class="page-link">' . __( 'Pages:', 'twentyten' ), 'after' => '</div>' ) ); 
            ?>
						<?php edit_post_link( __( 'Edit', 'twentyten' ), '<span class="edit-link">', '</span>' ); ?>
					</div><!-- .entry-content -->
				</div><!-- #post-## -->

<?php endwhile; // end of the loop. ?>
