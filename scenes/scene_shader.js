
function SceneShader(demo, shaderName){
    Scene.call(this,demo)
    this.scene = new THREE.Scene();
    this.material = null;
    this.mesh = null;
    this.uniforms = null;
    this._pReady = false;
    this.shaderName = shaderName;
    this.init();
}
    
SceneShader.prototype = Object.create(Scene.prototype);

SceneShader.prototype.init = function(){
    var scope = this;
    $.ajax({url:"shader_source.html?t="+(new Date()).getTime(),dataType :"html",success:function(data){
        var d = $("<div/>").append(data);
        var shaderVSH = d.find("#vertexShader").html();
        var shaderFSH = d.find("#"+scope.shaderName).html();
        
        var geometry = new THREE.PlaneBufferGeometry( 2, 2 );
				
        scope.uniforms = {
            time: { value: 1.0 }
		};
                
		var material = new THREE.ShaderMaterial( {
            uniforms: scope.uniforms,
			vertexShader: shaderVSH,
            fragmentShader: shaderFSH,
            depthTest:false,
            depthWrite:false,
            transparent:true
		});
        
        scope.material = material;
           
		var mesh = new THREE.Mesh( geometry, material );
        scope.scene.add( mesh );
        
        scope.mesh = mesh;
        scope._pReady = true;
    }});
}
    
SceneShader.prototype.render = function(time){
    var camera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );
 
    if(this.mesh == null)
        return;

    this.uniforms.time.value = time;
	this._pDemo.getRenderer().render( this.scene, camera );        
 }