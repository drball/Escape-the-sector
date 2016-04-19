#pragma strict

/* ====================================================
Load a level when any key pressed
======================================================= */

private var FadingScript : FadingScript;
public var IntroTextObj : GameObject;

function Start() {
	FadingScript = GetComponent.<FadingScript>();

	IntroTextObj.SetActive(false);

	FadingScript.BeginFade(-1);

	yield WaitForSeconds(2);

	IntroTextObj.SetActive(true);

	FadingScript.BeginFade(1);

}



function LoadGameScene () {

	FadingScript.BeginFade(1);

	yield WaitForSeconds(2);

	Application.LoadLevel("Main");

}