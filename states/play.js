define(['prefabs/hero', 'prefabs/badie'], function(Hero, Badie) {

    var Play = function() {};

    Play.prototype.constructor = Play;

    Play.prototype.create = function() {
        //game.physics.startSystem(Phaser.Physics.ARCADE);
        game.physics.startSystem(Phaser.Physics.P2JS);
        
        game.world.setBounds(0, 0, game.width, game.height);
        
        
        game.physics.p2.setImpactEvents(true);
        game.physics.p2.restitution = 0;
        
        
        this.hcg = game.physics.p2.createCollisionGroup();
        this.bcg = game.physics.p2.createCollisionGroup();
        
        
        this.hero = new Hero(game.width / 2, game.height / 2, 0);
        game.add.existing(this.hero);
        this.hero.collisionSetUp(this.hcg, this.bcg);
        
        this.badies = [];
        this.badies.push( new Badie(200, 200));
        game.add.existing(this.badies[0]);
        
        
        game.physics.p2.updateBoundsCollisionGroup();
        this.Controls();
        
    };

    Play.prototype.Controls = function() {
        
        game.input.keyboard.addKeyCapture([Phaser.Keyboard.RIGHT, Phaser.Keyboard.LEFT, Phaser.Keyboard.DOWN, Phaser.Keyboard.UP]);
        var left = this.input.keyboard.addKey(Phaser.Keyboard.LEFT),
            right = this.input.keyboard.addKey(Phaser.Keyboard.RIGHT),
            up = this.input.keyboard.addKey(Phaser.Keyboard.UP),
            down = this.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        
        
        right.onDown.add(function(){ this.hero.PressedKey('right', 1); }, this);
        left.onDown.add(function(){ this.hero.PressedKey('left', 1); }, this);
        up.onDown.add(function(){ this.hero.PressedKey('up', 1); }, this);
        down.onDown.add(function(){ this.hero.PressedKey('down', 1); }, this);

        right.onUp.add(function(){ this.hero.PressedKey('right', -1); }, this);
        left.onUp.add(function(){ this.hero.PressedKey('left', -1); }, this);
        up.onUp.add(function(){ this.hero.PressedKey('up', -1); }, this);
        down.onUp.add(function(){ this.hero.PressedKey('down', -1); }, this);

    };

    
    Play.prototype.update = function() {
    };

    return Play;
});