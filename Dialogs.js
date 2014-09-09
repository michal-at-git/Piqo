
var Dialogs = function() {
  this.dialog = document.getElementById("dialog");
 this.init = function() {

   
  this.dialog.style.display = "table";

  this.dialog.innerHTML = "<div class=\"box init\">"
  + "<h2>Set image size</h2>"
  + "<p>Width: <input type=\"number\" value=\"150\" step=\"5\" id=\"imgWidth\"/></p>"
  + "<p>Height: <input type=\"number\" value=\"150\" step=\"5\" id=\"imgHeight\"/></p>"
  +"<p><button onClick=\"piqo.create()\">create image</button></p>"
  + "<p>or upload image:</p>"
  + "<p><input type=\"file\" id=\"imageUpload\" onchange=\"piqo.createFromImage()\" /></p>"
  +"</div>";
 }
 
 
  this.scaleImageDialog = function() {

  this.dialog.style.display = "table";

  this.dialog.innerHTML = "<div class=\"box scaleImage\">"
  + "<h2>Scale image</h2>"
  + "<p>50% <input type=\"range\" id=\"scaleSize\" min=\"50\" value=\"100\" max=\"200\" step=\"5\" onchange=\"dialogs.getPicProperties()\"> 200%</p>"
  + "<p><span id=\"percent\"></span> % resolution: <span id=\"resolution\"></span></p>"  
  + "<p><button onclick=\"piqo.scaleImage()\">resize</button> <button onClick=\"dialogs.closeDialog()\">cancel</button></p>"
  +"</div>";
 
    this.getPicProperties();
 }
 

 
 
 
  this.colorMixerDialog = function(piqo) {


  this.dialog.innerHTML = "<div class=\"box colorMixer\">"
  + "<h2>Color mixer</h2>"
  + "<p><canvas id=\"mixerPreview\"></canvas></p>"  
  + "<p>red: <input type=\"range\" id=\"colRed\" min=\"0\" value=\"0\" max=\"100\" step=\"5\" onchange=\"dialogs.generateRGBPreview(piqo)\"></p>"
  + "<p>green: <input type=\"range\" id=\"colGreen\" min=\"0\" value=\"0\" max=\"100\" step=\"5\" onchange=\"dialogs.generateRGBPreview(piqo)\"></p>"
  + "<p>blue: <input type=\"range\" id=\"colBlue\" min=\"0\" value=\"0\" max=\"100\" step=\"5\" onchange=\"dialogs.generateRGBPreview(piqo)\"></p>"
  + "<p><button onclick=\"piqo.colorMixer()\">set</button> <button onClick=\"dialogs.closeDialog()\">cancel</button></p>"
  +"</div>";
  
  var __canvas = document.getElementById("mixerPreview");
  var context = __canvas.getContext('2d');
  var data = piqo.pic.context.getImageData(0,0, piqo.canvas.width, piqo.canvas.height);
  
  __canvas.width = piqo.canvas.width; 
  __canvas.height = piqo.canvas.height;
  
  context.putImageData(data, 0,0);
  this.dialog.style.display = "table";
 }
 this.exportImageDialog = function(piqo) {
   this.dialog.style.display = "table";

  this.dialog.innerHTML = "<div class=\"box exportImage\">"
  + "<h2>Your picture</h2>"
  + "<p><img src=\"\" id=\"exp\"/></p>"
  + "<p><button onClick=\"dialogs.closeDialog()\">close</button></p>"

  +"</div>";
  document.getElementById("exp").src = piqo.canvas.toDataURL();
  
 }
 
 this.problem = function(message) {
      this.dialog.style.display = "table";

  this.dialog.innerHTML = "<div class=\"box problem\">"
  + "<h2>Problem</h2>"
  + "<p>"+message+"</p>"
  + "<p><button onclick=\"dialogs.closeDialog()\" >close</button></p>"
  +"</div>";
 }
 
 this.getPicProperties = function () {
   var canvas = document.getElementById("Picture");
   var propval = document.getElementById("scaleSize").value;
   document.getElementById("percent").innerHTML = propval;
   propval = propval/100;
   var width = parseInt(canvas.width*propval);
   var height =  parseInt(canvas.height*propval);
   //    width = 
   document.getElementById("resolution").innerHTML = width+"x"+height;
   
 }
 
 
 
this.generateRGBPreview = function(piqo) {
    var colRed = parseInt(document.getElementById("colRed").value);
    var colGreen = parseInt(document.getElementById("colGreen").value);
    var colBlue = parseInt(document.getElementById("colBlue").value);
    
    var __canvas = document.getElementById("mixerPreview");
    var context = __canvas.getContext('2d');
    var raw = piqo.pic.context.getImageData(0,0, piqo.canvas.width, piqo.canvas.height); 
  
    var d = raw.data;
//     alert(colRed);
      for(var i = 0; i<d.length; i+=4){
	if(d[i] >= 64 && colRed>0) {
	    d[i]   += colRed;   /*r*/
	}

	if(d[i+1] >= 64 && colGreen>0) {
	    d[i+1]   += colGreen;   
	} 

      if(d[i+2] >= 64 && colBlue>0) {
	    d[i+2]   += colBlue;   
	} 
	
      }  
// 	d[i+1] += 100; /*g*/
// 	d[i+2] += 10; /*b*/
    
  __canvas.width = piqo.canvas.width; 
  __canvas.height = piqo.canvas.height;
  
  context.putImageData(raw, 0,0); 
  
}
  

 
 this.closeDialog = function() {
   this.dialog.innerHTML = "";
   this.dialog.style.display = "none"; 
 }
}