

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
    
    this.getCubeNodes = function()
    {
        var balls = [
            {name:"ball-1",x:-3,y:-3,z:-3,color:"r"},
            {name:"ball-2",x:-3,y:-3,z:0,color: "g"},
            {name:"ball-3",x:-3,y:-3,z:3,color: "b"}];
            
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
                        ///rotate
                    ]
                }
            ]
        }
    ]
});

SceneJS.withNode("ball-1").bind("picked",
        function(event) {
            alert("Picked: 'test2'");
        });

SceneJS.withNode("ball-2").bind("picked",
        function(event) {
            alert("Picked: 'test'");
        });


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



