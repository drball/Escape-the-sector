#pragma strict
import UnityEngine.UI;

static var isPaused : boolean = false;
private var DialogueCanvas : Canvas;
private var DialogueTextbox : Text;
private var scoreText : Text;
private var maxLevels : int; 
private var Player : GameObject;
private var StartLocationObj : GameObject;
private var currentLevel : int;
public var score : int = 0;
public var hello : String;
public var levels : GameObject[];

function Start () {

	Player = GameObject.Find("Player");
		
	//--create the dialogue, but initially disable it
//	var DialogueCanvas : Canvas = Instantiate(
//		Resources.Load("DialogueCanvas", Canvas));

		hello = "howdy";

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

	HideAllLevels();

	currentLevel = destination;

	//--show loading spinner

	//--save score so we can use it next level
//	PlayerPrefs.SetInt("score", score);

	Debug.Log("going to level "+destination);
	
	//--switch level
//	Application.LoadLevel (destination);
	levels[destination - 1].SetActive(true);

	//--move player to start location
	StartLocationObj = levels[destination - 1].Find("StartDummy");
	Player.transform.position = Vector3(
		StartLocationObj.transform.position.x, 
		0, 
		StartLocationObj.transform.position.z
	);

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

function ExitLevel () {
	//--player has reached exit

	Player.SetActive(false);

	//--start next level
	Debug.Log("exiting level "+currentLevel);
	GoToLevel(currentLevel++);
}
