
function SceneColor(demo, color1, color2, alpha1, alpha2){
    Scene.call(this,demo);
    this.color1 = color1;
    this.color2 = color2;
    if(alpha1 === undefined)
        alpha1 = 1.0;
    if(alpha2 === undefined)
        alpha2 = 1.0;
    this.alpha1 = alpha1;
    this.alpha2 = alpha2;
    this.scene = new THREE.Scene();
    this.scene.background = null;
    
    var geometry = new THREE.PlaneBufferGeometry( 2, 2 );

    var material = new THREE.MeshBasicMaterial( {
        color: this.color1,
        depthTest:false,
        depthWrite:false,
        transparent:true
    });
    
    // Enable alpha blending
    material.blending = THREE.CustomBlending;
     
    //material.blendEquation = THREE.AddEquation; //default
    //material.blendSrc = THREE.SrcAlphaFactor; //default
    //material.blendDst = THREE.OneMinusSrcAlphaFactor; //default

    this.material = material;

    var mesh = new THREE.Mesh( geometry, material );
    this.scene.add( mesh );
    
    this.mesh = mesh;

    this._pReady = true;
}

SceneColor.prototype = Object.create(Scene.prototype);

SceneColor.prototype.render = function(time){
    var renderer = this._pDemo.getRenderer();
    var camera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );
    var alpha = (time - this.getStart())/(this.getEnd()-this.getStart());
    var color = this.color1.clone().multiplyScalar(1-alpha).add(this.color2.clone().multiplyScalar(alpha));
    var camera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );
    var transparency = this.alpha1 * (1-alpha) + this.alpha2 * alpha;
    this.material.color = color;
    this.material.opacity = transparency;
    renderer.render( this.scene, camera );
}