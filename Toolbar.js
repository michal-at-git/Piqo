var Toolbar = function() {

 this.brushPanel = document.getElementById("brush");
 this.colorPanel = document.getElementById("color");
 this.brushSizePanel = document.getElementById("brushSizePanel");
 this.brushSizeInfo = document.getElementById("brushSizeInfo");
 this.brush = this.brushPanel.value;
 this.color = this.colorPanel.value;
 this.brushSize = this.brushSizePanel.value;
 this.image = false;

 this.changeBrush = function() {
   this.brush = this.brushPanel.value;
 }
 
 this.changeColor = function() {
  this.color = this.colorPanel.value;
 }
 
 this.changeBrushSize = function() {
   this.brushSize = brushSizePanel.value;
   this.brushSizeInfo.innerHTML = this.brushSize+"px";
 }
 this.minimalize = function() {
  document.getElementById("toolbar").style.display = "none"; 
  document.getElementById("footer").style.display = "table"; 

 }
 
 this.maximalize = function() {
  document.getElementById("toolbar").style.display = "table"; 
  document.getElementById("footer").style.display = "none";
 }
}