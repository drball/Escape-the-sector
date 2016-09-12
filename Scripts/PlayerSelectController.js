#pragma strict

private var LevelsController : LevelsController;

function Start () {
	LevelsController = GameObject.Find("LevelsController").GetComponent.<LevelsController>();
}

function Update () {

}

function SelectCharacter(characterNum : int){

	Debug.Log("selected character "+characterNum);


}