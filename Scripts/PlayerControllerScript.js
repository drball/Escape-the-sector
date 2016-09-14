#pragma strict

private var nextFire : float;
private var fireFrom : GameObject;
private var gameController : GameControllerScript;
private var bulletDelay : float = 0.4;
public var rb : Rigidbody;
public var startYPos : float = 0;
private var rotationInitial : Vector3;
private var PlayerExplosions : GameObject;
private var StarsParticles : GameObject;

public var Vfx : GameObject;
public var isAlive : boolean = true;


function Awake () {
	

	//--find gameController so we can call functions
	gameController = GameObject.Find("GameController").GetComponent.<GameControllerScript>();

	rb = GetComponent.<Rigidbody>();

	startYPos = transform.position.y;

}

function Start() {

	Debug.Log("creating a player explosion");
	//--setup the container for player explosions
	PlayerExplosions = Instantiate(Resources.Load("PlayerExplosions", GameObject),
				transform.position, 
				transform.rotation);
	PlayerExplosions.transform.parent = transform;
	PlayerExplosions.SetActive(false);

	Debug.Log("just created player explosion");

	//--setup the stars that follow the player (a bit ahead)
	StarsParticles = Instantiate(Resources.Load("StarsParticles", GameObject),
				Vector3(transform.position.x, transform.position.y-43, transform.position.z-64), 
				 Quaternion.Euler(Vector3(270, transform.rotation.y, transform.rotation.z)));
	StarsParticles.transform.parent = transform;

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

	PlayerExplosions.SetActive(true);
	
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
	Debug.Log("Doing player reset");
	isAlive = true;
	gameObject.SetActive(true);
	Vfx.SetActive(true);

	if(PlayerExplosions){
		//--might not have been instantiated yet - depending on the order scripts load
		PlayerExplosions.SetActive(false);
	}
	

	rb.velocity = Vector3.zero;

	rb.angularVelocity = Vector3.zero;

	Debug.Log("moving player to start location");

	//--move player to start location
	transform.position = Vector3(
		gameController.StartLocationObj.transform.position.x, 
		startYPos, 
		gameController.StartLocationObj.transform.position.z
	);

	transform.rotation = gameController.StartLocationObj.transform.rotation;
}


