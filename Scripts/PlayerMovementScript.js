#pragma strict

private var speed : float = 300;//150;
private var rotationSpeed : float = 300;//25;//2.5;

private var gameController : GameControllerScript;
private var PlayerController : PlayerControllerScript;

public var ParticleThrustL : GameObject;
public var ParticleThrustR : GameObject;

function Start () {

	//--find gameController so we can call functions
	gameController = GameObject.Find("GameController").GetComponent.<GameControllerScript>();
	PlayerController = GetComponent.<PlayerControllerScript>();
}

function Update () {

}

function FixedUpdate () {

	var moveHorizontal : float = Input.GetAxis ("Horizontal");
    var moveVertical : float = Input.GetAxis ("Vertical");
    
    if(gameController.isPaused == false && PlayerController.isAlive == true){
    
		if((moveHorizontal < 0) || Input.GetKey("a"))
		{
			GetComponent.<Rigidbody>().AddTorque (0,-rotationSpeed,0);


		} else if((moveHorizontal > 0) || Input.GetKey("d"))
		{
			GetComponent.<Rigidbody>().AddTorque (0,rotationSpeed,0);

		} 
		
		if ((moveVertical > 0) || Input.GetKey("w"))
		{

			GetComponent.<Rigidbody>().AddRelativeForce (Vector3.forward * speed);
	
			ParticleThrustL.GetComponent.<ParticleSystem>().emissionRate = 100;
			ParticleThrustR.GetComponent.<ParticleSystem>().emissionRate = 100;

		} else if ((moveVertical < 0) || Input.GetKey("s"))
		{ 
			
			GetComponent.<Rigidbody>().AddRelativeForce (Vector3.back * speed);
		}else {

			ParticleThrustL.GetComponent.<ParticleSystem>().emissionRate = 0;
			ParticleThrustR.GetComponent.<ParticleSystem>().emissionRate = 0;
		}

		// Debug.Log("speed = "+GetComponent.<Rigidbody>().velocity.magnitude);
		
		//var vel = GetComponent.<Rigidbody>().velocity; 
		//var speed = vel.magnitude;
	}

	
}

