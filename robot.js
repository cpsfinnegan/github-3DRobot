var rot = 0.0;
var rot2 = 1.0;
var rot3 = 1.0
var rot4 = 1.0;
var rot5 = 1.0
var rot6 = 1.0;
var trans = -6.0;
function initGL()
{
    let Red = 0
    let Green = Math.random()
    let Blue = Math.random()
 
    const canvas = document.getElementById('draw_surface')
    let gl = canvas.getContext('webgl2')

var move = document.getElementById('move_vert');
  var moveOut = document.getElementById('move_out');
  var x1 = document.getElementById('x1_vert');
  var y1 = document.getElementById('y1_vert');
  var z1 = document.getElementById('z1_vert');
  var x1_out = document.getElementById('x1_out');
  var y1_out = document.getElementById('y1_out');
  var z1_out = document.getElementById('z1_out');
  var x2 = document.getElementById('x2_vert');
  var y2 = document.getElementById('y2_vert');
  var z2 = document.getElementById('z2_vert');
  var x2_out = document.getElementById('x2_out');
  var y2_out = document.getElementById('y2_out');
  var z2_out = document.getElementById('z2_out');
  
  // If we don't have a GL context, give up now

  if (!gl) {
    alert('Unable to initialize WebGL. Your browser or machine may not support it.');
    return;
  }

  // Vertex shader program

  const vsSource = `
    attribute vec4 aVertexPosition;
    attribute vec4 aVertexColor;
    uniform mat4 uModelViewMatrix;
    uniform mat4 uProjectionMatrix;
    varying lowp vec4 vColor;
    void main(void) {
      gl_Position = uProjectionMatrix * uModelViewMatrix * aVertexPosition;
      vColor = aVertexColor;
    }
  `;

  // Fragment shader program

  const fsSource = `
    varying lowp vec4 vColor;
    void main(void) {
      gl_FragColor = vColor;
    }
  `;
  
  const shaderProgram = initShaderProgram(gl, vsSource, fsSource);
  // Collect all the info needed to use the shader program.
  // Look up which attributes our shader program is using
  // for aVertexPosition, aVevrtexColor and also
  // look up uniform locations.
  const programInfo = {
    program: shaderProgram,
    attribLocations: {
      vertexPosition: gl.getAttribLocation(shaderProgram, 'aVertexPosition'),
      vertexColor: gl.getAttribLocation(shaderProgram, 'aVertexColor'),
    },
    uniformLocations: {
      projectionMatrix: gl.getUniformLocation(shaderProgram, 'uProjectionMatrix'),
      modelViewMatrix: gl.getUniformLocation(shaderProgram, 'uModelViewMatrix'),
    },
  };
  
  const buffers = initBuffers(gl);
  
  drawScene(gl, programInfo, buffers, trans, rot, rot2, rot3, rot4, rot5, rot6);
  
  move.addEventListener('change', function(){
    moveOut.value = move.value;
    drawScene(gl, programInfo, buffers, moveOut.value, rot, rot2, rot3, rot4, rot5, rot6);
  }, false);
  
  move.addEventListener('input', function() {
    move_out.value = move.value;
    drawScene(gl, programInfo, buffers, moveOut.value, rot, rot2, rot3, rot4, rot5, rot6);
  }, false);
  
  x1.addEventListener('change', function() {
    x1_out.value = x1.value;
    drawScene(gl, programInfo, buffers, trans, x1_out.value, rot2, rot3, rot4, rot5, rot6);
  }, false);

  x1.addEventListener('input', function() {
    x1_out.value = x1.value;
    drawScene(gl, programInfo, buffers, trans, x1_out.value, rot2, rot3, rot4, rot5, rot6);
  }, false);

  y1.addEventListener('change', function() {
    y1_out.value = y1.value;
    drawScene(gl, programInfo, buffers, trans, rot, y1_out.value, rot3, rot4, rot5, rot6);
  }, false);

  y1.addEventListener('input', function() {
    y1_out.value = y1.value;
    drawScene(gl, programInfo, buffers, trans, rot, y1_out.value, rot3, rot4, rot5, rot6);
  }, false);

  z1.addEventListener('change', function() {
    z1_out.value = z1.value;
    drawScene(gl, programInfo, buffers, trans, rot, rot2, z1_out.value, rot4, rot5, rot6);
  }, false);

  z1.addEventListener('input', function() {
    z1_out.value = z1.value;
   drawScene(gl, programInfo, buffers, trans, rot, rot2, z1_out.value, rot4, rot5, rot6);
  }, false);
  
  x2.addEventListener('change', function() {
    x2_out.value = x2.value;
    drawScene(gl, programInfo, buffers, trans, rot, rot2, rot3, x2_out.value, rot5, rot6);
  }, false);

  x2.addEventListener('input', function() {
    x2_out.value = x2.value;
    drawScene(gl, programInfo, buffers, trans, rot, rot2, rot3, x2_out.value, rot5, rot6);
  }, false);

  y2.addEventListener('change', function() {
    y2_out.value = y2.value;
    drawScene(gl, programInfo, buffers, trans, rot, rot2, rot3, rot4, y2_out.value, rot6);
  }, false);

  y2.addEventListener('input', function() {
    y2_out.value = y2.value;
   drawScene(gl, programInfo, buffers, trans, rot, rot2, rot3, rot4, y2_out.value, rot6);
  }, false);

  z2.addEventListener('change', function() {
    z2_out.value = z2.value;
    drawScene(gl, programInfo, buffers, trans, rot, rot2, rot3, rot4, rot5, z2_out.value);
  }, false);

  z2.addEventListener('input', function() {
    z2_out.value = z2.value;
    drawScene(gl, programInfo, buffers, trans, rot, rot2, rot3, rot4, rot5, z2_out.value);
  }, false);
  
}
//
// initBuffers
//
// Initialize the buffers we'll need. For this demo, we just
// have one object -- a simple three-dimensional cube.
//
function initBuffers(gl) {

  // Create a buffer for the cube's vertex positions.

  const positionBuffer = gl.createBuffer();

  // Select the positionBuffer as the one to apply buffer
  // operations to from here out.

  gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);

  // Now create an array of positions for the cube.

  const positions = [
    // Front face
    -1.0, -1.0,  1.0,
     1.0, -1.0,  1.0,
     1.0,  1.0,  1.0,
    -1.0,  1.0,  1.0,

    // Back face
    -1.0, -1.0, -1.0,
    -1.0,  1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0, -1.0, -1.0,

    // Top face
    -1.0,  1.0, -1.0,
    -1.0,  1.0,  1.0,
     1.0,  1.0,  1.0,
     1.0,  1.0, -1.0,

    // Bottom face
    -1.0, -1.0, -1.0,
     1.0, -1.0, -1.0,
     1.0, -1.0,  1.0,
    -1.0, -1.0,  1.0,

    // Right face
     1.0, -1.0, -1.0,
     1.0,  1.0, -1.0,
     1.0,  1.0,  1.0,
     1.0, -1.0,  1.0,

    // Left face
    -1.0, -1.0, -1.0,
    -1.0, -1.0,  1.0,
    -1.0,  1.0,  1.0,
    -1.0,  1.0, -1.0,
  ];
  // Now pass the list of positions into WebGL to build the
  // shape. We do this by creating a Float32Array from the
  // JavaScript array, then use it to fill the current buffer.

  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);
  
  // Now set up the colors for the faces. We'll use solid colors
  // for each face.

  const faceColors = [
    [1.0,  1.0,  1.0,  1.0],    // Front face: white
    [1.0,  0.0,  0.0,  1.0],    // Back face: red
    [0.0,  1.0,  0.0,  1.0],    // Top face: green
    [0.0,  0.0,  1.0,  1.0],    // Bottom face: blue
    [1.0,  1.0,  0.0,  1.0],    // Right face: yellow
    [1.0,  0.0,  1.0,  1.0],    // Left face: purple
  ];

  // Convert the array of colors into a table for all the vertices.

  var colors = [];

  for (var j = 0; j < faceColors.length; ++j) {
    const c = faceColors[j];

    // Repeat each color four times for the four vertices of the face
    colors = colors.concat(c, c, c, c);
  }

  const colorBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, colorBuffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(colors), gl.STATIC_DRAW);

  // Build the element array buffer; this specifies the indices
  // into the vertex arrays for each face's vertices.

  const indexBuffer = gl.createBuffer();
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, indexBuffer);

  // This array defines each face as two triangles, using the
  // indices into the vertex array to specify each triangle's
  // position.

  const indices = [
    0,  1,  2,      0,  2,  3,    // front
    4,  5,  6,      4,  6,  7,    // back
    8,  9,  10,     8,  10, 11,   // top
    12, 13, 14,     12, 14, 15,   // bottom
    16, 17, 18,     16, 18, 19,   // right
    20, 21, 22,     20, 22, 23,   // left
  ];

  // Now send the element array to GL

  gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(indices), gl.STATIC_DRAW);

  return {
    position: positionBuffer,
    color: colorBuffer,
    indices: indexBuffer,
  };
}

//
// Draw the scene.
//
function drawScene(gl, programInfo, buffers,  t, r, r2, r3, r4, r5, r6) {
  gl.clearColor(0.0, 0.0, 0.0, 1.0);  // Clear to black, fully opaque
  gl.clearDepth(1.0);                 // Clear everything
  gl.enable(gl.DEPTH_TEST);           // Enable depth testing
  gl.depthFunc(gl.LEQUAL);            // Near things obscure far things

  // Clear the canvas before we start drawing on it.

  gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

  // Create a perspective matrix, a special matrix that is
  // used to simulate the distortion of perspective in a camera.
  // Our field of view is 45 degrees, with a width/height
  // ratio that matches the display size of the canvas
  // and we only want to see objects between 0.1 units
  // and 100 units away from the camera.
  trans = t;
  rot = r;
  rot2 = r2;
  rot3 = r3;
  rot4 = r4;
  rot5 = r5;
  rot6 = r6;
  const fieldOfView = 45 * Math.PI / 180;   // in radians
  const aspect = gl.canvas.clientWidth / gl.canvas.clientHeight;
  const zNear = 0.1;
  const zFar = 100.0;
  const projectionMatrix = glMatrix.mat4.create();

  // note: glmatrix.js always has the first argument
  // as the destination to receive the result.
  glMatrix.mat4.perspective(projectionMatrix,
                   fieldOfView,
                   aspect,
                   zNear,
                   zFar);
{
    const numComponents = 3;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.position);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexPosition,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexPosition);
  }

  // Tell WebGL how to pull out the colors from the color buffer
  // into the vertexColor attribute.
  {
    const numComponents = 4;
    const type = gl.FLOAT;
    const normalize = false;
    const stride = 0;
    const offset = 0;
    gl.bindBuffer(gl.ARRAY_BUFFER, buffers.color);
    gl.vertexAttribPointer(
        programInfo.attribLocations.vertexColor,
        numComponents,
        type,
        normalize,
        stride,
        offset);
    gl.enableVertexAttribArray(
        programInfo.attribLocations.vertexColor);
  }

  // Tell WebGL which indices to use to index the vertices
  gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, buffers.indices);
  // Set the drawing position to the "identity" point, which is
  // the center of the scene.
  
  let torsoModel = glMatrix.mat4.create();
  glMatrix.mat4.scale(torsoModel,     // destination matrix
                 torsoModel,     // matrix to translate
                 [1, 1.5, 0.5]);
                 
  let torsoToWorld = glMatrix.mat4.create();
 glMatrix.mat4.translate(torsoToWorld,     // destination matrix
                 torsoToWorld,     // matrix to translate
                 [0, 0, trans]);
glMatrix.mat4.rotate(torsoToWorld,  // destination matrix
              torsoToWorld,  // matrix to rotate
              rot * Math.PI/180,// amount to rotate in radians
              [0, 1, 0]);   
  let torso = glMatrix.mat4.create();
glMatrix.mat4.multiply(torso, torsoToWorld, torsoModel)

gl.useProgram(programInfo.program);

  // Set the shader uniforms

  gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      torso);

  {
  const vertexCount = 36;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }
  
  let armModel = glMatrix.mat4.create();
 glMatrix.mat4.translate(armModel,     // destination matrix
                 armModel,     // matrix to translate
                 [.5, 0.0, 0]);
  glMatrix.mat4.scale(armModel,     // destination matrix
                 armModel,     // matrix to translate
                 [.5, .25, 0.25]);
                 
  let armToWorld = glMatrix.mat4.create();
 glMatrix.mat4.translate(armToWorld,     // destination matrix
                 armToWorld,     // matrix to translate
                 [1.25, .125, 0.0]);
  
glMatrix.mat4.rotate(armToWorld,  // destination matrix
              armToWorld,  // matrix to rotate
              rot2 * Math.PI/180,// amount to rotate in radians
              [0, 0, 1]);   
  
  let arm = glMatrix.mat4.create();
  glMatrix.mat4.multiply(arm, torsoToWorld, armToWorld)
glMatrix.mat4.multiply(arm, arm, armModel)
gl.useProgram(programInfo.program);

  // Set the shader uniforms

  gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      arm);

  {
  const vertexCount = 36;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }
  
  let arm2Model = glMatrix.mat4.create();
 glMatrix.mat4.translate(arm2Model,     // destination matrix
                 arm2Model,     // matrix to translate
                 [.5, 0, 0]);
  glMatrix.mat4.scale(arm2Model,     // destination matrix
                 arm2Model,     // matrix to translate
                 [.25, .25, 0.5]);
                 
  let arm2ToWorld = glMatrix.mat4.create();
 glMatrix.mat4.translate(arm2ToWorld,     // destination matrix
                 arm2ToWorld,     // matrix to translate
                 [1.5, .125, 1.0]);
  glMatrix.mat4.rotate(arm2ToWorld,  // destination matrix
              arm2ToWorld,  // matrix to rotate
              rot2 * Math.PI/180,// amount to rotate in radians
              [0, 0, 1]);  
glMatrix.mat4.rotate(arm2ToWorld,  // destination matrix
              arm2ToWorld,  // matrix to rotate
              rot4 * Math.PI/180,// amount to rotate in radians
              [1, 0, 0]);   
  
  let arm2 = glMatrix.mat4.create();
  glMatrix.mat4.multiply(arm2, torsoToWorld, arm2ToWorld)
glMatrix.mat4.multiply(arm2, arm2, arm2Model)
gl.useProgram(programInfo.program);

  // Set the shader uniforms

  gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      arm2);

  {
  const vertexCount = 36;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);

  }
  
  let armModelB = glMatrix.mat4.create();
 glMatrix.mat4.translate(armModelB,     // destination matrix
                 armModelB,     // matrix to translate
                 [-.5, 0.0, 0]);
  glMatrix.mat4.scale(armModelB,     // destination matrix
                 armModelB,     // matrix to translate
                 [.5, .25, 0.25]);
                 
  let armToWorldB = glMatrix.mat4.create();
 glMatrix.mat4.translate(armToWorldB,     // destination matrix
                 armToWorldB,     // matrix to translate
                 [-1.25, .125, 0.0]);
  
glMatrix.mat4.rotate(armToWorldB,  // destination matrix
              armToWorldB,  // matrix to rotate
              rot3 * Math.PI/180,// amount to rotate in radians
              [0, 0, 1]);   
  
  let armB = glMatrix.mat4.create();
  glMatrix.mat4.multiply(armB, torsoToWorld, armToWorldB)
glMatrix.mat4.multiply(armB, armB, armModelB)
gl.useProgram(programInfo.program);

  // Set the shader uniforms

  gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      armB);

  {
  const vertexCount = 36;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
    //gl.drawArrays(gl.TRIANGLES, 0, 6*4);
  }
  
  let arm2ModelB = glMatrix.mat4.create();
 glMatrix.mat4.translate(arm2ModelB,     // destination matrix
                 arm2ModelB,     // matrix to translate
                 [-.5, 0, 0]);
  glMatrix.mat4.scale(arm2ModelB,     // destination matrix
                 arm2ModelB,     // matrix to translate
                 [.25, .25, 0.5]);
                 
  let arm2ToWorldB = glMatrix.mat4.create();
 glMatrix.mat4.translate(arm2ToWorldB,     // destination matrix
                 arm2ToWorldB,     // matrix to translate
                 [-1.5, .125, 1.0]);
  glMatrix.mat4.rotate(arm2ToWorldB,  // destination matrix
              arm2ToWorldB,  // matrix to rotate
              rot3 * Math.PI/180,// amount to rotate in radians
              [0, 0, 1]);  
glMatrix.mat4.rotate(arm2ToWorldB,  // destination matrix
              arm2ToWorldB,  // matrix to rotate
              rot5 * Math.PI/180,// amount to rotate in radians
              [1, 0, 0]);   
  
  let arm2B = glMatrix.mat4.create();
  glMatrix.mat4.multiply(arm2B, torsoToWorld, arm2ToWorldB)
glMatrix.mat4.multiply(arm2B, arm2B, arm2ModelB)
gl.useProgram(programInfo.program);

  // Set the shader uniforms

  gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      arm2B);

  {
  const vertexCount = 36;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }
  
  let headModel = glMatrix.mat4.create();
 glMatrix.mat4.translate(headModel,     // destination matrix
                 headModel,     // matrix to translate
                 [1.5, 2, -1]);
  glMatrix.mat4.scale(headModel,     // destination matrix
                 headModel,     // matrix to translate
                 [.5, .5, 0.5]);
                 
  let headToWorld = glMatrix.mat4.create();
 glMatrix.mat4.translate(headToWorld,     // destination matrix
                 headToWorld,     // matrix to translate
                 [-1.5, .125, 1.0]);
  glMatrix.mat4.rotate(headToWorld,  // destination matrix
              headToWorld,  // matrix to rotate
              rot6 * Math.PI/180,// amount to rotate in radians
              [0, 1, 0]);  
  
  let head = glMatrix.mat4.create();
  glMatrix.mat4.multiply(head, torsoToWorld, headToWorld)
glMatrix.mat4.multiply(head, head, headModel)
gl.useProgram(programInfo.program);

  // Set the shader uniforms

  gl.uniformMatrix4fv(
      programInfo.uniformLocations.projectionMatrix,
      false,
      projectionMatrix);
  gl.uniformMatrix4fv(
      programInfo.uniformLocations.modelViewMatrix,
      false,
      head);

  {
  const vertexCount = 36;
    const type = gl.UNSIGNED_SHORT;
    const offset = 0;
    gl.drawElements(gl.TRIANGLES, vertexCount, type, offset);
  }

}

function initShaderProgram(gl, vsSource, fsSource) {
  const vertexShader = loadShader(gl, gl.VERTEX_SHADER, vsSource);
  const fragmentShader = loadShader(gl, gl.FRAGMENT_SHADER, fsSource);

  // Create the shader program

  const shaderProgram = gl.createProgram();
  gl.attachShader(shaderProgram, vertexShader);
  gl.attachShader(shaderProgram, fragmentShader);
  gl.linkProgram(shaderProgram);

  // If creating the shader program failed, alert

  if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
    alert('Unable to initialize the shader program: ' + gl.getProgramInfoLog(shaderProgram));
    return null;
  }

  return shaderProgram;
}

//
// creates a shader of the given type, uploads the source and
// compiles it.
//
function loadShader(gl, type, source) {
  const shader = gl.createShader(type);

  // Send the source to the shader object

  gl.shaderSource(shader, source);

  // Compile the shader program

  gl.compileShader(shader);

  // See if it compiled successfully

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    alert('An error occurred compiling the shaders: ' + gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }

  return shader;
}