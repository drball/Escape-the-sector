#pragma strict

public var specialStatus: boolean = false;
public var SpecialParticleObj : GameObject;
private var gameController : GameControllerScript;
private var specialParticles : ParticleSystem;
private var specialParticleRate : float; //--feels like this should be done elsewhere

function Awake() {
	specialParticles = SpecialParticleObj.GetComponent.<ParticleSystem>();

	specialParticleRate = specialParticles.emissionRate;
}

function Start () {
	gameController = GameObject.Find("GameController").GetComponent.<GameControllerScript>();
}

function Update () {

}

function SetSpecialStatus() {
	specialStatus = true;

	//--show particles
	SpecialParticleObj.SetActive(true);

	specialParticles.emissionRate = specialParticleRate;

}

function RemoveSpecialStatus() {

	Debug.Log("removing special status");
	specialStatus = false;

	SpecialParticleObj.GetComponent.<ParticleSystem>().emissionRate = 0;

	//--hide particles
	yield WaitForSeconds(2);
	
	HideSpecialParticles();
}

function HideSpecialParticles(){

	SpecialParticleObj.SetActive(false);
}