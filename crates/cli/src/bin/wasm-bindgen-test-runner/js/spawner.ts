WL.registerComponent('spawner', {
  mesh: {type: WL.Type.Mesh},
  material: {type: WL.Type.Material},
}, {
  start: function() {
    /* Spawn a new object with this.object as parent */
    const o = WL.scene.addObject(this.object);

    /* Attach a mesh */
    o.addComponent('mesh', {
      mesh: this.mesh,
      material: this.material,
    });
  }
});

  //   update: function () {
  //       if (this.createCube) {
  //         // create a cube object
  //         let cube = WL.scene.addObject();
  //         cube.addComponent("mesh", {"mesh": "8", "material": "22"});
  //         cube.translate([Math.random()*10, Math.random()*10, Math.random()*10]);
  //         this.numCubes += 1;
  //       }
    
  //     },
    
  //     press: function(e) {
  //       if (e.keyCode === 67 /* c */ ) {
  //           this.createCube = true
  //       }
  //   },
    
  //   release: function(e) {
  //       if (e.keyCode === 67 /* c */) {
  //           this.createCube = false
  //       }
  //   }
  // });