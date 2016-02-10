var game = null;

define (['states/preload', 'states/menu', 'states/play', 'states/gameover'], 
        function(Preload, Menu, Play, GameOver){
    'use strict';
    
    
    function Game() {}

    Game.prototype = {
        start: function()
        {
            game = new Phaser.Game(800, 800, Phaser.AUTO, 'game');
            
            game.state.add('Preload', new Preload());
            //game.state.add('Menu', new Menu());
            game.state.add('Play', new Play());
            //game.state.add('GameOver', new GameOver());
            
            
            game.state.start('Preload');
            
        }
        
    
    };

    return Game;
});