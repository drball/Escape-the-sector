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