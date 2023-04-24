let markerVisible = { A: false, B: false, C: false, D: false, F: false  }; 
                  
AFRAME.registerComponent('registerevent', {   
       init: function () {     
                var marker = this.el;      
                marker.addEventListener('markerFound', function() {       
                           console.log('markerFound', marker.id);
                            markerVisible[ marker.id ] = true; 
                 });     
                 marker.addEventListener('markerLost', function() {       
                            console.log('markerLost', marker.id);
                            markerVisible[ marker.id ] = false; 
                 });   
         } 
});

AFRAME.registerComponent('run', {   
  init: function() {     
          this.A = document.querySelector("#A");     
          this.B = document.querySelector("#B");     
          this.C = document.querySelector("#C");
          this.D = document.querySelector("#D");
          this.F = document.querySelector("#F");
          this.p0 = new THREE.Vector3();     
          this.p1 = new THREE.Vector3();      
          this.p2 = new THREE.Vector3();
          this.p3 = new THREE.Vector3();
          this.p4 = new THREE.Vector3();
    
          let material = new THREE.MeshLambertMaterial( {color:0xFF0000}); 
          let geometry=new THREE.CylinderGeometry( 0.05, 0.05, 1, 12);     
              geometry.applyMatrix4( new THREE.Matrix4().makeTranslation( 0, 0.5, 0 ) );     
              geometry.applyMatrix4( new THREE.Matrix4().makeRotationX( THREE.MathUtils.degToRad( 90 ) ) ); 
    
         this.cylinderAB = new THREE.Mesh( geometry, material );     
         this.lineAB = document.querySelector('#lineAB').object3D;     
         this.lineAB.add( this.cylinderAB );     
         this.cylinderAB.visible = false;     
    
         this.cylinderBC = new THREE.Mesh( geometry, material );     
         this.lineBC = document.querySelector('#lineBC').object3D;     
         this.lineBC.add( this.cylinderBC );     
         this.cylinderBC.visible = false;     
   
         this.cylinderCD = new THREE.Mesh( geometry, material );     
         this.lineCD = document.querySelector('#lineCD').object3D;
         this.lineCD.add( this.cylinderCD ); 
         this.cylinderCD.visible = false;   
    
         this.cylinderDF = new THREE.Mesh( geometry, material );     
         this.lineDF = document.querySelector('#lineDF').object3D;
         this.lineDF.add( this.cylinderDF ); 
         this.cylinderDF.visible = false; 
    
         this.cylinderFA = new THREE.Mesh( geometry, material );     
         this.lineFA = document.querySelector('#lineFA').object3D;
         this.lineFA.add( this.cylinderFA ); 
         this.cylinderFA.visible = false; 
  }, 
  tick: function (time, deltaTime) {    
            if ( markerVisible["A"] && markerVisible["B"] ) {      
                  this.A.object3D.getWorldPosition(this.p0);       
                  this.B.object3D.getWorldPosition(this.p1);       
                  let distance = this.p0.distanceTo( this.p1 );      
                  this.lineAB.lookAt( this.p1 );             
                  this.cylinderAB.scale.set(1,1,distance);       
                  this.cylinderAB.visible = true;      
            }     
            if ( markerVisible["B"] && markerVisible["C"] ) {       
                  this.B.object3D.getWorldPosition(this.p1);       
                  this.C.object3D.getWorldPosition(this.p2);       
                  let distance = this.p1.distanceTo( this.p2 );       
                  this.lineBC.lookAt( this.p2 );             
                  this.cylinderBC.scale.set(1,1,distance);      
                  this.cylinderBC.visible = true;     
            }
           if ( markerVisible["C"] && markerVisible["D"] ) {       
                  this.C.object3D.getWorldPosition(this.p2);       
                  this.D.object3D.getWorldPosition(this.p3);       
                  let distance = this.p2.distanceTo( this.p3 );       
                  this.lineCD.lookAt( this.p3 );       
                  this.cylinderCD.scale.set(1,1,distance);       
                  this.cylinderCD.visible = true;     
           } 
           if ( markerVisible["D"] && markerVisible["F"] ) {       
                  this.D.object3D.getWorldPosition(this.p3);       
                  this.F.object3D.getWorldPosition(this.p4);       
                  let distance = this.p3.distanceTo( this.p4 );       
                  this.lineDF.lookAt( this.p4 );       
                  this.cylinderDF.scale.set(1,1,distance);       
                  this.cylinderDF.visible = true;     
           } 
          if ( markerVisible["F"] && markerVisible["A"] ) {       
                  this.F.object3D.getWorldPosition(this.p4);       
                  this.A.object3D.getWorldPosition(this.p0);       
                  let distance = this.p4.distanceTo( this.p0 );       
                  this.lineFA.lookAt( this.p0 );       
                  this.cylinderFA.scale.set(1,1,distance);       
                  this.cylinderFA.visible = true;     
           } 
     if ( !markerVisible["A"] )        
       this.cylinderAB.visible = this.cylinderFA.visible = false;     
     if ( !markerVisible["B"] )        
       this.cylinderAB.visible = this.cylinderBC.visible = false;     
     if ( !markerVisible["C"] )        
       this.cylinderCD.visible = this.cylinderBC.visible = false;
     if ( !markerVisible["D"] )        
       this.cylinderCD.visible = this.cylinderDF.visible = false; 
     if ( !markerVisible["F"] )        
       this.cylinderDF.visible = this.cylinderFA.visible = false; 
   } 
});
