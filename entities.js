/*------------------- 
a player entity
-------------------------------- */
var playerData = {
	hp: 100,
	maxHp: 100,
	maxStamina: 20,
	winNum: 0
};
var PlayerEntity = me.ObjectEntity.extend({
 
    /* -----
 
    constructor
 
    ------ */
 
    init: function(x, y, settings) {
        // call the constructor
        this.parent(x, y, settings);
		this.addAnimation("left",[4,5]);
		this.addAnimation("right",[2,3]);
		this.addAnimation("up",[9,10,11]);
		this.addAnimation("down",[6,7,8]);
        // set the default horizontal & vertical speed (accel vector)
		// set to move one unit per button press
        this.setVelocity(3,3);
		this.gravity = 0;
 
        // set the display to follow our position on both axis
        me.game.viewport.follow(this.pos, me.game.viewport.AXIS.BOTH);
 
    },
 
    /* -----
 
    update the player pos
 
    ------ */
    update: function() {
 
        if (me.input.isKeyPressed('left')) {
            // flip the sprite on horizontal axis
           // this.flipX(true);
            // update the entity velocity
            this.vel.x -= 32;
			this.vel.y = 0;
			this.setCurrentAnimation("left");
        } else if (me.input.isKeyPressed('right')) {
            // unflip the sprite
            //this.flipX(false);
            // update the entity velocity
            this.vel.x += 32;
			this.vel.y = 0;
			this.setCurrentAnimation("right");
        }else if (me.input.isKeyPressed('up')) {
            // unflip the sprite
            //this.flipY(false);
            // update the entity velocity
            this.vel.y -= 32;
			this.vel.x = 0;
			this.setCurrentAnimation("up");
        }else if (me.input.isKeyPressed('down')) {
            // unflip the sprite
            //this.flipY(true);
            // update the entity velocity
            this.vel.y += 32;
			this.vel.x = 0;
			this.setCurrentAnimation("down");
        } else {
            this.vel.x = 0;
			this.vel.y = 0;
        }
 
        // check & update player movement
        this.updateMovement();
		
		 // check for collision
		var res = me.game.collide(this);
		 
        // update animation if necessary
        if (this.vel.x!=0 || this.vel.y!=0) {
            // update object animation
            this.parent();
            return true;
        }
         
        // else inform the engine we did not perform
        // any update (e.g. position, animation)
        return false;
    }
 
});
var EnemyEntity = me.ObjectEntity.extend({
    init: function(x, y, settings) { 
        // call the parent constructor
        this.parent(x, y, settings);
	
       // this.startX = x;
        //this.endX = x + settings.width - settings.spritewidth;
       
 
        // walking & jumping speed
        this.setVelocity(0,0);
		this.gravity = 0;
 
        // make it collidable
        this.collidable = true;
        // make it a enemy object
        this.type = me.game.ENEMY_OBJECT;
 
    },/*
	onBattleReturn: function(obj){
	//return from battle function
	if(obj.battlewon)
		this.alive = false;
		this.visible = false;
	},*/
    // call by the engine when colliding with another object
    // obj parameter corresponds to the other object (typically the player) touching this one
    onCollision: function(res, obj) {
 
        // res.y >0 means touched by something on the bottom
        // which mean at top position for this one
        if (this.alive) {
			
          //  link to battle sequence                      ~~~~~~~~~~~~~~~~~~~~~~~~~~~CHRIS LOOK HERE!!!!!!!!!!!~~~~~~~~~~~~~~~~~~~~~
		  //this.onBattleReturn()
		  //alert("TEST");
		//  this.visible = false;
        }
    },
 
    // manage the enemy movement
    update: function() {
        // do nothing if not visible
        if (!this.inViewport)
            return false;
 /*
        if (this.alive) {
            if (this.walkLeft && this.pos.x <= this.startX) {
                this.walkLeft = false;
            } else if (!this.walkLeft && this.pos.x >= this.endX) {
                this.walkLeft = true;
            }
            // make it walk
            this.flipX(this.walkLeft);
            this.vel.x += (this.walkLeft) ? -this.accel.x * me.timer.tick : this.accel.x * me.timer.tick;
                 
        } else {
            this.vel.x = 0;
        }
         */
        // check and update movement
        this.updateMovement();
         
        // update animation if necessary
        if (this.vel.x!=0 || this.vel.y!=0) {
            // update object animation
            this.parent();
            return true;
        }
        return false;
    }
});