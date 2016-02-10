define([], function(){
    
    var Tail = function(x, y, frame, pos, follow){
        Phaser.Sprite.call(this, game, x, y, 'hero', frame);
        
        this.theScale = Math.pow(3/4, pos);
        
        game.physics.p2.enable(this);
        this.body.setCircle(50 * this.theScale);
    
        this.anchor.setTo(0.5);
        
        this.follow = follow;
        this.maxSpeed = 300;
        
        this.scale.x = this.theScale;
        this.scale.y = this.theScale;
        
        this.pos = pos;
        this.dist = 100;
        
        this.waitingTime = 0.1;
        
        this.lastPoint = new Phaser.Point(this.x, this.y);
        
        this.moving = false;
    };
    
    Tail.prototype = Object.create(Phaser.Sprite.prototype);
    Tail.prototype.constructor = Tail;
    
    Tail.prototype.update = function(){
        var d = Phaser.Point.distance(this.follow, this);
        
        if (!this.moving){
            if (d > this.dist)
                this.moving = true;
            return;
        }
            
        //if (d > this.dist){
            var x = Math.abs(this.follow.x - this.x),
            y = Math.abs(this.follow.y - this.y);

            var a = Math.atan(y / x);

            x = Math.cos(a) * this.maxSpeed;
            y = Math.sin(a) * this.maxSpeed;

            x = this.follow.x > this.x ? x : x * -1;
            y = this.follow.y > this.y ? y : y * -1;

            this.body.velocity.x = x;
            this.body.velocity.y = y;
        //}
        
        /*
        if (d < 2){// && !this.follow.moving){
            x = 0;
            y = 0;
            this.x = this.follow.x;
            this.y = this.follow.y;
            this.moving = false;
        }
        */
      
        
        //    x = Math.abs(this.body.velocity.x) < 1 ? 0 : this.body.velocity.x * 4 / 5;
        //    y = Math.abs(this.body.velocity.y) < 1 ? 0 : this.body.velocity.y * 4 / 5;
        
        
    };
    
    Tail.prototype.Follow = function(p){
        
        if (!this.moving)
            return;
            
        if (this.follower !== undefined){
            this.follower.Follow(this.lastPoint);
            this.lastPoint.x = this.x;
            this.lastPoint.y = this.y;
        }
        
        var x = Math.abs(p.x - this.x),
            y = Math.abs(p.y - this.y),
            d = Math.sqrt(x*x + y*y);
        
        var a = Math.atan(y / x);
       
        x = Math.cos(a) * this.maxSpeed;
        y = Math.sin(a) * this.maxSpeed;
        
        if (d < this.dist){
            x = x < 3 ? 0 : x / 2;
            y = y < 3 ? 0 : y / 2;
        }
        
        x = p.x > this.x ? x : x * -1;
        y = p.y > this.y ? y : y * -1;
        
        this.body.velocity.x = x;
        this.body.velocity.y = y;
        
    };
    
    Tail.prototype.Move = function(){
        if (this.moving)
            return;
        
        this.moving = true;
        
    };
    
    return Tail;
});