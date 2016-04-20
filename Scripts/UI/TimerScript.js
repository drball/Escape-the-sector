#pragma strict


public var minutes : int;
public var seconds : int;
public var textObj : GameObject;
public var timerActive : boolean = false;
public var timeRemaining : String;
// public var flashing : boolean = false;

private var gameController : GameControllerScript;
private var miliseconds : float = 0;
private var timerText : Text;
private var startMinutes : int;
private var startSeconds : int;


function Awake() {
	startMinutes = minutes;
	startSeconds = seconds;
}

function Start() {

	timerText = textObj.GetComponent.<Text>();

	timerActive = false;

	gameController = GameObject.Find("GameController").GetComponent.<GameControllerScript>();

}
         
function Update(){

	if(timerActive == true){
		if(miliseconds <= 0){
			if(seconds <= 0){
				minutes--;
				seconds = 59;
			}
			else if(seconds >= 0){
				seconds--;
			}
		 
			miliseconds = 100;
		}

		miliseconds -= Time.deltaTime * 100;
	}
             
	timeRemaining = String.Format("{0:00}:{1:00}", minutes, seconds);
	timerText.text = timeRemaining;



	if(seconds <= 0 && minutes <= 0 && miliseconds <= 0 && timerActive == true){
		Debug.Log("timer out, stopping");
		timerActive = false;
		gameController.LevelFailed();
	}
}

function StartTimer (){
	Debug.Log("start the timer");
	timerActive = true;
}

function PauseTimer () {
	timerActive = false;
}

function ResetTimer () {
	Debug.Log("reset timer");
	minutes = startMinutes;
	seconds = startSeconds;
}
