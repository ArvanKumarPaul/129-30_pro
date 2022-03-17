song = "";
leftwristX = 0;
leftwristY = 0;
rightwristX = 0;
leftwristY = 0;

function setup() {

  canvas = createCanvas(600,500);
  canvas.center();

  video = createCapture(VIDEO);
  video.hide();

  poseNet = ml5.poseNet(video , modeLoaded);
  poseNet.on('pose' , gotPoses);

}

function modelLoaded() {

  console.log("poseNet is initialised!");

}

function gotPoses(results) {

  if(results.length>0) {

    console.log(results);
    leftwristX = results[0].pose.leftWrist.x;
    leftwristY = results[0].pose.leftWrist.y;
    rightwristX = results[0].pose.rightWrist.x;
    rightwristY = results[0].pose.rightWrist.y;
    score_left_wrist = results[0].pose.keypoints[9].score;
    score_right_wrist = results[0].pose.keypoints[10].score;
    console.log("Score left wrist = "+score_left_wrist);

    console.log("right wrist X : "+rightwristX+" right wrist Y : "+rightwristY+"left wrist X : "+leftwristX+" left wrist Y : "+leftwristY)

  }

}

function preload() {

  song = loadSound("Despacito_320(PaglaSongs).mp3");

}

function draw() {

  image(video,0,0,600,500);

  if(score_left_wrist>0.2) {

  fill("#ff0000");
  stroke("#ff0000");
  circle(leftwristX,leftwristY,20);
  
  InnumberleftwristY = Number(leftwristY);
  remove_decimals = floor(InnumberleftwristY);
  volume = remove_decimals/500;
  document.getElementById("volume_h3").innerHTML = "Volume = "+volume;
  song.setVolume(volume);

  }

  if(score_right_wrist>0.2) {

    fill("#ff0000");
    stroke("#ff0000");
    circle(rightwristX,rightwristY,20);

    if(rightwristY>0 && rightwristY<=100) {

      document.getElementById("speed_H3").innerHTML = "Speed = 0.5X";
      song.rate(0.5);

    }

    else if(rightwristY>100 && rightwristY<=200) {

      document.getElementById("speed_H3").innerHTML = "Speed = 1.0X";
      song.rate(1);

    }

    else if(rightwristY>200 && rightwristY<=300) {

      document.getElementById("speed_H3").innerHTML = "Speed = 1.5X";
      song.rate(1.5);

    }

    else if(rightwristY>300 && rightwristY<=400) {

      document.getElementById("speed_H3").innerHTML = "Speed = 2.0X";
      song.rate(2);

    }

    else if(rightwristY>400 && rightwristY<=500) {

      document.getElementById("speed_H3").innerHTML = "Speed = 2.5X";
      song.rate(2.5);

    }


  }

}

score_left_wrist = 0;
score_right_wrist = 0;

function play() {

  song.play();
  song.setVolume(1);
  song.rate(1);

}

