#pragma strict

private var nextFire : float;
private var fireFrom : GameObject;
private var gameController : GameControllerScript;
private var bulletDelay : float = 0.4;
private var rb: Rigidbody;
private var startYPos : float;
// private var collider : Collider;

public var Vfx : GameObject;
public var isAlive : boolean = true;

function Start () {
	

	// fireFrom = transform.Find("FireFrom").gameObject; //--find child object
	
	//--find gameController so we can call functions
	gameController = GameObject.Find("GameController").GetComponent.<GameControllerScript>();

	Debug.Log("hello = "+gameController.hello);

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
}

function PlayerReset() {
	isAlive = true;
	gameObject.SetActive(true);

	rb.velocity = Vector3.zero;
	rb.angularVelocity = Vector3.zero;

	//--move player to start location
	transform.position = Vector3(
		gameController.StartLocationObj.transform.position.x, 
		startYPos, 
		gameController.StartLocationObj.transform.position.z
	);

	// transform.position = playerStartPos;
	// transform.rotation = playerStartRotation;
}



