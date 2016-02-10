define([], function(){
    
    var Badie = function(x, y){
        Phaser.Sprite.call(this, game, x, y, 'badie');
        
        game.physics.p2.enable(this);
        this.body.setRectangle(40, 40);
        
        //game.physics.arcade.enableBody(this);
        //this.body.collideWorldBounds = true;
    };
    
    
    Badie.prototype = Object.create(Phaser.Sprite.prototype);
    Badie.prototype.constructor = Badie;
    
    return Badie;
});