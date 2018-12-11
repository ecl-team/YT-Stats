<html>
	<head>
        <title>Video Statistics</title>
		<script src="../script.js"></script>
	</head>
	<body>
        <?php
        if(isset($_GET["id"])) {
            $video = htmlspecialchars($_GET["id"]);
            $video = preg_replace("/[^A-Za-z0-9-_]/", "", $video);
            echo "<script>window.onload=()=>{var a=new Video('".$video."');document.getElementById('video-name').href='https://youtube.com/watch?v='+a.id;document.getElementById('video-name').innerHTML=a.name();a.on('views',views=>document.getElementById('video-views').innerHTML=views.toLocaleString('en')+' views');a.on('likes',likes=>document.getElementById('video-likes').innerHTML=likes.toLocaleString('en')+' likes');a.on('dislikes',dislikes=>document.getElementById('video-dislikes').innerHTML=dislikes.toLocaleString('en')+' dislikes');a.on('comments',comments=>document.getElementById('video-comments').innerHTML=comments.toLocaleString('en')+' comments')}</script>";
            echo "<div id='video'>";
            echo "<a id='video-name'></a>";
            echo "<p id='video-views'></p>";
            echo "<p id='video-likes'></p>";
            echo "<p id='video-dislikes'></p>";
            echo "<p id='video-comments'></p>";
            echo "</div>";
        } else {
            echo "error";
        }
        ?>
    </body>
</html>