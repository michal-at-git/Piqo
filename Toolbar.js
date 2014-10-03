var Toolbar = function() {

 this.brushPanel = document.getElementById("brush");
 this.colorPanel = document.getElementById("color");
 this.brushTransparencyPanel = document.getElementById("brushTransparency");
 this.brushTransparencyInfo = document.getElementById("brushTransparencyInfo");
 this.brushSizePanel = document.getElementById("brushSizePanel");
 this.brushSizeInfo = document.getElementById("brushSizeInfo");

 
 
 this.brush = this.brushPanel.value;
 this.color = this.colorPanel.value; 
 this.brushSize = this.brushSizePanel.value;
 this.image = false;
 
  
 this.paintingShapes = {
  'circle' : document.getElementById("circleShape").style, 
  'rectangle' : document.getElementById("rectangleShape").style,
  'triangle' : document.getElementById("triangleShape").style,
  'star' : document.getElementById("starShape").style

 };
 this.shapeRectBorderSizePanel = document.getElementById("rectBorderSizePanel");
 this.shapeRectBorderSizeInfo = document.getElementById("rectBorderSizeInfo"); 
 
 
 
 this.shapeRectBorderColorPanel = document.getElementById("rectBorderColor");
 this.rectBorderColor = this.shapeRectBorderColorPanel.value;
 this.rectBorderTransparencyPanel = document.getElementById("rectBorderTransparency");
 this.rectBorderSize = document.getElementById("rectBorderSizePanel").value;
 this.rectBorderTransparencyInfo = document.getElementById("rectBorderTransparencyInfo");
 this.rectFillColorPanel = document.getElementById("rectFillColor");
 this.rectFillTransparencyPanel = document.getElementById("rectFillTransparency");
 this.rectFillColor = this.rectFillColorPanel.value;
 this.rectFillTransparencyInfo = document.getElementById("rectFillTransparencyInfo");
 //////////////////////////////////
 
 this.circleBorderColorPanel = document.getElementById("circleBorderColor");
 this.circleBorderColor = this.circleBorderColorPanel.value;
 this.circleBorderTransparency = document.getElementById("circleBorderTransparency");
 
 this.circleBorderSizePanel = document.getElementById("circleBorderSize");
 this.circleBorderSize = this.circleBorderSizePanel.value;
 this.circleBorderSizeInfo = document.getElementById("circleBorderSizeInfo");
 this.circleBorderTransparencyPanel = document.getElementById("circleBorderTransparency");
 this.circleBorderTransparencyInfo = document.getElementById("circleBorderTransparencyInfo");
 this.circleFillColorPanel = document.getElementById("circleFillColor");
 this.circleFillColor = this.circleFillColorPanel.value;
 this.circleFillTransparencyPanel = document.getElementById("circleFillTransparency");
 this.circleFillTransparencyInfo = document.getElementById("circleFillTransparencyInfo");
 
 ///////////////////triangle///////////////////
 this.triangleBorderColorPanel = document.getElementById("triangleBorderColor");
 this.triangleBorderColor = this.triangleBorderColorPanel.value;
 this.triangleBorderTransparency = document.getElementById("triangleBorderTransparency");
 
 this.triangleBorderSizePanel = document.getElementById("triangleBorderSize");
 this.triangleBorderSize = this.triangleBorderSizePanel.value;
 this.triangleBorderSizeInfo = document.getElementById("triangleBorderSizeInfo");
 this.triangleBorderTransparencyPanel = document.getElementById("triangleBorderTransparency");
 this.triangleBorderTransparencyInfo = document.getElementById("triangleBorderTransparencyInfo");
 this.triangleFillColorPanel = document.getElementById("triangleFillColor");
 this.triangleFillColor = this.triangleFillColorPanel.value;
 this.triangleFillTransparencyPanel = document.getElementById("triangleFillTransparency");
 this.triangleFillTransparencyInfo = document.getElementById("triangleFillTransparencyInfo");
 
 
 
 ///////////STAR///////////
 
 this.starBorderColorPanel = document.getElementById("starBorderColor");
 this.starBorderColor = this.starBorderColorPanel.value;
 this.starBorderTransparency = document.getElementById("starBorderTransparency");
 
 this.starBorderSizePanel = document.getElementById("starBorderSize");
 this.starBorderSize = this.starBorderSizePanel.value;
 this.starBorderSizeInfo = document.getElementById("starBorderSizeInfo");
 this.starBorderTransparencyPanel = document.getElementById("starBorderTransparency");
 this.starBorderTransparencyInfo = document.getElementById("starBorderTransparencyInfo");
 this.starFillColorPanel = document.getElementById("starFillColor");
 this.starFillColor = this.starFillColorPanel.value;
 this.starFillTransparencyPanel = document.getElementById("starFillTransparency");
 this.starFillTransparencyInfo = document.getElementById("starFillTransparencyInfo");
 
 
 
 this.changeBrush = function() {
   this.brush = this.brushPanel.value;
 }
 
 this.changeColor = function() {
   color = this.colorPanel.value;
  r = parseInt(color.substr(1,2),16);
  g = parseInt(color.substr(3,2),16);
  b = parseInt(color.substr(5,2),16);
  a = this.brushTransparencyPanel.value;
  
  this.color = "rgba("+r+","+g+", "+b+", "+a+")";
  this.brushTransparencyInfo.innerHTML = (100 - (a*100))+"%";
 }
 
 
 
 
 this.densityUpdate = function() {
  value = document.getElementById("brushDensityPanel").value; 
  document.getElementById("brushDensityInfo").innerHTML = value+"%";
  paintInit(piqo);
 }
 
 
 
 
 
 
 
 this.changeBrushSize = function() {
   this.brushSize = this.brushSizePanel.value;
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
 
 this.showPaintingShapePanel = function() {
  document.getElementById('shape_tools').style.display = "table";
  document.getElementById('brush_tools').style.display = "none";
  this.showShapeTool();
  
 }
 
 this.showPaintingBrushPanel = function() {
  document.getElementById('shape_tools').style.display = "none";
  document.getElementById('brush_tools').style.display = "table";   
 }
 
 
 this.showShapeTool = function() {
   tool = document.getElementById("shapeSelector").value;
  
   if(tool == "circle") {
    this.paintingShapes.circle.display = "table"; 
    this.paintingShapes.rectangle.display = "none";
    this.paintingShapes.triangle.display = "none";
    this.paintingShapes.star.display = "none";     
   }
   else if (tool == "rectangle") {
    this.paintingShapes.rectangle.display = "table"; 
    this.paintingShapes.circle.display = "none";
    this.paintingShapes.triangle.display = "none"; 
    this.paintingShapes.star.display = "none"; 
   }
   else if (tool == "triangle") {
     this.paintingShapes.rectangle.display = "none"; 
    this.paintingShapes.circle.display = "none";
    this.paintingShapes.star.display = "none"; 
    this.paintingShapes.triangle.display = "table"; 

   }
   else if (tool == "star") {
     this.paintingShapes.rectangle.display = "none"; 
    this.paintingShapes.circle.display = "none";
    this.paintingShapes.triangle.display = "none"; 
    this.paintingShapes.star.display = "table"; 
   }
 }
 
 ////////////////////////////////////////////////////////////
 this.changeCircleBorderSize = function() {
    this.circleBorderSize = this.circleBorderSizePanel.value;
    this.circleBorderSizeInfo.innerHTML = this.circleBorderSize+"px";
 }
 
  this.changeCircleBorderColor = function() {
   color = this.circleBorderColorPanel.value;
  r = parseInt(color.substr(1,2),16);
  g = parseInt(color.substr(3,2),16);
  b = parseInt(color.substr(5,2),16);
  a = this.circleBorderTransparencyPanel.value;
  
  this.circleBorderColor = "rgba("+r+","+g+", "+b+", "+a+")";
  this.circleBorderTransparencyInfo.innerHTML = (100 - (a*100))+"%";
 }
 
this.changeCircleFillColor = function() {
   color = this.circleFillColorPanel.value;
  r = parseInt(color.substr(1,2),16);
  g = parseInt(color.substr(3,2),16);
  b = parseInt(color.substr(5,2),16);
  a = this.circleFillTransparencyPanel.value;
  
  this.circleFillColor= "rgba("+r+","+g+", "+b+", "+a+")";
  this.circleFillTransparencyInfo.innerHTML = (100 - (a*100))+"%";
 }
 

 
 ////////////////////////////////////////////////////////
 this.changeRectBorderSize = function() {
    this.rectBorderSize = this.shapeRectBorderSizePanel.value;
    this.shapeRectBorderSizeInfo.innerHTML = this.rectBorderSize+"px";
 }
 
 this.changeRectBorderColor = function() {
   color = this.shapeRectBorderColorPanel.value;
  r = parseInt(color.substr(1,2),16);
  g = parseInt(color.substr(3,2),16);
  b = parseInt(color.substr(5,2),16);
  a = this.rectBorderTransparencyPanel.value;
  
  this.rectBorderColor = "rgba("+r+","+g+", "+b+", "+a+")";
  this.rectBorderTransparencyInfo.innerHTML = (100 - (a*100))+"%";
 }
 
this.changeRectFillColor = function() {
   color = this.rectFillColorPanel.value;
  r = parseInt(color.substr(1,2),16);
  g = parseInt(color.substr(3,2),16);
  b = parseInt(color.substr(5,2),16);
  a = this.rectFillTransparencyPanel.value;
  
  this.rectFillColor= "rgba("+r+","+g+", "+b+", "+a+")";
  this.rectFillTransparencyInfo.innerHTML = (100 - (a*100))+"%";
 }
 
 
 ///////////////////////////////////////////////////////////
  this.changeTriangleBorderSize = function() {
    this.triangleBorderSize = this.triangleBorderSizePanel.value;
    this.triangleBorderSizeInfo.innerHTML = this.triangleBorderSize+"px";
 }
 
 this.changeTriangleBorderColor = function() {
   color = this.triangleBorderColorPanel.value;
  r = parseInt(color.substr(1,2),16);
  g = parseInt(color.substr(3,2),16);
  b = parseInt(color.substr(5,2),16);
  a = this.triangleBorderTransparencyPanel.value;
  
  this.triangleBorderColor = "rgba("+r+","+g+", "+b+", "+a+")";
  this.triangleBorderTransparencyInfo.innerHTML = (100 - (a*100))+"%";
 }
 
this.changeTriangleFillColor = function() {
   color = this.triangleFillColorPanel.value;
  r = parseInt(color.substr(1,2),16);
  g = parseInt(color.substr(3,2),16);
  b = parseInt(color.substr(5,2),16);
  a = this.triangleFillTransparencyPanel.value;
  
  this.triangleFillColor= "rgba("+r+","+g+", "+b+", "+a+")";
  this.triangleFillTransparencyInfo.innerHTML = (100 - (a*100))+"%";
 }
 
 ///////////////////////////////////////////////////////////
  this.changeStarBorderSize = function() {
    this.starBorderSize = this.starBorderSizePanel.value;
    this.starBorderSizeInfo.innerHTML = this.starBorderSize+"px";
 }
 
 this.changeStarBorderColor = function() {
   color = this.starBorderColorPanel.value;
  r = parseInt(color.substr(1,2),16);
  g = parseInt(color.substr(3,2),16);
  b = parseInt(color.substr(5,2),16);
  a = this.starBorderTransparencyPanel.value;
  
  this.starBorderColor = "rgba("+r+","+g+", "+b+", "+a+")";
  this.starBorderTransparencyInfo.innerHTML = (100 - (a*100))+"%";
 }
 
this.changeStarFillColor = function() {
   color = this.starFillColorPanel.value;
  r = parseInt(color.substr(1,2),16);
  g = parseInt(color.substr(3,2),16);
  b = parseInt(color.substr(5,2),16);
  a = this.starFillTransparencyPanel.value;
  
  this.starFillColor= "rgba("+r+","+g+", "+b+", "+a+")";
  this.starFillTransparencyInfo.innerHTML = (100 - (a*100))+"%";
 }
}