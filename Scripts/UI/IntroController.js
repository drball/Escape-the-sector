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
public var levelReached :int = 0;
public var LoadingDialog : GameObject; //--doesn't work
public var level1Collectables : GameObject[];
public var level2Collectables : GameObject[];
public var level3Collectables : GameObject[];
public var level4Collectables : GameObject[];
public var level5Collectables : GameObject[];
public var level6Collectables : GameObject[];

static var proposedLevelNum : int;

function Start() {
	// FadingScript = GetComponent.<FadingScript>();

	IntroTextObj.SetActive(false);

	MenuUI.SetActive(false);

	// FadingScript.BeginFade(-1);

	LoadingDialog.SetActive(false);

	//--load the level reached from playerprefs
	var levelReachedLoad : int = PlayerPrefs.GetInt("levelReached");
	
	if(levelReachedLoad > 0)
	{
		levelReached = levelReachedLoad;
	} else {
		levelReached = 1;
	}
	Debug.Log("levelReached "+levelReached);

	//--show only the buttons for the levels we've finished, plus 1
	var levelButtonNum : int = 1;
	for(var levelButton : GameObject in levelButtons){
		
		if(levelButtonNum > levelReached ){
			levelButton.GetComponent.<Button>().interactable = false;
		}

		//--load the level progress for this level
		var levelProgress: int = PlayerPrefs.GetInt("Level"+levelButtonNum+"StarsCollected");

		Debug.Log("level progress for "+levelButtonNum+" = "+levelProgress);

		levelButtonNum++;
	}



	yield WaitForSeconds(2);

	IntroTextObj.SetActive(true);


}

public function StartBtnPressed() {

	// FadingScript.BeginFade(1);

	//--show the menu select panel
	MenuUI.SetActive(true);
}

function LoadLevelBtnPressed(levelNum : int){

	//--menu button pressed
	LoadingDialog.SetActive(true); 

	LoadLevel(levelNum);
}

function LoadLevel (levelNum : int) {

	yield WaitForSeconds(0.25);

	proposedLevelNum = levelNum;

	Debug.Log("load level "+ levelNum);

	SceneManager.LoadScene("Main");
}

function ResetPlayerPrefs() {
	//--delete all playerprefs 

	PlayerPrefs.DeleteAll();
}

