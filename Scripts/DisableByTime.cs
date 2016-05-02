using UnityEngine;
using System.Collections;

public class DisableByTime : MonoBehaviour
{
	public float lifetime;
	
	void Start ()
	{
		Debug.Log(gameObject+" is being disabled");
		gameObject.SetActive(false);
	}
}