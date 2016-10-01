#pragma strict
import UnityEngine.UI;

static var isPaused : boolean = false;
// private var DialogueCanvas : Canvas;
// private var DialogueTextbox : Text;

//--variables
private var maxLevels : int; 
private var maxCollectables : int = 3;
public var collectablesCollected : int;

//--objects
public var LoadingDialog : GameObject;
public var StartLocationObj : GameObject;
private var Player : GameObject;
public var CompleteLevelDialog : GameObject;
public var FailLevelDialog : GameObject;
public var CompleteGameDialog : GameObject;
public var LevelCompletedText : GameObject;
public var DarkBg : GameObject;

//--scripts
private var PlayerScript : PlayerControllerScript;
private var PlayerMovementScript : PlayerMovementScript;
private var TimerScript : TimerScript;
private var CameraShakeScript : CameraShakeScript;
private var CollectionScript : CollectionController;
private var SpecialPlayerEffectScript : SpecialPlayerEffectScript;
private var LevelsController : LevelsController;
private var PointsController : PointsController;
private var CameraFollowPlayer : CameraFollowPlayer;

function Awake(){
	Player = LoadCharacter();
}

function Start () {

	Debug.Log("the character chosen was "+PlayerSelectController.currentCharacterNum);

	StartLocationObj = GameObject.Find("StartDummy");
	
	PlayerScript = Player.GetComponent.<PlayerControllerScript>();
	PlayerMovementScript = Player.GetComponent.<PlayerMovementScript>();
	TimerScript = GetComponent.<TimerScript>();
	CameraShakeScript = GameObject.Find("MainCamera").GetComponent.<CameraShakeScript>();
	CollectionScript = GetComponent.<CollectionController>();
	SpecialPlayerEffectScript = Player.GetComponent.<SpecialPlayerEffectScript>();
	DarkBg.SetActive(false);
	LevelsController = GameObject.Find("LevelsController").GetComponent.<LevelsController>();
	PointsController = GameObject.Find("PointsController").GetComponent.<PointsController>();
	CameraFollowPlayer = GameObject.FindWithTag("MainCamera").GetComponent.<CameraFollowPlayer>();

	StartLevel();

	CameraFollowPlayer.CameraSetup();
	
}

function LoadCharacter(){

	Debug.Log("add player "+PlayerSelectController.currentCharacterName);

	//--if no character, fallback to default
	if(!PlayerSelectController.currentCharacterName){
		PlayerSelectController.currentCharacterName = "ShipFalko";
	}

	var PlayerCharacter : GameObject = Instantiate(Resources.Load(PlayerSelectController.currentCharacterName, GameObject),
			Vector3(0,0,0), 
			Quaternion.identity);
	PlayerCharacter.transform.parent = transform;

	return PlayerCharacter;
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



function ExitReached() {
	if(PlayerScript.isAlive == true) {
		LevelCompleted();
	}
}

function LevelCompleted () {
	//--player has reached exit. Show options

	PlayerScript.isAlive = false;

	TimerScript.EndTimer();

	PlayerScript.HideVFX();

	PlayerMovementScript.ParticleThrustL.GetComponent.<ParticleSystem>().emissionRate = 0;
	PlayerMovementScript.ParticleThrustR.GetComponent.<ParticleSystem>().emissionRate = 0;

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
	// Debug.Log("loading progress - level:"+LevelsController.currentLevel+" has progress: "+savedProgress);

	if( collectablesCollected > savedProgress){
		Debug.Log("saving level "+LevelsController.currentLevel);
		PlayerPrefs.SetInt("Level"+LevelsController.currentLevel+"StarsCollected",collectablesCollected);
	}

	PointsController.SavePoints(); //--save points to playerprefs

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

	PlayerScript.isAlive = true;

	//--hide all dialogs
	CompleteLevelDialog.SetActive(false);
	FailLevelDialog.SetActive(false);
	CompleteGameDialog.SetActive(false);
	DarkBg.SetActive(false);
	CameraShakeScript.constantShaking = false;
	CollectionScript.specialStatus = false;
	SpecialPlayerEffectScript.StopSpecialEffect();
	collectablesCollected = 0;
	
	GameObject.Find("MainCamera").GetComponent.<Animator>().enabled = false;

	// GoToLevel(currentLevel);

	TimerScript.ResetTimer();

	LoadingDialog.SetActive(false);
}



