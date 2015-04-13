<?php
/**
 * Template for displaying the footer
 *
 * Contains the closing of the id=main div and all content
 * after. Calls sidebar-footer.php for bottom widgets.
 *
 * @package WordPress
 * @subpackage dpmo
 * @since 
 */
?>
</div><!-- #main -->

<div class="footer" role="contentinfo">
<div class="greybg">
  <div class="wrapper">
    <ul class="icolinkslist">
            <li class="block">
        <a href="#" target="_blank">
        <img src="<?php echo get_template_directory_uri(); ?>/img/np_ico.png">
        Единый портал торгов<br>Московской области
        </a>
      </li>
      <li class="block">
        <a href="#" target="_blank">
        <img src="<?php echo get_template_directory_uri(); ?>/img/np_ico.png">
        Портал ЕАСУЗ<br>Московской области
        </a>
      </li>
      <li class="block">
        <a href="#" target="_blank">
        <img src="<?php echo get_template_directory_uri(); ?>/img/np_ico.png">
        Портал ЕАСУЗ:<br>подсистема АРИП
        </a>
      </li>
      <li class="block">
        <a href="http://invest.mosreg.ru/" target="_blank">
        <img src="<?php echo get_template_directory_uri(); ?>/img/np_ico.png">
        Инвестиционный портал
        </a>
      </li>
    </ul>
  </div><!-- /.wrapper -->
  </div>
</div><!-- #wrapper -->

<?php
	/*
	 * Always have wp_footer() just before the closing </body>
	 * tag of your theme, or you will break many plugins, which
	 * generally use this hook to reference JavaScript files.
	 */

	wp_footer();
?>
</body>
</html>
