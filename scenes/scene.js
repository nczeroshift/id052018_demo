
function Scene(demo){
    this._pDemo = demo;
    this._pStart = 0;
    this._pEnd = 0;
    this._pReady = true;
    this._pOrder = 0;
}

Scene.prototype.getStart = function(){
    return this._pStart;      
} 

Scene.prototype.getEnd = function(){
    return this._pEnd;      
} 

Scene.prototype.isReady = function(){
    return this._pReady;
}

Scene.prototype.getOrder = function(){
    return this._pOrder;
}

Scene.prototype.setOrder = function(order){
    this._pOrder = order;
}

Scene.prototype.setStart = function(start){
    this._pStart = start;      
} 

Scene.prototype.setEnd = function(end){
    this._pEnd = end;      
} 

Scene.prototype.init = function(){

}

Scene.prototype.render = function(){

}