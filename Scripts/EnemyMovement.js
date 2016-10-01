#pragma strict
/* ====================================================
For a spawned spaceship
======================================================= */

public var speed : float = 1;

function Start () {

	//--move with physics
	//GetComponent.<Rigidbody>().AddRelativeForce(Vector3.forward * speed, ForceMode.Impulse);
	
	Destroy(gameObject,15);
}

function FixedUpdate () {
//	GetComponent.<Rigidbody>().AddRelativeForce (Vector3.forward * speed);
	

	
}

function Update() {
	transform.Translate(Vector3.forward * speed * Time.deltaTime);
//	Debug.Log(transform.position);
}