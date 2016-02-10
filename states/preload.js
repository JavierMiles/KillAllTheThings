define([], function() {

    var Preload = function() {
        this.ready = false;
    };


    Preload.prototype = {
        constructor: Preload,
        
        preload: function() {
            this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
            
            this.load.spritesheet('hero', 'assets/pieces.png', 50, 50, 6);
            
            this.load.image('badie', 'assets/badie.png');
            
            /*
            this.load.image('background', 'assets/background.png');
            this.load.image('ship', 'assets/ship.png');
            this.load.image('bullet', 'assets/bullet.png');
            this.load.image('asteroid', 'assets/asteroid.png');
            
            this.load.spritesheet('bonus', 'assets/bonus.png', 48, 48, 5);
            
            this.load.spritesheet('asteroids', 'assets/asteroids.png', 128, 128, 5);
            */
        },
         
        
        update: function()  {
            
            if (!!this.ready)
                this.game.state.start('Play');
        },
        
        onLoadComplete: function()  {
            this.ready = true;
        }
    };

    return Preload;
});