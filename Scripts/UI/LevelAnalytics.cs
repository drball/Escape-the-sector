using UnityEngine;
using System.Collections;
using UnityEngine.Analytics;
using System.Collections.Generic;

public class LevelAnalytics : MonoBehaviour {

	void Start(){

	}


	//--called by broadcast on gameControllerScript
	void LoadedLevel (int levelNum) {
		//--send analytics event
        Analytics.CustomEvent("LoadedLevel", new Dictionary<string, object>
        {
            { "LoadedLevel", levelNum }
        });
        Debug.Log("Custom analytics event: LoadedLevel = "+levelNum);
	}

	//--called by broadcast on gameControllerScript
	void ChosenPlayer (string player) {
		//--send analytics event
        Analytics.CustomEvent("PlayerChosen", new Dictionary<string, object>
        {
            { "PlayerChosen", player }
        });
        Debug.Log("Custom analytics event: PlayerChosen = "+player);
	}
}
