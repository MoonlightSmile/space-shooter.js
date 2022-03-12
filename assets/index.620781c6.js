var m=Object.defineProperty;var u=(i,e,t)=>e in i?m(i,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):i[e]=t;var r=(i,e,t)=>(u(i,typeof e!="symbol"?e+"":e,t),t);import{P as l,p}from"./vendor.3d71c0c2.js";const y=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))n(s);new MutationObserver(s=>{for(const a of s)if(a.type==="childList")for(const d of a.addedNodes)d.tagName==="LINK"&&d.rel==="modulepreload"&&n(d)}).observe(document,{childList:!0,subtree:!0});function t(s){const a={};return s.integrity&&(a.integrity=s.integrity),s.referrerpolicy&&(a.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?a.credentials="include":s.crossorigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function n(s){if(s.ep)return;s.ep=!0;const a=t(s);fetch(s.href,a)}};y();const c="0.0.0";class f extends Phaser.Physics.Arcade.Sprite{constructor(e,t,n,s){super(e,t,n,"laser-bolts");r(this,"speed");e.add.existing(this),this.setScale(h),this.speed=s,this.play(o.bolts2_run)}update(){this.y+=this.speed,this.y>this.scene.scale.height&&this.destroy()}}const b={"enemy-small":4,"enemy-medium":3,"enemy-big":2};class g extends Phaser.Physics.Arcade.Sprite{constructor(e,t,n,s){super(e,t,n,s);r(this,"speed");r(this,"bulletSpeed");r(this,"mainScene");r(this,"timer");this.mainScene=e,this.speed=b[s],this.bulletSpeed=this.speed+2,e.add.existing(this),this.setScale(h);const a=`${s}_run`;this.play(o[a]),this.timer=e.time.addEvent({callback:this.fire.bind(this),loop:!0,delay:1e3})}fire(){const e=new f(this.mainScene,this.x,this.y+8+4,this.bulletSpeed);this.mainScene.enemyBoltsGroup.add(e),e.body.setSize(10),e.body.isCircle=!0,console.log()}destroySelf(){this.y>this.scene.scale.height&&this.destroy(!0)}destroy(e){this.timer.destroy(),super.destroy(e)}update(e,t){this.y+=this.speed,this.destroySelf()}}class k extends l.Scene{constructor(){super({key:"MainScene"});r(this,"coins",0);r(this,"coinsText");r(this,"speed",5);r(this,"bulletSpeed",10);r(this,"bg");r(this,"player");r(this,"cursor");r(this,"boltsGroup");r(this,"enemyBoltsGroup");r(this,"enemyGroup")}create(){this.boltsGroup=this.physics.add.group(),this.enemyGroup=this.physics.add.group({runChildUpdate:!0}),this.enemyBoltsGroup=this.physics.add.group({runChildUpdate:!0}),this.sound.play("music",{loop:!0,volume:.2}),this.coinsText=this.add.dynamicBitmapText(16,16,"Minecraft",`Coins: ${this.coins}`).setDepth(9).setScale(1),this.bg=this.add.tileSprite(0,0,256,608,"desert-background").setDisplaySize(this.scale.width,this.scale.height).setOrigin(0),this.player=this.physics.add.sprite(this.scale.width/2,this.scale.height-32,"ship").setAlpha(0).setCollideWorldBounds().setScale(h/2).play(o.ship_run),this.player.body.enable=!1,this.player.body.isCircle=!0,this.player.body.setSize(30,30),this.tweens.add({targets:this.player,y:"-=60",alpha:1,onComplete:()=>{this.player.body.enable=!0}}),this.cursor=this.input.keyboard.createCursorKeys(),this.physics.add.overlap(this.boltsGroup,this.enemyGroup,(e,t)=>{e.destroy(),t.body.enable=!1,this.anims.play({key:"explosion_run"},t),this.sound.play("Explode1",{volume:.1}),t.once(l.Animations.Events.ANIMATION_COMPLETE,()=>{t.destroy(),this.coinsText.text=`Coins: ${this.coins+=1}`})}),this.physics.add.overlap(this.player,this.enemyBoltsGroup,this.playerDestroyed.bind(this)),this.physics.add.overlap(this.player,this.enemyGroup,this.playerDestroyed.bind(this))}playerDestroyed(e){this.coinsText.text=`Coins: ${this.coins=0}`,this.anims.play({key:"explosion_run"},e),this.sound.play("Explode1",{volume:.1}),e.body.enable=!1,e.once(l.Animations.Events.ANIMATION_COMPLETE,()=>{this.player.setAlpha(0),this.player.setX(this.scale.width/2),this.player.setY(this.scale.height-32),this.anims.play({key:"ship_run"},e),this.player.setAlpha(1);const t=this.tweens.add({targets:this.player,y:"-=60",duration:400,alpha:{from:1,to:0},onComplete:()=>{e.body.enable=!0,this.player.setAlpha(1),t.remove()}})})}generateEnemy(){const e=l.Math.RND.pick(["enemy-small","enemy-medium","enemy-big"]);this.enemyGroup.add(new g(this,l.Math.RND.between(0+16,this.scale.width-16),0,e))}shooter(){console.log("shooter"),this.sound.play("Laser_002",{volume:.1});const e=this.physics.add.sprite(this.player.x,this.player.y-(12+20),"laser-bolts").setScale(h).play(o.bolts1_run);e.body.setSize(15),e.body.isCircle=!0,this.boltsGroup.add(e)}checkBolts(){this.boltsGroup.children.each(e=>{const t=e;t.y<0?t.destroy():t.y-=this.bulletSpeed})}update(e,t){this.bg.tilePositionY-=1,this.cursor.up.isDown&&(this.player.y-=this.speed),this.cursor.down.isDown&&(this.player.y+=this.speed),this.cursor.left.isDown&&(this.player.x-=this.speed),this.cursor.right.isDown&&(this.player.x+=this.speed),l.Input.Keyboard.JustDown(this.cursor.space)&&this.shooter(),this.checkBolts(),this.enemyGroup.children.entries.length<6&&this.generateEnemy()}}class x extends p.exports.Scene{constructor(){super({key:"Preload"})}preload(){const e=this.add.text(this.scale.width/2,this.scale.height/2,"0%").setOrigin(.5);Object.entries(_).forEach(([t,n])=>{switch(this.load.setBaseURL("./assets/"),t){case"audio":n.forEach(s=>{this.load.audio(s.key,"audio/"+s.url)});break;case"sprites":n.forEach(s=>{this.load.spritesheet(s.key,"sprites/"+s.url,s.frame)});break;case"image":n.forEach(s=>{this.load.image(s.key,"image/"+s.url)});break}}),this.load.bitmapFont("Minecraft","font/font.png","font/font.xml"),this.load.on(p.exports.Loader.Events.PROGRESS,t=>{e.setText(`${parseInt(String(t*100))}%`)})}createAnimations(){this.anims.create({key:o.ship_run,frames:this.anims.generateFrameNumbers("ship",{frames:[0,1,2]}),repeat:-1,frameRate:10}),this.anims.create({key:o["enemy-small_run"],frames:this.anims.generateFrameNumbers("enemy-small",{}),repeat:-1,frameRate:10}),this.anims.create({key:o["enemy-medium_run"],frames:this.anims.generateFrameNumbers("enemy-medium",{}),repeat:-1,frameRate:10}),this.anims.create({key:o["enemy-big_run"],frames:this.anims.generateFrameNumbers("enemy-big",{}),repeat:-1,frameRate:10}),this.anims.create({key:o.bolts1_run,frames:this.anims.generateFrameNumbers("laser-bolts",{frames:[2,3]}),repeat:-1,frameRate:7}),this.anims.create({key:o.bolts2_run,frames:this.anims.generateFrameNumbers("laser-bolts",{frames:[0,1]}),repeat:-1,frameRate:7}),this.anims.create({key:o.explosion_run,frames:this.anims.generateFrameNumbers("explosion",{})})}create(){this.createAnimations(),this.scene.start("MainScene")}}var o=(i=>(i.ship_run="ship_run",i["enemy-small_run"]="enemy-small_run",i["enemy-medium_run"]="enemy-medium_run",i["enemy-big_run"]="enemy-big_run",i.bolts1_run="bolts1_run",i.bolts2_run="bolts2_run",i.explosion_run="explosion_run",i))(o||{});const _={audio:[{key:"Explode1",url:"Explode1.wav"},{key:"Hit_Hurt2",url:"Hit_Hurt2.wav"},{key:"Jump1",url:"Jump1.wav"},{key:"Laser_002",url:"Laser_002.wav"},{key:"music",url:"music.wav"}],sprites:[{key:"enemy-big",url:"enemy-big.bmp",frame:{frameWidth:32,frameHeight:32}},{key:"enemy-medium",url:"enemy-medium.bmp",frame:{frameWidth:32,frameHeight:16}},{key:"enemy-small",url:"enemy-small.bmp",frame:{frameWidth:16,frameHeight:16}},{key:"explosion",url:"explosion.bmp",frame:{frameWidth:16,frameHeight:16}},{key:"laser-bolts",url:"laser-bolts.bmp",frame:{frameWidth:16,frameHeight:16}},{key:"pixelspritefont32",url:"pixelspritefont32.bmp",frame:{frameWidth:16,frameHeight:24}},{key:"ship",url:"space-shooter.png",frame:{frameWidth:114,frameHeight:109}}],image:[{key:"desert-background",url:"desert-background.png"}]},S=800,w=600,h=2;console.log("version",c);const E=new p.exports.Game({type:Phaser.AUTO,scene:[x,k],antialias:!0,scale:{mode:Phaser.Scale.FIT,autoCenter:Phaser.Scale.CENTER_BOTH,width:S,height:w},physics:{default:"arcade",arcade:{gravity:{y:0}}}});window.g_game=E;
