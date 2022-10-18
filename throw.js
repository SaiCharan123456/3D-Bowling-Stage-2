AFRAME.registerComponent("bowling-balls", {
  init: function () {
    this.throwBall();
  },
  throwBall: function () {
    window.addEventListener("keydown", (e) => {
      if (e.key === "z") {
        var  ball = document.createElement("a-entity");

        ball.setAttribute("gltf-model", "./bowling_ball_storm_hy-road_pearl/scene.gltf");

        ball.setAttribute("scale", { x: 0.1, y: 0.1,  z: 0.1});

        var cam = document.querySelector("#camera");

        pos = cam.getAttribute("position");

        ball.setAttribute("position", {
          x: pos.x,
          y: pos.y,
          z: pos.z,
        });

        var camera = document.querySelector("#camera").object3D;

        //get the camera direction as Three.js Vector
        var direction = new THREE.Vector3();
        camera.getWorldDirection(direction);

        //set the velocity and it's direction
        ball.setAttribute("velocity", direction.multiplyScalar(-10));

        var scene = document.querySelector("#scene");

        //set the bullet as the dynamic entity
        ball.setAttribute("dynamic-body", {
          shape: "sphere",
          mass: "10",
        });

        //add the collide event listener to the bullet
        ball.addEventListener("collide", this.removeBall);

        scene.appendChild(ball);
      }
    });
  },
  removeBall: function (e) {
    
    //bullet element
    var element = e.detail.target.el;

    //element which is hit
    var elementHit = e.detail.body.el;

    if (elementHit.id.includes("pin")) {

      elementHit.setAttribute("dynamic-body", {
        shape: "cylinder",
        mass: "0.5",
      });
      
      //impulse and point vector
      var impulse = new CANNON.Vec3(0,1,-15);
      var worldPoint = new CANNON.Vec3().copy(
        elementHit.getAttribute("position")
      );

      elementHit.body.applyForce(impulse, worldPoint);

      //remove event listener
      element.removeEventListener("collide", this.removeBall);

      //remove the bullets from the scene
      var scene = document.querySelector("#scene");
      scene.removeChild(element);
    }
  },
});


