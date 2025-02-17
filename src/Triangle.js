/*
Student Name: Anh Le
Student UCSC email: mle288@ucsc.edu

Notes to Grader:
N/A
*/

class Triangle {
  constructor() {
    this.type = "triangle";
    this.position = [0.0, 0.0, 0.0]; // [x, y]
    this.color = [1.0, 1.0, 1.0, 1.0]; // [r, g, b, a]
    this.size = 5.0; // Size of the point
  }
  // Method to render the point
  render() {
    var xy = this.position;
    var rgba = this.color;
    var size = this.size;

    // Pass the position of a point to a_Position variable
    // gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
    // Pass the color of a point to u_FragColor variable
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    gl.uniform1f(u_Size, size);
    // Draw
    var d = this.size / 200;
    drawTriangle([xy[0], xy[1], xy[0] + d, xy[1], xy[0], xy[1] + d]);
  }
  // Method to render the point

  renderSpecific(vertices) {
    var xy = this.position;
    var rgba = this.color;
    var size = this.size;

    // Pass the position of a point to a_Position variable
    // gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
    // Pass the color of a point to u_FragColor variable
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);
    gl.uniform1f(u_Size, size);
    // Draw
    var d = this.size / 200;
    drawTriangle(vertices);
  }
}

// Drawing triangle function
function drawTriangle(vertices) {
  //   var vertices = new Float32Array([0, 0.5, -0.5, -0.5, 0.5, -0.5]);

  var n = 3; // The number of vertices

  // Create a buffer object
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log("Failed to create the buffer object");
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);
  gl.drawArrays(gl.TRIANGLES, 0, n);
}

function initTriangle3D() {
  g_vertexBuffer = gl.createBuffer();
  if (!g_vertexBuffer) {
    console.log("Failed to create vertex buffer");
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, g_vertexBuffer);
  // Write date into the buffer object
  //gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
  //gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

  /*var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }*/
  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);
}

function drawTriangle3D(vertices) {
  var n = vertices / 3; // The number of vertices

  if (g_vertexBuffer == null) {
    initTriangle3D();
  }

  /*// Create a buffer object
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);
  //gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);*/

  /*var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
  if (a_Position < 0) {
    console.log('Failed to get the storage location of a_Position');
    return -1;
  }*/
  // Assign the buffer object to a_Position variable
  /*gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);*/

  gl.drawArrays(gl.TRIANGLES, 0, n);
  return n;
}

function drawTriangle3DUV(vertices, uv) {
  var n = 3; // The number of vertices

  // Create a buffer object for positions
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log("Failed to create the buffer object");
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.DYNAMIC_DRAW);

  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(a_Position, 3, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);

  // Create buffer object for UV
  var uvBuffer = gl.createBuffer();
  if (!uvBuffer) {
    console.log("Failed to create the buffer object");
    return -1;
  }

  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, uvBuffer);

  // Write date into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(uv), gl.DYNAMIC_DRAW);

  // Assign the buffer object to a_UV variable
  gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, 0, 0);

  // Enable the assignment to a_UV variable
  gl.enableVertexAttribArray(a_UV);

  // Draw the triangle
  gl.drawArrays(gl.TRIANGLES, 0, n);
  g_vertexBuffer = null;
}

function drawMultipleTriangleUV(arr_input) {
  var vertexLength = 5 * Float32Array.BYTES_PER_ELEMENT;
  var vertex_offset = 0;
  var uv_offset = 3 * Float32Array.BYTES_PER_ELEMENT;

  // The number of vertices
  var n = arr_input.length / 5;

  /*// Create a buffer object for positions
  var vertexBuffer = gl.createBuffer();
  if (!vertexBuffer) {
    console.log('Failed to create the buffer object');
    return -1;
  }*/

  var allBuffer = gl.createBuffer();
  if (!allBuffer) {
    console.log("Failed to create the buffer object");
    return -1;
  }
  // Bind the buffer object to target
  gl.bindBuffer(gl.ARRAY_BUFFER, allBuffer);

  // Write data into the buffer object
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(arr_input), gl.DYNAMIC_DRAW);

  // Assign the buffer object to a_Position variable
  gl.vertexAttribPointer(
    a_Position,
    3,
    gl.FLOAT,
    false,
    vertexLength,
    vertex_offset
  );

  // Enable the assignment to a_Position variable
  gl.enableVertexAttribArray(a_Position);

  // Assign the buffer object to a_UV variable
  gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, vertexLength, uv_offset);

  // Enable the assignment to a_UV variable
  gl.enableVertexAttribArray(a_UV);

  // Draw the triangle
  gl.drawArrays(gl.TRIANGLES, 0, n);
  return n;
}
