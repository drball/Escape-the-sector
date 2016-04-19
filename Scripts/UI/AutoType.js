#pragma strict

public var letterPause = 0.2;
public var sound : AudioClip;
 
private var word: String; //declare type
 
function Start () {
	word = GetComponent.<Text>().text;
	GetComponent.<Text>().text = "";
	TypeText ();
}
 
function TypeText () {
	for(var i: int = 0; i < word.Length; i++) {
		GetComponent.<Text>().text += word.Substring(i, 1);
		if (sound){
			GetComponent.<AudioSource>().PlayOneShot (sound);
		}
		yield WaitForSeconds (letterPause);
	}		
}


// var letterPause = 0.2;
//   var sound : AudioClip;
 
//   private var word: String; //declare type
 
//   function Start () {
//    word = guiText.text;
//    guiText.text = "";
//    TypeText ();
//   }
 
//   function TypeText () {
//    for(var i: int = 0; i < word.Length; i++) {
//     guiText.text += word.Substring(i, 1);
//     if (sound)
//      audio.PlayOneShot (sound);
//     yield WaitForSeconds (letterPause);
//    }       
//   }