#pragma strict

public var specialStatus: boolean = false;
public var SpecialStatusParticles : GameObject;
private var gameController : GameControllerScript;

function Start () {
	gameController = GameObject.Find("GameController").GetComponent.<GameControllerScript>();
}

function Update () {

}

function SetSpecialStatus() {
	specialStatus = true;

	//--show particles
	SpecialStatusParticles.SetActive(true);

}

function RemoveSpecialStatus() {
	specialStatus = false;

	SpecialStatusParticles.GetComponent.<ParticleSystem>().emissionRate = 0;

	//--hide particles
	yield WaitForSeconds(2);
	SpecialStatusParticles.SetActive(false);



}