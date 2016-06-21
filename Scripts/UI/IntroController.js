﻿#pragma strict
import UnityEngine.UI;
import UnityEngine.SceneManagement;

/* ====================================================
Load a level when any key pressed
======================================================= */

// private var FadingScript : FadingScript;
public var IntroTextObj : GameObject;
public var MenuUI : GameObject;
public var levelButtons : GameObject[];
public var levelReached :int = 0;

static var proposedLevelNum : int;

function Start() {
	// FadingScript = GetComponent.<FadingScript>();

	IntroTextObj.SetActive(false);

	MenuUI.SetActive(false);

	// FadingScript.BeginFade(-1);

	yield WaitForSeconds(2);

	IntroTextObj.SetActive(true);

	//--load the level reached from playerprefs
	var levelReachedLoad : int = PlayerPrefs.GetInt("levelReached");
	
	if(levelReachedLoad > 0)
	{
		levelReached = levelReachedLoad;
	} else {
		levelReached = 1;
	}
	Debug.Log("levelReached "+levelReached);

	//--hide all game menu buttons
	var levelButtonNum : int = 1;
	for(var levelButton : GameObject in levelButtons){
		
		if(levelButtonNum > levelReached ){
			levelButton.GetComponent.<Button>().interactable = false;
		}else {

		}

		levelButtonNum++;
	}

	//--show only the buttons for the levels we've finished, plus 1


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

