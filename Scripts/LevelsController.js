#pragma strict

public var numLevels : int;
public var currentLevel : int;

function Start () {

}

function LoadNextLevel(){
	Application.LoadLevel("Level"+currentLevel++);
}

function LoadLevel(destinationNum : int){
	currentLevel = destinationNum;
	Application.LoadLevel("Level"+destinationNum);
}