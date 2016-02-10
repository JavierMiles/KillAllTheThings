(function() {
   'use strict';
    requirejs.config({
        //paths: {Phaser: 'lib/phaser.min'},
    
        //shim: {'Phaser': {exports: 'Phaser'} }
        
    });
    
    
    require(['game'], function(Game) {
        var game = new Game();
        game.start();        
    });
    
    
}());

