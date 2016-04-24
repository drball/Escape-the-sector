#pragma strict


public var minutes : int;
public var seconds : int;
public var textObj : GameObject;
public var timerActive : boolean = false;
public var timeRemaining : String; //--human readable output
// public var flashing : boolean = false;

private var gameController : GameControllerScript;
private var miliseconds : float = 0;
private var timerText : Text;
private var startMinutes : int; 
private var startSeconds : int;
private var endStatus: int = 0; //--used to flash when near end
private var BlinkScript : BlinkUI;


function Awake() {
	startMinutes = minutes;
	startSeconds = seconds;
}

function Start() {

	timerText = textObj.GetComponent.<Text>();

	timerActive = false;

	gameController = GameObject.Find("GameController").GetComponent.<GameControllerScript>();

	BlinkScript = textObj.GetComponent.<BlinkUI>();

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


	if(minutes <= 0 && timerActive == true){
		//-- when timer nears to end
		if(seconds <= 10 && endStatus < 1){
			endStatus = 1;
			Debug.Log("timer nears to end");
			BlinkScript.StartBlinking();
		}

		//--when timer is REALLY near to end
		if(seconds <= 5 && endStatus < 2){
			endStatus = 2;
			Debug.Log("timer REALLY near to end");
		}

		//--when timer runs out
		if(seconds <= 0){
			Debug.Log("timer out, stopping");
			timerActive = false;
			BlinkScript.StopBlinking();
			gameController.LevelFailed();
		}
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
	endStatus = 0;
}
