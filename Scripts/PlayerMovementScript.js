#pragma strict

public var speed : float = 150;
public var rotationSpeed : float = 300;

private var gameController : GameControllerScript;
private var PlayerController : PlayerControllerScript;
private var rb : Rigidbody;

public var ParticleThrustL : GameObject;
public var ParticleThrustR : GameObject;

function Start () {

	//--find gameController so we can call functions
	gameController = GameObject.Find("GameController").GetComponent.<GameControllerScript>();
	PlayerController = GetComponent.<PlayerControllerScript>();
	rb = GetComponent.<Rigidbody>();
}

function Update () {

}

function FixedUpdate () {

	// var moveHorizontal : float = Input.GetAxis ("Horizontal");
 //    var moveVertical : float = Input.GetAxis ("Vertical");
	var ClickedLeft : boolean = false;
	var ClickedRight : boolean = false;


	//--touch controls
	if (Input.touchCount > 0){

		var myTouches = Input.touches;
		Debug.Log(myTouches);
		
		for(var i = 0; i < Input.touchCount; i++)
		{
			Debug.Log(i+"="+myTouches[i]);
			
			if (myTouches[i].position.x < Screen.width/2) 
	        {
	        	ClickedLeft = true;
	        }
	        
	        if (myTouches[i].position.x > Screen.width/2) 
	        {
	        	ClickedRight = true;
	        }
		}

	}
    
    if(gameController.isPaused == false && PlayerController.isAlive == true){
    
    	//--keyboard controls
		if(Input.GetKey("left") || Input.GetKey("a") || ClickedLeft == true)
		{
			rb.AddTorque (0,-rotationSpeed,0);

			rb.AddRelativeForce (Vector3.forward * speed);
	
			
			ParticleThrustL.GetComponent.<ParticleSystem>().emissionRate = 100;

		} else {
			ParticleThrustL.GetComponent.<ParticleSystem>().emissionRate = 0;
		}

		if(Input.GetKey("right") || Input.GetKey("d") || ClickedRight == true)
		{
			rb.AddTorque (0,rotationSpeed,0);

			rb.AddRelativeForce (Vector3.forward * speed);
	
			ParticleThrustR.GetComponent.<ParticleSystem>().emissionRate = 100;
			
		} else {
			ParticleThrustR.GetComponent.<ParticleSystem>().emissionRate = 0;
		}
		
		
		// if ((moveVertical > 0) || Input.GetKey("w"))
		// {

		// 	rb.AddRelativeForce (Vector3.forward * speed);
	
		// 	ParticleThrustL.GetComponent.<ParticleSystem>().emissionRate = 100;
		// 	ParticleThrustR.GetComponent.<ParticleSystem>().emissionRate = 100;

		// } else if ((moveVertical < 0) || Input.GetKey("s"))
		// { 
			
		// 	rb.AddRelativeForce (Vector3.back * speed);
		// }else {

		// 	ParticleThrustL.GetComponent.<ParticleSystem>().emissionRate = 0;
		// 	ParticleThrustR.GetComponent.<ParticleSystem>().emissionRate = 0;
		// }

	}

	
}

