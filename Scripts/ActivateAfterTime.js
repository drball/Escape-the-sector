#pragma strict

public var timeToActive : float;

function Start () {
	gameObject.SetActive(false);

	Invoke("ActivateObject", timeToActive);
}

function ActivateObject(){

	gameObject.SetActive(true);
}

