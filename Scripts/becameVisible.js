#pragma strict

public var ParentObj : GameObject;
private var ParentObjScript : BuildingExplodeScript;

function Start () {
	ParentObjScript = ParentObj.GetComponent.<BuildingExplodeScript>();

	if(!ParentObjScript){
		Debug.Log(GameObject+" has no parent specified!");
	}
}


function OnBecameVisible() {
	Debug.Log(GameObject+" became visible");



	ParentObjScript.BecomeVisible();
}