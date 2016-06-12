#pragma strict

/* ====================================================
For a collectable object - normal and special
======================================================= */

private var gameController : GameControllerScript;
private var collectionController : CollectionController;
private var isCollectable : boolean = true;
private var collectionSfx : AudioSource;
public var vfxObj : GameObject;
public var ConstantParticles : GameObject;
public var isKey : boolean;
public var isSpecial : boolean;


function Start () {
	//--find gameController so we can call functions
	gameController = GameObject.Find("GameController").GetComponent.<GameControllerScript>();

	collectionController = GameObject.Find("GameController").GetComponent.<CollectionController>();
	
	collectionSfx = GetComponent.<AudioSource>();

}


function OnTriggerEnter(other: Collider) 
{

	if (other.tag == "Player" && isCollectable)
	{
	    collectionSfx.Play();

	    Debug.Log("player hit collectable");
	    
	    // gameController.IncreaseScore(1);
	    
	    var sparkInstance : GameObject = Instantiate(Resources.Load("CollectionSparks", GameObject),
			Vector3(gameObject.transform.position.x,gameObject.transform.position.y,gameObject.transform.position.z), 
			Quaternion.Euler(-90, 0, 0));
			
		Destroy(sparkInstance,1);
		
		//--hide for now 
	    vfxObj.SetActive(false);
	    isCollectable = false;

	    if(ConstantParticles) {
	    	ConstantParticles.GetComponent.<ParticleSystem>().emissionRate = 0;
	    }

	    if (isKey) {

	    	//--let game controller know we're at special status
	    	collectionController.SetSpecialStatus();

			yield WaitForSeconds (20);

			ReactivateCollectable();
	    } else {
	    	//--increase score 
	    	gameController.IncreaseScore();

	    	Destroy(gameObject,2);
	    }

	    if(isSpecial) {
    		gameController.collectablesCollected++;
	    }
 
	}

}

function ReactivateCollectable() {

	//--come back and blink for a bit

	//--only used for key

	vfxObj.SetActive(true);
	
	var blinkingAmt : int = 0;
	
	while(blinkingAmt < 6) {
        yield WaitForSeconds(0.1);
        vfxObj.GetComponent.<Renderer>().enabled = !vfxObj.GetComponent.<Renderer>().enabled;
        blinkingAmt++;
    }
    vfxObj.GetComponent.<Renderer>().enabled = true;
    isCollectable = true;
}