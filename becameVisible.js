#pragma strict

public var ParentObj : GameObject;
private var ParentObjScript : BuildingExplodeScript;

function Start () {
	ParentObjScript = ParentObj.GetComponent.<BuildingExplodeScript>();
}


function OnBecameVisible() {
	Debug.Log(GameObject+" became visible");

	ParentObjScript.BecomeVisible();
}