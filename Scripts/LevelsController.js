//--a singleton
#pragma strict

public var numLevels : int;
public var currentLevel : int;
public var LoadingDialog : GameObject; 

function Awake () {

	//--because this is a singleton, we want only onee
	if (FindObjectsOfType(GetType()).Length > 1)
	{
		//--destroy others like this
		Debug.Log("destroying this duplicate of LevelsController");
		Destroy(gameObject);
	}
}

function Start() {
	Debug.Log("LevelsController has started");
	HideLoadingDialog();
}

function LoadNextLevel(){
	LoadingDialog.SetActive(true);
	yield WaitForSeconds(0.25);
	currentLevel++;
	Debug.Log("levelscontroller is loading next level. "+currentLevel);
	Application.LoadLevel("Level"+currentLevel);
}

function LoadLevel(destinationNum : int){
	LoadingDialog.SetActive(true);
	yield WaitForSeconds(0.25);
	if(!destinationNum){
		destinationNum = 1;
	}
	currentLevel = destinationNum;
	Debug.Log("levelscontroller is loading level "+destinationNum);
	Application.LoadLevel("Level"+destinationNum);
}

function SelectLevel(destinationNum : int){
	LoadingDialog.SetActive(true);
	currentLevel = destinationNum;
	Application.LoadLevel("playerSelect");
}

function ShowLoadingDialog(){
	Debug.Log("show loading");
	LoadingDialog.SetActive(true);
}

function HideLoadingDialog(){
	Debug.Log("hide loading");
	LoadingDialog.SetActive(false);
}