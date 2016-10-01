#pragma strict

public var target : GameObject;
//private var cameraHeight : float = 18;
private var followSpeedInitial : float = 100; //--super fast
private var followSpeed : float = followSpeedInitial;
private var cameraDistance : float;

private var dx : float = -73.7;//-46;
private var dy : float = 205;
private var dz : float = -69.8;//-71;


function CameraSetup () {

	target = GameObject.FindWithTag("Player");

	Debug.Log("-----camera target = "+target);

	// dx = transform.position.x - target.transform.position.x;
 //    dz = transform.position.z - target.transform.position.z;
    dy =  transform.position.y;

    // Debug.Log("dx = "+dx);

//    cameraDistance = Vector3.Distance(target.transform.position, transform.position);
}


function CenterOnPlayer () {


}


function Update () {

	//--uncomment this to test best position of camera relative to player
	// var dxTest = transform.position.x - target.transform.position.x;
	// var dzTest = transform.position.z - target.transform.position.z;
	// Debug.Log("dx = "+dxTest+" dz = "+dzTest);


	if(target) {
		//--to lerp to the object smoothly
		transform.position = Vector3.Lerp(transform.position, Vector3(target.transform.position.x + dx, dy, target.transform.position.z + dz), followSpeed * Time.deltaTime);
	}
	
}