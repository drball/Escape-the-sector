#pragma strict

public var GateForcefield : GameObject;
public var GateTrigger : GameObject;
private var gameController : GameControllerScript;
public var isOpen : boolean;

function Start () {
	gameController = GameObject.Find("GameController").GetComponent.<GameControllerScript>();

	Player = GameObject.Find("Player");
}

function Update () {

}


function OnTriggerEnter(other: Collider) 
{

	if (other.tag == "Player" && !isOpen)
	{
		isOpen = true;


	}
}