#pragma strict

public var numLevels : int;
public var currentLevel : int;

function Awake () {

	//--because this is a singleton, we want only onee
	if (FindObjectsOfType(GetType()).Length > 1)
     {
         //--destroy others like this
         Debug.Log("destroying this duplicate of LevelsController");
         Destroy(gameObject);
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