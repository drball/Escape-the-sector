#pragma strict
import UnityEngine.UI;

static var isPaused : boolean = false;
// private var DialogueCanvas : Canvas;
// private var DialogueTextbox : Text;

//--variables
private var maxLevels : int; 
public var StartLocationObj : GameObject;
public var currentLevel : int;
public var score : int = 0;
private var maxCollectables : int = 3;

//--objects
private var scoreText : Text;
private var Player : GameObject;
public var levels : GameObject[];
public var CompleteLevelDialog : GameObject;
public var FailLevelDialog : GameObject;
public var LevelCompletedText : GameObject;

//--scripts
private var PlayerScript : PlayerControllerScript;
private var TimerScript : TimerScript;

function Start () {

	Player = GameObject.Find("Player");
	PlayerScript = Player.GetComponent.<PlayerControllerScript>();
	TimerScript = GetComponent.<TimerScript>();
		
	currentLevel = 1;

	ResetLevel();


}

function Update () {

	if (Input.GetKeyDown ("p"))
	{
		if(isPaused == false) {
			var PausedCanvasInstance : Canvas = Instantiate(Resources.Load("PausedCanvas", Canvas));
			PauseGame(true);
			
		} else {
			Destroy(GameObject.Find("PausedCanvas(Clone)"));
			PauseGame(false);
		}	
	}

	if (Input.GetKeyDown ("1")){
		Debug.Log("pressing1");
		GoToLevel(1);
	}
	
}

function StartLevel () {

	//--reset things. We might be starting from scratch, starting new level, or restarting level
	score = 0;

	PlayerScript.PlayerReset();

	yield WaitForSeconds(1);

	TimerScript.StartTimer();
}


function GoToLevel(destination:int) {

	//--hide all level gameObjects so we can show only one
	HideAllLevels();

	currentLevel = destination;

	//--show loading spinner

	//--save score so we can use it next level
//	PlayerPrefs.SetInt("score", score);

	Debug.Log("going to level "+destination);
	
	//--switch level
	levels[destination - 1].SetActive(true);

	//--set the start location of this level
	StartLocationObj = levels[destination - 1].Find("StartDummy");

	//--fade in 

	StartLevel();

}

function HideAllLevels() {

	//--when changing level, all other levels need to be hidden

	Debug.Log("hiding all levels");

	for(var theLevel : GameObject in levels){
		Debug.Log("hiding level "+theLevel.name);
		theLevel.SetActive(false);
	}
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

	yield WaitForSeconds(2);

	CompleteLevelDialog.SetActive(true);

	LevelCompletedText.GetComponent.<Text>().text = ": "+score+" / "+maxCollectables;

}

function ContinueSelected () {

	//--player has completed level, & has chosen to continue to next level

	//--hide dialog
	CompleteLevelDialog.SetActive(false);

	//--go to next level
	currentLevel++;
	GoToLevel(currentLevel);
}

function PlayAgainSelected() {
	//-- player has failed the level and is trying again
	Debug.Log("clicked playing again");

	ResetLevel();
}



function LevelFailed () {
	//--when the time runs out & the player hasn't reached the exit

	Debug.Log("level failed");

	PlayerScript.PlayerDie();

	//--flash the timer

	//--explode the player

	//--show failure dialog
	yield WaitForSeconds(1);
	FailLevelDialog.SetActive(true);

}

function ResetLevel () {

	//--hide all dialogs
	CompleteLevelDialog.SetActive(false);
	FailLevelDialog.SetActive(false);

	GoToLevel(currentLevel);

	TimerScript.ResetTimer();
}

