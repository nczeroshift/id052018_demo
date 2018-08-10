function SceneDontForget(demo){
    Scene.call(this,demo);
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0x000000 );
    this.text = null;
    this.material = null;
    this.angle = 0.0;
    this.swapFlag = 0;
    this.waitFlag = 0;
    this.init();
}

SceneDontForget.prototype = Object.create(Scene.prototype);

SceneDontForget.prototype.init = function(){
    var matLite = new THREE.MeshBasicMaterial( {
        color:  0xffffff,
        transparent: true,
        opacity: 1.0,
        side: THREE.DoubleSide
    } );

    this.material = matLite;
    
    var shapes = this._pDemo.getFont().generateShapes( "... and don't forget to come\n    to inerciademoparty05\n                 2018", 50 );
    
    var geometry = new THREE.ShapeBufferGeometry( shapes );
    geometry.computeBoundingBox();
    
    var xMid = - 0.5 * ( geometry.boundingBox.max.x - geometry.boundingBox.min.x );
    geometry.translate( xMid, 0, 0 );
        
    this.text = new THREE.Mesh( geometry, matLite );
    this.text.position.z = - 150;
    this.text.position.y = 30;
    this.scene.add( this.text );
}
    
SceneDontForget.prototype.render = function(){
    var camera = new THREE.PerspectiveCamera( 45,this._pDemo.getAspect(), 1, 10000 );
    camera.position.set( 0, 0, 600 );
    //camera.aspect =  $("canvas").width() / $("canvas").height();
    camera.updateProjectionMatrix();
    
    if(this.waitFlag  < 100 || this.swapFlag < 2 ){
        this.scene.background = new THREE.Color( 0x000000 );
        this.material.color  = new THREE.Color( 0xffffff );
    }
    else{
       this.scene.background = new THREE.Color( 0xffffff );
       this.material.color  =new THREE.Color( 0x000000 );
    }
    
    this.waitFlag ++;
    
     this.swapFlag++;
     if( this.swapFlag>4)
      this.swapFlag = 0;
    this.text.rotation.z =  this.angle;
    this.text.rotation.y =  Math.sin(this.angle);
     
    this.angle += 0.01;
    
    this._pDemo.getRenderer().render( this.scene, camera );
}