#pragma strict

public var InstructionStepObjs : GameObject[];
public var playedBefore : boolean;
private var currentInstruction : int = 0;
public var InstructionParent : GameObject;
private var gameController : GameControllerScript;

function Start () {

	gameController = GameObject.Find("GameController").GetComponent.<GameControllerScript>();

	//--hide all instructions
	HideAllInstructions();

    //--check if we've played before
    playedBefore = PlayerPrefs.GetInt("PlayedBefore") > 0;

    if(!playedBefore){
    	Debug.Log("first time playing");

    	//--we need to show instruction - so pause the game 
		gameController.PauseGame(true);

    	PlayerPrefs.SetInt("PlayedBefore", 1);

	    //--show the first 
    	InstructionStepObjs[0].SetActive(true);
    }

}
function HideAllInstructions() {
	for(var obj : GameObject in InstructionStepObjs) {
        // Debug.Log("hiding obj "+obj.name);
        obj.SetActive(false);
    }
}

function NextInstruction() {
	HideAllInstructions();

	//--increment the number and check if there's even a slide, otherwise hide all instructions
	currentInstruction++;
	Debug.Log("currentInstruction = "+currentInstruction+". length = "+InstructionStepObjs.length);
	if(currentInstruction >= InstructionStepObjs.length){
		Debug.Log("finish instructions");
		InstructionParent.SetActive(false);
		gameController.PauseGame(false);
	}else {
		//--show next slide
		Debug.Log("show next slide");
		InstructionStepObjs[currentInstruction].SetActive(true);
	}

	
}
