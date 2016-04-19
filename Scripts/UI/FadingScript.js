#pragma strict

/* ====================================================
Fades a solid background out on load, then in when called.
======================================================= */

var fadeTexture : Texture2D;
public var fadeSpeed = 0.5;
private var drawDepth = -1000;

private var alpha = 1.0; 
private var fadeDir = -1;

function OnGUI(){

	alpha += fadeDir * fadeSpeed * Time.deltaTime;  
	alpha = Mathf.Clamp01(alpha);   

	GUI.color.a = alpha;

	GUI.depth = drawDepth;

	GUI.DrawTexture(Rect(0, 0, Screen.width, Screen.height), fadeTexture);

	// Debug.Log("alpha = "+alpha);
}

public function BeginFade(direction : int){

	//--requires direction to be -1 or 1
	fadeDir = direction;
	return fadeSpeed;
}

