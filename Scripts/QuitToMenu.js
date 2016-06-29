#pragma strict
import UnityEngine.SceneManagement;


function Update () {

	 if(Input.GetKeyDown(KeyCode.Escape) == true)
	 {
		// Application.LoadScene("menu");
		
		LoadMainMenuScene();
	 }
	 
}

function LoadMainMenuScene () {

	Debug.Log("go to intro");
	SceneManager.LoadScene("Intro");
}