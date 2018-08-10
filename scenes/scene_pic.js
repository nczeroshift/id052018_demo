
function ScenePicture(demo,texture,width,height){
    Scene.call(this,demo);
   
    this.scene = new THREE.Scene();
    this.scene.background = null;
  
    var geometry = new THREE.PlaneBufferGeometry( width, height );
    
    var scope = this;        

    this.texture = new THREE.TextureLoader().load( texture ,function(){
        scope.material.map = scope.texture;
        scope._pReady = true;
    });    

    this.material = new THREE.MeshBasicMaterial( {
        color:  0xffffff,
        transparent: true,
        opacity: 1.0,
        side: THREE.DoubleSide,
        depthTest:false,
        depthWrite:false,
        transparent:true
    });    

    // Enable alpha blending
    this.material.blending = THREE.CustomBlending;

    this.mesh = new THREE.Mesh( geometry, this.material );

    this.scene.add( this.mesh );

    this._pReady = false;
    
    this.positionFunc = null;
}


ScenePicture.prototype = Object.create(Scene.prototype);


ScenePicture.prototype.setPosition = function(x,y){
    if(isFunction(x))
        this.positionFunc = x;
    else{
        this.mesh.position.x = x;
        this.mesh.position.y = y;
    }
}

ScenePicture.prototype.render = function(time){
    var renderer = this._pDemo.getRenderer();

    var camera = new THREE.PerspectiveCamera( 45,this._pDemo.getAspect(), 1, 100 );
    camera.position.set( 0, 0, 50 );
    camera.updateProjectionMatrix();

    if(this.positionFunc){
        this.positionFunc(this.mesh,time);
    }

    this._pDemo.getRenderer().render( this.scene, camera );
}