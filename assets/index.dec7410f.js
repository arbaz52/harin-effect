!function(t=".",s="__import__"){try{self[s]=new Function("u","return import(u)")}catch(i){const e=new URL(t,location),n=t=>{URL.revokeObjectURL(t.src),t.remove()};self[s]=t=>new Promise(((i,o)=>{const h=new URL(t,e);if(self[s].moduleMap[h])return i(self[s].moduleMap[h]);const a=new Blob([`import * as m from '${h}';`,`${s}.moduleMap['${h}']=m;`],{type:"text/javascript"}),c=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(a),onerror(){o(new Error(`Failed to import: ${t}`)),n(c)},onload(){i(self[s].moduleMap[h]),n(c)}});document.head.appendChild(c)})),self[s].moduleMap={}}}("/harin-effect/assets/");class t{constructor(t=0,s=0){this.x=t,this.y=s}getMag(){return Math.sqrt(Math.pow(this.x,2)+Math.pow(this.y,2))}getAngle(){return Math.atan2(this.y,this.x)}setMag(t){const s=this.getAngle();return this.x=t*Math.cos(s),this.y=t*Math.sin(s),this}setAngle(t){const s=this.getMag();return this.x=s*Math.cos(t),this.y=s*Math.sin(t),this}add({x:t,y:s}){return this.x+=t,this.y+=s,this}}class s{constructor(s,i,e={x:[-1/0,1/0],y:[-1/0,1/0]}){this.x=s,this.y=i,this.constraints=e,this.position=new t(s,i),this.velocity=new t,this.size=1}applyForce(t){this.velocity.add(t).setMag(3)}update(){const{velocity:t,position:s}=this;s.add(t);const{x:i,y:e}=s;i<=this.constraints.x[0]&&(this.position.x=this.constraints.x[1]),i>=this.constraints.x[1]&&(this.position.x=this.constraints.x[0]),e<=this.constraints.y[0]&&(this.position.y=this.constraints.y[1]),e>=this.constraints.y[1]&&(this.position.y=this.constraints.y[0])}draw(t,s="red"){const{position:{x:i,y:e},size:n}=this;t.beginPath(),t.fillStyle=s,t.arc(i,e,n,0,2*Math.PI),t.fill(),t.closePath()}}const i=new perlinNoise3d,e=document.getElementById("canvas");new class{constructor(t,s,i=10,e=.05){this.canvas=t,this.noise=s,this.cellWidth=i,this.resolution=e,this.timeStep=.005,this.time=0,this.ctx=t.getContext("2d"),console.log(s.get(0,0,0))}draw(){requestAnimationFrame(this.draw.bind(this)),this.fillBackground("#0000001a"),this.particles.forEach((s=>{const{cellWidth:i,resolution:e,noise:n,time:o}=this,{position:{x:h,y:a}}=s,c=h/i*e,r=a/i*e,l=n.get(c,r,o)*Math.PI,d=new t(1,1).setMag(1).setAngle(4*l);s.applyForce(d),s.update(),s.draw(this.ctx)})),this.time+=this.timeStep}goFullScreen(){this.canvas.width=window.innerWidth,this.canvas.height=window.innerHeight}handleWindowResize(){this.goFullScreen()}fillBackground(t){const{ctx:s,canvas:{width:i,height:e}}=this;s.beginPath(),s.fillStyle=t,s.rect(0,0,i,e),s.fill(),s.closePath()}setup(){this.fillBackground("black"),this.draw()}start(t){window.onresize=this.handleWindowResize.bind(this),this.goFullScreen(),this.particles=[];const i={x:[0,this.canvas.width],y:[0,this.canvas.height]};for(let e=0;e<t;e++){const t=Math.random()*this.canvas.width,e=Math.random()*this.canvas.height;this.particles.push(new s(t,e,i))}this.setup()}}(e,i).start(5e3);
