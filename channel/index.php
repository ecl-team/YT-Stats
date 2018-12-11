<html>
	<head>
        <title>Channel Statistics</title>
		<script src="../script.js"></script>
	</head>
	<body>
        <?php
        if(isset($_GET["id"])) {
            $channel = htmlspecialchars($_GET["id"]);
            $channel = preg_replace("/[^A-Za-z0-9-_]/", "", $channel);
            echo "<script>window.onload=()=>{var a=new Channel('".$channel."');document.getElementById('channel-name').href='https://youtube.com/channel/'+a.id;document.getElementById('channel-name').innerHTML=a.name();a.on('subs',subs=>document.getElementById('channel-subs').innerHTML=subs.toLocaleString('en')+' subs');a.on('views',views=>document.getElementById('channel-views').innerHTML=views.toLocaleString('en')+' total views');a.on('uploads',uploads=>document.getElementById('channel-uploads').innerHTML=uploads.toLocaleString('en')+' uploads');}</script>";
            echo "<div id='channel'>";
            echo "<a id='channel-name'></a>";
            echo "<p id='channel-subs'></p>";
            echo "<p id='channel-views'></p>";
            echo "<p id='channel-uploads'></p>";
            echo "</div>";
        } else {
            echo "error";
        }
        ?>
	</body>
</html>