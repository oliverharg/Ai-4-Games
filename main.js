// game resources
var g_resources= [{
	name: "player",
	type: "image",
	src: "player.png"
	}, {
	name: "enemy1",
	type: "image",
	src: "enemy1.png"
	}, {
	name: "enemy2",
	type: "image",
	src: "enemy2.png"
	},  {
	name: "enemy3",
	type: "image",
	src: "enemy3.png"
	},  {
	name: "enemy4",
	type: "image",
	src: "enemy4.png"
	}, {
	name: "enemy5",
	type: "image",
	src: "enemy5.png"
	}, {
	name: "title_screen",
	type: "image",
	src: "title_screen.png"
	}, {
	name: "32x32_font",
	type: "image",
	src: "32x32_font.png"
	}, {
	name: "GSCTileset32x32",
	type: "image",
	src: "GSCTileset32x32.png"
	}, {
	name: "GSCflipped",
	type: "image",
	src: "GSCflipped.png"
	},	{
	name: "metatiles32x32",
	type: "image",
	src: "metatiles32x32.png"
	}, {
	name: "route1_from_cave",
	type: "tmx",
	src: "route1_from_cave.tmx"
	}, {
	name: "route1_from_town1",
	type: "tmx",
	src: "route1_from_town1.tmx"
	}, {
	name: "town1_from_route1",
	type: "tmx",
	src: "town1_from_route1.tmx"
	}, {
	name: "town1_from_field1",
	type: "tmx",
	src: "town1_from_field1.tmx"
	}, {
	name: "field1_from_town1",
	type: "tmx",
	src: "field1_from_town1.tmx"
	}, {
	name: "field1_from_route2",
	type: "tmx",
	src: "field1_from_route2.tmx"
	}, {
	name: "route2_from_field1",
	type: "tmx",
	src: "route2_from_field1.tmx"
	}, {
	name: "route2_from_arena",
	type: "tmx",
	src: "route2_from_arena.tmx"
	}, {
	name: "arena",
	type: "tmx",
	src: "arena.tmx"
	}, {
	name: "cave",
	type: "tmx",
	src: "cave.tmx"
	}];


var jsApp	= 
{	
	/* ---
	
		Initialize the jsApp
		
		---			*/
	onload: function()
	{
		
		// init the video
		if (!me.video.init('jsapp', 640, 480, false, 1.0))
		{
			alert("Sorry but your browser does not support html 5 canvas.");
         return;
		}
				
		// initialize the "audio"
		me.audio.init("mp3,ogg");
		
		// set all resources to be loaded
		me.loader.onload = this.loaded.bind(this);
		
		// set all resources to be loaded
		me.loader.preload(g_resources);

		// load everything & display a loading screen
		me.state.change(me.state.LOADING);
	},
	
	
	/* ---
	
		callback when everything is loaded
		
		---										*/
	loaded: function ()
	{
	
		me.state.set(me.state.MENU, new TitleScreen());
		// set the "Play/Ingame" Screen Object
		me.state.set(me.state.PLAY, new PlayScreen());
		
		me.state.transition("fade", "#FFFFFF", 250);
		
		me.entityPool.add("player", PlayerEntity);
		me.entityPool.add("Enemy", EnemyEntity);
		me.entityPool.add("Enemy2", EnemyEntity);
		me.entityPool.add("Enemy3", EnemyEntity);
		me.entityPool.add("Enemy4", EnemyEntity);
		me.entityPool.add("Enemy5", EnemyEntity);
		me.entityPool.add("Enemy6", EnemyEntity);
		me.entityPool.add("Enemy7", EnemyEntity);
		me.entityPool.add("Enemy8", EnemyEntity);
		me.entityPool.add("Enemy9", EnemyEntity);
		me.entityPool.add("Enemy10", EnemyEntity);
		me.entityPool.add("Enemy11", EnemyEntity);
		me.entityPool.add("Enemy12", EnemyEntity);
		me.entityPool.add("Enemy13", EnemyEntity);
		//me.debug.renderHitBox = true;
		
		me.input.bindKey(me.input.KEY.LEFT,  "left");
		me.input.bindKey(me.input.KEY.RIGHT, "right");
		me.input.bindKey(me.input.KEY.UP,  "up");
		me.input.bindKey(me.input.KEY.DOWN, "down");
      
      // start the game 
		me.state.change(me.state.MENU);
	}

}; // jsApp

/* the in game stuff*/
var PlayScreen = me.ScreenObject.extend(
{

   onResetEvent: function()
	{	
      // stuff to reset on state change
	  me.levelDirector.loadLevel("route1_from_town1");
	  //alert("TEST");
	  //pops up a message box, can be dropped in anywhere
	},
	
	
	/* ---
	
		 action to perform when game is finished (state change)
		
		---	*/
	onDestroyEvent: function()
	{
	
   }

});

/*----------------------
 
    A title screen
 
  ----------------------*/
 
var TitleScreen = me.ScreenObject.extend({
    // constructor
    init: function() {
        this.parent(true);
 
        // title screen image
        this.title = null;
 
        this.font = null;
        this.scrollerfont = null;
        this.scrollertween = null;
 
        this.scroller = "PRESS ENTER TO PLAY       ";
        this.scrollerpos = 600;
    },
 
    // reset function
    onResetEvent: function() {
        if (this.title == null) {
            // init stuff if not yet done
            this.title = me.loader.getImage("title_screen");
            // font to display the menu items
            this.font = new me.BitmapFont("32x32_font", 32);
            this.font.set("left");
 
            // set the scroller
            this.scrollerfont = new me.BitmapFont("32x32_font", 32);
            this.scrollerfont.set("left");
 
        }
 
        // reset to default value
        this.scrollerpos = 640;
 
        // a tween to animate the arrow
        this.scrollertween = new me.Tween(this).to({
            scrollerpos: -2200
        }, 10000).onComplete(this.scrollover.bind(this)).start();
 
        // enable the keyboard
        me.input.bindKey(me.input.KEY.ENTER, "enter", true);
  
    },
 
    // some callback for the tween objects
    scrollover: function() {
        // reset to default value
        this.scrollerpos = 640;
        this.scrollertween.to({
            scrollerpos: -2200
        }, 10000).onComplete(this.scrollover.bind(this)).start();
    },
 
    // update function
    update: function() {
        // enter pressed ?
        if (me.input.isKeyPressed('enter')) {
            me.state.change(me.state.PLAY);
        }
        return true;
    },
 
    // draw function
    draw: function(context) {
        context.drawImage(this.title, 0, 0);
 
       // this.font.draw(context, "PRESS ENTER TO PLAY", 20, 240);
        this.scrollerfont.draw(context, this.scroller, this.scrollerpos, 440);
    },
 
    // destroy function
    onDestroyEvent: function() {
        me.input.unbindKey(me.input.KEY.ENTER);
 
        //just in case
        this.scrollertween.stop();
    }
 
});


//bootstrap :)
window.onReady(function() 
{
	jsApp.onload();
});

