#pragma strict

// private var portalRing : Transform;
// private var portalShockwave : Transform;
private var player : GameObject;
// private var fadeTime : float;
// private var fadingScript : FadingScript;
private var gameController : GameControllerScript;


function Start () {
	// portalRing = transform.Find("SpacePortal__ring"); //--have to search the transform for subobjects
	// portalShockwave = transform.Find("ShockwaveParticles");
	
	player = GameObject.Find("Player");
	
	gameController = GameObject.Find("GameController").GetComponent.<GameControllerScript>();
	// fadingScript = gameControllerObj.GetComponent.<FadingScript>();
	
}

function Update () {

}

function OnTriggerEnter(other: Collider) {

	Debug.Log("something hit exit"+other);

	//--if player going through portal
	if ((other.tag == "Player") ) {

		Debug.Log("Hit exit");

		// GetComponent.<Rigidbody>().AddRelativeTorque(0,-50,0);
		// portalRing.GetComponent.<Rigidbody>().AddTorque(0,50,0);
		
		// yield WaitForSeconds (0.25);
		
		// portalShockwave.gameObject.SetActive(true);
		// player.SetActive(false);

		// fadeTime = fadingScript.BeginFade(1);
		
		// yield WaitForSeconds (fadeTime + 1);
		
		// gameController.GoToLevel(destination);	

		gameController.ExitReached();
	}
}