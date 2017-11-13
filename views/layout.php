<!doctype html>
<html lang="en">
    <?php echo $header; ?>
<body>

<!--MAIN-->
<section id="main">
    <div class="wrapper">

        <?php echo $sidebar; ?>

        <div class="main-panel">
            <div class="content">
                <div class="container-fluid">
                    <?php echo $content;?>
                </div>
            </div>

            <?php echo $footer_nav;?>

        </div>
    </div>
</section>
<!--/MAIN-->

<?php  echo $footer; ?>