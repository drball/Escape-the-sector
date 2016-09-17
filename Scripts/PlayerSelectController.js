#pragma strict

private var LevelsController : LevelsController;
private var PointsController : PointsController;
static var currentCharacterNum : int = 0; //--the selected ship 
static var characters : String[] = [
	"ShipFalko", 
	"ShipPike",  
	"ShipMithrim",
	"ShipGanymede",
	"ShipTitus"
	];  
public var characterTitles : String[] = [
	"Falko-class frigate",
	"Pike-class skimmer",
	"Mithrim-class cruiser",
	"Ganymede-class cruiser",
	"Titus-class cruiser"
	];
public var characterPrices : int[] = [
	200,
	400,
	800,
	1500,
	3000
];
public var characterObjs : GameObject[]; //--manually add - in same order as above
public var TitleText : GameObject; //--the character title
public var PriceText : GameObject;
public var BuyBtn : GameObject;

function Start () {
	LevelsController = GameObject.Find("LevelsController").GetComponent.<LevelsController>();
	PointsController = GameObject.Find("PointsController").GetComponent.<PointsController>();

	//--hide all characters
	ShowSelectedCharacter(currentCharacterNum);

}


function ConfirmButtonPressed(){

	//--confirm the choice
	Debug.Log("start the game");

	LevelsController.LoadLevel(1);

}

function ShowSelectedCharacter(selectedCharacterNum: int) {

	//--hide all character objects
	for(var character : GameObject in characterObjs) {
		character.SetActive(false);
	}

	//--show the character object we've selected
	characterObjs[selectedCharacterNum].SetActive(true);

	//--update text with relevant title
	TitleText.GetComponent.<Text>().text = characterTitles[selectedCharacterNum];

	//--disable/enable buy button if we can afford it
	if(PointsController.points >= characterPrices[selectedCharacterNum] ){
		BuyBtn.SetActive(true);
	}else {
		BuyBtn.SetActive(false);
	}

}

function NextCharacter () {

	Debug.Log("next character");

	currentCharacterNum++;
	
	if(currentCharacterNum >= characterObjs.length) {
		currentCharacterNum = 0;
	}
	ShowSelectedCharacter(currentCharacterNum);

	
}

function PrevCharacter () {

	Debug.Log("prev character");
	
		currentCharacterNum--;
		
		if(currentCharacterNum < 0) {
			currentCharacterNum = characterObjs.length - 1;
		}
		ShowSelectedCharacter(currentCharacterNum);

}

// function BuyCharacterSelected(){
// 	//--user has clicked to buy the character - show a confirmation modal
// }

function BuyCharacter(){

	if(PointsController.points >= characterPrices[currentCharacterNum] ){
		Debug.Log("we have bought a character for "+characterPrices[currentCharacterNum]);


	}

	BuyBtn.SetActive(false);
}