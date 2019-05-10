// random number generator in order to call upon a random example image when clicking 'animation' 'ilustration' 'design' //

var myArray = ["joker1.png", "illustrationexample.jpg", "mcreeGif.gif", "mercyGif.gif", "pharaGif.gif", "ZiShop.png"];

function randomNumber () {
  var randNum = Math.floor(Math.random()*(10)+1);
  return randNum;
}

function logNumber () {
  var randNum = randomNumber();
  if(randNum == 1, 2, 3, 4, 5, 6, 7, 8, 9, 10) {
    console.log('You rolled a dice!')
    console.log(randNum)
  }
}

logNumber();

//just so that there's some finished javascript - i cant' get the RNG to freakin' work..

document.getElementById("imageClick").onclick = function() {myFunction()};

function myFunction() {
  document.getElementById("imageClick").innerHTML = "Buy my art lol";}

document.getElementById("secondImageClick").onclick = function() {onClickImage()};

function onClickImage() {
  document.getElementById("secondImageClick").innerHTML = "also please buy my art even if these are filler images"};