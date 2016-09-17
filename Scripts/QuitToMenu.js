#pragma strict
import UnityEngine.SceneManagement;

private var PointsController : PointsController;

function Start () {

	PointsController = GameObject.Find("PointsController").GetComponent.<PointsController>();
}

function Update () {

	 if(Input.GetKeyDown(KeyCode.Escape) == true)
	 {	
		LoadMainMenuScene();
	 }
	 
}

function LoadMainMenuScene () {

	Debug.Log("go to intro");
	PointsController.SavePoints(); //--save points to playerprefs
	SceneManager.LoadScene("Intro");
}