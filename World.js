// import { Matrix4, Vector3 } from "./libs/cuon-matrix-cse160";
/*
Student Name: Anh Le
Student UCSC email: mle288@ucsc.edu

Notes to Grader:
N/A
*/

// HelloPint2.js (c) 2012 matsuda
// Vertex shader program
var VSHADER_SOURCE = `
  precision mediump float;
  attribute vec4 a_Position;
  attribute vec2 a_UV;
  varying vec2 v_UV;
  uniform float u_Size; 
  uniform mat4 u_ModelMatrix;
  uniform mat4 u_GlobalRotateMatrix;
  uniform mat4 u_ViewMatrix;
  uniform mat4 u_ProjectionMatrix;
  void main() {
    gl_Position = u_ProjectionMatrix * u_ViewMatrix * u_GlobalRotateMatrix * u_ModelMatrix * a_Position;
    gl_PointSize = u_Size;
    v_UV = a_UV;
  }`;

// Fragment shader program
var FSHADER_SOURCE = `
  precision mediump float;
  varying vec2 v_UV;
  uniform vec4 u_FragColor;
  uniform sampler2D u_Sampler0;
  uniform sampler2D u_Sampler1;
  uniform sampler2D u_Sampler10;
  uniform sampler2D u_Sampler11;
  uniform sampler2D u_Sampler12;
  uniform sampler2D u_Sampler13;
  uniform int u_whichTexture;
  void main() {
    if (u_whichTexture == -2) { 
      gl_FragColor = u_FragColor; // use color
    }
    else if (u_whichTexture == -1) { 
      gl_FragColor = vec4(v_UV, 1.0, 1.0); // use  UV debug color
    }
    else if (u_whichTexture == 0) { 
      gl_FragColor = texture2D(u_Sampler0, v_UV);  // use texture1
    }
    else if (u_whichTexture == 10) { 
      gl_FragColor = texture2D(u_Sampler10, v_UV); // use texture10
    }
    else if (u_whichTexture == 11) { 
      gl_FragColor = texture2D(u_Sampler11, v_UV); // use texture11
    }
    else if (u_whichTexture == 12) { 
      gl_FragColor = texture2D(u_Sampler12, v_UV); // use texture12
    }
    else if (u_whichTexture == 13) { 
      gl_FragColor = texture2D(u_Sampler13, v_UV); // use texture13
    }
    else { 
      gl_FragColor = vec4(1, .2, .2, 1);  // error (reddish)
    }
  }`;

// Global Variables
let canvas;
let gl;
let a_Position;
let u_FragColor;
let a_UV;
let u_Size;
let u_ModelMatrix;
let u_ProjectionMatrix;
let u_ViewMatrix;
let u_GlobalRotateMatrix;
let u_Sampler0;
let u_Sampler10;
let u_Sampler11;
let u_Sampler12;
let u_Sampler13;
let u_whichTexture;

function setupWebGL() {
  // Retrieve <canvas> element
  canvas = document.getElementById("webgl");

  // Get the rendering context for WebGL
  //   gl = getWebGLContext(canvas);
  //   console.log(gl);
  gl = canvas.getContext("webgl", { preserveDrawingBuffer: true });
  //   console.log(gl);
  if (!gl) {
    console.log("Failed to get the rendering context for WebGL");
    return;
  }

  gl.enable(gl.DEPTH_TEST);
}

function connectVariablesToGLSL() {
  // Initialize shaders
  if (!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
    console.log("Failed to intialize shaders.");
    return;
  }

  // // Get the storage location of a_Position
  a_Position = gl.getAttribLocation(gl.program, "a_Position");
  if (a_Position < 0) {
    console.log("Failed to get the storage location of a_Position");
    return;
  }

  // // Get the storage location of a_UV
  a_UV = gl.getAttribLocation(gl.program, "a_UV");
  if (a_UV < 0) {
    console.log("Failed to get the storage location of a_UV");
    return;
  }

  // Get the storage location of u_ViewMatrix
  u_ViewMatrix = gl.getUniformLocation(gl.program, "u_ViewMatrix");
  if (!u_ViewMatrix) {
    console.log("Failed to get the storage location of u_ViewMatrix");
    return;
  }

  // Get the storage location of u_ProjectionMatrix
  u_ProjectionMatrix = gl.getUniformLocation(gl.program, "u_ProjectionMatrix");
  if (!u_ProjectionMatrix) {
    console.log("Failed to get the storage location of u_ProjectionMatrix");
    return;
  }

  // Get the storage location of u_FragColor
  u_FragColor = gl.getUniformLocation(gl.program, "u_FragColor");
  if (!u_FragColor) {
    console.log("Failed to get the storage location of u_FragColor");
    return;
  }

  // Get storage location of u_Sampler0
  u_Sampler0 = gl.getUniformLocation(gl.program, "u_Sampler0");
  if (!u_Sampler0) {
    console.log("Failed to get the storage location of u_Sampler0");
    return false;
  }

  // Get storage location of u_Sampler10
  u_Sampler10 = gl.getUniformLocation(gl.program, "u_Sampler10");
  if (!u_Sampler10) {
    console.log("Failed to get the storage location of u_Sampler10");
    return false;
  }

  // Get storage location of u_Sampler11
  u_Sampler11 = gl.getUniformLocation(gl.program, "u_Sampler11");
  if (!u_Sampler11) {
    console.log("Failed to get the storage location of u_Sampler11");
    return false;
  }

  // Get storage location of u_Sampler12
  u_Sampler12 = gl.getUniformLocation(gl.program, "u_Sampler12");
  if (!u_Sampler12) {
    console.log("Failed to get the storage location of u_Sampler12");
    return false;
  }

  // Get storage location of u_Sampler13
  u_Sampler13 = gl.getUniformLocation(gl.program, "u_Sampler13");
  if (!u_Sampler13) {
    console.log("Failed to get the storage location of u_Sampler13");
    return false;
  }

  // Get storage location of u_whichTexture
  u_whichTexture = gl.getUniformLocation(gl.program, "u_whichTexture");
  if (!u_whichTexture) {
    console.log("Failed to get the storage location of u_whichTexture");
    return false;
  }

  // Get the storage location of Size
  u_Size = gl.getUniformLocation(gl.program, "u_Size");
  if (!u_Size) {
    console.log("Failed to get the storage location of u_Size");
    return;
  }

  // Get the storage location of ModelMatrix
  u_ModelMatrix = gl.getUniformLocation(gl.program, "u_ModelMatrix");
  if (!u_ModelMatrix) {
    console.log("Failed to get the storage location of u_ModelMatrix");
    return;
  }

  // Get the storage location of u_GlobalRotateMatrix
  u_GlobalRotateMatrix = gl.getUniformLocation(
    gl.program,
    "u_GlobalRotateMatrix"
  );
  if (!u_GlobalRotateMatrix) {
    console.log("Failed to get the storage location of u_GlobalRotateMatrix");
    return;
  }
}

var g_timeStart = performance.now() / 200.0;
var g_time = performance.now() / 200 - g_timeStart;
function tick() {
  // Update the global time
  g_time = performance.now() / 200 - g_timeStart;
  // console.log(g_time);
  // Re-render the scene
  updateAnimationAngles();
  renderScene();

  // Request the next frame
  requestAnimationFrame(tick);
}

function updateAnimationAngles() {
  if (g_firstJointAngleAnimation) {
    g_firstJointAngle = 20 * Math.sin(g_time);
  }
  if (g_secondJointAngleAnimation) {
    g_secondJointAngle = 20 * Math.sin(0.5 * g_time);
  }
}

const POINT = 0;
const TRIANGLE = 1;
const CIRCLE = 2;

// Globals varibale realted to UI elements
let g_selectedColor = [0.0, 0.0, 0.0, 1.0];
let g_selectedSize = 5.0;
let g_seletectedType = POINT;
let g_globalAngleX = 0;
let g_globalAngleY = 0;
let g_firstJointAngle = 0;
let g_secondJointAngle = 0;
let numSegments = 3;
let g_firstJointAngleAnimation = false;
let g_secondJointAngleAnimation = false;

function addActionForHTML() {
  // // Get red color value
  // document.getElementById("redSlider").addEventListener("input", (event) => {
  //   g_selectedColor[0] = event.target.value / 255;
  // });
  // // Get green color value
  // document.getElementById("greenSlider").addEventListener("input", (event) => {
  //   g_selectedColor[1] = event.target.value / 255;
  // });
  // // Get blue color value
  // document.getElementById("blueSlider").addEventListener("input", (event) => {
  //   g_selectedColor[2] = event.target.value / 255;
  // });

  // // Get Size;
  // document.getElementById("sizeSlider").addEventListener("input", (event) => {
  //   g_selectedSize = event.target.value;
  // });

  // //clear Button event
  // document.getElementById("clearButton").addEventListener("click", () => {
  //   shapeList = [];
  //   renderScene();
  // });

  // // Get Shape
  // // Get Point Shape
  // document.getElementById("pointDrawButton").addEventListener("click", () => {
  //   g_seletectedType = POINT;
  //   console.log(g_seletectedType);
  // });
  // // Get Triangle Shape
  // document
  //   .getElementById("TriangleDrawButton")
  //   .addEventListener("click", () => {
  //     g_seletectedType = TRIANGLE;
  //   });
  // // Get Circle Shape
  // document.getElementById("circleDrawButton").addEventListener("click", () => {
  //   g_seletectedType = CIRCLE;
  //   console.log(g_seletectedType);
  // });
  // document
  //   .getElementById("segmentSlider")
  //   .addEventListener("input", (event) => {
  //     numSegments = parseInt(event.target.value);
  //   });

  document
    .getElementById("headSlider")
    .addEventListener("mousemove", (event) => {
      g_firstJointAngle = event.target.value;
      renderScene();
    });

  document
    .getElementById("noselider")
    .addEventListener("mousemove", (event) => {
      g_secondJointAngle = event.target.value;
      renderScene();
    });

  // Drawing picture
  // document.getElementById("drawPicture").addEventListener("click", drawPicture);
  document.getElementById("AnimationUpOffButton").onclick = function () {
    g_firstJointAngleAnimation = false;
  };
  document.getElementById("AnimationUpOnButton").onclick = function () {
    g_firstJointAngleAnimation = true;
  };

  document.getElementById("AnimationLowOffButton").onclick = function () {
    g_secondJointAngleAnimation = false;
  };
  document.getElementById("AnimationLowOnButton").onclick = function () {
    g_secondJointAngleAnimation = true;
  };
}

function main() {
  console.log(g_camera.eye);
  setupWebGL();
  connectVariablesToGLSL();

  // Add action for HTMl
  addActionForHTML();

  initTextures();

  // Register function (event handler) to be called on a mouse press
  canvas.onmousedown = click;
  canvas.onmousemove = (event) => {
    if (event.buttons === 1) {
      onMove(event);
    }
  };

  // On keypress
  document.onkeydown = keydown;

  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // renderScene();
  requestAnimationFrame(tick);

  //   // Draw
  //   gl.drawArrays(gl.POINTS, 0, 1);
  //   drawTriangle([0, 0.5, -0.5, -0.5, 0.5, -0.5]);
}

// var g_points = []; // The array for the position of a mouse press
// var g_colors = []; // The array to store the color of a point
// var g_sizes = []; // The array to store the size of a point

var shapeList = [];

function click(ev) {
  [x, y] = convertCoordinateEventToGl(ev);
  // Store the coordinates to g_points array
  //   g_points.push([x, y]);
  //   g_colors.push();
  //   g_sizes.push(g_selectedSize.slice());
  if (g_seletectedType === POINT) {
    point = new Point();
  } else if (g_seletectedType === TRIANGLE) {
    point = new Triangle();
  } else {
    point = new Circle();
    point.segment = numSegments;
  }
  point.color = g_selectedColor.slice();
  point.position = [x, y];
  point.size = g_selectedSize;
  shapeList.push(point);

  // Store the coordinates to g_points array
  //   if (x >= 0.0 && y >= 0.0) {
  //     // First quadrant
  //     g_colors.push([1.0, 0.0, 0.0, 1.0]); // Red
  //   } else if (x < 0.0 && y < 0.0) {
  //     // Third quadrant
  //     g_colors.push([0.0, 1.0, 0.0, 1.0]); // Green
  //   } else {
  //     // Others
  //     g_colors.push([1.0, 1.0, 1.0, 1.0]); // White
  //   }

  renderScene();
}

function convertCoordinateEventToGl(ev) {
  var x = ev.clientX; // x coordinate of a mouse pointer
  var y = ev.clientY; // y coordinate of a mouse pointer
  var rect = ev.target.getBoundingClientRect();

  x = (x - rect.left - canvas.width / 2) / (canvas.width / 2);
  y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);
  return [x, y];
}

let g_camera = new Camera();

// var g_map = [
//   [1, 1, 1, 1, 1, 1, 1, 1],
//   [1, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 0, 0, 0, 0, 1],
//   [1, 0, 0, 1, 1, 0, 0, 1],
// ];

var g_mapLen = 32;
let g_mapStatus = false;
var g_map;
var g_columnTexture;
var g_oreTexture = 4;
var g_maxColumnHeight = 4;

function setRandomColumnHeight() {
  // Map array
  g_map = new Array(g_mapLen);
  for (let i = 0; i < g_mapLen; i++) {
    // Each map position is a column height
    g_map[i] = new Array(g_mapLen);
    for (let j = 0; j < g_mapLen; j++) {
      // Make space in the middle
      if (
        Math.abs(g_mapLen / 2 - i) <= 10 &&
        Math.abs(g_mapLen / 2 - j) <= 10
      ) {
        g_map[i][j] = 0;
      } else {
        g_map[i][j] = Math.floor(Math.random() * g_maxColumnHeight);
      }
    }
  }
  console.log("map heights:", g_map);
}

function setOreRandom() {
  g_columnTexture = new Array(g_mapLen);
  for (let i = 0; i < g_mapLen; i++) {
    g_columnTexture[i] = new Array(g_mapLen);
    for (let j = 0; j < g_mapLen; j++) {
      g_columnTexture[i][j] = Math.floor(Math.random() * g_oreTexture) + 10;
    }
  }
}

//var bod = new Cube();
function drawMap() {
  var ore = new Cube();
  let oreMatrix = new Matrix4();
  for (let i = 0; i < g_mapLen; i++) {
    for (let j = 0; j < g_mapLen; j++) {
      for (let k = 0; k < g_map[i][j]; k++) {
        ore.textureNum = g_columnTexture[i][j];
        oreMatrix.setTranslate(i - g_mapLen / 2, -0.75 + k, j - g_mapLen / 2);
        ore.renderFast(oreMatrix);
      }
    }
  }
}

// function drawMap() {
//   for (x = 0; x < 8; x++) {
//     for (y = 0; y < 8; y++) {
//       if (g_map[x][y] === 1) {
//         var wall = new Cube();
//         wall.color = [1, 1, 1, 1];
//         let wallMatrix = new Matrix4();
//         wallMatrix.setTranslate(x - 4, -0.75, y - 4);
//         wall.drawCube(wallMatrix);
//       }
//     }
//   }
// }

function renderScene() {
  // Check the time at the start of this function
  var startTime = performance.now();

  // var startTime = performance.now();

  // var len = shapeList.length;
  // for (var i = 0; i < len; i++) {
  //   shapeList[i].render();
  // }

  // Pass projection matrix
  var projMat = new Matrix4();
  /**
   * Set the perspective projection matrix by fovy and aspect.
   * @param fovy The angle between the upper and lower sides of the frustum.
   * @param aspect The aspect ratio of the frustum. (width/height)
   * @param near The distances to the nearer depth clipping plane. This value must be plus value. Any object closer than near is not rendered.
   * @param far The distances to the farther depth clipping plane. This value must be plus value. Any object farther than far is not rendered.
   */
  projMat.setPerspective(90, canvas.width / canvas.height, 0.1, 1000);
  gl.uniformMatrix4fv(u_ProjectionMatrix, false, projMat.elements);

  // Pass view matrix
  var viewMat = new Matrix4();
  /**
   * Set the viewing matrix.
   * @param eyeX, eyeY, eyeZ The position of the eye point. The position of the camera (where the "eye" is).
   * @param centerX, centerY, centerZ The position of the reference point. The point the camera is looking at.
   * @param upX, upY, upZ The direction of the up vector. The direction of the "up" vector (which way is "up" for the camera).
   * @return this
   */
  viewMat.setLookAt(
    g_camera.eye.elements[0],
    g_camera.eye.elements[1],
    g_camera.eye.elements[2],
    g_camera.at.elements[0],
    g_camera.at.elements[1],
    g_camera.at.elements[2],
    g_camera.up.elements[0],
    g_camera.up.elements[1],
    g_camera.up.elements[2]
  );
  gl.uniformMatrix4fv(u_ViewMatrix, false, viewMat.elements);

  // Draw a test triangle
  // drawTriangle3D([-1.0, 0.0, 0.0, -0.5, -1.0, 0.0, 0.0, 0.0, 0.0]);
  var globalRotMat = new Matrix4().rotate(g_globalAngleX, 0, 1, 0);
  globalRotMat.rotate(g_globalAngleY, 1, 0, 0);
  gl.uniformMatrix4fv(u_GlobalRotateMatrix, false, globalRotMat.elements);

  // Set an initial value for this matrix to identity
  var identityM = new Matrix4();

  // Clear <canvas>

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  let world_size = 20;

  // skyBox
  var skyBox = new Cube();
  skyBox.color = [1.0, 0.2, 0.2, 1.0];
  skyBox.textureNum = 0;
  let skysBoxMatrix = new Matrix4();
  skysBoxMatrix.setTranslate(-1 * world_size, -2, -1 * world_size);
  skysBoxMatrix.scale(2 * world_size, 2 * world_size, 2 * world_size);
  skyBox.drawCube(skysBoxMatrix);

  // groundBox
  var groundBox = new Cube();
  groundBox.color = [0.4, 0.2, 0.2, 1.0];
  groundBox.textureNum = -2;
  let groundBoxMatrix = new Matrix4();
  groundBoxMatrix.setTranslate(-1 * world_size, -0.9, -1 * world_size);
  groundBoxMatrix.scale(2 * world_size, 0.1, 2 * world_size);
  groundBox.drawCube(groundBoxMatrix);

  // the map
  if (!g_mapStatus) {
    setRandomColumnHeight();
    setOreRandom();
    g_mapStatus = true;
  }
  drawMap();

  //draw a Body
  var body = new Cube();
  body.color = [1.0, 0.75, 0.8, 1.0];
  let bodyMatrix = new Matrix4();
  bodyMatrix.setTranslate(-0.25, -0.5, 0.0);
  bodyMatrix.rotate(5, 1, 0, 0);
  bodyMatrix.scale(0.5, 0.3, 1);
  body.drawCube(bodyMatrix);

  //draw a head
  var head = new Cube();
  head.color = [1.0, 0.75, 0.8, 1.0];
  let headMatrix = new Matrix4();
  headMatrix.setTranslate(-0.2, -0.4, -0.2);
  headMatrix.rotate(5, 1, 0, 0);
  var headCoordinate = new Matrix4(headMatrix);
  headMatrix.scale(0.4, 0.4, 0.4);
  head.drawCube(headMatrix);

  //draw a nose
  var nose = new Cube();
  nose.color = [1.0, 0.5, 0.6, 1.0];
  let NoseMatrix = new Matrix4(headCoordinate);
  NoseMatrix.translate(0.1, 0.05, 0.1);
  NoseMatrix.rotate(90, 0, 1, 0);
  NoseMatrix.rotate(5, 0, 1, 0);
  NoseMatrix.scale(0.2, 0.1, 0.2);
  nose.drawCube(NoseMatrix);

  //left front foot
  var leftFrontFoot = new Cube();
  leftFrontFoot.color = [1.0, 0.75, 0.8, 1.0];
  let leftFrontFootMatrix = new Matrix4();
  leftFrontFootMatrix.setTranslate(-0.25, -0.4, 0.1);
  leftFrontFootMatrix.rotate(90, 1, 0, 0);
  leftFrontFootMatrix.rotate(g_firstJointAngle, 1, 0, 0);
  var CoordinateFirstLeft = new Matrix4(leftFrontFootMatrix);
  leftFrontFootMatrix.scale(0.2, 0.2, 0.2);
  leftFrontFoot.drawCube(leftFrontFootMatrix);

  // right front foot
  var rightFrontFoot = new Cube();
  rightFrontFoot.color = [1.0, 0.75, 0.8, 1.0];
  let rightFrontFootMatrix = new Matrix4();
  rightFrontFootMatrix.setTranslate(0.05, -0.4, 0.1);
  rightFrontFootMatrix.rotate(90, 1, 0, 0);
  rightFrontFootMatrix.rotate(-g_firstJointAngle, 1, 0, 0);
  var CoordinateFirstRight = new Matrix4(rightFrontFootMatrix);
  rightFrontFootMatrix.scale(0.2, 0.2, 0.2);
  rightFrontFoot.drawCube(rightFrontFootMatrix);

  //=====================Lower Front=====================
  var leftFrontLowerFoot = new Cube();
  leftFrontLowerFoot.color = [1.0, 0.75, 0.8, 1.0];
  let leftFrontLowerFootMatrix = new Matrix4(CoordinateFirstLeft);
  leftFrontLowerFootMatrix.translate(-0.0, 0.0, 0.1);
  leftFrontLowerFootMatrix.rotate(g_secondJointAngle, 1, 0, 0);
  leftFrontLowerFootMatrix.scale(0.2, 0.2, 0.3);
  leftFrontLowerFoot.drawCube(leftFrontLowerFootMatrix);

  // //left right foot
  var rightFrontLowerFoot = new Cube();
  rightFrontLowerFoot.color = [1.0, 0.75, 0.8, 1.0];
  let rightFrontLowerFootMatrix = new Matrix4(CoordinateFirstRight);
  rightFrontLowerFootMatrix.translate(-0.0, 0.0, 0.1);
  rightFrontLowerFootMatrix.rotate(g_secondJointAngle, 1, 0, 0);
  rightFrontLowerFootMatrix.scale(0.2, 0.2, 0.3);
  rightFrontLowerFoot.drawCube(rightFrontLowerFootMatrix);

  //======================Back======================
  var leftBackFoot = new Cube();
  leftBackFoot.color = [1.0, 0.75, 0.8, 1.0];
  let leftBackFootMatrix = new Matrix4();
  leftBackFootMatrix.setTranslate(-0.25, -0.45, 0.7);
  leftBackFootMatrix.rotate(90, 1, 0, 0);
  leftBackFootMatrix.rotate(g_firstJointAngle, 1, 0, 0);
  var CoordinateThirdLeft = new Matrix4(leftBackFootMatrix);
  leftBackFootMatrix.scale(0.2, 0.2, 0.2);
  leftBackFoot.drawCube(leftBackFootMatrix);

  // right front foot
  var rightBackFoot = new Cube();
  rightBackFoot.color = [1.0, 0.75, 0.8, 1.0];
  let rightBackFootMatrix = new Matrix4();
  rightBackFootMatrix.setTranslate(0.05, -0.45, 0.7);
  rightBackFootMatrix.rotate(90, 1, 0, 0);
  rightBackFootMatrix.rotate(-g_firstJointAngle, 1, 0, 0);
  var CoordinateFourthRight = new Matrix4(rightBackFootMatrix);
  rightBackFootMatrix.scale(0.2, 0.2, 0.2);
  rightBackFoot.drawCube(rightBackFootMatrix);

  //======================Lower Back====================
  var leftBackLowerFoot = new Cube();
  leftBackLowerFoot.color = [1.0, 0.75, 0.8, 1.0];
  let leftBackLowerFootMatrix = new Matrix4(CoordinateThirdLeft);
  leftBackLowerFootMatrix.translate(-0.0, 0.0, 0.1);
  leftBackLowerFootMatrix.rotate(g_secondJointAngle, 1, 0, 0);
  leftBackLowerFootMatrix.scale(0.2, 0.2, 0.3);
  leftBackLowerFoot.drawCube(leftBackLowerFootMatrix);

  // //left right foot
  var rightBackLowerFoot = new Cube();
  rightBackLowerFoot.color = [1.0, 0.75, 0.8, 1.0];
  let rightBackLowerFootMatrix = new Matrix4(CoordinateFourthRight);
  rightBackLowerFootMatrix.translate(-0.0, 0.0, 0.1);
  rightBackLowerFootMatrix.rotate(g_secondJointAngle, 1, 0, 0);
  rightBackLowerFootMatrix.scale(0.2, 0.2, 0.3);
  rightBackLowerFoot.drawCube(rightBackLowerFootMatrix);

  var duration = performance.now() - startTime;
  sendTextToHTML(
    "ms: " + Math.floor(duration) + " fps: " + Math.floor(10000 / duration),
    "numdot"
  );
}

function drawPicture() {
  // Specify the color for clearing <canvas>
  gl.clearColor(0.0, 0.0, 0.0, 1.0);

  // Clear <canvas>

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  const i = Array.from({ length: 13 }, (_, i) => i * (0.9 / 12));

  // Brown Color
  let brown = new Triangle();
  brown.color = [0.5647, 0.3569, 0.1843, 1.0];
  brown.renderSpecific([i[3], i[5], i[5], i[7], i[6], i[3]]);
  brown.renderSpecific([i[3], i[5], i[5], i[2], i[6], i[3]]);
  brown.renderSpecific([i[5], i[2], i[6], i[3], i[6], i[1]]);
  brown.renderSpecific([i[5], i[2], i[6], i[1], i[2], -i[2]]);
  // Mirror
  brown.renderSpecific([-i[3], i[5], -i[5], i[7], -i[6], i[3]]);
  brown.renderSpecific([-i[3], i[5], -i[5], i[2], -i[6], i[3]]);
  brown.renderSpecific([-i[5], i[2], -i[6], i[3], -i[6], i[1]]);
  brown.renderSpecific([-i[5], i[2], -i[6], i[1], -i[2], -i[2]]);

  // Red Color
  let red = new Triangle();
  red.color = [0.5765, 0.2745, 0.3059, 1.0];
  red.renderSpecific([i[0], i[1], i[5], i[10], i[6], i[8]]);
  red.renderSpecific([i[5], i[10], i[6], i[8], i[7], i[7]]);
  red.renderSpecific([i[5], i[7], i[6], i[8], i[6], i[3]]);
  red.renderSpecific([i[6], i[8], i[7], i[7], i[6], i[3]]);
  red.renderSpecific([-i[0], i[1], -i[5], i[10], -i[6], i[8]]);
  red.renderSpecific([-i[5], i[10], -i[6], i[8], -i[7], i[7]]);
  red.renderSpecific([-i[5], i[7], -i[6], i[8], -i[6], i[3]]);
  red.renderSpecific([-i[6], i[8], -i[7], i[7], -i[6], i[3]]);

  // Gold color
  let gold = new Triangle();
  gold.color = [227 / 255, 188 / 255, 87 / 255, 255 / 255];
  gold.renderSpecific([i[0], i[1], i[2], i[12], i[5], i[10]]);
  gold.color = [0.9373, 0.8078, 0.4275, 1.0];
  gold.renderSpecific([i[0], i[1], i[2], i[12], i[0], i[12]]);
  gold.renderSpecific([i[0], -i[1], i[0], -i[3], i[2], -i[2]]);
  gold.renderSpecific([i[0], -i[1], i[1], i[0], i[2], -i[2]]);
  gold.renderSpecific([i[0], -i[1], i[1], i[0], i[2], -i[2]]);
  gold.renderSpecific([i[1], i[0], i[4], i[1], i[2], -i[2]]);
  gold.renderSpecific([i[1], i[0], i[3], i[2], i[4], i[1]]);
  gold.renderSpecific([i[1], i[0], i[0], i[1], i[3], i[2]]);
  //mirror

  gold.color = [227 / 255, 188 / 255, 87 / 255, 255 / 255];
  gold.renderSpecific([-i[0], i[1], -i[2], i[12], -i[5], i[10]]);
  gold.color = [0.9373, 0.8078, 0.4275, 1.0];
  gold.renderSpecific([-i[0], i[1], -i[2], i[12], -i[0], i[12]]);
  gold.renderSpecific([-i[0], -i[1], -i[0], -i[3], -i[2], -i[2]]);
  gold.renderSpecific([-i[0], -i[1], -i[1], i[0], -i[2], -i[2]]);
  gold.renderSpecific([-i[0], -i[1], -i[1], i[0], -i[2], -i[2]]);
  gold.renderSpecific([-i[1], i[0], -i[4], i[1], -i[2], -i[2]]);
  gold.renderSpecific([-i[1], i[0], -i[3], i[2], -i[4], i[1]]);
  gold.renderSpecific([-i[1], i[0], -i[0], i[1], -i[3], i[2]]);

  let skin = new Triangle();
  skin.color = [165 / 255, 129 / 255, 133 / 255, 1.0];
  skin.renderSpecific([i[0], i[1], i[0], -i[1], i[1], i[0]]);
  skin.renderSpecific([-i[0], i[1], -i[0], -i[1], -i[1], i[0]]);

  let white = new Triangle();
  white.color = [1.0, 1.0, 1.0, 1.0];
  white.renderSpecific([i[3], i[5], i[3], i[2], i[0], i[1]]);
  white.renderSpecific([-i[3], i[5], -i[3], i[2], -i[0], i[1]]);
}

// Set the text of a HTML elemnt
function sendTextToHTML(text, htmlID) {
  var htmlElm = document.getElementById(htmlID);
  if (!htmlElm) {
    console.log("Failed to get " + htmlID + " from HTML");
    return;
  }
  htmlElm.innerHTML = text;
}

function initTextures() {
  const textureFiles = [
    { name: "sky.jpg", handler: sendTextureToGLSL0 },
    { name: "./assets/coal.jpg", handler: sendTextureToGLSL10 },
    { name: "./assets/diamond.jpg", handler: sendTextureToGLSL11 },
    { name: "./assets/gold.jpg", handler: sendTextureToGLSL12 },
    { name: "./assets/iron.jpg", handler: sendTextureToGLSL13 },
  ];

  textureFiles.forEach((textureFile) => {
    var image = new Image();
    if (!image) {
      console.log("Failed to create Image object for image");
      return false;
    }
    image.onload = function () {
      textureFile.handler(image);
    };

    // Tell browser to load image
    image.src = textureFile.name;
  });

  return true;
}

function sendTextureToGLSL(image, textureUnit, sampler) {
  var texture = gl.createTexture();
  if (!texture) {
    console.log("Failed to create the texture object");
    return false;
  }

  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1); // Flip the image's y axis
  // Enable texture unit
  gl.activeTexture(gl[`TEXTURE${textureUnit}`]);
  // Bind the texture object to the target
  gl.bindTexture(gl.TEXTURE_2D, texture);

  // Set the texture parameters
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
  // Set the texture image
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGB, gl.RGB, gl.UNSIGNED_BYTE, image);

  // Set the texture unit 0 to the sampler
  gl.uniform1i(sampler, textureUnit);

  gl.clear(gl.COLOR_BUFFER_BIT); // Clear <canvas>

  //gl.drawArrays(gl.TRIANGLE_STRIP, 0, n); // Draw the rectangle
  console.log("Finished loadTexture");
}

function sendTextureToGLSL0(image) {
  sendTextureToGLSL(image, 0, u_Sampler0);
}

function sendTextureToGLSL10(image) {
  sendTextureToGLSL(image, 10, u_Sampler10);
}

function sendTextureToGLSL11(image) {
  sendTextureToGLSL(image, 11, u_Sampler11);
}

function sendTextureToGLSL12(image) {
  sendTextureToGLSL(image, 12, u_Sampler12);
}

function sendTextureToGLSL13(image) {
  sendTextureToGLSL(image, 13, u_Sampler13);
}

function keydown(ev) {
  if (ev.keyCode == 87) {
    // w
    g_camera.forward();
  } else if (ev.keyCode == 83) {
    // s
    g_camera.back();
  } else if (ev.keyCode == 65) {
    // a
    g_camera.left();
  } else if (ev.keyCode == 68) {
    // d
    g_camera.right();
  } else if (ev.keyCode == 69) {
    // e
    g_camera.panRight();
  } else if (ev.keyCode == 81) {
    // q
    g_camera.panLeft();
  }

  console.log(ev.keyCode);
  renderScene();
}

var origin = [0, 0];

function onMove(ev) {
  let [x, y] = convertCoordinates(ev);
  if (x < origin[0]) {
    g_globalAngleX -= 2;
  } else if (x > origin[0]) {
    g_globalAngleX += 2;
  }
  if (y < origin[1]) {
    g_globalAngleY -= 2;
  } else if (y > origin[1]) {
    g_globalAngleY += 2;
  }
  origin = [x, y];
}

function convertCoordinates(ev) {
  // x coordinate
  var x = ev.clientX;
  // y coordinate
  var y = ev.clientY;
  var rect = ev.target.getBoundingClientRect();

  x = (x - rect.left - canvas.width / 2) / (canvas.width / 2);
  y = (canvas.height / 2 - (y - rect.top)) / (canvas.height / 2);

  return [x, y];
}
