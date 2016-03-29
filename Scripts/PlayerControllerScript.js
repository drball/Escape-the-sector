#pragma strict

private var nextFire : float;
private var fireFrom : GameObject;
private var gameController : GameControllerScript;

private var bulletDelay : float = 0.4;

function Start () {
	

	fireFrom = transform.Find("FireFrom").gameObject; //--find child object
	
	//--find gameController so we can call functions
	gameController = GameObject.Find("GameController").GetComponent.<GameControllerScript>();

	Debug.Log("hello = "+gameController.hello);


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
		
		//var vel = GetComponent.<Rigidbody>().velocity; 
		//var speed = vel.magnitude;
	}

	
}




