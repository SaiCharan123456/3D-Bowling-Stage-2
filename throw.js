AFRAME.registerComponent("bowling-balls", {
    init: function () {
      this.shootballs();
    },
    shootballs: function () {
      window.addEventListener("keydown", (e) => {
        if (e.key === "z") {
          var balls = document.createElement("a-entity");          
  
          balls.setAttribute("geometry", {
            primitive: "sphere",
            radius: 0.1,
          });
  
          balls.setAttribute("material", "color", "black");
  
          var cam = document.querySelector("#camera");
  
          pos = cam.getAttribute("position");
  
          balls.setAttribute("position", {
            x: pos.x,
            y: pos.y,
            z: pos.z,
          });
  
          var camera = document.querySelector("#camera").object3D;
  
          //get the camera direction as Three.js Vector
          var direction = new THREE.Vector3();
          camera.getWorldDirection(direction);
          
  
          //set the velocity and it's direction
          balls.setAttribute("velocity", direction.multiplyScalar(-10));
  
          var scene = document.querySelector("#scene");

          balls.setAttribute("dynamic-body",{
            shape:"sphere",
            mass:"0"
          })

          balls.addEventListener("collide", this.removeBall);

          scene.appendChild(balls);
        }
      });
    },
    removeBall: function (e) {
      //var pins = document.querySelector("#pins")

      //bullet element
      var element = e.detail.target.el;
      
      //element which is hit
      var elementHit = e.detail.body.el;
      
      if (elementHit.id.includes("pin")) {
      
        //elementHit.setAttribute("material",{
          //opacity:1,
          //transparent:true
        //})
      //impulse and point vector
      
      var impulse = new CANNON.Vec3(0,1,-15);
      
      var worldPoint = new CANNON.Vec3().copy(
      elementHit.getAttribute("position")
      );
      
      elementHit.body.applyForce(impulse, worldPoint);
      
      //remove event listener
      element.removeEventListener("collide", this.throw);
      
      //remove the bullets from the scene
      var scene = document.querySelector("#scene") ;
      
      scene.removeChild(element) ;
      }
    },
   });
  
  
  