#pragma strict

public var GateForcefield : GameObject;
public var GateCube : GameObject;
private var gameController : GameControllerScript;
private var collectionController : CollectionController;
private var Player : GameObject;

public var beamMaterial : Material;

//---variables 
public var isOpen : boolean;
private var beamWidth: float = 0.01;
private var beamWidthMax : float = 2.2;

function Start () {
	gameController = GameObject.Find("GameController").GetComponent.<GameControllerScript>();

	collectionController = GameObject.Find("GameController").GetComponent.<CollectionController>();

	Player = GameObject.Find("Player");

	var lineRenderer : LineRenderer = gameObject.AddComponent.<LineRenderer>();
		 lineRenderer.material = beamMaterial;
		 // lineRenderer.SetColors(Color.yellow, Color.red);
		 
		 // lineRenderer.SetVertexCount(lengthOfLineRenderer);
}

function OnTriggerEnter(other: Collider) 
{

	Debug.Log("collision with gate");

	if (other.tag == "Player" && !isOpen)
	{
		isOpen = true;

		collectionController.RemoveSpecialStatus();

		//--shoot cube
		// var gateBeamInstance : GameObject = Instantiate(Resources.Load("GateBeam", GameObject),
		// 	Player.transform.position, 
		// 	Quaternion.Euler(0, 0, 0)
		// );

		// gateBeamInstance.transform.parent = Player.transform;

		// gateBeamInstance.LookAt(GateCube);


			
		// Destroy(gateBeamInstance,10);

		//-- cube explodes

		yield WaitForSeconds(3);

		OpenGate();
	}
}

function OpenGate(){

	Debug.Log("copen gate");
	GateForcefield.SetActive(false);
}

	// var c1 : Color = Color.yellow;
	// var c2 : Color = Color.red;
	// var lengthOfLineRenderer : int = 20;



function Update() {
	var lineRenderer : LineRenderer = GetComponent.<LineRenderer>();

	lineRenderer.SetPosition(0, Player.transform.position);
	lineRenderer.SetPosition(1, GateCube.transform.position);	
	lineRenderer.SetWidth(beamWidth, beamWidth);

	if(beamWidth < beamWidthMax) {
		beamWidth += 0.1;
	}
}