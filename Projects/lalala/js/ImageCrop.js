//--------------------------------------------------------
// Interface Initialization Functions
//--------------------------------------------------------
function InitResizeTag()
{
	document.all.resizetag.style.cursor = "SE-resize";
	document.all.resizetag.style.border = "1 solid black";
	document.all.resizetag.style.position = "absolute";
	document.all.resizetag.style.left = LOCX + DEFSELBOXW - RESIZETAGW/2;
	document.all.resizetag.style.top = LOCY + DEFSELBOXH - RESIZETAGH/2;
	document.all.resizetag.style.width = RESIZETAGW;
	document.all.resizetag.style.height = RESIZETAGH;

	document.all.resizetag.title = "Resize";
}

function InitWorkImage()
{
	document.all.workImage.style.position = "absolute";
	document.all.workImage.style.top = 0;
	document.all.workImage.style.left = 0;
}

function InitBoxbordor()
{
	document.all.boxbordor.style.position = "absolute";
	document.all.boxbordor.style.width = DEFSELBOXW;
	document.all.boxbordor.style.height = DEFSELBOXH;
	document.all.boxbordor.style.left = 0;
	document.all.boxbordor.style.top = 0;
	document.all.boxbordor.style.border = "1 solid white";
}

function InitSelectBox()
{
	document.all.selectbox.style.position = "absolute";
	document.all.selectbox.style.overflow = "hidden";
	document.all.selectbox.style.clip = "rect(0 170 128 0)";
	document.all.selectbox.style.width = DEFSELBOXW;
	document.all.selectbox.style.height = DEFSELBOXH;
	document.all.selectbox.style.left = LOCX;
	document.all.selectbox.style.top = LOCY;
}

function InitMainDiv()
{
	document.all.maindiv.style.position = "absolute";
	document.all.maindiv.style.overflow = "auto";
	document.all.maindiv.style.border = "1 solid white";
	document.all.maindiv.style.left = 390;
	document.all.maindiv.style.top = 195;
	document.all.maindiv.style.width = 400;
	document.all.maindiv.style.height = 400;
	
	document.all.bgImage.src = currentImage.src;
	document.all.bgImage.style.filter = "alpha(opacity:60)";
	document.all.bgImage.style.position = "absolute";
	document.all.bgImage.style.top = LOCX;
	document.all.bgImage.style.left = LOCY;
}


function InitPage()
{
	//
	// Set Current Work Image
	SetWorkImage();

	//
	// Invoke Some Function For Initialize Some Div
	//InitResizeTag();
	InitWorkImage();
	InitBoxbordor();
	InitSelectBox();
	InitMainDiv();
	
	//alert( "width is " + document.all.currentImage.width );
	//alert( "height is " + document.all.currentImage.height );
}

function BlankArray( size )
{
	for( var xindex=0; xindex<=size; xindex++ )
		this[xindex]=0;
	
	this.lenght=size;
	return this;
}

//--------------------------------------------------------
// Message Response Functions
//--------------------------------------------------------
function onSelBoxMove()
{
	
	if (event.button==1&&dragApproved)
	{
		var selectBox = document.all.selectbox;
		x = originX + event.clientX;
		if(x < 0 )	x = 0;
		if(x >= document.all.workImage.width )	x = document.all.workImage.width - 2;
		y = originY + event.clientY;
		if(y < 0 )	y = 0;
		if(y >= document.all.workImage.height )	y = document.all.workImage.height - 2;
		AdjustSelBox("xy",x,y,0);
		return false;
	}
	return true;
}


function onSelBoxResize()
{
	var _whr = 0;
	
	if( event.button == 1 && dragApproved )
	{
		w = originX + event.clientX;
		if( w <= 0 )
			w = 1;
		
		h = originY + event.clientY;
		if(h <= 0 )
			h = 1;

		//
		//alert( w/h );
		_whr = w/h;
		//alert( _whr );
		AdjustSelBox("wh",w,h,_whr);

		return false;
	}
	return true;
}

function AdjustSelBox( field, xw, yh, whr )
{
	var x=0,
	    y=0,
	    zw=0,
	    zh=0;

	switch( field )
	{
		case "xy":
			box.x.value = x = xw;
			box.y.value = y = yh;
			break;
		case "whr":
			if( xw > 0 )
				box.w.value = xw;
			if( yh > 0 )
				box.h.value = yh;
			box.whr.value = whr;
			break;
		case "wh":
			box.w.value = xw;
			
			if( eval(box.whr.value) > 0 )
				box.h.value = Math.round( xw/eval(box.whr.value) );
			else
				box.h.value = yh;
			break;
	}
	
	x = eval( box.x.value );
	y = eval( box.y.value );
	zw = eval( box.w.value ) + x;
	zh = eval( box.h.value ) + y;

	document.all.boxbordor.style.width = zw - x;
	document.all.boxbordor.style.height = zh - y;
	document.all.boxbordor.style.pixelLeft = x;
	document.all.boxbordor.style.pixelTop = y;

	document.all.selectbox.style.width = zw ;
	document.all.selectbox.style.height = zh ;
	document.all.resizetag.style.pixelLeft = LOCX + zw - 4;
	document.all.resizetag.style.pixelTop = LOCY + zh - 4;
	document.all.selectbox.style.clip = "rect("+ y +"," + zw + "," + zh + ","+ x +")";
}

function onMouseDrags()
{
	if( ! document.all )
		return true;
	
	var ele = event.srcElement;

	switch( ele.className.toString() )
	{
		case SELECTTAG:
			dragApproved = true;
			
        		originX = eval( box.x.value ) - event.clientX;
        		originY = eval( box.y.value ) - event.clientY;
        		
        		//alert( "event.clientX = " + event.clientX + " event.clientY = " + event.clientY );      		
        		document.onmousemove = onSelBoxMove;
        		return false;
        		break;
        		
        	case RESIZETAG:
		        dragApproved=true;
		        originX = eval( box.w.value ) - event.clientX;
		        originY = eval( box.h.value ) - event.clientY;
		        document.onmousemove = onSelBoxResize;
		        return false;
		        break;
	}

	return true;
}

document.onmousedown = onMouseDrags;
document.onmouseup = new Function( "dragApproved=false;" );

