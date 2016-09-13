#pragma strict

private var LevelsController : LevelsController;
static var currentCharacterNum : int = 0;

function Start () {
	LevelsController = GameObject.Find("LevelsController").GetComponent.<LevelsController>();
}

function Update () {

}

function SelectCharacter(selectedCharacterNum : int){

	Debug.Log("selected character "+selectedCharacterNum);

	currentCharacterNum = selectedCharacterNum;

	LevelsController.LoadLevel(1);

}
