<?php
if (isset($_GET["channel"])) {
	echo 'channel';
} else if (isset($_GET["video"])) {
	echo 'video';
}
?>