/* 
 * License: GPL v02 
 * author: nadeem.elahi@gmail.com,
 * http://webscripts.biz
 */
var T=new function(){var items=[],len;this.add=function(item){items.push(item);len=items.length};var rmIdx;this.rm=function(item){rmIdx=items.indexOf(item);items.splice(rmIdx,1);len=items.length};var dt,ct,lt=Date.now();var raf=window.requestAnimationFrame||window.msRequestAnimationFrame||window.oRequestAnimationFrame||window.mozRequestAnimationFrame||window.webkitRequestAnimationFrame||function(cb){setTimeout(cb,30)};var i,t=0;function ticker(){ct=Date.now();dt=ct-lt;t+=dt;if(t>30){for(i=0;i<len;i++)items[i].tick(t);
t=0}lt=ct;raf(ticker)}ticker()};
var Tween = function(){

   this.sp;
   this.ep;
   this.dur;
   this.totalElapsed;
   this.currPos;
   this.ao; //animating object
   this.running;
};
Tween.prototype.config = function(
   start_pos,
   end_pos,
   duration,
   animatingObject
){
   this.running = false;
   this.sp = start_pos;
   this.ep = end_pos;
   this.position_interval 
      = this.ep - this.sp;
   this.dur = duration;
   this.ao = animatingObject;
   this.reset();
};
Tween.prototype.stop = function(){
   if(this.running){
      T.rm(this);
      this.running = false;
   }
};
Tween.prototype.start = function(){
   if(!this.running){
      this.running = true;
      T.add(this);
   }
};
Tween.prototype.reset = function(){
   console.log("reset");
   this.totalElapsed = 0;
   this.currPos = this.sp;
}
Tween.prototype.tick = function(elapsed){

   this.totalElapsed += elapsed;
   this.percent = this.totalElapsed/this.dur;

   if(this.percent > 1){ 
      T.rm(this);
      this.running = false;
      this.currPos = this.ep;
      this.ao.setPosition(this.currPos);
      this.ao.done();
   } else {
      this.currPos = this.sp 
	 + this.position_interval*this.percent;
      this.ao.setPosition(this.currPos);
   }

};

