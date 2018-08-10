
function SceneText(demo,text,fontSize){
    Scene.call(this,demo);
   
    this.scene = new THREE.Scene();
    this.scene.background = null;
       
    var shapes = this._pDemo.getFont().generateShapes( text, fontSize );
    
    var geometry = new THREE.ShapeBufferGeometry( shapes );

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

    this.text = new THREE.Mesh( geometry, this.material );

    this.scene.add( this.text );

    this._pReady = true; 
    
    this.positionFunc = null;
}


SceneText.prototype = Object.create(Scene.prototype);


SceneText.prototype.setPosition = function(x,y){
    if(isFunction(x))
        this.positionFunc = x;
    else{
        this.text.position.x = x;
        this.text.position.y = y;
    }
}

SceneText.prototype.render = function(time){
    var renderer = this._pDemo.getRenderer();

    var camera = new THREE.PerspectiveCamera( 45,this._pDemo.getAspect(), 1, 10000 );
    camera.position.set( 0, 0, 600 );
    camera.updateProjectionMatrix();

    if(this.positionFunc){
        this.positionFunc(this.text,time);
    }

    this._pDemo.getRenderer().render( this.scene, camera );
}