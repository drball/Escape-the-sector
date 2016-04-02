#pragma strict
import UnityEngine.UI;

static var isPaused : boolean = false;
private var DialogueCanvas : Canvas;
private var DialogueTextbox : Text;
private var scoreText : Text;
public var score : int = 0;
public var hello : String;

function Start () {
		
	//--create the dialogue, but initially disable it
//	var DialogueCanvas : Canvas = Instantiate(
//		Resources.Load("DialogueCanvas", Canvas));

		hello = "howdy";

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

function GoToLevel(destination:String){

	Debug.Log("going to level "+destination);

	HideAllLevels();

	//--save score so we can use it next level
//	PlayerPrefs.SetInt("score", score);
	
	//--switch level
//	Application.LoadLevel (destination);
}

function HideAllLevels() {

	Debug.Log("hiding all levels");

	Level1.SetActive(false);
	Level2.SetActive(false);

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


