#pragma strict

public var PointsText : GameObject;
static var points : int = 0; 
private var pointsLoad : int = 0; //--for holding playerprefs

function Awake () {

	//--because this is a singleton, we want only onee
	if (FindObjectsOfType(GetType()).Length > 1)
     {
         //--destroy others like this
         Debug.Log("destroying this duplicate of PointsController");
         Destroy(gameObject);
     }
}

function Start(){

	//-- get score from playerprefs
	pointsLoad = PlayerPrefs.GetInt("Points");
	Debug.Log("pointsload = "+pointsLoad);

	if (pointsLoad > 0) {
		points = pointsLoad;
	}

	UpdateScore();

}

function IncreasePoints() {
	points += 10;

	Debug.Log("increase score");

	//--show score
	PointsText.GetComponent.<Text>().text = points.ToString();
}

function UpdateScore(){
	//--show score
	PointsText.GetComponent.<Text>().text = points.ToString();
}

function SavePoints(){
	Debug.Log("saving points to PlayerPrefs - "+points);
	PlayerPrefs.SetInt("Points",points);
}

function RemovePoints(removeAmt : int){
	points -= removeAmt;
	UpdateScore();
	SavePoints();
}