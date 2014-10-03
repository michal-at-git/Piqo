function newPic() {
 window.piqo.clear();
 launch();
}
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
  this.mode = "brush";
  //setting on Toolbar 
  toolbar.showPaintingBrushPanel();
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

  this.setMode = function(mode) {
   this.mode=mode; 
    if(mode == 'shape')
      toolbar.showPaintingShapePanel();
    else if(mode == 'brush')
      toolbar.showPaintingBrushPanel();
  
   paintInit(this);
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

  this.clear = function() {
    this.pic.context.clearRect(0,0, canvas.width, canvas.height);
    this.pic.context.fillStyle = toolbar.circleFillColor;
    this.pic.context.fillStyle = '#ffffff';
    this.pic.context.fill(); 
  }
 
  this.draw = function(event) {

      
	var xy = event.pageX - this.pic.canvas.offsetLeft;
	var yy = event.pageY - this.pic.canvas.offsetTop;
	

	this.pic.context.lineTo(xy+1, yy+1);
	this.pic.context.lineWidth = this.toolbar.brushSize;
	this.pic.context.strokeStyle =  this.toolbar.color;
	
	if(this.toolbar.brush == "dot") 
 	  this.pic.context.lineCap = 'round';
 	else this.pic.context.lineCap = 'square';
	
	this.pic.context.stroke();
  }
 
 
  this.delayedDraw = function(event) {

    var xy = event.pageX - this.pic.canvas.offsetLeft;
    var yy = event.pageY - this.pic.canvas.offsetTop;
    this.pic.context.beginPath();
    this.pic.context.moveTo(event.pageX - canvas.offsetLeft, event.pageY - canvas.offsetTop);

    this.pic.context.lineTo(xy+1, yy+1);
    this.pic.context.lineWidth = this.toolbar.brushSize;
    this.pic.context.strokeStyle =  this.toolbar.color;
	  
    if(this.toolbar.brush == "dot") 
    this.pic.context.lineCap = 'round';
    else this.pic.context.lineCap = 'square';
	  
    this.pic.context.stroke();

  }
 
 
 this.drawShape = function(event) {
      shape = document.getElementById("shapeSelector").value;

      rectangle = this.canvas.getBoundingClientRect(); // emuluje prostokąt pobierany z elementu przez id?
      x = event.clientX - rectangle.left;
      y = event.clientY - rectangle.top;
      
      
      if(shape == "star") {
	size = parseInt(document.getElementById("starSize").value);

	y -= ((size/3)*2);

	//top right
	line0 = {'x': x, 'y':y}; 
	line1 = {'x': x+(size/6), 'y': y+(size/2)}; // : \
	line2 = {'x': x+(size*0.75), 'y': y+(size/2)}; // : _
	line3 = {'x': x+(size*0.25), 'y': y+((size/6)*5)}; // : /
	line4 = {'x': x+(size*0.5), 'y': y+((size/3)*4)}; // : \
	line5 = {'x': x, 'y': y+size}; // : \
	/// top left;
	line6 = {'x': x-(size/6), 'y': y+(size/2)}; 
	line7 = {'x': x-(size*0.75), 'y': y+(size/2)}; 
	line8 = {'x': x-(size*0.25), 'y': y+((size/6)*5)};
	line9 = {'x': x-(size*0.5), 'y': y+((size/3)*4)}; 
	line10 = {'x': x, 'y': y+size}; // : \
	
	this.pic.context.beginPath();
	this.pic.context.moveTo(line0.x,line0.y);
	this.pic.context.lineTo(line1.x,line1.y);
	this.pic.context.lineTo(line2.x, line2.y);
	this.pic.context.lineTo(line3.x, line3.y);
	this.pic.context.lineTo(line4.x, line4.y);
	this.pic.context.lineTo(line5.x, line5.y);
	
	this.pic.context.lineTo(line10.x, line10.y);
	this.pic.context.lineTo(line9.x, line9.y);
	this.pic.context.lineTo(line8.x, line8.y);
	this.pic.context.lineTo(line7.x, line7.y);
	this.pic.context.lineTo(line6.x, line6.y);
	this.pic.context.lineTo(line0.x,line0.y);
	this.pic.context.lineTo(line1.x,line1.y); //do ostrego wierzchołka

	
	this.pic.context.lineWidth = toolbar.starBorderSize;
	
	this.pic.context.fillStyle = toolbar.starFillColor;
	this.pic.context.fill();
	
	this.pic.context.strokeStyle = toolbar.starBorderColor;
	this.pic.context.lineCap = 'butt';
	this.pic.context.stroke();

      }
      else if(shape == "triangle") {
	size = parseInt(document.getElementById("triangleSize").value);
 	y -= (size/2);
	line0 = {'x': x, 'y':y}; 
	line1 = {'x': x+(size/2), 'y': y+(size*0.75)}; 
	line2 = {'x': x-(size/2), 'y': y+(size*0.75)}; 

	
	this.pic.context.beginPath();
	this.pic.context.moveTo(line0.x,line0.y);
	this.pic.context.lineTo(line1.x,line1.y);
	this.pic.context.lineTo(line2.x, line2.y);
	this.pic.context.lineTo(line0.x,line0.y);

	this.pic.context.closePath();
	this.pic.context.lineWidth = toolbar.triangleBorderSize;

	this.pic.context.fillStyle = toolbar.triangleFillColor;
	this.pic.context.fill();
	this.pic.context.strokeStyle =  toolbar.triangleBorderColor;
	this.pic.context.stroke();


	
      } else if (shape == "circle") {
	radius = parseInt(document.getElementById("circleRadius").value);
	
	border = toolbar.circleBorderSize;
	this.pic.context.beginPath();
	this.pic.context.strokeStyle = toolbar.circleBorderColor;
 	this.pic.context.lineWidth = border;
	this.pic.context.arc(x,y, radius, 0, 2*Math.PI, true);
 	this.pic.context.closePath();
	this.pic.context.stroke();
	
 	this.pic.context.beginPath();

	radius -= (border/2); 
	this.pic.context.lineWidth = 0;
	this.pic.context.arc(x,y, radius, 0, 2*Math.PI, true);
	this.pic.context.fillStyle = toolbar.circleFillColor;

	this.pic.context.closePath();
	this.pic.context.fill();
	this.pic.context.closePath();
	
	
      } else if (shape == "rectangle") {
	width = parseInt(document.getElementById("rectWidth").value);
	height = parseInt(document.getElementById("rectHeight").value);

	x = x-(width/2);
	y = y-(height/2);
	this.pic.context.beginPath();
	this.pic.context.fillStyle = toolbar.rectFillColor;
	borderWidth = toolbar.rectBorderSize;
	this.pic.context.fillRect(x+(borderWidth/2),y+(borderWidth/2), width-borderWidth, height-borderWidth);

 	
	this.pic.context.lineWidth = toolbar.rectBorderSize;
	this.pic.context.strokeStyle = toolbar.rectBorderColor;
	this.pic.context.strokeRect(x, y, width, height);
 	this.pic.context.closePath();

	this.pic.context.stroke();
      }
      
      
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
  
  if(painting.mode == "brush") {
    canvas.onclick = false;
    density = 100 - parseInt(document.getElementById("brushDensityPanel").value);
    
    delay = density*2;

    if(density) {
        canvas.onmousedown = function(e) { 
	// optymalizacja - przeniesione z painting.draw()
	    ////////////////////////////////////


	painting.delayedDraw(e);


	canvas.onmousemove = function(e) {
	  
	    if(delay==0) {
	      painting.delayedDraw(e);
	      delay = density*2;
	    } else {
	      delay -= 10;
	      console.log(delay);
	    }
	}
	canvas.onmouseup = function() {canvas.onmousemove = function() {}}
	canvas.onmouseout = function() {canvas.onmousemove = function() {}}
	}
    } else {  
      canvas.onmousedown = function(e) { 
	// optymalizacja - przeniesione z painting.draw()
	  piqo.pic.context.beginPath();
	  piqo.pic.context.moveTo(e.pageX - canvas.offsetLeft, e.pageY - canvas.offsetTop);
	    ////////////////////////////////////
	  painting.draw(e, density);

	canvas.onmousemove = function(e) {painting.draw(e, density);}
	canvas.onmouseup = function() {canvas.onmousemove = function() {}}
	canvas.onmouseout = function() {canvas.onmousemove = function() {}}
      }
    }
  }
   else if (painting.mode == "shape") {
     
     canvas.onmousedown = false;
     canvas.onclick = function(e) {
      painting.drawShape(e); 
     }
     
   } else {
     dialogs.problem("unknown painting tool selected");
   }
}