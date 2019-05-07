// random number generator in order to call upon a random example image when clicking 'animation' 'ilustration' 'design' //

var myArray = ["joker1.png", "illustrationexample.jpg", "mcreeGif.gif", "mercyGif.gif", "pharaGif.gif", "ZiShop.png"];

var mySelector = 

document.getElementById("imageClick").onclick = function() {myFunction()};

function myFunction() {
  document.getElementById("imageClick").innerHTML = "Buy my art lol";}

document.getElementById("secondImageClick").onclick = function() {onClickImage()};

function onClickImage() {
  document.getElementById("secondImageClick").innerHTML = "also please buy my art even if these are filler images"};

function RNG() {
  Math.random((Math.floor()*10)+1);
}