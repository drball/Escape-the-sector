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
private var beamWidthMax : float = 0.85;
private var showBeam: boolean = false;
private var lineRenderer : LineRenderer;
private var forcefieldRenderer : MeshRenderer;

function Start () {
	gameController = GameObject.Find("GameController").GetComponent.<GameControllerScript>();

	collectionController = GameObject.Find("GameController").GetComponent.<CollectionController>();

	Player = GameObject.FindWithTag("Player");

	forcefieldRenderer = GateForcefield.GetComponent.<MeshRenderer>();

	//--use linerenderer for the beam that shoots the gatecube
	lineRenderer = gameObject.AddComponent.<LineRenderer>();
	lineRenderer.material = beamMaterial;
}

function OnTriggerEnter(other: Collider) 
{

	Debug.Log("collision with gate");

	if (other.tag == "Player" && !isOpen && collectionController.specialStatus)
	{
		isOpen = true;

		showBeam = true;

		collectionController.RemoveSpecialStatus();

		//--shoot cube

		yield WaitForSeconds(0.8);

		//--show explosion
		var explosionInstance : GameObject = Instantiate(Resources.Load("Explosion", GameObject),
			GateCube.transform.position, 
			Quaternion.Euler(0, 0, 0)
		);

		GateCube.SetActive(false);

		showBeam = false;
		Destroy(lineRenderer);

		yield WaitForSeconds(0.8);
		OpenGate();
	}
}

function OpenGate(){

	//-- flash for a bit

	var blinkingAmt : int = 0;
	
	while(blinkingAmt < 6) {
        yield WaitForSeconds(0.02);
        forcefieldRenderer.enabled = !forcefieldRenderer.enabled;
        blinkingAmt++;
    }
    forcefieldRenderer.enabled = true;

	GateForcefield.SetActive(false);
}

function Update() {
	if(showBeam) {

		lineRenderer.SetPosition(0, Player.transform.position);
		lineRenderer.SetPosition(1, GateCube.transform.position);	
		lineRenderer.SetWidth(beamWidth, beamWidth);

		if(beamWidth < beamWidthMax) {
			beamWidth += 0.5;
		}
	}

}