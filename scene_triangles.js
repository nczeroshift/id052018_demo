
function scene_triangles(dev){
    this.dev = dev;
    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color( 0x999999 );
    this.material = null;
    this.mesh = null;
    this.uniforms = null;
}
    
scene_triangles.prototype.init= function(){
    var scope = this;
    $.ajax({url:"shader_source.html",dataType :"html",success:function(data){
        var d = $("<div/>").append(data);
        var shaderVSH = d.find("#vertexShader").html();
        var shaderFSH = d.find("#fragmentShader").html();
        
        var geometry = new THREE.PlaneBufferGeometry( 2, 2 );
				
        scope.uniforms = {
            time: { value: 1.0 }
		};
                
		var material = new THREE.ShaderMaterial( {
            uniforms: scope.uniforms,
			vertexShader: shaderVSH,
			fragmentShader: shaderFSH
		});
        
        scope.material = material;
           
		var mesh = new THREE.Mesh( geometry, material );
        scope.scene.add( mesh );
        
        scope.mesh = mesh;
     
    }});
}
    
scene_triangles.prototype.render = function(time){
    var camera = new THREE.OrthographicCamera( - 1, 1, 1, - 1, 0, 1 );
 
    if(this.mesh == null)
        return;
    
    console.log(time);

    this.uniforms.time.value = time;
	this.dev.render( this.scene, camera );
                
 }