using UnityEngine;
using System.Collections;

public class DestroyByTime : MonoBehaviour
{
	public float lifetime;
	
	void Start ()
	{
		Debug.Log(gameObject+" is being destroyed");
		Destroy (gameObject, lifetime);
	}
}