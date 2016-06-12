#pragma strict


public var minutes : int;
public var seconds : int;
public var textObj : GameObject;
public var timerActive : boolean = false;
public var timeRemaining : String; //--human readable output

private var gameController : GameControllerScript;
private var miliseconds : float = 0;
private var timerText : Text;
private var startMinutes : int; 
private var startSeconds : int;
private var endStatus: int = 0; //--used to flash when near end
private var BlinkScript : BlinkUI; //--used to make timerText blink
private var CameraBloomAnim : Animator;
private var CameraShakeScript : CameraShakeScript;

function Awake() {
	startMinutes = minutes;
	startSeconds = seconds;
}

function Start() {

	textObj = GameObject.Find("TimerText");

	timerText = textObj.GetComponent.<Text>();

	timerActive = false;

	gameController = GameObject.Find("GameController").GetComponent.<GameControllerScript>();

	BlinkScript = textObj.GetComponent.<BlinkUI>();

	CameraBloomAnim = GameObject.Find("MainCamera").GetComponent.<Animator>();
	CameraBloomAnim.enabled = false;

	CameraShakeScript = GameObject.Find("MainCamera").GetComponent.<CameraShakeScript>();
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

			//--start camera shaking constantly
			CameraShakeScript.LongShake();

			//--start camera bloom animation
			CameraBloomAnim.enabled = true;
			CameraBloomAnim.Play(0);
			CameraBloomAnim.speed = 1;
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

function EndTimer () {
	PauseTimer();
	BlinkScript.StopBlinking();
}

function ResetTimer () {
	Debug.Log("reset timer");
	minutes = startMinutes;
	seconds = startSeconds;
	endStatus = 0;
}
