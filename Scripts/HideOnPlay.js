#pragma strict

//--hides the renderer when the game starts (the object is still there, just hidden) 
//--use this for invisible dummy objects, start, end etc

function Start () {
	//--hide from view
	GetComponent.<MeshRenderer>().enabled = false;
	// Debug.Log("hide!");
}

function Update () {

}