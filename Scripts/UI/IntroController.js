#pragma strict
import UnityEngine.UI;
import UnityEngine.SceneManagement;

/* ====================================================
Load a level when any key pressed
======================================================= */

// private var FadingScript : FadingScript;
public var IntroTextObj : GameObject;
public var MenuUI : GameObject;
public var levelButtons : GameObject[];

static var proposedLevelNum : int;

function Start() {
	// FadingScript = GetComponent.<FadingScript>();

	IntroTextObj.SetActive(false);

	MenuUI.SetActive(false);

	// FadingScript.BeginFade(-1);

	yield WaitForSeconds(2);

	IntroTextObj.SetActive(true);

	//--hide all game menu buttons
	for(var levelButton : GameObject in levelButtons){
		// levelButton.SetActive(false);
		levelButton.GetComponent.<Button>().interactable = false;

	}

	// levelButtons[0].SetActive(false);
	levelButtons[0].GetComponent.<Button>().interactable = false;


	//--show only the menu buttons we're allowed to see 

}

public function StartBtnPressed() {

	// FadingScript.BeginFade(1);

	//--show the menu select panel
	MenuUI.SetActive(true);
}

function LoadLevel (levelNum : int) {

	proposedLevelNum = levelNum;

	Debug.Log("load level "+ levelNum);

	SceneManager.LoadScene("Main");
}

