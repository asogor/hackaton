// SHAWN ART
// ART END


function Ballon(name,x,y,z,color,selectedColor,value)
{
    var id = name;
    var posX = x;
    var posY = y;
    var posZ = z;
    var color = color;
    var selectColor = selectedColor;
    var value = value;
    
    this.getPosIDXKey = function()
    {
        return "X" + x + "Y" + y + "Z" + z; 
    }
    
    this.moveToNext = function()
    {
        if(posY<5)
        {
            posY+=1;
        }
    }
    
    this.getName = function()
    {
        return name;
    }
    
    this.getColor = function()
    {
        return color;
    }
    
    this.getSelectedColor = function()
    {
        return selectColor;
    }
    
    this.getValue = function()
    {
        return value;
    }
    
    this.getPosition = function()
    {
        return {x:posX,y:posY,z:posZ};
    }
    
    this.getReleated = function()
    {
        return [
            "X" + x + "Y" + y + "Z" + (z+1),
            "X" + x + "Y" + y + "Z" + (z-1),
            "X" + (x+1) + "Y" + y + "Z" + z,
            "X" + (x-1) + "Y" + y + "Z" + z,
            "X" + x + "Y" + (y+1) + "Z" + z,
            "X" + x + "Y" + (y-1) + "Z" + z
        ];
    }
    
    this.getNextPosIDXKey = function()
    {
        if(y<5)
        {
            return "X" + x + "Y" + (y+1) + "Z" + z;
        }
        else
        {
            return null;
        }
    }
}

function PopitGame(loadedCallback)
{
    var colorGreen = { r: 0.0, g: 0.7, b: 0.0 };
    var colorBlue = { r: 0.0, g: 0.0, b: 0.7 };
    var colorYellow = { r: 0.7, g: 0.7, b: 0.0 };
    var colorRed = { r: 0.7, g: 0.0, b: 0.0 };
    var selectedColorGreen = { r: 0.0, g: 0.3, b: 0.0 };
    var selectedColorBlue = { r: 0.0, g: 0.0, b: 0.3 };
    var selectedColorYellow = { r: 0.3, g: 0.3, b: 0.0 };
    var selectedColorRed = { r: 0.3, g: 0.0, b: 0.0 };
    var coordinateMap = [-4,-2,0,2,4];
    var score = 0;
    
    var colorMap = {r:colorRed,b:colorBlue,g:colorGreen,y:colorYellow};
    var selectedColorMap = {r:selectedColorRed,b:selectedColorBlue,g:selectedColorGreen,y:selectedColorYellow};
    
    var ballonNameIDX = {};
    var ballonPosIDX = {};
    var selectedRootNameId = null;
    var selectedNodes = null;
    var nodes;
    
    // kick off load
    var jqueryNeedsMootoolsBind = this;
	$.getJSON('http://poppit3d.appspot.com/state', function(data) {
     	var balls = data.state;
     
        var result = [];
            
        for ( var i in balls )
        {
            var ball = balls[i];
            var ballon = new Ballon(ball[0],ball[1],ball[2],ball[3],colorMap[ball[4]],selectedColorMap[ball[4]],ball[4]);
            ballonPosIDX[ballon.getPosIDXKey()] = ballon;
            ballonNameIDX[ballon.getName()] = ballon;
            
            result[i] = jqueryNeedsMootoolsBind.getCubeNode(ball[0],colorMap[ball[4]],coordinateMap[ball[1]-1],coordinateMap[ball[2]-1],coordinateMap[ball[3]-1]);
        }
        nodes = result;
        loadedCallback();
	});
 
    
    this.getCubeNode = function(name,color,x,y,z)
    {
        return {
            id: "ROOT-" + name,
            type: "translate",
            x: x,
            y: y,
            z: z,
            nodes: [{
                    id: "MATERIAL-" + name,
                    type: "material",
                    baseColor:      color,
                    specularColor:  { r: 0.2, g: 0.2, b: 0.2 },
                    specular:       0.4,
                    shine:          5.0,
                    nodes: [
                        {
                            type: "node",
                            id: name,
                            nodes: [
                                {
                                    type: "sphere"
                                }
                            ]
                        }
                    ]
                }
            ]
        };
    }
    
    this.getCubeNodes = function()
    {
    	return nodes;
    }
       
    this.select = function(id)
    {
        if(selectedRootNameId)
        {
            var selectedMaterial = SceneJS.withNode("MATERIAL-" + selectedRootNameId);
            var selectedBallon = ballonNameIDX[selectedRootNameId];
            selectedMaterial.set("baseColor", selectedBallon.getColor());
            for( var idx in selectedNodes)
            {
                material = SceneJS.withNode("MATERIAL-" + selectedNodes[idx].getName());
                material.set("baseColor",  selectedNodes[idx].getColor());
            }
        }
        var material = SceneJS.withNode("MATERIAL-" + id);
        material.set("baseColor",  ballonNameIDX[id].getSelectedColor());
        selectedRootNameId = id;
        selectedNodes = this.findReleated(ballonNameIDX[id]);
        for( var idx in selectedNodes)
        {
            material = SceneJS.withNode("MATERIAL-" + selectedNodes[idx].getName());
            material.set("baseColor",  selectedNodes[idx].getSelectedColor());
            console.log("HIGHLIGHT: " + selectedNodes[idx].getPosIDXKey());
        }
    }
    
    this.findReleated = function(selectedBallon)
    {
        var noMatch = {};
        var match = {};
        var newMatch = {};
        
        var releated = selectedBallon.getReleated();
        while(releated.length > 0)
        {
            newMatch={};
            for ( var idx in releated )
            {
                // if the item exists
                var ballonTested = ballonPosIDX[releated[idx]];
                if(ballonTested)
                {
                    if(selectedBallon.getValue() == ballonTested.getValue())
                    {
                        // do we know this match?
                        if(!match[ballonTested.getName()])
                        {
                            match[ballonTested.getName()] = ballonTested;
                            newMatch[ballonTested.getName()] = ballonTested;
                        }
                    }
                    else
                    {
                        noMatch[ballonTested.getName()] = ballonTested;
                    }
                }
            }
            var extendedMap = {};
            // extend search to new releated
            for(var newMatchKey in newMatch)
            {
                var extended = newMatch[newMatchKey].getReleated();
                for( var e in extended)
                {
                    var extendedKey = extended[e];
                    // look for nodes we never have seen
                    // not in match, not in no match, and not a related we already seen
                    if((!match[extendedKey])&&(!noMatch[extendedKey])&&(!extendedMap[extendedKey]))
                    {
                        extendedMap[extendedKey] = extendedKey;
                    }   
                }
            }
            
            releated = [];
            for(var key in extendedMap)
            {
                releated.push(key);
            }
        }
            
        var result = [];
        
        for(var key in match){
            result.push(match[key]);
        }
        
        return result;
    }
    
    this.zoom = function(amt)
    {
        var eye = SceneJS.withNode("myEye");
        var zoom = eye.get("eye");
        zoom.z+=amt;
        eye.set("eye",zoom);
        SceneJS.withNode("theScene").render();
    }   
    
    this.pop = function()
    {        
        if((!selectedNodes)||(selectedNodes.length<2))
        {
            return;
        }
        
        for( var select in selectedNodes)
        {
            SceneJS.Message.sendMessage({
                    command: "update",
                    target: "ballonCube",
                    remove: {
                        node: "ROOT-" + selectedNodes[select].getName()
                    }
            });
            console.log("poped:" + selectedNodes[select].getPosIDXKey());
            delete ballonPosIDX[selectedNodes[select].getPosIDXKey()]
        }
        this.compressColumns();
    }
    
    this.compressColumns = function()
    {
        var columnKeys = [];
        var key = ""; 
        
        for (x=1;x<=5;x++)
        {
            for(z=1;z<=5;z++)
            {
                columnKeys = [];
                for(y=1;y<=5;y++)
                {
                    key = "X" + x + "Y" + y + "Z" + z;
                    columnKeys.push(key);
                }
                this.compressColumn(columnKeys);
            }
        }
    }
    
    this.compressColumn = function(column)
    {
        var me = null;
        var next = null;
        var nextKey = null;
        for(var key in column)
        {
            me = ballonPosIDX[column[key]];
            next = null;
            nextKey = null;
            
            if(me)
            {
                nextKey = me.getNextPosIDXKey();
                if(nextKey)
                {
                    next = ballonPosIDX[nextKey];
                    
                    if(!next)
                    {
                        delete ballonPosIDX[me.getPosIDXKey()];
                        var realPosition = this.translatePosition(me.getPosition());
                        console.log("FROM:" + me.getPosIDXKey() + " REAL x:" + realPosition.x + " y:" + realPosition.y + " z:" + realPosition.z);
                        me.moveToNext();
                        ballonPosIDX[me.getPosIDXKey()] = me;
                        realPosition = this.translatePosition(me.getPosition());
                        console.log("MOVED:" + me.getPosIDXKey() + " REAL x:" + realPosition.x + " y:" + realPosition.y + " z:" + realPosition.z);
                        
                        SceneJS.Message.sendMessage({
                                command: "update",
                                target: "ROOT-" + me.getName(),
                                set: realPosition
                        });
                    }
                }
            }
        }
    }
    
    this.translatePosition = function(logicalPosition)
    {
        return {x:coordinateMap[logicalPosition.x-1],z:coordinateMap[logicalPosition.z-1],y:coordinateMap[logicalPosition.y-1]};
    }
}

var gameReady = function() { 
	SceneJS.createNode({
	    type: "scene",
	    id: "theScene",
	    canvasId: 'theCanvas',
	    loggingElementId: "theLoggingDiv",
	
	    nodes: [
	        {
	            id: "myEye",
	            type: "lookAt",
	            eye : { x: 0, y: 0, z: -50},
	            look : { x : 0.0, y : -1.0, z : 0 },
	            up : { x: 0.0, y: 1.0, z: 0.0 },
	
	            nodes: [
	                {
	                    type: "camera",
	
	                    nodes: [
	                        {
	                            type: "light",
	                            mode:                 "dir",
	                            color:                  { r: 1.0, g: 1.0, b: 1.0 },
	                            diffuse:                true,
	                            specular:               true,
	                            dir:                    { x: 1.0, y: 1.0, z: -1.0 }
	                        },
	                        {
	                            type: "light",
	                            mode:                 "dir",
	                            color:                  {r: 1.0, g: 1.0, b: 1.0},
	                            diffuse:                true,
	                            specular:               true,
	                            dir:                    { x: 0.0, y: 1.0, z: -1.0 }
	                        },
	                        {
	                            type: "light",
	                            mode:                 "dir",
	                            color:                  {r: 1.0, g: 1.0, b: 1.0},
	                            diffuse:                true,
	                            specular:               true,
	                            dir:                    { x: -1.0, y: 0.0, z: -1.0 }
	                        },
	                        {
	                            type: "rotate",
	                            id: "pitch",
	                            angle: 0.0,
	                            x : 1.0,
	                            nodes: [
	                                {
	                                    type: "rotate",
	                                    id: "yaw",
	                                    angle: 0.0,
	                                    y : 1.0,
	
	                                    nodes: [
	                        {
	                            type: "node",
	                            nodes: [
	                                {
	                                    type: "node",
	                                    id: "ballonCube",
	
	                                    nodes: game.getCubeNodes()
	                                }   
	                            ]
	                        }
	                            ]}]}
	                    ]
	                }
	            ]
	        }
	    ]
	});
	
	for (i=1;i<125;i++)
	{
	    var handler = new PickHandle(i);
	    SceneJS.withNode("ball-"+i).bind("picked", handler.handle);
	}

	SceneJS.withNode("theScene").render();

	canvas.addEventListener('mousedown', mouseDown, true);
	canvas.addEventListener('mousemove', mouseMove, true);
	canvas.addEventListener('mouseup', mouseUp, true);

}

var game = new PopitGame(gameReady);

var yaw = 0;
var pitch = 0;
var lastX;
var lastY;
var dragging = false;
var canvas = document.getElementById("theCanvas");

function PickHandle(ballId)
{
    var id = ballId;
    
    this.handle = function(event)
    {
        dragging = false;
        game.select("ball-" + id);
    }
}

/* On mouse down, we render the scene in picking mode, passing in the 
 * mouse canvas coordinates. This will cause a scene render traversal in which
 * all the "picked" listeners will fire on nodes situated above whatever
 * geometry node was picked, as those nodes are visited.
 *
 */

function mouseDown(event) {
    lastX = event.clientX;
    lastY = event.clientY;
    dragging = true;
    game.pop();
}

function mouseUp() {
    dragging = false;
    SceneJS.withNode("theScene").render();
}

/* On a mouse drag, we'll re-render the scene, passing in
 * incremented angles in each time.
 */
function mouseMove(event) {
    if (dragging) {
        yaw += (event.clientX - lastX) * 0.5;
        pitch += (event.clientY - lastY) * -0.5;

        SceneJS.withNode("yaw").set("angle", yaw);
        SceneJS.withNode("pitch").set("angle", pitch);

        SceneJS.withNode("theScene").render();

        lastX = event.clientX;
        lastY = event.clientY;
    }
    else
    {
        SceneJS.withNode("theScene").pick(event.offsetX, event.offsetY);
    }
}



