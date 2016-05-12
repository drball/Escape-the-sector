#pragma strict
public var spinX : float = 0;
public var spinY : float = 0;
public var spinZ : float = 0;
public var rotationSpeed : float = 1;

function Start () {
	// GetComponent.<Rigidbody>().AddTorque(spinX,spinY,spinZ);
	// Debug.Log("spin with "+spinY);
}

function Update () {
	// transform.Rotate((Vector3.up * rotationSpeed) * Time.deltaTime);
	transform.Rotate(
		spinX * Time.deltaTime,
		spinY * Time.deltaTime,
		spinZ * Time.deltaTime,
		Space.Self
	);
}

//function FixedUpdate () {
//	transform.Rotate((Vector3.up * rotationSpeed) * Time.deltaTime);
//}

