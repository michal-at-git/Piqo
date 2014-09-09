function launch() {
  window.dialogs = new Dialogs();
  window.toolbar = new Toolbar();
  window.piqo = new Piqo(dialogs, toolbar);
  document.getElementById("header").style.display = "none";
  

  document.getElementById("Picture").style.display = "table";
  document.getElementById("toolbar").style.display = "table";

}

var Piqo = function(dialogs, toolbar) {

  this.dialogs = dialogs;
  this.dialogs.init();
  this.pic;
  this.canvas;
  this.toolbar = toolbar;
  
  this.create = function() {
    var width = document.getElementById("imgWidth").value;
    var height = document.getElementById("imgHeight").value;
    
    this.pic = new Picture(width, height, "Picture");
    this.canvas = this.pic.canvas;
    this.dialogs.closeDialog();
    paintInit(this);
    this.pic.context.beginPath();
    this.pic.context.rect(0,0, canvas.width, canvas.height);
    this.pic.context.fillStyle = '#ffffff';
    this.pic.context.fill();
    
  } 
  
  this.createFromImage = function() {
    imageInput = document.getElementById("imageUpload");
    this.image = new Image();
    
    window.piqo = this;
    
    this.image.onload = function(){
      
      window.piqo.pic = new Picture(this.width, this.height, "Picture");
      window.piqo.canvas = window.piqo.pic.canvas;
      window.piqo.pic.context.drawImage(this, 0, 0);      
    }
    window.piqo.image.src = window.URL.createObjectURL(imageInput.files[0]);
    
    paintInit(this);
    
    this.dialogs.closeDialog();

  }

  
 
  this.draw = function(event) {
      rectangle = this.canvas.getBoundingClientRect(); // emuluje prostokąt pobierany z elementu przez id?
      x = event.clientX - rectangle.left;
      y = event.clientY - rectangle.top;
      
      
	this.pic.context.beginPath();
	this.pic.context.moveTo(x,y);
	this.pic.context.lineTo(x+1, y+1);
	this.pic.context.lineWidth = this.toolbar.brushSize;
	this.pic.context.strokeStyle =  this.toolbar.color;
	
	if(this.toolbar.brush == "dot") 
	  this.pic.context.lineCap = 'round';
	else this.pic.context.lineCap = 'square';
	
	this.pic.context.stroke();
  }
 
 
 /* ### filters */
 this.greyscaleFilter = function() {
    var raw = this.pic.context.getImageData(0,0, this.canvas.width, this.canvas.height); //pobieramy surówkę? pierwsze arg. getImageData to współrzędne
  
    var d = raw.data;
    for(var i = 0; i<d.length; i+=4){
      var red   = d[i];
      var green = d[i+1];
      var blue = d[i+2];
      d[i] = d[i+1] = d[i+2] = (red+green+blue)/3;
    }
     this.pic.context.putImageData(raw, 0,0);
  }
  
  this.invertColorsFilter = function() {
    var raw = this.pic.context.getImageData(0,0, this.canvas.width, this.canvas.height); //pobieramy surówkę? pierwsze arg. getImageData to współrzędne
  
    var d = raw.data;
    
    for(var i = 0; i<d.length; i+=4){
       d[i]   = 255 - d[i];   /*r*/
       d[i+1] = 255 - d[i+1]; /*g*/
       d[i+2] = 255 - d[i+2]; /*b*/
    }
     this.pic.context.putImageData(raw, 0,0);
  }
  
  

    this.colorMixer = function() {
    var colRed = parseInt(document.getElementById("colRed").value);
    var colGreen = parseInt(document.getElementById("colGreen").value);
    var colBlue = parseInt(document.getElementById("colBlue").value);
    var raw = this.pic.context.getImageData(0,0, this.canvas.width, this.canvas.height); //pobieramy surówkę? pierwsze arg. getImageData to współrzędne
  
    var d = raw.data;
    
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
     this.pic.context.putImageData(raw, 0,0);
     this.dialogs.closeDialog();
  }
  

  
  this.sepiaFilter = function() {
     var raw = this.pic.context.getImageData(0,0, this.canvas.width, this.canvas.height); 
      var d = raw.data;
          
    for(var i = 0; i<d.length; i+=4){
      var red   = d[i];
      var green = d[i+1];
      var blue = d[i+2];
      d[i]   = (red * 0.393)+(green * 0.769)+(blue * 0.189);   /*r*/
      d[i+1] = (red * 0.349)+(green * 0.686)+(blue * 0.168); /*g*/
      d[i+2] = (red * 0.272)+(green * 0.534)+(blue * 0.131); /*b*/
    }
    this.pic.context.putImageData(raw, 0,0);
  }

  
  // ### image properties
  this.scaleImage = function() {
    var picture = canvas.toDataURL();
    var img = new Image();
    
    var percent = document.getElementById("scaleSize").value;
    percent = percent/100;
    var width = this.canvas.width;
    var height = this.canvas.height;
    width = parseInt(width*percent);
    height = parseInt(height*percent);
    this.canvas.width = width;
    this.canvas.height = height;
    window.piqo = this;
    img.onload = function() {

      window.piqo.pic.context.drawImage(this, 0,0, this.width, this.height, 0,0, width, height);
    }
    img.src = picture;
    dialogs.closeDialog();
  }
  
  
  
  this.fullscreen = function() {
    var element = document.body;
     if (element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if (element.webkitRequestFullScreen) {

      element.webkitRequestFullScreen();
   } 
   else if (element.requestFullScreen) {
     element.requestFullScreen();
   } else {
     dialogs.problem("Fullscreen mode is not supported on your browser"); 
   }

  }
  
}






function paintInit(painting) {
  
  //******   KONIECZNA IMPLEMENTACJA TRYBU - JEŚLI TRYB NIE JEST MALUJ, NIE POZWALAĆ MALOWAĆ!!! ***/
  canvas = document.getElementById("Picture");
  
    canvas.onmousedown = function(e) { painting.draw(e);
      canvas.onmousemove = function(e) {painting.draw(e);}
      canvas.onmouseup = function() {canvas.onmousemove = function() {}}
      canvas.onmouseout = function() {canvas.onmousemove = function() {}}
    }
}