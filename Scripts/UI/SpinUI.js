#pragma strict

public var spinAmt : float = 0;
private var rb : Rigidbody2D;

function Start () {

	rb = GetComponent.<Rigidbody2D>();
	
	//--rotate from start
	// GetComponent.<Rigidbody2D>().AddTorque(spinAmt);

}


function Update(){

	rb.rotation = rb.rotation + spinAmt;
}