#pragma strict

public var target : GameObject;
//private var cameraHeight : float = 18;
private var followSpeedInitial : float = 100; //--super fast
private var followSpeed : float = followSpeedInitial;
private var cameraDistance : float;

private var dx : float;
private var dy : float;
private var dz : float;


function Awake () {

	target = GameObject.FindWithTag ("Player");

	dx = transform.position.x - target.transform.position.x;
    dz = transform.position.z - target.transform.position.z;

    dy =  transform.position.y;

    // Debug.Log("dx = "+dx);

//    cameraDistance = Vector3.Distance(target.transform.position, transform.position);
}

function CenterOnPlayer () {


}


function Update () {
	//--to lerp to the object smoothly
	transform.position = Vector3.Lerp(transform.position, Vector3(target.transform.position.x + dx, dy, target.transform.position.z + dz), followSpeed * Time.deltaTime);
	// transform.position = Vector3.Lerp(transform.position, Vector3(target.transform.position.x + dx, dy, target.transform.position.z), followSpeed * Time.deltaTime);
}