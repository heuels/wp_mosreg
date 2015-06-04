<?php
/**
 * 
 * @author Егор Зайцев <zev@rctmo.ru>
 * @package wp_mosreg 
 * @version 0.0.1
 */
?>
 
<?php
  get_header();
?>

<section class="inner-grid ">
  <div class="wrapper">

    <aside class="sidebar">
      <?php
        get_sidebar();
      ?>
    </aside>
  
    <article class="content">
      <?php
        get_template_part( 'loop', 'page' );
      ?>
    </article>
    
  </div>
</section>

<?php get_footer(); ?>
