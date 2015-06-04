<?php
/**
 * Шаблон для вывода одной записи.
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

				<div id="nav-above" class="navigation">
					<div class="nav-previous"><?php //previous_post_link( '%link', '<span class="meta-nav">' . _x( '&larr;', 'Previous post link', 'twentyten' ) . '</span> %title' ); ?></div>
					<div class="nav-next"><?php //next_post_link( '%link', '%title <span class="meta-nav">' . _x( '&rarr;', 'Next post link', 'twentyten' ) . '</span>' ); ?></div>
				</div><!-- #nav-above -->

				<div id="post-<?php the_ID(); ?>" <?php post_class(); ?>>
          <h1 class="pagetitle entry-title"><?php the_title(); ?></h1>

          <div class="news-one">
            <div class="date"><?php the_date(); ?></div>
            <div class="text">
              <p></p>
              <div class="photo-one  ">
                <?php the_post_thumbnail(); ?>
              </div><!-- /.photo-one -->
              <?php the_content(); ?>
              </div>
        
					<div class="entry-content">
						
						<?php wp_link_pages( array( 'before' => '<div class="page-link">' . __( 'Pages:', 'twentyten' ), 'after' => '</div>' ) ); ?>
					</div><!-- .entry-content -->

					<div class="entry-utility">
						<?php edit_post_link( __( 'Edit', 'twentyten' ), '<span class="edit-link">', '</span>' ); ?>
					</div><!-- .entry-utility -->
				</div><!-- #post-## -->

				<div id="nav-below" class="navigation">
					<div class="nav-previous"><?php previous_post_link( '%link', '<span class="meta-nav">' . _x( '&larr;', 'Previous post link', 'twentyten' ) . '</span> %title' ); ?></div>
					<div class="nav-next"><?php next_post_link( '%link', '%title <span class="meta-nav">' . _x( '&rarr;', 'Next post link', 'twentyten' ) . '</span>' ); ?></div>
				</div><!-- #nav-below -->

<?php endwhile; // end of the loop. ?>
