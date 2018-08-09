function SceneAmiga(demo){
    Scene.call(this,demo);
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0x999999 );
    this.sphere = null;
    this.material = null;
    this.angle = 0.0;
    this.swapFlag = 0;
    this.waitFlag = 0;
    this.acceleration = new THREE.Vector3(0, 0, 0);
    this.velocity = new THREE.Vector3 (10.0, 0, 0);
    this.position = new THREE.Vector3( 0, 1, 0 );
    this._pReady = false;
}
    
SceneAmiga.prototype = Object.create(Scene.prototype);

SceneAmiga.prototype.init= function(){
    var scope = this;

    var geometry = new THREE.SphereGeometry( 5, 32, 32 );

    this.amigaTex = new THREE.TextureLoader().load( "amiga_pattern.png" ,function(){
        scope._pReady = true;
    });
    
    this.amigaTex.wrapS = THREE.RepeatWrapping;
    this.amigaTex.wrapT = THREE.RepeatWrapping;

    this.amigaTex.repeat.set( 2, 1 );

    this.material = new THREE.MeshBasicMaterial( {color: 0xffffff, map:this.amigaTex} );
    this.sphere = new THREE.Mesh( geometry, this.material );

    var g1 = new THREE.GridHelper( 30, 10, 0xFF00FF,0xFF00FF);
    g1.position.z = -5;
    g1.rotation.x = -Math.PI / 2;
    g1.position.x = -15;
    this.scene.add(g1);
            
    var g2 = new THREE.GridHelper( 30, 10, 0xFF00FF,0xFF00FF);
    g2.position.z = -5;
    g2.rotation.x = -Math.PI / 2;
    g2.position.x = 15;
    this.scene.add(g2);

    var g3 = new THREE.GridHelper( 30, 10, 0xFF00FF,0xFF00FF);
    g3.position.z =10;
    g3.position.y = -15;

    g3.rotation.x = 0;
    g3.position.x = -15;
    this.scene.add(g3);
            
    var g4 = new THREE.GridHelper( 30, 10, 0xFF00FF,0xFF00FF);
    g4.position.z = 10;
    g4.position.y = -15;

    g4.rotation.x = 0;
    g4.position.x = 15;
    this.scene.add(g4);

    this.scene.add( this.sphere );
}
    
SceneAmiga.prototype.render = function(){
    var gravity = new THREE.Vector3(0,-20.8,0.0);
    var mass = 25;
    var floorDist = 10;
    var terrainDist =30;
    
    var camera = new THREE.PerspectiveCamera( 45,$("canvas").width() / $("canvas").height(), 0.1, 80 );
    camera.position.set( 0, 0, 50 );
    camera.aspect =  $("canvas").width() / $("canvas").height();
    camera.updateProjectionMatrix();
  
    this.sphere.position.copy(this.position);
    this.sphere.updateMatrix();
    
    this.sphere.rotation.y += this.velocity.x > 0 ? 0.02 : -0.02;
    this.sphere.rotation.z += 0.02;
    
    this._pDemo.getRenderer().render( this.scene, camera );

    if(this.position.y < -floorDist)
    {
        this.position.y  = -floorDist;
        this.velocity = new THREE.Vector3().addScaledVector(gravity,-mass *0.05).addScaledVector(new THREE.Vector3(this.velocity.x ,0,0),1.0);
    }
    else if (this.position.x > terrainDist){
        this.position.x  = terrainDist;
        this.velocity = new THREE.Vector3( -this.velocity.x, this.velocity.y, this.velocity.z);
    }
    else if (this.position.x < -terrainDist){
        this.position.x  = -terrainDist;
        this.velocity = new THREE.Vector3( -this.velocity.x, this.velocity.y, this.velocity.z);    
    }
    else 
        this.velocity.addScaledVector(gravity,0.0166);
    
    this.position.addScaledVector(this.velocity,0.0166);
 
 }