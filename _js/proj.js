// random number generator in order to call upon a random example image when clicking 'animation' 'ilustration' 'design' //

var myArray = ["joker1.png", "illustrationexample.jpg", "mcreeGif.gif", "mercyGif.gif", "pharaGif.gif", "ZiShop.png"];

var mySelector = function () {
  Math.floor((Math.random() * 10) + 1);
}

//just so that there's some finished javascript - i cant' get the RNG to freakin' work..

document.getElementById("imageClick").onclick = function() {myFunction()};

function myFunction() {
  document.getElementById("imageClick").innerHTML = "Buy my art lol";}

document.getElementById("secondImageClick").onclick = function() {onClickImage()};

function onClickImage() {
  document.getElementById("secondImageClick").innerHTML = "also please buy my art even if these are filler images"};

console.log(mySelector);