#pragma strict

/* ====================================================
For a collectable object which comes back later
======================================================= */

private var gameController : GameControllerScript;
private var isCollectable : boolean = true;

var vfxObj : GameObject;
// var collectionSfx : AudioSource;


function Start () {
	//--find gameController so we can call functions
	gameController = GameObject.Find("GameController").GetComponent.<GameControllerScript>();
	
	// collectionSfx = GetComponent.<AudioSource>();

}


function OnTriggerEnter(other: Collider) 
{

	if (other.tag == "Player" && isCollectable)
	{
	    // collectionSfx.Play();

	    Debug.Log("player hit collectable");
	    
	    // gameController.IncreaseScore(1);
	    
	    var sparkInstance : GameObject = Instantiate(Resources.Load("CollectionSparks", GameObject),
			Vector3(gameObject.transform.position.x,gameObject.transform.position.y,gameObject.transform.position.z), 
			transform.rotation);
			
		Destroy(sparkInstance,1);
		
		//--hide for now 
	    vfxObj.SetActive(false);
	    isCollectable = false;

	    //--increase score 
	    gameController.IncreaseScore();
	    
	 //    yield WaitForSeconds (10);
	    
		// vfxObj.SetActive(true);
		
		// //--come back and blink for a bit
		
		// var blinkingAmt : int = 0;
		
		// while(blinkingAmt < 6) {
	 //        yield WaitForSeconds(0.1);
	 //        vfxObj.GetComponent.<Renderer>().enabled = !vfxObj.GetComponent.<Renderer>().enabled;
	 //        blinkingAmt++;
	 //    }
	 //    vfxObj.GetComponent.<Renderer>().enabled = true;
	 //    isCollectable = true;
	    
	}

}