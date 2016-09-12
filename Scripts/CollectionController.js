#pragma strict

public var specialStatus: boolean = false;
private var playerController : SpecialPlayerEffectScript;
public var PointsText : GameObject;

function Start () {
	playerController = GameObject.Find("Player").GetComponent.<SpecialPlayerEffectScript>();
}

function SetSpecialStatus() {
	specialStatus = true;

	playerController.StartSpecialEffect();
}

function RemoveSpecialStatus() {

	Debug.Log("removing special status");
	specialStatus = false;

	playerController.StopSpecialEffect();
}

