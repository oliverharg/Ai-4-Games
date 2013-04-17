/*------------------- 
a player entity
-------------------------------- */
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
            this.vel.x -= this.accel.x * me.timer.tick;
			this.vel.y = 0;
			this.setCurrentAnimation("left");
        } else if (me.input.isKeyPressed('right')) {
            // unflip the sprite
            //this.flipX(false);
            // update the entity velocity
            this.vel.x += this.accel.x * me.timer.tick;
			this.vel.y = 0;
			this.setCurrentAnimation("right");
        }else if (me.input.isKeyPressed('up')) {
            // unflip the sprite
            //this.flipY(false);
            // update the entity velocity
            this.vel.y -= this.accel.y * me.timer.tick;
			this.vel.x = 0;
			this.setCurrentAnimation("up");
        }else if (me.input.isKeyPressed('down')) {
            // unflip the sprite
            //this.flipY(true);
            // update the entity velocity
            this.vel.y += this.accel.y * me.timer.tick;
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