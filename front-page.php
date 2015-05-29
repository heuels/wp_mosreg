<?php
/*
Template Name: Frontpage Template
*/
?>
<?php get_header(); ?>

<section class="subheader">
  <div class="wrapper">
    <div class="subheader_l">
      <?php echo get_promoevent(); ?>
    </div><!-- /.subheader_1 -->
    
    <div class="subheader_r">
      <ul class="eventlist">
        <?php echo get_featured(); ?>
      </ul>
    </div><!-- /.subheader_r -->
  </div>
</section>

<section>
    <div class="wrapper">
      <h2><a href="/?page_id=801">Каталог объектов →</a></h2>
      <div class="programs">
        <div class="frame">
          <?php echo get_trades(); ?>                                                           
        </div><!-- /.frame -->
        </div><!-- /.programs -->
    </div><!-- /.wrapper -->
</section>

<section class="news-cols">
   <div class="wrapper">
     <div class="col">
       <h3 class="news-title"><a href="<?php get_category_link(6); ?>"><?php echo get_cat_name(6);?></a></h3>
         <ul class="eventlist">
           <?php echo get_posts_category(6, 0); ?>
            </ul><!-- /.eventlist -->
</div><!-- /.col --><div class="col">
    <h3 class="news-title" style="background: none;"></h3>
    <ul class="eventlist">
                <?php echo get_posts_category(6, 5); ?>
            </ul><!-- /.eventlist -->
</div><!-- /.col --><div class="col">
    <h3 class="news-title"><a href="<?php get_category_link(8); ?>"><?php echo get_cat_name(8);?></a></h3>
    <ul class="eventlist">
                <?php echo get_posts_category(8); ?>
            </ul><!-- /.eventlist -->
</div><!-- /.col -->    </div>
</section>

<?php get_footer(); ?>
