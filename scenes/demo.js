function Demo(canvasJQ){
    this._pCanvas = canvasJQ;
    this._pRenderer = null;
    this._pWidth = canvasJQ.width();
    this._pHeight = canvasJQ.height();
    this._pStart = new Date();
    this._pScenes = [];
}

Demo.prototype.init = function(loadScenes){
    this._pRenderer = new THREE.WebGLRenderer( {canvas:this._pCanvas[0] , antialias: true} );
    this._pRenderer.setPixelRatio( window.devicePixelRatio );
    this._pRenderer.setSize( this._pWidth, this._pHeight  );
    this._pRenderer.autoClear = false;
    this._pRenderer.setClearColor(new THREE.Color( 0x999999 ),1.0);   

    var scope = this;
    function loadFont(){
        var loader = new THREE.FontLoader();
        loader.load( 'helvetiker_regular.typeface.json', function ( font ) {
            scope._pFont = font;
            if(loadScenes)
                loadScenes(scope);
        });
    }

    loadFont();
}

Demo.prototype.getRenderer = function(){
    return this._pRenderer;
}

Demo.prototype.getFont = function(){
    return this._pFont;
}

Demo.prototype.getWidth = function(){
    return this._pWidth;
}

Demo.prototype.getHeight = function(){
    return this._pHeight;
}

Demo.prototype.getAspect = function(){
    return this._pWidth / this._pHeight;
}

Demo.prototype.getTime = function(){
    return (new Date().getTime() - this._pStart.getTime()) / 1000.0;
}

Demo.prototype.start = function(){
    var scope = this;
    this._pStart = new Date();
    
    this._pScenes.sort(function(a, b){
        return a.getStart()-b.getStart();
    });

    function animate(){
		//var dom  = document.getElementById('timer'); 
		//if (dom) dom.innerHTML = scope.getTime();
        requestAnimationFrame( animate );
        scope._render();
    }
    animate();
}

Demo.prototype.addScene = function(scene, start, end){
    scene.setStart(start);
    scene.setEnd(end);
    this._pScenes.push(scene);
}

Demo.prototype.launchReadyTimer = function(done){
    var scope = this;
    var int = setInterval(function(){
        var completed = 0;
        for(var i = 0;i < scope._pScenes.length; i++){
            if(scope._pScenes[i].isReady())
                completed++;
        }

        if(completed === scope._pScenes.length){
            clearTimeout(int);
            if(done != null)
                done();
        }
    },200);
} 

Demo.prototype._render = function(){
    var time = this.getTime();
    this._pRenderer.clear();
    this._pRenderer.setViewport( 0, 0, this.getWidth(), this.getHeight());
    var res = [];
    for(var i = 0;i < this._pScenes.length; i++){
        var scene = this._pScenes[i];
        if(time >= scene.getStart() && time <= scene.getEnd()){
            res.push(scene);
        }
        if(scene.getStart() > time)
            break;
    }

    res.sort(function(a, b){
        return a.getOrder()-b.getOrder();
    });

    if(res.length>1){
        //debugger;
    }
    
    for(var i = 0;i<res.length;i++){
        res[i].render(time);
    }
}