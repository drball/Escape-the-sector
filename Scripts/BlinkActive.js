/* ====================================================
Disable entire object for a time, then reenable, 
creating a blinking effect that is configurable
======================================================= */

#pragma strict

public var blinkRate : float = 1.5; //amount of seconds between change
public var delay : float = 0;

function Start () {
	ActiveBlink();
	InvokeRepeating("ActiveBlink", delay, blinkRate);
}

function ActiveBlink(){

	// Debug.Log("blink");

	if(gameObject.activeSelf == true){
    	gameObject.SetActive(false);
	}else {
		gameObject.SetActive(true);
	}
}