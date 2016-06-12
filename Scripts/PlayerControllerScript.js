﻿#pragma strict

private var nextFire : float;
private var fireFrom : GameObject;
private var gameController : GameControllerScript;
private var bulletDelay : float = 0.4;
private var rb: Rigidbody;
private var startYPos : float;
private var rotationInitial : Vector3;
public var ExplosionsContainer : GameObject;

public var Vfx : GameObject;
public var isAlive : boolean = true;


function Start () {
	

	// fireFrom = transform.Find("FireFrom").gameObject; //--find child object
	
	//--find gameController so we can call functions
	gameController = GameObject.Find("GameController").GetComponent.<GameControllerScript>();

	rb = GetComponent.<Rigidbody>();

	startYPos = transform.position.y;

	// Accelerate out of the last portal
//	GetComponent.<Rigidbody>().AddRelativeForce(Vector3.forward * (speed/2), ForceMode.Impulse);

}


function FixedUpdate () {


    if(gameController.isPaused == false){
    	
		//FIRE WEAPON
		if((Input.GetKey("space") || Input.GetKey(KeyCode.RightControl)) && (Time.time >= nextFire) )
		{
			nextFire = Time.time + bulletDelay;
			var bulletInstance : GameObject = Instantiate(Resources.Load("Bullet", GameObject),
				Vector3(fireFrom.transform.position.x,0,fireFrom.transform.position.z), 
				transform.rotation);
		}

		if(Input.GetKey("r")) {
			PlayerReset();
		}
		
		//var vel = GetComponent.<Rigidbody>().velocity; 
		//var speed = vel.magnitude;
	}

	
}

function PlayerDie(){
	isAlive = false;

	ExplosionsContainer.SetActive(true);
	
	Vfx.SetActive(false);
}

function HideVFX(){
	//--hide the player on exit
	Vfx.SetActive(false);

	isAlive = false;

	//--replace player with sparks
	var sparkInstance : GameObject = Instantiate(Resources.Load("ExitSparks", GameObject),
			Vector3(gameObject.transform.position.x,gameObject.transform.position.y,gameObject.transform.position.z), 
			Quaternion.Euler(-90, 0, 0));

	Destroy(sparkInstance,1);
}

function PlayerReset() {
	isAlive = true;
	gameObject.SetActive(true);
	Vfx.SetActive(true);
	ExplosionsContainer.SetActive(false);

	rb.velocity = Vector3.zero;
	rb.angularVelocity = Vector3.zero;

	//--move player to start location
	transform.position = Vector3(
		gameController.StartLocationObj.transform.position.x, 
		startYPos, 
		gameController.StartLocationObj.transform.position.z
	);

	transform.rotation = gameController.StartLocationObj.transform.rotation;

	// transform.position = playerStartPos;
	// transform.rotation = playerStartRotation;
}



