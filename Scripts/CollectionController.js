#pragma strict

public var specialStatus: boolean = false;

private var playerController : SpecialPlayerEffectScript;

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