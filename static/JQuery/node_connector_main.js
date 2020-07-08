window.addEventListener("load", () => {
	const canvas = document.querySelector("#canvas");
	const ctx = canvas.getContext("2d");

	const excelMenu = document.querySelector("#excel_menu");
	const csvMenu = document.querySelector("#csv_menu");
	const dwa_menu = document.querySelector("#dwa_menu");
	const email_menu = document.querySelector("#email_menu");
	const files_menu = document.querySelector("#files_menu");
	const folder_menu = document.querySelector("#folder_menu");
	const ftp_menu = document.querySelector("#ftp_menu");
	const pdf_menu = document.querySelector("#pdf_menu");
	const wde_menu = document.querySelector("#wde_menu");
	const error_handle_menu = document.querySelector("#error_handle_menu");
	const ocr_menu = document.querySelector("#ocr_menu");

	const clr_nodes = document.querySelector("#clear");
	const undo_node = document.querySelector("#undo");
	const redo_node = document.querySelector("#redo");



	const HANDLE_RADIUS = 7;
	const HANDLE_WIDTH = 2.5;
	const NODE_WIDTH = 3;
	const ARROW_HEAD = 5;
	let rightConnectId = null;
	let inputConnected = false;
	let outputConnected = false;
	let dragging = false;
	let startPoint = new Map([['x', null], ['y', null]]);
	let connectorArray= [];
	let pathPoints= [];
	let nodesArray = [];
	let nodesArrayRedo = [];
	let my_gradient = ctx.createLinearGradient(0, 0, 0, 50);
	my_gradient.addColorStop(0, "#78909C");
	my_gradient.addColorStop(1, "#B0BEC5");
	const NODE_COLOR = "#4a4677";
	// const FIRST_NODE_STROKE = "#f5f5f6"
	const FIRST_NODE_STROKE = "black"
	const NODES_STROKE = "black";
	const NODES_TEXT_COLOR = "white";
	const HANDLE_COLOR_DEFAULT = "white";
	const HANDLE_COLOR_CLICK = "red";
	const HANDLE_COLOR_HOVER = "#ffcdd2";
	const HANDLE_COLOR_INTUTION = "#81C784";
	let NEW_NODE_X = 0;
	let NEW_NODE_Y = 0;
	let seqName = "node ";
	let excel_img = new Image();
	excel_img.src = "imgs/excel_reg.svg";

	resizeCanvas();


//--------------*CLASSES AND METHODS----------------------------------------------------

	class Node{
		constructor(x, y, w, h, isDragging,leftConnected, rightConnected, inputHandleFill, outputHandleFill, nodeText, nodeSequence){
			this.x = x;
			this.y = y;
			this.w = w;
			this.h = h;
			this.isDragging = isDragging;
			this.leftConnected = leftConnected;
			this.rightConnected = rightConnected;
			this.inputHandleFill = typeof inputHandleFill !== 'undefined' ? inputHandleFill : HANDLE_COLOR_DEFAULT;
			this.outputHandleFill = typeof outputHandleFill !== 'undefined' ? outputHandleFill : HANDLE_COLOR_DEFAULT;
			this.nodeText = typeof nodeText !== 'undefined' ? nodeText : "";
			this.nodeSequence = nodeSequence;
			// this.src = src;
			// this.fillStyle = this.fillStyle ||"#ffffff";
		}
		create(ctx){
			ctx.fillStyle = NODE_COLOR;
			ctx.strokeStyle = NODES_STROKE;
			ctx.lineWidth = NODE_WIDTH;
			ctx.font = "13px Roboto";
			ctx.fontWeight = "300";
			ctx.textAlign = "center";
			ctx.textBaseline = "bottom";
			ctx.fillText(this.nodeText.toUpperCase(), this.x + this.w/2, this.y);
			ctx.strokeRect(this.x, this.y, this.w, this.h);
			ctx.fillRect(this.x, this.y, this.w, this.h);
			ctx.fillStyle = NODES_TEXT_COLOR;
			ctx.textBaseline = "middle";
			ctx.fillText(this.nodeSequence.toUpperCase(), this.x+this.w/2, this.y + this.h/2);
			// ctx.drawImage(this.src, this.x+this.w/2, this.y + this.h/2, this.w/4, this.h/4);

			

			//INPUT HANDLE
			ctx.beginPath();
			ctx.fillStyle = this.inputHandleFill;
			ctx.lineWidth = HANDLE_WIDTH;
			ctx.arc(this.x, Math.floor(this.y + (this.h)/2), HANDLE_RADIUS, 0, Math.PI*2, false);
			ctx.fill();
			ctx.stroke();

			//OUTPUT HANDLE
			ctx.beginPath();
			ctx.fillStyle = this.outputHandleFill;
			ctx.lineWidth = HANDLE_WIDTH;
			ctx.arc(this.x + this.w, Math.floor(this.y + (this.h)/2), HANDLE_RADIUS, 0, Math.PI*2, false);
			ctx.fill();
			ctx.stroke();
		}
		createFirst(ctx){
			ctx.beginPath();
			ctx.fillStyle = NODE_COLOR;
			ctx.strokeStyle = FIRST_NODE_STROKE;
			ctx.lineWidth = NODE_WIDTH;
			ctx.arc(this.x, this.y, Math.floor(this.w/2.5), 0, Math.PI*2, false);
			ctx.fill();
			ctx.stroke();
			ctx.font = "10px Roboto";
			ctx.fillStyle = NODES_TEXT_COLOR;
			ctx.fontWeight = "300";
			ctx.textAlign = "center";
			ctx.textBaseline = "middle";
			ctx.fillText("START NODE", this.x, this.y);
			

			//OUTPUT HANDLE
			ctx.beginPath();
			ctx.fillStyle = this.outputHandleFill;
			ctx.lineWidth = HANDLE_WIDTH;
			ctx.arc(this.x + Math.floor(this.w/2.5), this.y, HANDLE_RADIUS, 0, Math.PI*2, false);
			ctx.fill();
			ctx.stroke();
		}
		isStartNodeSelected(x, y){
			return(Math.sqrt((x-this.x)*(x-this.x) + 
				  (y-Math.floor(this.y + (this.h)/2))*(y-Math.floor(this.y + (this.h)/2))) <= this.w/2)
		}
		startNodeHandleSelected(x, y){
			if(Math.sqrt(x-Math.floor(this.x + this.w/2.5))*(x-Math.floor(this.x + this.w/2.5)) + 
				(y-this.y)*(y-this.y) <= this.w/2.5){
				return "output";
			}
		}
		isNodeSelected(x, y){
			return( x>=this.x
					&& x<=Math.floor(this.x + this.w)
					&& y>=this.y
					&& y<=Math.floor(this.y + this.h));
		}
		handleSelected(x, y){
			if(Math.sqrt((x-this.x)*(x-this.x) + 
				(y-Math.floor(this.y + (this.h)/2))*(y-Math.floor(this.y + (this.h)/2))) <= HANDLE_RADIUS){
				return "input";
			}
			else if (Math.sqrt((x-(this.x + this.w))*(x-(this.x + this.w)) + 
				(y-(Math.floor(this.y + (this.h)/2)))*(y-(Math.floor(this.y + (this.h)/2)))) <= HANDLE_RADIUS) {
				return "output";
			}
		}
	}

	class Connector{
		constructor(startX, startY, endX, endY, inputNodeId, outputNodeId){
			this.startX = startX;
			this.startY = startY;
			this.endX = endX;
			this.endY = endY;
			this.inputNodeId = typeof inputNodeId !== 'undefined' ? inputNodeId : null;
			this.outputNodeId = typeof outputNodeId !== 'undefined' ? outputNodeId : null;
		}
			drawConnectorPath(ctx){
			ctx.lineWidth = 3;
			ctx.lineCap = "round";
			ctx.lineJoin = "round";
			ctx.strokeStyle = "red";
			ctx.fillStyle = "red";

			ctx.beginPath();
			ctx.moveTo(this.startX, this.startY);

			//BEZIER CURVE WITH DYNAMIC MID CONTROL POINTS	
			ctx.bezierCurveTo(Math.floor(this.startX + ((this.endX - this.startX)/2)), this.startY, 
			Math.floor(this.startX + ((this.endX - this.startX)/2)), this.endY , this.endX, this.endY) ;
			
			//ARROW HEAD
			if (this.startX != this.endX) {
				//LEFT
				if (this.endX < this.startX) {
					ctx.lineTo(Math.floor(this.endX + ARROW_HEAD), Math.floor(this.endY - ARROW_HEAD));
					ctx.lineTo(this.endX,this.endY);
					ctx.lineTo(Math.floor(this.endX + ARROW_HEAD), Math.floor(this.endY + ARROW_HEAD));
				}
				//RIGHT
				else{
					ctx.lineTo(Math.floor(this.endX - ARROW_HEAD), Math.floor(this.endY - ARROW_HEAD));
					ctx.lineTo(this.endX,this.endY);
					ctx.lineTo(Math.floor(this.endX - ARROW_HEAD), Math.floor(this.endY + ARROW_HEAD));
				}
			}
			ctx.stroke();
		}
	}


	function getMousePos(canvas,evt){
		var rect=canvas.getBoundingClientRect();
		return{
			x:evt.clientX-rect.left,
			y:evt.clientY-rect.top
		};

	} 

	var abcd;
	
	function nodesMenuClick(e){
		console.log(e.target.text);
		// abcd=e.target.text;	
		if (nodesArray.length==0){
			NEW_NODE_X = 160;
			NEW_NODE_Y = 30;
			nodesArray.push(new Node(NEW_NODE_X, NEW_NODE_Y, 80, 50, false, false, false, undefined, undefined,
								 e.target.text, seqName.concat(nodesArray.length + 1)));
		}
		else{
			if (nodesArray.length % 4 != 0) {
			// if (NEW_NODE_Y > 449) {
			// 	NEW_NODE_Y = 150;
			// }
			NEW_NODE_X = nodesArray[nodesArray.length-1].x + 200;
			NEW_NODE_Y = nodesArray[nodesArray.length-1].y;
			}
			else{
				NEW_NODE_X = 160;
				NEW_NODE_Y = nodesArray[nodesArray.length-1].y + 100;
			}

			if (nodesArray.length!=0){
				nodesArray.push(new Node(NEW_NODE_X, NEW_NODE_Y, 80, 50, false, false, false, undefined, undefined,
									 e.target.text, seqName.concat(nodesArray.length + 1)));
			}
		}

		nodesArray[nodesArray.length - 1].create(ctx);
		nodesArrayRedo = nodesArray;
		// console.log(nodesArrayRedo);
		
	}

	function clearNodes(e){
		nodesArray.splice(0, nodesArray.length);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		let startNode = new Node(50, 50, 100, 70, false, false, false);
		startNode.createFirst(ctx);		
	}

	function undoNodes(e){
		nodesArray.splice(-1,1);
		connectorArray.splice(-1,1);

		console.log(nodesArray);
		console.log(nodesArrayRedo);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		let startNode = new Node(50, 50, 100, 70, false, false, false);
		startNode.createFirst(ctx);
		nodesArray.forEach(node=>{
			node.create(ctx);
		})
		connectorArray.forEach(connector=>{
			connector.drawConnectorPath(ctx);
		})
		
	}

	function redoNodes(e){
		console.log(nodesArrayRedo);
		console.log(nodesArray);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
		let startNode = new Node(50, 50, 100, 70, false, false, false);
		startNode.createFirst(ctx);
		nodesArrayRedo.forEach(node=>{
			node.create(ctx);
		})
	}

	function resizeCanvas(){
		canvas.style.width ='100%';
  		canvas.style.height='100%';

	  // set the internal size to match
	  canvas.width  = canvas.offsetWidth;
	  canvas.height = canvas.offsetHeight;
		
		if (nodesArray.length != 0) {
		connectorArray.forEach(path=>{
				ctx.beginPath();
				ctx.moveTo(path[0].x, path[0].y);
				drawConnectorPath(path[0].x, path[0].y, path[1].x, path[1].y)
				ctx.stroke();
			})
			startNode.createFirst(ctx);
			nodesArray.forEach(node=>{
				node.create(ctx);
			})
		}
	}



	function mouseDown(e){
		var mousePos = getMousePos(canvas,e);
		//ENABLING NODE DRAG
		if (startNode.isStartNodeSelected(mousePos.x, mousePos.y)) {
			dragging = true;
			canvas.style.cursor = "grabbing";
			startNode.isDragging = true;
		}
		nodesArray.forEach(node=>{
			// debugger;
			if (node.isNodeSelected(mousePos.x, mousePos.y)){
				dragging = true;
				canvas.style.cursor = "grabbing";
				node.isDragging = true;
				console.log(nodesArray);
			}
		})
		//ENABLING CONNECTORS
		if (!dragging) {
			if (startNode.rightConnected != true) {
				if (startNode.startNodeHandleSelected(mousePos.x, mousePos.y) == "output") {
					nodesArray.forEach(node=>{
						node.inputHandleFill = HANDLE_COLOR_INTUTION;
						node.create(ctx);
					})
					console.log("yee");
					canvas.style.cursor = "pointer";
					startNode.outputHandleFill = HANDLE_COLOR_CLICK;
					startNode.createFirst(ctx);
					outputConnected = true;
					startNode.rightConnected = true;
					rightConnectId = "startNode";
					imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
					connectorArray.push(new Connector(mousePos.x, mousePos.y, mousePos.x, mousePos.y, null, "startNode"));
				}
			}
			if (nodesArray.length != 0) {
				for (var i = 0; i < nodesArray.length; i++) {
					console.log(i)
					//INPUT IS CLICKED
					if (nodesArray[i].handleSelected(mousePos.x, mousePos.y) == "input") {
						canvas.style.cursor = "pointer";
						inputConnected = true;

					}
					//OUTPUT IS CLICKED
					else if(nodesArray[i].rightConnected != true){
						if (nodesArray[i].handleSelected(mousePos.x, mousePos.y) == "output") {
							canvas.style.cursor = "pointer";
							nodesArray[i].outputHandleFill = HANDLE_COLOR_CLICK;

							// ACTIVATE INPUT INTUTIONS
							for (var j = 0; j < nodesArray.length; j++) {
								if (j != i) {
									if (nodesArray[j].leftConnected != true) {
										nodesArray[j].inputHandleFill = HANDLE_COLOR_INTUTION;
										nodesArray[j].create(ctx);
									}
								}
							}

							nodesArray[i].create(ctx);
							outputConnected = true;
							nodesArray[i].rightConnected = true;
							rightConnectId = i;
							imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
							connectorArray.push(new Connector(mousePos.x, mousePos.y, mousePos.x, mousePos.y, null, i));
							console.log(connectorArray);
							return;
						}
					}
				}
			}	
		}		
	}


	function mouseMove(e){
		var mousePos = getMousePos(canvas,e);
		

		//DRAG NODE
		if (dragging){   
			// canvas.style.cursor = "grabbing";
			ctx.clearRect(0, 0, canvas.width, canvas.height);
			if (startNode.isDragging == true) {
				if (startNode.rightConnected == false) {
					startNode.x = mousePos.x;
					startNode.y = mousePos.y;
				}
				if (startNode.rightConnected == true) {
					connectorArray.forEach(connector=>{
						if (connector.outputNodeId == "startNode"){
							connector.startX = startNode.x + Math.floor((startNode.w)/2); 
							connector.startY = startNode.y;
							console.log(startNode);
						}
						startNode.x = mousePos.x;
						startNode.y = mousePos.y;
						// nodesArray[i].create(ctx);
					})
				}
				startNode.createFirst(ctx);
				connectorArray.forEach(connector=>{
					connector.drawConnectorPath(ctx);
				})
			}
			for (var i = 0; i < nodesArray.length; i++) {		
				if (nodesArray[i].isDragging == true) {
					//NOTHING CONNECTED
					if (nodesArray[i].leftConnected == false && nodesArray[i].rightConnected == false) {
						nodesArray[i].x = mousePos.x - nodesArray[i].w/2;
						nodesArray[i].y = mousePos.y - nodesArray[i].h/2;
					}
					//ONLY INPUT CONNECTED
					if (nodesArray[i].leftConnected == true && nodesArray[i].rightConnected == false) {
						connectorArray.forEach(connector=>{
							if (connector.inputNodeId == i){
								connector.endX = nodesArray[i].x; 
								connector.endY = Math.floor(nodesArray[i].y + (nodesArray[i].h)/2);
								console.log(nodesArray);
							}
						})
						nodesArray[i].x = mousePos.x - nodesArray[i].w/2;
						nodesArray[i].y = mousePos.y - nodesArray[i].h/2;
					}
					//ONLY OUTPUT CONNECTED
					if (nodesArray[i].leftConnected == false && nodesArray[i].rightConnected == true) {
						connectorArray.forEach(connector=>{
							if (connector.outputNodeId == i){
								connector.startX = nodesArray[i].x + nodesArray[i].w; 
								connector.startY = Math.floor(nodesArray[i].y + (nodesArray[i].h)/2);
								console.log(nodesArray);
							}
						})
						nodesArray[i].x = mousePos.x - nodesArray[i].w/2;
						nodesArray[i].y = mousePos.y - nodesArray[i].h/2;
					}
					//BOTH INPUT OUTPUT CONNECTED
					if (nodesArray[i].leftConnected == true && nodesArray[i].rightConnected == true) {
						connectorArray.forEach(connector=>{
							if (connector.inputNodeId == i){
								connector.endX = nodesArray[i].x; 
								connector.endY = Math.floor(nodesArray[i].y + (nodesArray[i].h)/2);
							}
							if (connector.outputNodeId == i) {
								connector.startX = nodesArray[i].x + nodesArray[i].w; 
								connector.startY = Math.floor(nodesArray[i].y + (nodesArray[i].h)/2);
								connector.drawConnectorPath(ctx);
							}
						})
						nodesArray[i].x = mousePos.x - nodesArray[i].w/2;
						nodesArray[i].y = mousePos.y - nodesArray[i].h/2;
					}
					startNode.createFirst(ctx);
					nodesArray[i].create(ctx);
					connectorArray.forEach(connector=>{
						connector.drawConnectorPath(ctx);
					})
				}
				//RECREATE NODES WHICH ARE NOT BEEN DRAGGED WHILE ANY OTHER IS DRAGGING
				if (startNode.isDragging == false) {
					startNode.createFirst(ctx);
				}
				if (nodesArray[i].isDragging == false){
					startNode.createFirst(ctx);
					nodesArray[i].create(ctx);
				}

			}
		}


		if (!dragging) {
			canvas.style.cursor = "default";
			if (startNode.rightConnected == false) {
				startNode.outputHandleFill = HANDLE_COLOR_DEFAULT;
				startNode.createFirst(ctx);
			}
			nodesArray.forEach(node=>{
				if (node.rightConnected == false) {
					node.outputHandleFill = HANDLE_COLOR_DEFAULT;
					node.create(ctx);
				}
			})

			//HOVER ON START NODE
			if (startNode.isStartNodeSelected(mousePos.x, mousePos.y)) {
				canvas.style.cursor = "grab";
			}
			//HOVER ON START NODE CONNECTOR
			if (startNode.startNodeHandleSelected(mousePos.x, mousePos.y) == "output") {
				canvas.style.cursor = "pointer";
				if (startNode.rightConnected == false) {
					startNode.outputHandleFill = HANDLE_COLOR_HOVER;
					startNode.createFirst(ctx);
				}
			}

			nodesArray.forEach(node=>{
				//HOVER ON NODE
				if(node.isNodeSelected(mousePos.x, mousePos.y)){
					canvas.style.cursor = "grab";
				}
				//HOVER ON NODE CONNECTORS
				if (node.handleSelected(mousePos.x, mousePos.y) == "input") {
					canvas.style.cursor = "pointer";

					
					
				}
				else if (node.handleSelected(mousePos.x, mousePos.y) == "output") {
					canvas.style.cursor = "pointer";
					if (node.rightConnected == false) {
						node.outputHandleFill = HANDLE_COLOR_HOVER;
						node.create(ctx);
					}
				}
			})
			//OUTPUT TO INPUT CONNECTION
			if (outputConnected){
				canvas.style.cursor = "pointer";
				// RETRIEVING RUBBER LINE
				connectorArray[connectorArray.length - 1].endX = mousePos.x;
				connectorArray[connectorArray.length - 1].endY = mousePos.y;
				ctx.putImageData(imageData, 0, 0);
				connectorArray[connectorArray.length - 1].drawConnectorPath(ctx);
			}
		}
	}
			



	function mouseUp(e){
		var mousePos = getMousePos(canvas,e);
		if (dragging) {
			canvas.style.cursor = "grab";
			dragging = false;
			startNode.isDragging = false;
			nodesArray.forEach(node=>{
				if (node.isNodeSelected(mousePos.x, mousePos.y)){
					node.isDragging = false;
				}
			})
		}
		// IF CONNECTED TO ANY INPUT
		if (outputConnected) {
			for (var i = 0; i < nodesArray.length; i++){
				if (i != rightConnectId && nodesArray[i].leftConnected != true) {
					if (nodesArray[i].handleSelected(mousePos.x, mousePos.y) == "input") {
						outputConnected = false;
						nodesArray[i].leftConnected = true;
						console.log("left_node");
						nodesArray[i].inputHandleFill = HANDLE_COLOR_CLICK;//red color//
						console.log("colorchanged to red ");
						nodesArray[i].create(ctx);
						console.log(abcd);
						if (startNode.rightConnected == true) {
							startNode.outputHandleFill = HANDLE_COLOR_CLICK;//red color//
							abcd=nodesArray[i].nodeText;
							// EXCEL POPUP STARTS
							if(abcd == "Open Excel")
							{			
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_open_excel");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
								
							}

							else if(abcd== "Delete Excel")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_del_excel");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Filter Excel")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_filter");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Move Excel")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_move_excel");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Create Excel")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_create_excel");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Rename Excel")
								{
									console.log("condition entered");
									var popup = document.querySelector("#modalOne_rename_excel");
									popup.style.display = "block"; popup.style.overflow = "auto";
									startNode.createFirst(ctx);
								}
							else if(abcd== "Copy Excel")
								{
									console.log("condition entered");
									var popup = document.querySelector("#modalOne_copy_excel");
									popup.style.display = "block"; popup.style.overflow = "auto";
									startNode.createFirst(ctx);
								}
							else if(abcd== "Copy Data from one Excel to another")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_copy_data_sheet");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Search Values in Excel")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_search_value");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Create Sheet")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_create_sheet");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Select Sheet")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_sel_sheet");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Rename Sheet")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_rename_sheet");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Delete Sheet")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_del_sheet");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Copy Data from one Sheet to another")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_copy_data_sheet");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Delete Column")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_del_column");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Delete all Rows and Columns")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_del_row_col");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Delete Row")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_del_row");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Vlookup on same excel")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_vlookupsamesheet");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Vlookup on two excel")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_v_lookup");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Formula")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_filter");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Formula")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_filter");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Remove duplicates")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_remove_duplicate");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Max Column")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_maxcolumn");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Max Row")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_maxrow");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Roundoff values of columns")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_roundoff_column");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Password")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_password");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Sum If")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_sum_if");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Pivot table")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_pivot_table");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Paste special")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_paste_special");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Change header name")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_change_header");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Change datatype of column")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_col_datatype");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Convert Excel into CSV")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_excel_to_csv");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Read cell data")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_read_cell_data");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Expand all")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_expand_all");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Collapse all")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_collapse_all");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Sort Ascending or Descending")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_sort_asc_desc");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Run macros")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_run_macros");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							//EXCEL POPUP ENDS
							//CSV POPUP STARTS
							else if(abcd== "Read from CSV")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_read_from_csv");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Write to CSV")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_write_to_csv");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							//CSV POPUP ENDS
							//DIRECT WEB ACCESS POPUP STARTS
							else if(abcd== "Download small files from web")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_download_small_files");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Download large files from web")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_download_large_files");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Download multiple files from web")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_multiple_files");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							//DIRECT WEB ACCESS POPUP ENDS
							//EMAIL POPUP STARTS
							else if(abcd== "Send Email")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_send_email");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Retrieve Email")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_retrieve_email");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Send HTML Message")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_send_html_message");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Send Plain Text Message")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_send_plaintext_message");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Attach Excel")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_attach_excel");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Attach Word")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_attach_word");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Attach PPT")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_attach_ppt");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Attach Zip")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_attach_zip");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Attach Any Other Format")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_any_otherformat");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Save Attachment")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_save_attachment");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Delete All Messages")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_del_all_messages");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Delete Read Messages")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_del_read_messages");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Delete Unread Messages")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_del_unread_messages");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							//EMAIL POPUP ENDS
							// FILES POPUP STARTS
							else if(abcd== "Create new file")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_create_new_file");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Copy files")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_copy_files");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Move files")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_move_files");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Rename files")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_rename_files");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Delete files")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_delete_file");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Delete temporary files")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_delete_temporary_file");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Create files shortcut")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_create_files_shortcut");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Get files part")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_get_file_part");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Print file")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_print_file");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Print multile files")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_print_files");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Zip files")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_create_zip_file");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Unzip files")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_get_unzip_file");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							// FILES POPUP ENDS
							// FOLDER POPUP STARTS
							else if(abcd== "Open folder")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_open_folder");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Create folder")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_create_folder");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Copy folder")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_copy_folder");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Move folder")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_move_folder");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Rename folder")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_rename_folder");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Create shortcut")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_create_shortcut");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Delete shortcut")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_del_folder");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							// FOLDER POPUP ENDS
							// FTP POPUP STARTS
							else if(abcd== "Change directory")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_change_ftp_directory");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Download single file from FTP")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_download_single_ftp_file");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Download multiple files from FTP")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_download_multiple_ftp_files");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Download single folder from FTP")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_download_single_ftp_folder");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Download multiple folders from FTP")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_download_multiple_ftp_folders");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Upload single file to FTP")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_upload_single_ftp_file");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Upload multiple files to FTP")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_upload_multiple_ftp_files");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Upload single folder to FTP")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_upload_single_ftp_folder");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Upload single folder to FTP")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_upload_single_ftp_folder");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Upload multiple folders to FTP")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_upload_multiple_ftp_folders");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Delete FTP file")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_delete_ftp_files");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Rename FTP files")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_rename_ftp_file");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Create FTP directory")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_create_ftp_directory");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Delete FTP directory")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_delete_ftp_directory");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Invoke FTP command")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_invoke_ftp");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}

							//VASUDHA FTP
							else if(abcd== "Change Folder on FTP Server")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_change_folder_ftp");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Create Folder on FTP Server")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_create_folder_ftp");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Delete Folder")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_del_folder");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Delete File on FTP Server")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_file_delete_ftp");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Download File from FTP Server")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_file_download_ftp");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Rename File on FTP Server")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_file_rename_ftp");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Upload File on FTP Server")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_file_upload_ftp");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Delete Folder on FTP Server")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_folder_delete_ftp");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Upload Folder on FTP Server")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_folder_upload_ftp");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "FTP Connect")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_ftp_connect");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "FTP Disconnect")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_ftp_disconnect");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Secure FTP Connection")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_ftp_secure");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "FTP Connection")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_ftp_server");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "List FTP Server Directory")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_list_ftp_direct");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
			
							// FTP POPUP ENDS
							// PDF POPUP STARTS
							else if(abcd== "Create PDF")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_create_pdf");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Split PDF")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_split_pdf");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Concatenate PDF")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_concatenate_pdf");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Insert New Page")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_insert_newpage_pdf");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Insert Existing Page")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_insert_existingpage_pdf");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Encrypt PDF")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_encrypt_pdf");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Decrypt PDF")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_decrypt_pdf");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Extract Image from PDF")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_extract_image_pdf");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Extract Text from PDF")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_extract_text_pdf");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Extract Text from PDF using OCR")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_extract_text_ocr_pdf");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Extract Pages from PDF")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_extract_page_pdf");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Convert Any File to PDF")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_any_to_pdf");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Convert Word File to PDF")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_word_to_pdf");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Convert Excel File to PDF")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_excel_to_pdf");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Convert GIF File to PDF")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_gif_to_pdf");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Convert PDF to Word")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_pdf_to_word");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Convert PDF File to Excel")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_pdf_to_excel");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							// PDF POPUP ENDS
							// WEB DATA EXTRACTION POPUP STARTS
							else if(abcd== "Extract data from webpage")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_extract_data_from_webpage");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Take screenshot of webpage")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_take_screenshot_of_webpage");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							// WEB DATA EXTRACTION POPUP ENDS
							// ERROR HANDLE POPUP STARTS
							else if(abcd== "Begin Error Handling")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_begin_error_handling");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "End Error Handling")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_end_error_handling");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);
							}
							else if(abcd== "Continue Error Handling")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_continue_error_handling");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);     
							}
							else if(abcd== "Send Error Email")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_eh_send_email");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);     
							}
							else if(abcd== "Take Snapshot")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_take_snapshot");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);     
							}
							// ERROR HANDLE POPUP ENDS
							// OCR POPUP STARTS
							else if(abcd== "Create Tesseract OCR")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_Tesse_OCR_engine");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);     
							}
							else if(abcd== "Create Modi OCR")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_modi_OCR_enine");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);     
							}
							else if(abcd== "Text Extract OCR")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_text_extract_OCR");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);     
							}
							else if(abcd== "Image Capture URL")
							{
								console.log("condition entered");
								var popup = document.querySelector("#modalOne_image_capture_url");
								popup.style.display = "block"; popup.style.overflow = "auto";
								startNode.createFirst(ctx);     
							}
							// OCR POUP ENDS
						}
						// RESET INTUTION-changes node color to white again if any  node is not connected
						for (var j = 0; j < nodesArray.length; j++) {
							if (nodesArray[j].leftConnected == false) {
								nodesArray[j].inputHandleFill = HANDLE_COLOR_DEFAULT;//white color//
								nodesArray[j].create(ctx);
							}
						}
						connectorArray[connectorArray.length - 1].endX = mousePos.x;
						connectorArray[connectorArray.length - 1].endY = mousePos.y;
						connectorArray[connectorArray.length - 1].inputNodeId = i;
			

						console.log("Yea");
						console.log(nodesArray);
						console.log(connectorArray);
					}
				}
			}
			// IF ABOVE SEARCH FAILS/IF NOT CONNECTED TO ANY INPUT
			if (outputConnected) {
				console.log("no");
				outputConnected = false;
				// if (startNode.rightConnected == false) {
				// 	startNode.outputHandleFill = HANDLE_COLOR_HOVER;
				// 	startNode.createFirst(ctx);
				// }
				if (rightConnectId != "startNode") {
					nodesArray[rightConnectId].rightConnected = false;
					nodesArray[rightConnectId].outputHandleFill = HANDLE_COLOR_DEFAULT;
				}
				if (rightConnectId == "startNode") {
					startNode.rightConnected = false;
					startNode.outputHandleFill = HANDLE_COLOR_DEFAULT;
				}

				//RESET INTUTION
				for (var j = 0; j < nodesArray.length; j++) {
						if (nodesArray[j].leftConnected == false) {
							nodesArray[j].inputHandleFill = HANDLE_COLOR_DEFAULT;
						}
					}
				
				ctx.clearRect(0, 0, canvas.width, canvas.height);
				startNode.createFirst(ctx);
				nodesArray.forEach(node=>{
					node.create(ctx);
				})
				connectorArray.splice(-1,1);
				connectorArray.forEach(path=>{
				path.drawConnectorPath(ctx);
				})
			}
		}
		console.log(nodesArray);
	}


	function mouseOver(e){
		//ENTER  CANVAS AREA IN CODE HERE..
	}
	function mouseOut(e){
		//EXIT CANVAS AREA OUT CODE HERE..
	}

//--------------CLASSES AND METHODS*----------------------------------------------------

	
	// CONNECT NODE CREATE CLICK HERE WITH FUNCTION OR CLICK ON HTML ELEMENT OR WHATEVER..
	let startNode = new Node(50, 50, 100, 70, false, false, false);
	startNode.createFirst(ctx);

	window.addEventListener("resize", resizeCanvas, false);
	canvas.addEventListener("mousedown", mouseDown, false);
	canvas.addEventListener("mouseup", mouseUp, false);
	canvas.addEventListener("mousemove", mouseMove, false);
	canvas.addEventListener("mouseover", mouseOver, false);
	canvas.addEventListener("mouseout", mouseOut, false);
	excelMenu.addEventListener("click", nodesMenuClick, false);
	csvMenu.addEventListener("click", nodesMenuClick, false);
	dwa_menu.addEventListener("click", nodesMenuClick, false);
	email_menu.addEventListener("click", nodesMenuClick, false);
	files_menu.addEventListener("click", nodesMenuClick, false);
	folder_menu.addEventListener("click", nodesMenuClick, false);
	ftp_menu.addEventListener("click", nodesMenuClick, false);
	pdf_menu.addEventListener("click", nodesMenuClick, false);
	wde_menu.addEventListener("click", nodesMenuClick, false);
	error_handle_menu.addEventListener("click", nodesMenuClick, false);
	ocr_menu.addEventListener("click", nodesMenuClick, false);

	clr_nodes.addEventListener("click", clearNodes, false);
	undo_node.addEventListener("click", undoNodes, false);
	redo_node.addEventListener("click", redoNodes, false);
	
});

// POPUP'S TAB FUNCTION
function openCity(evt, cityName) {
	var i, tabcontent, tablinks;
	tabcontent = document.getElementsByClassName("tabcontent");
	for (i = 0; i < tabcontent.length; i++) {
		tabcontent[i].style.display = "none";
	}
	tablinks = document.getElementsByClassName("tablinks");
	for (i = 0; i < tablinks.length; i++) {
		tablinks[i].className = tablinks[i].className.replace(" active", "");
	}
	var showDiv = [...document.getElementsByClassName(cityName)];

	showDiv.forEach((div) => {
		console.log("Click Click");
		div.style.display = "block";
		div.style.overflow = "auto";
	});

	evt.currentTarget.className += " active";
}

// POPUP Close_Button
var closeBtns = [...document.querySelectorAll(".close")];
closeBtns.forEach(function(btn){
  btn.onclick = function() {
    var modal = btn.closest('.modal');
    modal.style.display = "none";
  }
});

window.onclick = function(event) {
  if (event.target.className === "modal") {
    event.target.style.display = "none";
  }
}

// NODES MENU DROPDOWN
let dropdownBtn = document.getElementsByClassName("dropdown-btn");
for(let i = 0;i < dropdownBtn.length;i++){
dropdownBtn[i].addEventListener("click",(e)=>{
	// alert("click");
  dropdownBtn[i].classList.toggle("showDrop");
});
}
