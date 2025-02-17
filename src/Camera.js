class Camera {
  constructor() {
    this.eye = new Vector3([0, 0, -3]);
    this.at = new Vector3([0, 0, 100]);
    this.up = new Vector3([0, 1, 0]);
  }

  forward(speed = 1) {
    /**
     * In your camera class, create a function called "moveForward":
    Compute forward vector f = at - eye. 
        Create a new vector f: let f = new Vector3();
        Set f to be equal to at: f.set(at);
        Subtract eye from f: f.sub(eye);
    Normalize f using f.normalize(); 
    Scale f by a desired "speed" value: f.mul(speed)
    Add forward vector to both eye and center: eye += f; at += f;
     */
    var f = new Vector3();
    f.set(this.at);
    f = f.sub(this.eye);
    f = f.normalize();
    f = f.mul(speed);
    this.at = this.at.add(f);
    this.eye = this.eye.add(f);
    // console.log("====forward====");
    // console.log("eye: ", this.eye);
    // console.log("at: ", this.at);
  }

  back(speed = 1) {
    /**
     * In your camera class, create a function called "moveBackwards":

    Same idea as moveForward, but compute backward  vector b = eye - at instead of forward.
     */
    var b = new Vector3();
    b.set(this.eye);
    b = b.sub(this.at);
    b = b.normalize();
    b = b.mul(speed);
    this.at = this.at.add(b);
    this.eye = this.eye.add(b);
    // console.log("====back====");
    // console.log("eye: ", this.eye);
    // console.log("at: ", this.at);
  }

  left(speed = 1) {
    /**
     * In your camera class, create a function called "moveLeft":

    Compute forward vector f = at - eye. 
    Compute side vector s = up x f (cross product between up and forward vectors).
     Normalize s using s.normalize();
    Scale s by a desired "speed" value:  s.mul(speed)
     */
    var f = new Vector3();
    f.set(this.eye);
    f = f.sub(this.at);
    f = f.normalize();
    var s = Vector3.cross(f, this.up);
    s = s.normalize();
    s = s.mul(speed);
    this.at = this.at.add(s);
    this.eye = this.eye.add(s);
    // console.log("====left====");
    // console.log("eye: ", this.eye);
    // console.log("at: ", this.at);
  }

  right(speed = 1) {
    /**
     * In your camera class, create a function called "moveRight":

    Same idea as moveLeft, but compute the opposite side vector s = f x up
     */
    var f = new Vector3();
    f.set(this.eye);
    f = f.sub(this.at);
    f = f.normalize();
    var s = Vector3.cross(f, this.up);
    s = s.normalize();
    s = s.mul(speed);
    this.at = this.at.sub(s);
    this.eye = this.eye.sub(s);
    // console.log("====right====");
    // console.log("eye: ", this.eye);
    // console.log("at: ", this.at);
  }

  panLeft(alpha = 30) {
    /**
     * In your camera class, create a function called "panLeft":

    Compute the forward vector  f = at - eye;
    Rotate the vector f by alpha (decide a value) degrees around the up vector.
        Create a rotation matrix: rotationMatrix.setRotate(alpha, up.x, up.y, up.z).
        Multiply this matrix by f to compute f_prime = rotationMatrix.multiplyVector3(f);
    Update the "at"vector to be at = eye + f_prime;

     */
    var f = new Vector3();
    f.set(this.at);
    f.sub(this.eye);
    var rotationMatrix = new Matrix4();
    rotationMatrix.setRotate(
      alpha,
      this.up.elements[0],
      this.up.elements[1],
      this.up.elements[2]
    );
    var f_prime = rotationMatrix.multiplyVector3(f);
    this.at = new Vector3(this.eye.elements).add(f_prime);
    // console.log("====panLeft====");
    // console.log("eye: ", this.eye);
    // console.log("at: ", this.at);
  }

  panRight(alpha = 30) {
    /**
     * In your camera class, create a function called "panRight":

    Same idea as panLeft, but rotate u by -alpha degrees around the up vector.
     */
    var f = new Vector3();
    f.set(this.at);
    f = f.sub(this.eye);
    var rotationMatrix = new Matrix4();
    rotationMatrix.setRotate(
      -alpha,
      this.up.elements[0],
      this.up.elements[1],
      this.up.elements[2]
    );
    var f_prime = rotationMatrix.multiplyVector3(f);
    this.at = new Vector3(this.eye.elements).add(f_prime);
  }
}
