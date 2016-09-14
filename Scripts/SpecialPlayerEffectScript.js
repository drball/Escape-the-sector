#pragma strict
//--handles the special particle effect when we pick up a key

private var specialParticles : ParticleSystem;
private var specialParticleRate : float; 
private var SpecialParticleObj : GameObject;


function Start () {

		//--setup the special status (blue) particles (disabled by default)
	SpecialParticleObj = Instantiate(Resources.Load("SpecialStatusParticles", GameObject),
				Vector3(transform.position.x, transform.position.y-0.2, transform.position.z), 
				 Quaternion.Euler(Vector3(-90, transform.rotation.y, transform.rotation.z)));
	SpecialParticleObj.transform.parent = transform;
	
	specialParticles = SpecialParticleObj.GetComponent.<ParticleSystem>();

	specialParticleRate = specialParticles.emissionRate;

	SpecialParticleObj.SetActive(false);

}

function StartSpecialEffect(){
	//--particles when a key is collected

	Debug.Log("Activate special particles");

	//--show particles
	SpecialParticleObj.SetActive(true);

	specialParticles.emissionRate = specialParticleRate;
}

function StopSpecialEffect(){
	//--stop the particles

	if(SpecialParticleObj){
		SpecialParticleObj.GetComponent.<ParticleSystem>().emissionRate = 0;
	}
	
	//--hide particles
	yield WaitForSeconds(2);
	
	SpecialParticleObj.SetActive(false);

}