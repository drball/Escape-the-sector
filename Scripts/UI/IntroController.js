#pragma strict
import UnityEngine.UI;
import UnityEngine.SceneManagement;

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

}


public function StartBtnPressed() {

	FadingScript.BeginFade(1);

	LoadGameScene();
}


function LoadGameScene () {

	yield WaitForSeconds(2);

	SceneManager.LoadScene("Main");

}
