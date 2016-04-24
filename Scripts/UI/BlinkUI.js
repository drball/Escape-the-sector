#pragma strict

//--blink the object we're attached to on/off at a set rate

public var blink = false;
private var blinkSpeed:float = 0.1;
private var objRenderer : CanvasGroup;

public var BlinkingObj: GameObject;

function Start() {

	//--if we don't specify, use current gameobject
	if(!BlinkingObj) {
		BlinkingObj = gameObject;
	}

	objRenderer = GetComponent.<CanvasGroup>();

}

function TimedTick() {
	if(blink == false)
	{
		blink = true;
	} else {
		blink = false;
	}

	if(blink){
		// BlinkingObj.SetActive(true);
		objRenderer.alpha = 1;
	}else {
		// BlinkingObj.SetActive(false);
		objRenderer.alpha = 0;
	}
}

function StartBlinking(){
	Debug.Log("start blinking");
	// isBlinking = true;

	InvokeRepeating("TimedTick", 0, blinkSpeed);
}

function StopBlinking(){
	// isBlinking = false;
	// BlinkingObj.SetActive(true);
	objRenderer.alpha = 1;
	CancelInvoke("TimedTick");
}