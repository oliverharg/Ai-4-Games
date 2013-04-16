// game resources
var g_resources= [{
	name: "player",
	type: "image",
	src: "player.png"
	}, {
	name: "GSCTileset32x32",
	type: "image",
	src: "GSCTileset32x32.png"
	}, {
	name: "world1",
	type: "tmx",
	src: "world1.tmx"
	}, {
	name: "inhouse",
	type: "tmx",
	src: "inhouse.tmx"
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
		// set the "Play/Ingame" Screen Object
		me.state.set(me.state.PLAY, new PlayScreen());
		
		me.entityPool.add("player", PlayerEntity);
		me.debug.renderHitBox = true;
		
		me.input.bindKey(me.input.KEY.LEFT,  "left", true);
		me.input.bindKey(me.input.KEY.RIGHT, "right", true);
		me.input.bindKey(me.input.KEY.UP,  "up", true);
		me.input.bindKey(me.input.KEY.DOWN, "down", true);
      
      // start the game 
		me.state.change(me.state.PLAY);
	}

}; // jsApp

/* the in game stuff*/
var PlayScreen = me.ScreenObject.extend(
{

   onResetEvent: function()
	{	
      // stuff to reset on state change
	  me.levelDirector.loadLevel("world1");
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


//bootstrap :)
window.onReady(function() 
{
	jsApp.onload();
});

