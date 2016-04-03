#pragma strict
import UnityEngine.UI;

static var isPaused : boolean = false;
private var DialogueCanvas : Canvas;
private var DialogueTextbox : Text;
private var scoreText : Text;
private var currentLevel : int;
private var maxLevels : int; 
public var score : int = 0;
public var hello : String;
public var levels : GameObject[];

function Start () {
		
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



function ShowDialogue (dialogueText : String) {

	Debug.Log("Show dialogue");
	
	var DialogueInstance = GameObject.FindGameObjectWithTag("Dialogue");
	GameObject.Find("DialogueTextBox").GetComponent.<Text>().text = dialogueText;
	
	DialogueInstance.GetComponent(Canvas).enabled = true;
	
	//--show correct avatar
	GameObject.Find("AvatarDefault").GetComponent.<Image>().enabled = true;
	GameObject.Find("AvatarPlayer").GetComponent.<Image>().enabled = false;
	
	yield WaitForSeconds (3);
	
	DialogueInstance.GetComponent(Canvas).enabled = false;
	
}

function ShowPlayerDialogue (dialogueText : String) {

	Debug.Log("Show player dialogue");
	
	var DialogueInstance = GameObject.FindGameObjectWithTag("Dialogue");
	GameObject.Find("DialogueTextBox").GetComponent.<Text>().text = dialogueText;
	
	DialogueInstance.GetComponent(Canvas).enabled = true;

	//--show correct avatar
	GameObject.Find("AvatarDefault").GetComponent.<Image>().enabled = false;
	GameObject.Find("AvatarPlayer").GetComponent.<Image>().enabled = true;
	
	yield WaitForSeconds (3);
	
	DialogueInstance.GetComponent(Canvas).enabled = false;
	
}

function IncreaseScore(amt : int) {
	score += amt;
	UpdateScore();
	
}

function GoToLevel(destination:int){

	Debug.Log("going to level "+destination);

	HideAllLevels();

	//--show loading spinner

	//--save score so we can use it next level
//	PlayerPrefs.SetInt("score", score);
	
	//--switch level
//	Application.LoadLevel (destination);
	levels[destination].SetActive(true);
}

function HideAllLevels() {

	Debug.Log("hiding all levels");

	for(var theLevel : GameObject in levels){
		Debug.Log("hiding level "+theLevel.name);
		theLevel.SetActive(false);
	}
}

function UpdateScore(){

	//--updates the score label top right
	scoreText.text = score.ToString();
	
}


function PauseGame (action : boolean) {

	if((action == true) && isPaused != true){
		Debug.Log("pause game");
		isPaused = true;
		Time.timeScale = 0.0;
	} else {
		Debug.Log("unpause");
		isPaused = false;
		Time.timeScale = 1.0;
	}
}


