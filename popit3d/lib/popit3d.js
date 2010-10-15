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

function PopitGame()
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
        var balls = [
            {name:"ball-1",x:1,y:1,z:1,color:"r"},
            {name:"ball-2",x:1,y:1,z:2,color: "g"},
            {name:"ball-3",x:1,y:1,z:3,color: "b"},
            {name:"ball-4",x:1,y:1,z:4,color:"r"},
            {name:"ball-5",x:1,y:1,z:5,color: "g"},
            {name:"ball-6",x:1,y:2,z:1,color: "g"},
            {name:"ball-7",x:1,y:2,z:2,color: "g"},
            {name:"ball-8",x:1,y:2,z:3,color: "g"},
            {name:"ball-9",x:1,y:2,z:4,color: "g"},
            {name:"ball-10",x:1,y:2,z:5,color: "g"},
            {name:"ball-11",x:1,y:3,z:1,color:"r"},
            {name:"ball-12",x:1,y:3,z:2,color: "g"},
            {name:"ball-13",x:1,y:3,z:3,color: "b"},
            {name:"ball-14",x:1,y:3,z:4,color:"r"},
            {name:"ball-15",x:1,y:3,z:5,color: "g"},
            {name:"ball-16",x:1,y:4,z:1,color: "g"},
            {name:"ball-17",x:1,y:4,z:2,color: "g"},
            {name:"ball-18",x:1,y:4,z:3,color: "g"},
            {name:"ball-19",x:1,y:4,z:4,color: "g"},
            {name:"ball-20",x:1,y:4,z:5,color: "g"},
            {name:"ball-21",x:1,y:5,z:1,color:"r"},
            {name:"ball-22",x:1,y:5,z:2,color: "g"},
            {name:"ball-23",x:1,y:5,z:3,color: "b"},
            {name:"ball-24",x:1,y:5,z:4,color:"r"},
            {name:"ball-25",x:1,y:5,z:5,color: "g"},
            
            {name:"ball-26",x:2,y:1,z:1,color:"r"},
            {name:"ball-27",x:2,y:1,z:2,color: "g"},
            {name:"ball-28",x:2,y:1,z:3,color: "b"},
            {name:"ball-29",x:2,y:1,z:4,color:"r"},
            {name:"ball-30",x:2,y:1,z:5,color: "g"},
            {name:"ball-31",x:2,y:2,z:1,color: "g"},
            {name:"ball-32",x:2,y:2,z:2,color: "g"},
            {name:"ball-33",x:2,y:2,z:3,color: "g"},
            {name:"ball-34",x:2,y:2,z:4,color: "g"},
            {name:"ball-35",x:2,y:2,z:5,color: "g"},
            {name:"ball-36",x:2,y:3,z:1,color:"r"},
            {name:"ball-37",x:2,y:3,z:2,color: "g"},
            {name:"ball-38",x:2,y:3,z:3,color: "b"},
            {name:"ball-39",x:2,y:3,z:4,color:"r"},
            {name:"ball-40",x:2,y:3,z:5,color: "g"},
            {name:"ball-41",x:2,y:4,z:1,color: "g"},
            {name:"ball-42",x:2,y:4,z:2,color: "g"},
            {name:"ball-43",x:2,y:4,z:3,color: "g"},
            {name:"ball-44",x:2,y:4,z:4,color: "g"},
            {name:"ball-45",x:2,y:4,z:5,color: "g"},
            {name:"ball-46",x:2,y:5,z:1,color:"r"},
            {name:"ball-47",x:2,y:5,z:2,color: "g"},
            {name:"ball-48",x:2,y:5,z:3,color: "b"},
            {name:"ball-49",x:2,y:5,z:4,color:"r"},
            {name:"ball-50",x:2,y:5,z:5,color: "g"},
            
            {name:"ball-51",x:3,y:1,z:1,color:"r"},
            {name:"ball-52",x:3,y:1,z:2,color: "g"},
            {name:"ball-53",x:3,y:1,z:3,color: "b"},
            {name:"ball-54",x:3,y:1,z:4,color:"r"},
            {name:"ball-55",x:3,y:1,z:5,color: "g"},
            {name:"ball-56",x:3,y:2,z:1,color: "g"},
            {name:"ball-57",x:3,y:2,z:2,color: "g"},
            {name:"ball-58",x:3,y:2,z:3,color: "g"},
            {name:"ball-59",x:3,y:2,z:4,color: "g"},
            {name:"ball-60",x:3,y:2,z:5,color: "g"},
            {name:"ball-61",x:3,y:3,z:1,color:"r"},
            {name:"ball-62",x:3,y:3,z:2,color: "g"},                         
            {name:"ball-63",x:3,y:3,z:3,color: "b"},
            {name:"ball-64",x:3,y:3,z:4,color:"r"},
            {name:"ball-65",x:3,y:3,z:5,color: "g"},
            {name:"ball-66",x:3,y:4,z:1,color: "g"},
            {name:"ball-67",x:3,y:4,z:2,color: "g"},
            {name:"ball-68",x:3,y:4,z:3,color: "g"},
            {name:"ball-69",x:3,y:4,z:4,color: "g"},
            {name:"ball-70",x:3,y:4,z:5,color: "g"},
            {name:"ball-71",x:3,y:5,z:1,color:"r"},
            {name:"ball-72",x:3,y:5,z:2,color: "g"},
            {name:"ball-73",x:3,y:5,z:3,color: "b"},
            {name:"ball-74",x:3,y:5,z:4,color:"r"},
            {name:"ball-75",x:3,y:5,z:5,color: "g"},
            
            {name:"ball-76",x:4,y:1,z:1,color:"r"},
            {name:"ball-77",x:4,y:1,z:2,color: "g"},
            {name:"ball-78",x:4,y:1,z:3,color: "b"},
            {name:"ball-79",x:4,y:1,z:4,color:"r"},
            {name:"ball-80",x:4,y:1,z:5,color: "g"},
            {name:"ball-81",x:4,y:2,z:1,color: "g"},
            {name:"ball-82",x:4,y:2,z:2,color: "g"},
            {name:"ball-83",x:4,y:2,z:3,color: "g"},
            {name:"ball-84",x:4,y:2,z:4,color: "g"},
            {name:"ball-85",x:4,y:2,z:5,color: "g"},
            {name:"ball-86",x:4,y:3,z:1,color:"r"},
            {name:"ball-87",x:4,y:3,z:2,color: "g"},                         
            {name:"ball-88",x:4,y:3,z:3,color: "b"},
            {name:"ball-89",x:4,y:3,z:4,color:"r"},
            {name:"ball-90",x:4,y:3,z:5,color: "g"},
            {name:"ball-91",x:4,y:4,z:1,color: "y"},
            {name:"ball-92",x:4,y:4,z:2,color: "y"},
            {name:"ball-93",x:4,y:4,z:3,color: "g"},
            {name:"ball-94",x:4,y:4,z:4,color: "y"},
            {name:"ball-95",x:4,y:4,z:5,color: "b"},
            {name:"ball-96",x:4,y:5,z:1,color: "b"},
            {name:"ball-97",x:4,y:5,z:2,color: "g"},
            {name:"ball-98",x:4,y:5,z:3,color: "b"},
            {name:"ball-99",x:4,y:5,z:4,color: "r"},
            {name:"ball-100",x:4,y:5,z:5,color: "g"},
            
            {name:"ball-101",x:5,y:1,z:1,color: "r"},
            {name:"ball-102",x:5,y:1,z:2,color: "g"},
            {name:"ball-103",x:5,y:1,z:3,color: "b"},
            {name:"ball-104",x:5,y:1,z:4,color: "r"},
            {name:"ball-105",x:5,y:1,z:5,color: "g"},
            {name:"ball-106",x:5,y:2,z:1,color: "g"},
            {name:"ball-107",x:5,y:2,z:2,color: "g"},
            {name:"ball-108",x:5,y:2,z:3,color: "g"},
            {name:"ball-109",x:5,y:2,z:4,color: "g"},
            {name:"ball-110",x:5,y:2,z:5,color: "g"},
            {name:"ball-111",x:5,y:3,z:1,color:"r"},
            {name:"ball-112",x:5,y:3,z:2,color: "g"},                         
            {name:"ball-113",x:5,y:3,z:3,color: "b"},
            {name:"ball-114",x:5,y:3,z:4,color:"r"},
            {name:"ball-115",x:5,y:3,z:5,color: "g"},
            {name:"ball-116",x:5,y:4,z:1,color: "g"},
            {name:"ball-117",x:5,y:4,z:2,color: "g"},
            {name:"ball-118",x:5,y:4,z:3,color: "g"},
            {name:"ball-119",x:5,y:4,z:4,color: "g"},
            {name:"ball-120",x:5,y:4,z:5,color: "g"},
            {name:"ball-121",x:5,y:5,z:1,color:"r"},
            {name:"ball-122",x:5,y:5,z:2,color: "g"},
            {name:"ball-123",x:5,y:5,z:3,color: "b"},
            {name:"ball-124",x:5,y:5,z:4,color:"r"},
            {name:"ball-125",x:5,y:5,z:5,color: "g"} 
            
        ];
            
        var result = [];
            
        for ( var i in balls )
        {
            var ball = balls[i];
            var ballon = new Ballon(ball.name,ball.x,ball.y,ball.z,colorMap[ball.color],selectedColorMap[ball.color],ball.color);
            ballonPosIDX[ballon.getPosIDXKey()] = ballon;
            ballonNameIDX[ballon.getName()] = ballon;
            
            result[i] = this.getCubeNode(ball.name,colorMap[ball.color],coordinateMap[ball.x-1],coordinateMap[ball.y-1],coordinateMap[ball.z-1]);
        }
        return result;
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

var game = new PopitGame();

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

var yaw = 0;
var pitch = 0;
var lastX;
var lastY;
var dragging = false;

function PickHandle(ballId)
{
    var id = ballId;
    
    this.handle = function(event)
    {
        dragging = false;
        game.select("ball-" + id);
    }
}

for (i=1;i<125;i++)
{
    var handler = new PickHandle(i);
    SceneJS.withNode("ball-"+i).bind("picked", handler.handle);
}

SceneJS.withNode("theScene").render();

var canvas = document.getElementById("theCanvas");

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

canvas.addEventListener('mousedown', mouseDown, true);
canvas.addEventListener('mousemove', mouseMove, true);
canvas.addEventListener('mouseup', mouseUp, true);



