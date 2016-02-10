define(['prefabs/tail'], function(Tail){
    
    var Hero = function(x, y, frame){
        Phaser.Sprite.call(this, game, x, y, 'hero', frame);
        
        game.physics.p2.enable(this);
        this.body.setCircle(40);
        
        //game.physics.arcade.enableBody(this);
        //this.body.collideWorldBounds = true;
        
        this.anchor.setTo(0.5);
        
        this.maxSpeed = 350;
        this.speedX = 0;
        this.speedY = 0;
        this.speed = 5;
        
        this.moving = false;
        
        this.hor = 0;
        this.stopH = 0;
        this.ver = 0;
        this.stopV = 0;
        
        this.tail = [];
        this.tailC = 2;
        
        this.Initialize();
        /*
        this.lastPoint = new Phaser.Point(this.x, this.y);
        if (this.tail.length > 0)
            game.time.events.loop(Phaser.Timer.SECOND * 0.1, this.HeMustFollow, this);
        */
    };
    
    Hero.prototype = Object.create(Phaser.Sprite.prototype);
    Hero.prototype.constructor = Hero;
   
    Hero.prototype.Initialize = function(){
        var f = this;
        
        for (var i = 0; i < this.tailC; i++){
            var t = new Tail(this.x, this.y, i + 1, i + 1, f);
            //var t = new Tail(this.x + 100, this.y + 100, i + 1, i + 1);
            this.tail.push(t);
            game.add.existing(t);
            f = t;
        }
        
    };
    
    Hero.prototype.update = function(){
        /*
        var p = new Phaser.Point(this.x, this.y);
        for (var i = 0; i < this.tailC; i++){
            //this.tail[i].NewAcceleration(p);
            p = new Phaser.Point(this.tail[i].x, this.tail[i].y);
        }
        */
        if (this.stopH !== 0){
            this.speedX += this.speed * this.stopH;
            if (this.speedX / Math.abs(this.speedX) === this.stopH){
                this.stopH = 0;
                if (this.hor === 0)
                    this.speedX = 0;
            }
        }
        
        if (this.stopV !== 0){
            this.speedY += this.speed * this.stopV;
            if (this.speedY / Math.abs(this.speedY) === this.stopV){
                this.stopV = 0;
                if (this.ver === 0)
                    this.speedY = 0;
            }
        }
        
        if (this.moving === true && this.speedX === 0 && this.speedY === 0){
            this.moving = false;
            return;
        }
        
        this.speedX += this.speed * this.hor;
        this.speedX = Math.abs(this.speedX) < 1 ? 0 : this.speedX;
        
        this.speedY += this.speed * this.ver;
        this.speedY = Math.abs(this.speedY) < 1 ? 0 : this.speedY;
        
        if (Math.sqrt(this.speedX * this.speedX + this.speedY * this.speedY) > this.maxSpeed){
            if (Math.abs(this.speedX) < this.maxSpeed || Math.abs(this.speedY) < this.maxSpeed){
                if (Math.abs(this.speedX) > Math.abs(this.speedY))
                    this.speedX = Math.sqrt(this.maxSpeed * this.maxSpeed - this.speedY * this.speedY) * this.hor;
                else
                    this.speedY = Math.sqrt(this.maxSpeed * this.maxSpeed - this.speedX * this.speedX) * this.ver;
            }
            else{
                var a = Math.atan(Math.abs(this.speedY) / Math.abs(this.speedX));
                this.speedX = Math.cos(a) * this.maxSpeed * this.hor;
                this.speedY = Math.sin(a) * this.maxSpeed * this.ver;
            }
            
        }
        
        this.body.velocity.x = this.speedX;
        this.body.velocity.y = this.speedY;
        
    };
    
    Hero.prototype.collisionSetUp = function(goodies, badies){
        this.body.setCollisionGroup(goodies);
        this.body.collides(badies);
        
        for (var i = 0; i < this.tailC; i++){
            this.tail[i].body.setCollisionGroup(goodies);
            this.body.collides(badies);
        }
    };
    
    Hero.prototype.HeMustFollow = function(){
        this.tail[0].Follow(this.lastPoint);
        this.lastPoint.x = this.x;
        this.lastPoint.y = this.y;
    };
    
    
    /*  STATE === 1 -> ON DOWN
        STATE === -1 -> ON UP   */
    Hero.prototype.PressedKey = function(key, state){
        switch (key){
            case 'left':
                if (state === 1){ 
                    if (this.hor === 1)
                        this.stopH = -1;
                    this.hor = -1;
                }
                else if (this.hor === -1) {
                    this.hor = 0;
                    this.stopH = 1;
                }
                
                break;
                
            case 'right':
                if (state === 1){ 
                    if (this.hor === -1)
                        this.stopH = 1;
                    this.hor = 1;
                }
                    
                else if (this.hor === 1){
                    this.hor = 0;
                    this.stopH = -1;
                }
                
                break;
                
            case 'up':
                if (state === 1) {
                    if (this.ver === 1)
                        this.stopV = -1;
                    this.ver = -1;
                }
                
                else if (this.ver === -1){
                    this.ver = 0;
                    this.stopV = 1;
                }
                
                break;
                
            case 'down':
                if (state === 1) {
                    if (this.ver === -1)
                        this.stopV = 1;
                    this.ver = 1;
                }
                
                else if (this.ver === 1){
                    this.ver = 0;
                    this.stopV = -1;
                }
                
                break;
        }     
        
        if (!this.moving && this.ver !== 0 || this.hor !== 0)
            this.moving = true;
    };
    
    return Hero;
});