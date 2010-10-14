

function PopitGame()
{
    var colorGreen = { r: 0.0, g: 0.7, b: 0.0 };
    var colorBlue = { r: 0.0, g: 0.0, b: 0.7 };
    var colorYellow = { r: 0.0, g: 0.0, b: 0.7 };
    var colorRed = { r: 0.7, g: 0.0, b: 0.0 };
    
    var colorMap = {r:colorRed,b:colorBlue,g:colorGreen,y:colorYellow};
    
    this.getCubeNode = function(name,color,x,y,z)
    {
        return {
            type: "translate",
            x: x,
            y: y,
            z: z,
            nodes: [{
                    type: "material",
                    baseColor:      color,
                    specularColor:  { r: 0.9, g: 0.9, b: 0.9 },
                    specular:       0.9,
                    shine:          6.0,
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
    
    this.pickABall = function(event) {
            alert("Picked: a Ballon " + event);
    }
        
    this.getCubeNodes = function()
    {
        var balls = [
            {name:"ball-1",x:-4,y:-4,z:-4,color:"r"},
            {name:"ball-2",x:-4,y:-4,z:-2,color: "g"},
            {name:"ball-3",x:-4,y:-4,z:0,color: "b"},
            {name:"ball-4",x:-4,y:-4,z:2,color:"r"},
            {name:"ball-5",x:-4,y:-4,z:4,color: "g"},
            {name:"ball-6",x:-4,y:-2,z:-4,color: "g"},
            {name:"ball-7",x:-4,y:-2,z:-2,color: "g"},
            {name:"ball-8",x:-4,y:-2,z:0,color: "g"},
            {name:"ball-9",x:-4,y:-2,z:2,color: "g"},
            {name:"ball-10",x:-4,y:-2,z:4,color: "g"},
            {name:"ball-11",x:-4,y:0,z:-4,color:"r"},
            {name:"ball-12",x:-4,y:0,z:-2,color: "g"},
            {name:"ball-13",x:-4,y:0,z:0,color: "b"},
            {name:"ball-14",x:-4,y:0,z:2,color:"r"},
            {name:"ball-15",x:-4,y:0,z:4,color: "g"},
            {name:"ball-16",x:-4,y:2,z:-4,color: "g"},
            {name:"ball-17",x:-4,y:2,z:-2,color: "g"},
            {name:"ball-18",x:-4,y:2,z:0,color: "g"},
            {name:"ball-19",x:-4,y:2,z:2,color: "g"},
            {name:"ball-20",x:-4,y:2,z:4,color: "g"},
            {name:"ball-21",x:-4,y:4,z:-4,color:"r"},
            {name:"ball-22",x:-4,y:4,z:-2,color: "g"},
            {name:"ball-23",x:-4,y:4,z:0,color: "b"},
            {name:"ball-24",x:-4,y:4,z:2,color:"r"},
            {name:"ball-25",x:-4,y:4,z:4,color: "g"},
            
            {name:"ball-26",x:-2,y:-4,z:-4,color:"r"},
            {name:"ball-27",x:-2,y:-4,z:-2,color: "g"},
            {name:"ball-28",x:-2,y:-4,z:0,color: "b"},
            {name:"ball-29",x:-2,y:-4,z:2,color:"r"},
            {name:"ball-30",x:-2,y:-4,z:4,color: "g"},
            {name:"ball-31",x:-2,y:-2,z:-4,color: "g"},
            {name:"ball-32",x:-2,y:-2,z:-2,color: "g"},
            {name:"ball-33",x:-2,y:-2,z:0,color: "g"},
            {name:"ball-34",x:-2,y:-2,z:2,color: "g"},
            {name:"ball-35",x:-2,y:-2,z:4,color: "g"},
            {name:"ball-36",x:-2,y:0,z:-4,color:"r"},
            {name:"ball-37",x:-2,y:0,z:-2,color: "g"},
            {name:"ball-38",x:-2,y:0,z:0,color: "b"},
            {name:"ball-39",x:-2,y:0,z:2,color:"r"},
            {name:"ball-40",x:-2,y:0,z:4,color: "g"},
            {name:"ball-41",x:-2,y:2,z:-4,color: "g"},
            {name:"ball-42",x:-2,y:2,z:-2,color: "g"},
            {name:"ball-43",x:-2,y:2,z:0,color: "g"},
            {name:"ball-44",x:-2,y:2,z:2,color: "g"},
            {name:"ball-45",x:-2,y:2,z:4,color: "g"},
            {name:"ball-46",x:-2,y:4,z:-4,color:"r"},
            {name:"ball-47",x:-2,y:4,z:-2,color: "g"},
            {name:"ball-48",x:-2,y:4,z:0,color: "b"},
            {name:"ball-49",x:-2,y:4,z:2,color:"r"},
            {name:"ball-50",x:-2,y:4,z:4,color: "g"},
            
            {name:"ball-51",x:0,y:-4,z:-4,color:"r"},
            {name:"ball-52",x:0,y:-4,z:-2,color: "g"},
            {name:"ball-53",x:0,y:-4,z:0,color: "b"},
            {name:"ball-54",x:0,y:-4,z:2,color:"r"},
            {name:"ball-55",x:0,y:-4,z:4,color: "g"},
            {name:"ball-56",x:0,y:-2,z:-4,color: "g"},
            {name:"ball-57",x:0,y:-2,z:-2,color: "g"},
            {name:"ball-58",x:0,y:-2,z:0,color: "g"},
            {name:"ball-59",x:0,y:-2,z:2,color: "g"},
            {name:"ball-60",x:0,y:-2,z:4,color: "g"},
            {name:"ball-61",x:0,y:0,z:-4,color:"r"},
            {name:"ball-62",x:0,y:0,z:-2,color: "g"},                         
            {name:"ball-63",x:0,y:0,z:0,color: "b"},
            {name:"ball-64",x:0,y:0,z:2,color:"r"},
            {name:"ball-65",x:0,y:0,z:4,color: "g"},
            {name:"ball-66",x:0,y:2,z:-4,color: "g"},
            {name:"ball-67",x:0,y:2,z:-2,color: "g"},
            {name:"ball-68",x:0,y:2,z:0,color: "g"},
            {name:"ball-69",x:0,y:2,z:2,color: "g"},
            {name:"ball-70",x:0,y:2,z:4,color: "g"},
            {name:"ball-71",x:0,y:4,z:-4,color:"r"},
            {name:"ball-72",x:0,y:4,z:-2,color: "g"},
            {name:"ball-73",x:0,y:4,z:0,color: "b"},
            {name:"ball-74",x:0,y:4,z:2,color:"r"},
            {name:"ball-75",x:0,y:4,z:4,color: "g"},
            
            {name:"ball-76",x:2,y:-4,z:-4,color:"r"},
            {name:"ball-77",x:2,y:-4,z:-2,color: "g"},
            {name:"ball-78",x:2,y:-4,z:0,color: "b"},
            {name:"ball-79",x:2,y:-4,z:2,color:"r"},
            {name:"ball-80",x:2,y:-4,z:4,color: "g"},
            {name:"ball-81",x:2,y:-2,z:-4,color: "g"},
            {name:"ball-82",x:2,y:-2,z:-2,color: "g"},
            {name:"ball-83",x:2,y:-2,z:0,color: "g"},
            {name:"ball-84",x:2,y:-2,z:2,color: "g"},
            {name:"ball-85",x:2,y:-2,z:4,color: "g"},
            {name:"ball-86",x:2,y:0,z:-4,color:"r"},
            {name:"ball-87",x:2,y:0,z:-2,color: "g"},                         
            {name:"ball-88",x:2,y:0,z:0,color: "b"},
            {name:"ball-89",x:2,y:0,z:2,color:"r"},
            {name:"ball-90",x:2,y:0,z:4,color: "g"},
            {name:"ball-91",x:2,y:2,z:-4,color: "g"},
            {name:"ball-92",x:2,y:2,z:-2,color: "g"},
            {name:"ball-93",x:2,y:2,z:0,color: "g"},
            {name:"ball-94",x:2,y:2,z:2,color: "g"},
            {name:"ball-95",x:2,y:2,z:4,color: "g"},
            {name:"ball-96",x:2,y:4,z:-4,color:"r"},
            {name:"ball-97",x:2,y:4,z:-2,color: "g"},
            {name:"ball-98",x:2,y:4,z:0,color: "b"},
            {name:"ball-99",x:2,y:4,z:2,color:"r"},
            {name:"ball-100",x:2,y:4,z:4,color: "g"},
            
            {name:"ball-101",x:4,y:-4,z:-4,color:"r"},
            {name:"ball-102",x:4,y:-4,z:-2,color: "g"},
            {name:"ball-103",x:4,y:-4,z:0,color: "b"},
            {name:"ball-104",x:4,y:-4,z:2,color:"r"},
            {name:"ball-105",x:4,y:-4,z:4,color: "g"},
            {name:"ball-106",x:4,y:-2,z:-4,color: "g"},
            {name:"ball-107",x:4,y:-2,z:-2,color: "g"},
            {name:"ball-108",x:4,y:-2,z:0,color: "g"},
            {name:"ball-109",x:4,y:-2,z:2,color: "g"},
            {name:"ball-110",x:4,y:-2,z:4,color: "g"},
            {name:"ball-111",x:4,y:0,z:-4,color:"r"},
            {name:"ball-112",x:4,y:0,z:-2,color: "g"},                         
            {name:"ball-113",x:4,y:0,z:0,color: "b"},
            {name:"ball-114",x:4,y:0,z:2,color:"r"},
            {name:"ball-115",x:4,y:0,z:4,color: "g"},
            {name:"ball-116",x:4,y:2,z:-4,color: "g"},
            {name:"ball-117",x:4,y:2,z:-2,color: "g"},
            {name:"ball-118",x:4,y:2,z:0,color: "g"},
            {name:"ball-119",x:4,y:2,z:2,color: "g"},
            {name:"ball-120",x:4,y:2,z:4,color: "g"},
            {name:"ball-121",x:4,y:4,z:-4,color:"r"},
            {name:"ball-122",x:4,y:4,z:-2,color: "g"},
            {name:"ball-123",x:4,y:4,z:0,color: "b"},
            {name:"ball-124",x:4,y:4,z:2,color:"r"},
            {name:"ball-125",x:4,y:4,z:4,color: "g"} 
            
        ];
            
        var result = [];
            
        for ( var i in balls )
        {
            var ball = balls[i];
            result[i] = this.getCubeNode(ball.name,colorMap[ball.color],ball.x,ball.y,ball.z);
        }
        return result;
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
            type: "lookAt",
            eye : { x: 0, y: 2, z: -50},
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

function PickHandle(ballId)
{
    var id = ballId;
    
    this.do = function(event)
    {
        alert("Grab BALL " + id);
    }
}

for (i=1;i<125;i++)
{
    var handler = new PickHandle(i);
    SceneJS.withNode("ball-"+i).bind("picked", handler.do);
}


var yaw = 0;
var pitch = 0;
var lastX;
var lastY;
var dragging = false;

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
    SceneJS.withNode("theScene").pick(event.offsetX, event.offsetY);
}

function mouseUp() {
    dragging = false;
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
}

canvas.addEventListener('mousedown', mouseDown, true);
canvas.addEventListener('mousemove', mouseMove, true);
canvas.addEventListener('mouseup', mouseUp, true);



