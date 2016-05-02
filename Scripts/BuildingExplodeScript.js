#pragma strict

public var BeamObj : GameObject;
public var ExpObj1 : GameObject;
public var ExpObj2 : GameObject;
public var ExpObj3 : GameObject;
public var ExpObj4 : GameObject;
public var BuildingNormal : GameObject;
public var BuildingDestroyed : GameObject;
public var Particles : GameObject;

private var CameraShakeScript : CameraShakeScript;


function Start () {
	BeamObj.SetActive(false);
	ExpObj1.SetActive(false);
	ExpObj2.SetActive(false);
	ExpObj3.SetActive(false);
	ExpObj4.SetActive(false);
	BuildingDestroyed.SetActive(false);
	Particles.SetActive(false);

	// CameraShakeScript = GameObject.Find("MainCamera").GetComponent.<CameraShakeScript>();
}

function Update () {
	if(Input.GetKey("e")) {
		Debug.Log("esplode!");
		DoAnimation();
	}
}

function DoAnimation(){

	//--show laser beam
	BeamObj.SetActive(true);

	yield WaitForSeconds (0.1);

	//--show explosions
	ExpObj1.SetActive(true);

	// CameraShakeScript.Shake();

	yield WaitForSeconds (0.1);

	ExpObj2.SetActive(true);

	//--hide laser beam
	BeamObj.SetActive(false);

	Particles.SetActive(true);

	yield WaitForSeconds (0.3);

	//--swap building for destroyed
	BuildingNormal.SetActive(false);
	BuildingDestroyed.SetActive(true);

	ExpObj3.SetActive(true);

	yield WaitForSeconds (0.3);

	ExpObj4.SetActive(true);

	//--make explosion noise

	//--create particle debris

	
}