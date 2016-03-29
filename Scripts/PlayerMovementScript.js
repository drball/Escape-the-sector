#pragma strict

private var speed : float = 40;
private var rotationSpeed : float = 2.5;

private var ParticleThrustL : GameObject;
private var ParticleThrustR : GameObject;

function Start () {

	ParticleThrustL = GameObject.Find("ParticleThrustL");
	ParticleThrustR = GameObject.Find("ParticleThrustR");

	ParticleThrustL.GetComponent.<ParticleSystem>().Stop();
	ParticleThrustR.GetComponent.<ParticleSystem>().Stop();
}

function Update () {

}

function FixedUpdate () {

	var moveHorizontal : float= Input.GetAxis ("Horizontal");
    var moveVertical : float= Input.GetAxis ("Vertical");
    
    if(gameController.isPaused == false){
    
		if((moveHorizontal < 0) || Input.GetKey("a"))
		{
			GetComponent.<Rigidbody>().AddRelativeTorque (0,-rotationSpeed,0);


		} else if((moveHorizontal > 0) || Input.GetKey("d"))
		{
			GetComponent.<Rigidbody>().AddRelativeTorque (0,rotationSpeed,0);

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
		
		//var vel = GetComponent.<Rigidbody>().velocity; 
		//var speed = vel.magnitude;
	}

	
}

