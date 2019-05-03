document.getElementById("imageClick").onclick = function() {myFunction()};

function myFunction() {
  document.getElementById("imageClick").innerHTML = "Congratulations, you found my javascript";}

document.getElementById("secondImageClick").onclick = function() {onClickImage()};

function onClickImage() {
  document.getElementById("secondImageClick").innerHTML = "This is a differently written function! Javascript still kinda makes no sense to me"};