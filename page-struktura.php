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
    <h1 class="pagetitle">Структура</h1>
    <h2 class="section-title">Директор</h2>
    <div class="person">
      <a href="http://rctmo.ru/?p=840">
        <img class="person_pic" style="width: 109px;" src="http://rctmo.ru/wp-content/uploads/2015/01/%D0%9C.%D0%A4.-%D0%A1%D0%B2%D0%B5%D1%82%D0%B8%D0%BA.jpg" alt="" />
        <div class="person_txt">
          <div class="person_name">Максим Фёдорович Светик</div>
          <div class="person_place">Директор Государственного казённого учреждения<br>Московской области «Региональный центр торгов»</div>
        </div>
      </a>
    </div>
    <h2 class="section-title">Первый заместитель директора</h2>
    <div class="person">
      <a href="http://rctmo.ru/struktura/sarkisyan">
        <img class="person_pic" style="width: 109px;"src="http://rctmo.ru/wp-content/uploads/2015/02/DSC_9183-678x1024-198x300.jpg" alt="" />
        <div class="person_txt">
        <div class="person_name">Мартирос Сосикович Саркисян</div>
        <div class="person_place">Первый заместитель директора Государственного казённого учреждения<br>Московской области «Региональный центр торгов»</div>
        </div>
      </a>
    </div>
    <h2 class="section-title">Заместители директора</h2>
    <div class="person">
      <a href="">
        <img class="person_pic" style="width: 109px;"src="http://rctmo.ru/wp-content/uploads/2015/01/DSC_9254-198x300.jpg" alt="" />
        <div class="person_txt">
        <div class="person_name">Алексей Валерьевич Кучумов</div>
        <div class="person_place">Заместитель директора Государственного казённого учреждения<br>Московской области «Региональный центр торгов»</div>
        </div>
      </a>
    </div>
    <div class="person">
      <a href="">
        <img class="person_pic" style="width: 109px;"src="http://rctmo.ru/wp-content/uploads/2015/05/Олейник.jpg" alt="" />
        <div class="person_txt">
        <div class="person_name">Людмила Васильевна Олейник</div>
        <div class="person_place">И.о. заместителя директора Государственного казённого учреждения<br>Московской области «Региональный центр торгов»</div>
        </div>
      </a>
    </div>
    </article><!-- /.content -->
  </div>
</section>

<?php get_footer(); ?>
