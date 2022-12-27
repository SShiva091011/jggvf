song1 = "";
song2 = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;
function preload()
{
    song = loadSound("music.mp3");
    song = loadSound("music2.mp3");
}


function setup()
{
    canvas = createCanvas(600, 400);
    canvas.position(250, 200);

    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function gotPoses(results)
{
    if(results.length > 0)
    {
        console.log(results);
        scoreRightWrist = results[0].pose.keypoints[10].score;

        scoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("scoreRightWrist = "+scoreRightWrist+"scoreLeftWrist = "+ scoreLeftWrist);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("leftWristX = "+ leftWristX +"leftWristY = "+ leftWristY);
        
        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("rightWristX = "+ leftWristX +"rightWristY = "+ leftWristY);
    }
}


function modelLoaded()
{
    console.log('PoseNet Is Initializeed');
}

function draw()
{
    image(video, 0, 0, 600, 400);

    fill("#ffffff");
    stroke("#ffffff");

    if(scoreRightWrist > 0.2)
    {
        circle(RightWristX, RightWristY, 20);

        song2.stop();

        if(song1_status == false)
        {
            song1.play();
            document.getElementById("song").innerHTML = "Playing = Harry Potter";
        }
    }
    if(scoreLefttWrist > 0.2)
    {
        circle(leftWristX, leftWristY, 20);

        song1.stop();
        
        if(song1_status == false)
        {
            song2.play();
            document.getElementById("song").innerHTML = "Playing = Peter Pan";
        }

    }
}

function play()
{
    song.play();
    song.setVolume(1);
    song.rate(1);
}

