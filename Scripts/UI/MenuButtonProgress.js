//--manages whether this menu button should be hidden (based on playerprefs)
//--also manages which of the collectable icons should be shown
#pragma strict

public var levelButtonNum :int; //--the level for which this button is for
// private var IntroController : IntroController;
private var levelProgress : int;
public var Star1 : GameObject;
public var Star2 : GameObject;
public var Star3 : GameObject;

function Start () {
	// IntroController = GameObject.Find("GameController").GetComponent.<IntroController>();

	//--load the level progress for this level
	levelProgress = PlayerPrefs.GetInt("Level"+levelButtonNum+"StarsCollected");

	Debug.Log("level progress for "+levelButtonNum+" = "+levelProgress);

	if(levelProgress){
		if(levelProgress == 3){
			Star1.SetActive(true);
			Star2.SetActive(true);
			Star3.SetActive(true);
		}else if (levelProgress == 2){
			Star1.SetActive(true);
			Star2.SetActive(true);
		} else if (levelProgress == 1){
			Star1.SetActive(true);
		}
	} else {
		Debug.Log("There is no progress on level "+levelButtonNum);
	}
}

function Update () {

}