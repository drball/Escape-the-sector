//--a singleton
#pragma strict

public var numLevels : int;
public var currentLevel : int;
static var points : int = 0; 
private var pointsLoad : int = 0; //--for holding playerprefs
// static var currentShipNum : int = 0; //--the chosen ship

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
	//-- get score from playerprefs
	pointsLoad = PlayerPrefs.GetInt("Points");
	Debug.Log("pointsload = "+pointsLoad);

	if (pointsLoad > 0) {
		points = pointsLoad;
	}
}

function LoadNextLevel(){
	currentLevel++;
	Debug.Log("levelscontroller is loading next level. "+currentLevel);
	Application.LoadLevel("Level"+currentLevel);
}

function LoadLevel(destinationNum : int){
	currentLevel = destinationNum;
	Debug.Log("levelscontroller is loading level "+destinationNum);
	Application.LoadLevel("Level"+destinationNum);
}

function SavePoints(){
	Debug.Log("saving points to PlayerPrefs - "+LevelsController.points);
	PlayerPrefs.SetInt("Points",points);
}