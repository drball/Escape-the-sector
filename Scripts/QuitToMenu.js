#pragma strict
import UnityEngine.SceneManagement;

private var LevelsController : LevelsController;

function Start () {

	LevelsController = GameObject.Find("LevelsController").GetComponent.<LevelsController>();
}

function Update () {

	 if(Input.GetKeyDown(KeyCode.Escape) == true)
	 {	
		LoadMainMenuScene();
	 }
	 
}

function LoadMainMenuScene () {

	Debug.Log("go to intro");
	LevelsController.SavePoints(); //--save points to playerprefs
	SceneManager.LoadScene("Intro");
}