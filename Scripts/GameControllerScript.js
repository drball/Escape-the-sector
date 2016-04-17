#pragma strict
import UnityEngine.UI;

static var isPaused : boolean = false;
private var DialogueCanvas : Canvas;
private var DialogueTextbox : Text;
private var scoreText : Text;
private var maxLevels : int; 
private var Player : GameObject;
private var PlayerScript : PlayerControllerScript;
private var TimerScript : TimerScript;
public var StartLocationObj : GameObject;
public var currentLevel : int;
public var score : int = 0;
public var levels : GameObject[];
public var EndDialog : GameObject;
public var LevelCompletedText : GameObject;

function Start () {

	Player = GameObject.Find("Player");
	PlayerScript = Player.GetComponent.<PlayerControllerScript>();
	TimerScript = GetComponent.<TimerScript>();
		
	//--create the dialogue, but initially disable it
//	var DialogueCanvas : Canvas = Instantiate(
//		Resources.Load("DialogueCanvas", Canvas));

	//--hide all dialogs
	EndDialog.SetActive(false);


		currentLevel = 1;

//	DialogueCanvas.GetComponent(Canvas).enabled = false;
	
	Debug.Log("starting. score = "+score);
//	scoreText = GameObject.Find("ScoreText").GetComponent.<Text>();
	
	//--load the score if there is one
//	if(PlayerPrefs.GetInt("score")){
//		score = PlayerPrefs.GetInt("score");
//		Debug.Log("loaded existing score");
//	}
	//scoreText.text = score.ToString();
//	UpdateScore();

	GoToLevel(1);
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



function GoToLevel(destination:int){

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

	PlayerScript.PlayerReset();

	//--fade in 

	yield WaitForSeconds(1);

	TimerScript.StartTimer();

}

function HideAllLevels() {

	Debug.Log("hiding all levels");

	for(var theLevel : GameObject in levels){
		Debug.Log("hiding level "+theLevel.name);
		theLevel.SetActive(false);
	}
}

// function UpdateScore(){

// 	//--updates the score label top right
// 	scoreText.text = score.ToString();
	
// }


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

function LevelCompleted () {
	//--player has reached exit

	Player.SetActive(false);

	EndDialog.SetActive(true);

	var secondsRemainingText = "WITH "+TimerScript.timeRemaining+" REMAINING";

	LevelCompletedText.GetComponent.<Text>().text = secondsRemainingText;

	// Debug.Log("text "+LevelCompletedText.GetComponent.<Text>().text);

	//--start next level
	//currentLevel++;
	//GoToLevel(currentLevel);
}
