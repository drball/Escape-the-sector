#pragma strict

public var SecondsCountdown : float; //--amount of seconds until this blows
public var BeamObj : GameObject;
public var ExpObj1 : GameObject;
public var ExpObj2 : GameObject;
public var ExpObj3 : GameObject;
public var ExpObj4 : GameObject;
public var BuildingNormal : GameObject;
public var BuildingDestroyed : GameObject;
public var Particles : GameObject;
public var ExplodeInView : boolean; //--only explode when close to player


private var CameraShakeScript : CameraShakeScript;
private var objRenderer  : Renderer;
private var isVisible : boolean;
private var explodeSfx : AudioSource;
private var Camera : Camera;

function Awake () {
	BeamObj.SetActive(false);
	ExpObj1.SetActive(false);
	ExpObj2.SetActive(false);
	ExpObj3.SetActive(false);
	ExpObj4.SetActive(false);
	Particles.SetActive(false);

	if (BuildingDestroyed) {
		BuildingDestroyed.SetActive(false);
	}

	Camera = GameObject.Find("MainCamera").GetComponent.<Camera>();
	CameraShakeScript = GameObject.Find("MainCamera").GetComponent.<CameraShakeScript>();
}

function Start(){

	if(!ExplodeInView) {
		Invoke("CountdownFinished", SecondsCountdown);
	}

	objRenderer = BuildingNormal.GetComponent.<MeshRenderer>();

	explodeSfx = GetComponent.<AudioSource>();
}


function CountdownFinished(){
	//--this has the be called from another function apparently - probably because it contains yields?

	if(gameObject.activeInHierarchy) {
		//--because this was called some time ago, check we're still active
		doAnimation();
	}
}

function isTopOfScreen(){

	var viewPos: Vector3 = Camera.WorldToViewportPoint(BuildingNormal.transform.position);

	// Debug.Log("screen pos = "+viewPos.y);

	if(viewPos.y > 0.25){
		return true;
	} else {
		return false;
		Debug.Log("not top of screen");
	}
	
}

function doAnimation(){

	isVisible = objRenderer.isVisible;

	// Debug.Log("esplode! is visible = "+isVisible);

	//--if visible, show the fancy explosions, if not, just show dead building

	if(isVisible){

		//--show laser beam
		BeamObj.SetActive(true);

		yield WaitForSeconds (0.1);

		//--show explosions
		ExpObj1.SetActive(true);

		//--make explosion sound
		explodeSfx.Play();

		CameraShakeScript.Shake();

		yield WaitForSeconds (0.1);

		ExpObj2.SetActive(true);

		//--hide laser beam
		BeamObj.SetActive(false);

		//--create particle debris
		Particles.SetActive(true);

		yield WaitForSeconds (0.3);
	}

	//--swap building for destroyed
	if(BuildingNormal){
		BuildingNormal.SetActive(false);
	}
	
	if(BuildingDestroyed) {
		BuildingDestroyed.SetActive(true);
	}

	if(isVisible){
	
		ExpObj3.SetActive(true);

		yield WaitForSeconds (0.3);

		ExpObj4.SetActive(true);

		yield WaitForSeconds (1);

		//--make sure everything's set to false
		ExpObj1.SetActive(false);
		ExpObj2.SetActive(false);
		ExpObj3.SetActive(false);
		ExpObj4.SetActive(false);
		Particles.SetActive(false);

	}


	
}

function BecomeVisible() {
	//--objecgt is now visible
	// Debug.Log("visible - now explode");

	if(isTopOfScreen()){
		Invoke("CountdownFinished", SecondsCountdown);
	}
	
}