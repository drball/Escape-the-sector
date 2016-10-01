#pragma strict
import System.Collections.Generic; //--to use a generic list

private var LevelsController : LevelsController;
private var PointsController : PointsController;
static var currentCharacterNum : int = 0; //--the selected ship 
static var currentCharacterName : String; //--the selected ship's prefab name 
public var characterUnlockedStatus = new List.<boolean>(); //--list of whether character unlocked or not (cached playerprefs essentially)
static var characters : String[] = [
	"ShipFalko", 
	"ShipPike",  
	"ShipWicker",  
	"ShipMithrim",
	"ShipGanymede",
	"ShipTitus"
	];  
private var characterTitles : String[] = [
	"Falko-class frigate",
	"Pike-class skimmer",
	"Wicker-class skimmer",
	"Mithrim-class cruiser",
	"Ganymede-class cruiser",
	"Titus-class cruiser"
	];
private var characterPrices : int[] = [
	0,
	2500,
	2500,
	3500,
	4500,
	4500
];

//--game objects 
public var characterObjs : GameObject[]; //--manually add - in same order as above
public var TitleText : GameObject; //--the character title
public var PriceText : GameObject;
public var PriceTextIcon : GameObject;
public var BuyBtn : GameObject;
public var BoughtText : GameObject;
public var PlayBtn : GameObject;

function Start () {
	LevelsController = GameObject.Find("LevelsController").GetComponent.<LevelsController>();
	PointsController = GameObject.Find("PointsController").GetComponent.<PointsController>();

	BoughtText.SetActive(false);
	LevelsController.HideLoadingDialog();
	

	// characterUnlockedStatus = new boolean[characters.length];

	Debug.Log("character2 = "+characters[2]);

	
	//--save the playerprefs to an array we can use 
	for(var i : int = 0; i < characters.length; i++){

		Debug.Log("the character"+i+" = "+characters[i]);
		
		if( PlayerPrefs.GetInt(characters[i]+"Unlocked") == 1){
			characterUnlockedStatus.Add(true);
		}else {
			characterUnlockedStatus.Add(false);
		}
		// Debug.Log("saved character"+i+"= "+characterUnlockedStatus[i]);
	}

	//---always make sure 1st ship is unlocked
	characterUnlockedStatus[0] = true;

	//--hide all characters
	ShowSelectedCharacter(currentCharacterNum);

}


function ConfirmButtonPressed(){

	//--confirm the choice
	Debug.Log("start the game");

	LevelsController.LoadLevel(LevelsController.currentLevel);

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
	PriceText.GetComponent.<Text>().text = characterPrices[selectedCharacterNum].ToString();

	//--currentCharacterName
	currentCharacterName = characters[selectedCharacterNum];

	//--disable/enable buy button if we can afford it
	Debug.Log("price = "+characterPrices[selectedCharacterNum]+" points = "+PointsController.points);
	var BuyBtnBtn = BuyBtn.GetComponent.<Button>();
	if(PointsController.points >= characterPrices[selectedCharacterNum] ){
		BuyBtnBtn.interactable = true;
	}else {
		BuyBtnBtn.interactable = false;
		Debug.Log("interactable!");
	}


	Debug.Log("showing character "+selectedCharacterNum);

	//--if we've bought it, hide the buy button & price completely
	if(characterUnlockedStatus[selectedCharacterNum] == true){
		BuyBtn.SetActive(false);
		PriceText.SetActive(false);
		PriceTextIcon.SetActive(false);

		BoughtText.SetActive(true);
		PlayBtn.GetComponent.<Button>().interactable = true;
	}else {
		BuyBtn.SetActive(true);
		PriceText.SetActive(true);
		PriceTextIcon.SetActive(true);

		BoughtText.SetActive(false);
		PlayBtn.GetComponent.<Button>().interactable = false;
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

	var BuyPrice : int = characterPrices[currentCharacterNum];

	if(PointsController.points >= BuyPrice ){
		Debug.Log("we have bought a character for "+BuyPrice);
		PlayerPrefs.SetInt(characters[currentCharacterNum]+"Unlocked", 1);
		characterUnlockedStatus[currentCharacterNum] = true;
		PointsController.RemovePoints(BuyPrice);
		PriceText.SetActive(false);
		PriceTextIcon.SetActive(false);
		BuyBtn.SetActive(false);
		BoughtText.SetActive(true);
		PlayBtn.GetComponent.<Button>().interactable = true;
	}else {
		//--perhaps show a modal saying we can;t afford it
	}
}
