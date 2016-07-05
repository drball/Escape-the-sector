#pragma strict

public var spinAmt : float = 0;
private var rb : Rigidbody2D;

function Start () {

	rb = GetComponent.<Rigidbody2D>();

	//--rotate from start
	// GetComponent.<Rigidbody2D>().AddTorque(spinAmt);

	InvokeRepeating("RotateABit",0,0.5);

}


function RotateABit(){

	rb.rotation = rb.rotation + spinAmt;
}