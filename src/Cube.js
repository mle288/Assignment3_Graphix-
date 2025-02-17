// import { Matrix4 } from "./libs/cuon-matrix-cse160";
/*
Student Name: Anh Le
Student UCSC email: mle288@ucsc.edu

Notes to Grader:
N/A
*/

class Cube {
  constructor() {
    this.type = "cube";
    //   this.position = [0.0, 0.0, 0.0]; // [x, y]
    this.color = [1.0, 1.0, 1.0, 1.0]; // [r, g, b, a]
    // this.size = 5.0; // Size of the point
    this.matrix = new Matrix4();
    this.textureNum = -2;
    this.cubeVerts = new Float32Array([
      0.0, 0.0, 0.0, 0, 0, 1.0, 1.0, 0.0, 1, 1, 1.0, 0.0, 0.0, 1, 0, 0.0, 0.0,
      0.0, 0, 0, 0.0, 1.0, 0.0, 0, 1, 1.0, 1.0, 0.0, 1, 1, 0.0, 0.0, 1.0, 0, 0,
      1.0, 1.0, 1.0, 1, 1, 1.0, 0.0, 1.0, 1, 0, 0.0, 0.0, 1.0, 0, 0, 0.0, 1.0,
      1.0, 0, 1, 1.0, 1.0, 1.0, 1, 1, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0,
      1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0,
      1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0,
      1.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0,
      0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0,
      0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0,
      0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 1.0,

      1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0,
      1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0,
    ]);
  }
  // Method to render the point
  drawCube(M) {
    if (!M) {
      console.error("Error: Matrix M is undefined.");
      return;
    }
    this.matrix = M;
    // var xy = this.position;
    var rgba = this.color;
    // var size = this.size;

    // Pass the texture number
    gl.uniform1i(u_whichTexture, this.textureNum);

    // Pass the position of a point to a_Position variable
    // gl.vertexAttrib3f(a_Position, xy[0], xy[1], 0.0);
    // Pass the color of a point to u_FragColor variable
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

    // gl.uniform1f(u_Size, size);
    // Draw
    // var d = this.size / 200;
    // drawTriangle([xy[0], xy[1], xy[0] + d, xy[1], xy[0], xy[1] + d]);
    // Pass the matrix to u_ModelMatrix attribute
    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

    // Front of the cube
    drawTriangle3DUV(
      [0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 0.0],
      [1, 0, 0, 1, 0, 0]
    );
    drawTriangle3DUV(
      [0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0],
      [1, 0, 1, 1, 0, 1]
    );

    // Fake lighting
    gl.uniform4f(
      u_FragColor,
      rgba[0] * 0.9,
      rgba[1] * 0.9,
      rgba[2] * 0.9,
      rgba[3]
    );
    // Top of the cube
    drawTriangle3DUV(
      [0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0],
      [1, 0, 0, 0, 0, 1]
    );
    drawTriangle3DUV(
      [0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0],
      [1, 0, 1, 1, 0, 1]
    );

    // Fake lighting
    gl.uniform4f(
      u_FragColor,
      rgba[0] * 0.9,
      rgba[1] * 0.9,
      rgba[2] * 0.9,
      rgba[3]
    );
    // // Bottom of the cube
    drawTriangle3DUV(
      [0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0],
      [1, 0, 0, 0, 0, 1]
    );
    drawTriangle3DUV(
      [0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0],
      [1, 0, 1, 1, 0, 1]
    );

    // Fake lighting
    gl.uniform4f(
      u_FragColor,
      rgba[0] * 0.7,
      rgba[1] * 0.7,
      rgba[2] * 0.7,
      rgba[3]
    );
    // right side of the cube
    drawTriangle3DUV(
      [1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0],
      [1, 0, 0, 0, 0, 1]
    );
    drawTriangle3DUV(
      [1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0],
      [1, 0, 1, 1, 0, 1]
    );

    // Fake lighting
    gl.uniform4f(
      u_FragColor,
      rgba[0] * 0.5,
      rgba[1] * 0.5,
      rgba[2] * 0.5,
      rgba[3]
    );
    // left of the cube
    drawTriangle3DUV(
      [0.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0],
      [1, 0, 0, 0, 0, 1]
    );
    drawTriangle3DUV(
      [0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0],
      [1, 0, 1, 1, 0, 1]
    );

    // Fake lighting
    gl.uniform4f(
      u_FragColor,
      rgba[0] * 0.4,
      rgba[1] * 0.4,
      rgba[2] * 0.4,
      rgba[3]
    );
    // back of the cube
    drawTriangle3DUV(
      [1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0],
      [1, 0, 0, 0, 0, 1]
    );
    drawTriangle3DUV(
      [1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0],
      [1, 0, 1, 1, 0, 1]
    );
  }

  renderFast(M) {
    if (!M) {
      console.error("Error: Matrix M is undefined.");
      return;
    }
    this.matrix = M;
    //var xy = this.position;
    var rgba = this.color;
    // var size = this.size;

    // pass texture number
    gl.uniform1i(u_whichTexture, this.textureNum);

    // Pass the color of a point to u_FragColor uniform variable
    gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

    // pass matrix
    gl.uniformMatrix4fv(u_ModelMatrix, false, this.matrix.elements);

    if (g_vertexBuffer == null) {
      initTriangle3D();
    }
    // var allverts = [];

    // // front
    // allverts = allverts.concat([
    //   0.0, 0.0, 0.0, 0, 0, 1.0, 1.0, 0.0, 1, 1, 1.0, 0.0, 0.0, 1, 0,
    // ]);
    // allverts = allverts.concat([
    //   0.0, 0.0, 0.0, 0, 0, 0.0, 1.0, 0.0, 0, 1, 1.0, 1.0, 0.0, 1, 1,
    // ]);

    // // back
    // allverts = allverts.concat([
    //   0.0, 0.0, 1.0, 0, 0, 1.0, 1.0, 1.0, 1, 1, 1.0, 0.0, 1.0, 1, 0,
    // ]);
    // allverts = allverts.concat([
    //   0.0, 0.0, 1.0, 0, 0, 0.0, 1.0, 1.0, 0, 1, 1.0, 1.0, 1.0, 1, 1,
    // ]);

    // // top
    // allverts = allverts.concat([
    //   0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0,
    // ]);
    // allverts = allverts.concat([
    //   0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    // ]);

    // // bottom
    // allverts = allverts.concat([
    //   0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0,
    // ]);
    // allverts = allverts.concat([
    //   0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,
    // ]);

    // // left
    // allverts = allverts.concat([
    //   0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    // ]);
    // allverts = allverts.concat([
    //   0.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 1.0, 0.0, 1.0, 0.0, 1.0, 0.0, 1.0, 1.0,
    // ]);

    // // right
    // allverts = allverts.concat([
    //   1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0,
    // ]);
    // allverts = allverts.concat([
    //   1.0, 0.0, 0.0, 0.0, 0.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.0, 0.0, 1.0,
    // ]);

    var vertexLength = 5 * Float32Array.BYTES_PER_ELEMENT;
    var vertex_offset = 0;
    var uv_offset = 3 * Float32Array.BYTES_PER_ELEMENT;

    // The number of vertices
    var n = this.cubeVerts.length / 5;

    gl.bufferData(gl.ARRAY_BUFFER, this.cubeVerts, gl.DYNAMIC_DRAW);

    // Assign the buffer object to a_Position variable
    gl.vertexAttribPointer(
      a_Position,
      3,
      gl.FLOAT,
      false,
      vertexLength,
      vertex_offset
    );

    // Assign the buffer object to a_UV variable
    gl.vertexAttribPointer(a_UV, 2, gl.FLOAT, false, vertexLength, uv_offset);

    // Enable the assignment to a_UV variable
    gl.enableVertexAttribArray(a_UV);

    // Draw the triangle
    gl.drawArrays(gl.TRIANGLES, 0, n);

    // drawMultipleTriangleUV(allverts);
  }
}
