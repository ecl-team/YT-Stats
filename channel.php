<?PHP 
if(isset($_GET["id"])) {
    $channel = htmlspecialchars($_GET["id"]);
    $channel = preg_replace("/[^A-Za-z0-9-_]/", "", $channel);
    echo str_replace("<script>alert('php error')</script>","<script>window.onload=()=>{var a=new Channel('".$channel."');element('channelName').innerHTML=a.name();a.on('subs',(subs)=>{element('channelSubs').innerHTML=subs.toLocaleString('en')+' subs'})}</script>",file_get_contents("live.html"));
} else {
    echo "fuck u";
}
?>