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
public var InfoDialog : GameObject;
private var LevelsController : LevelsController;


function Start() {
	// FadingScript = GetComponent.<FadingScript>();

	IntroTextObj.SetActive(false);
	MenuUI.SetActive(false);
	InfoDialog.SetActive(false);

	LevelsController = GameObject.Find("LevelsController").GetComponent.<LevelsController>();
	

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

		levelButtonNum++;
	}

	yield WaitForSeconds(2); // why?

	IntroTextObj.SetActive(true);

}

public function StartBtnPressed() {

	// FadingScript.BeginFade(1);

	//--show the menu select panel
	MenuUI.SetActive(true);
}

function LoadLevelBtnPressed(levelNum : int){

	Debug.Log("level button pressed");

	//--menu button pressed
	LoadingDialog.SetActive(true); 

	WaitThenLoadLevel(levelNum);

}

function InfoPressed(){

	Debug.Log("info button pressed");
	InfoDialog.SetActive(true); 
}

function InfoClosedPressed(){

	InfoDialog.SetActive(false); 
}

function WaitThenLoadLevel(levelNum : int){
	//--can't do a yield in the function we call from a button!
	yield WaitForSeconds(0.25);
	LevelsController.LoadLevel(levelNum);
}

function ResetPlayerPrefs() {
	//--delete all playerprefs 

	PlayerPrefs.DeleteAll();
}

