var Picture = function(width, height, canvasID) {
  this.width = width;
  this.height = height;
  this.canvas = document.getElementById(canvasID);
  this.context = this.canvas.getContext('2d');
  this.canvas.width = width;
  this.canvas.height = height;
}