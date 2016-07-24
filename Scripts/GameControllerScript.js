#pragma strict
import UnityEngine.UI;

static var isPaused : boolean = false;
// private var DialogueCanvas : Canvas;
// private var DialogueTextbox : Text;

//--variables
private var maxLevels : int; 
public var StartLocationObj : GameObject;
// public var currentLevel : int;
public var score : int = 0;
private var maxCollectables : int = 3;
public var collectablesCollected : int;
public var LoadingDialog : GameObject;

//--objects
private var scoreText : Text;
public var Player : GameObject;
public var CompleteLevelDialog : GameObject;
public var FailLevelDialog : GameObject;
public var CompleteGameDialog : GameObject;
public var LevelCompletedText : GameObject;
public var DarkBg : GameObject;
private var CameraShakeScript : CameraShakeScript;
private var CollectionScript : CollectionController;
private var SpecialPlayerEffectScript : SpecialPlayerEffectScript;
private var LevelsController : LevelsController;

//--scripts
private var PlayerScript : PlayerControllerScript;
private var TimerScript : TimerScript;

function Start () {

	// SceneManager.UnloadScene("Intro");

	PlayerScript = Player.GetComponent.<PlayerControllerScript>();
	TimerScript = GetComponent.<TimerScript>();
	StartLocationObj = GameObject.Find("StartDummy");
	CameraShakeScript = GameObject.Find("MainCamera").GetComponent.<CameraShakeScript>();
	CollectionScript = GetComponent.<CollectionController>();
	SpecialPlayerEffectScript = Player.GetComponent.<SpecialPlayerEffectScript>();
	DarkBg.SetActive(false);
	LevelsController = GameObject.Find("LevelsController").GetComponent.<LevelsController>();

	StartLevel();
	
}

function Update () {

	if (Input.GetKeyDown ("p"))
	{
		if(isPaused == false) {
			// var PausedCanvasInstance : Canvas = Instantiate(Resources.Load("PausedCanvas", Canvas));
			PauseGame(true);
			
		} else {
			// Destroy(GameObject.Find("PausedCanvas(Clone)"));
			PauseGame(false);
		}	
	}

	// if (Input.GetKeyDown ("1")){
	// 	Debug.Log("pressing1");
	// 	GoToLevel(1);
	// }
	
}


function StartLevel() {

	Debug.Log("starting level "+LevelsController.currentLevel);

	PlayerScript.PlayerReset();

	ResetLevel();

	yield WaitForSeconds(1);

	TimerScript.StartTimer();

}

function PauseGame (action : boolean) {

	if((action == true) && isPaused != true)
	{
		Debug.Log("pause game");
		isPaused = true;
		Time.timeScale = 0.0;
	} else {
		Debug.Log("unpause");
		isPaused = false;
		Time.timeScale = 1.0;
	}
}

function IncreaseScore() {
	score++;
}

function ExitReached() {
	if(PlayerScript.isAlive == true) {
		LevelCompleted();
	}
}

function LevelCompleted () {
	//--player has reached exit. Show options

	TimerScript.EndTimer();

	PlayerScript.HideVFX();

	CollectionScript.specialStatus = false;
	SpecialPlayerEffectScript.StopSpecialEffect();

	//--save the level reached - if it's greater than we had before
	var levelReached : int = PlayerPrefs.GetInt("levelReached");
	Debug.Log("Completing "+LevelsController.currentLevel+". LevelReached is: "+levelReached);
	if( LevelsController.currentLevel >= levelReached){
		Debug.Log("updating levelReached to "+(LevelsController.currentLevel+1));
		PlayerPrefs.SetInt("levelReached",(LevelsController.currentLevel+1));
	}

	//--save the colletables - if it's greater than we had
	var savedProgress : int = PlayerPrefs.GetInt("Level"+LevelsController.currentLevel+"StarsCollected");
	Debug.Log("loading progress - level:"+LevelsController.currentLevel+" has progress: "+savedProgress);

	if( collectablesCollected > savedProgress){
		Debug.Log("saving level "+LevelsController.currentLevel);
		PlayerPrefs.SetInt("Level"+LevelsController.currentLevel+"StarsCollected",collectablesCollected);
	}

	yield WaitForSeconds(2);

	CompleteLevelDialog.SetActive(true);

	LevelCompletedText.GetComponent.<Text>().text = ": "+collectablesCollected+" / "+maxCollectables;

}

function ContinueSelected () {

	//--player has completed level, & has chosen to continue to next level
	Debug.Log("continue selected");

	//--hide dialog
	CompleteLevelDialog.SetActive(false);

	//--check if there is a next level, or if this was the last
	// Debug.Log("array length = "+levelObjects.Length);
	if(LevelsController){
		if(LevelsController.currentLevel < LevelsController.numLevels ){
			Debug.Log("Load next level out of "+LevelsController.numLevels);
			LevelsController.LoadNextLevel();
		} else {
			CompleteGameDialog.SetActive(true);
		}
	}else {
		Debug.Log("no levelsController");

		//--there's no levelscontroller (maybe we're testing this scene in isolation)
		//--load menu instead
		Application.LoadLevel("Intro");
	}
	

}

function PlayAgainSelected() {
	//-- player has failed the level and is trying again
	Debug.Log("clicked playing again");

	LoadingDialog.SetActive(true);

	Application.LoadLevel(Application.loadedLevel); //--easier than resetting all vars
}

function LevelFailed () {
	//--when the time runs out & the player hasn't reached the exit

	Debug.Log("level failed");

	PlayerScript.PlayerDie();

	//--show failure dialog
	yield WaitForSeconds(2);
	FailLevelDialog.SetActive(true);

	DarkBg.SetActive(true);
	

}

function ResetLevel () {

	Debug.Log("resetting level! c");

	//--hide all dialogs
	CompleteLevelDialog.SetActive(false);
	FailLevelDialog.SetActive(false);
	CompleteGameDialog.SetActive(false);
	DarkBg.SetActive(false);
	CameraShakeScript.constantShaking = false;
	CollectionScript.specialStatus = false;
	SpecialPlayerEffectScript.StopSpecialEffect();
	collectablesCollected = 0;
	score = 0;
	
	GameObject.Find("MainCamera").GetComponent.<Animator>().enabled = false;

	// GoToLevel(currentLevel);

	TimerScript.ResetTimer();

	LoadingDialog.SetActive(false);
}



