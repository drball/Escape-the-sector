#pragma strict
//--handles the special particle effect when we pick up a key

private var specialParticles : ParticleSystem;
private var specialParticleRate : float; 
public var SpecialParticleObj : GameObject;


function Start () {
	
	specialParticles = SpecialParticleObj.GetComponent.<ParticleSystem>();

	specialParticleRate = specialParticles.emissionRate;

}

function StartSpecialEffect(){
	//--particles when a key is collected

	//--show particles
	SpecialParticleObj.SetActive(true);

	specialParticles.emissionRate = specialParticleRate;
}

function StopSpecialEffect(){
	//--stop the particles

	SpecialParticleObj.GetComponent.<ParticleSystem>().emissionRate = 0;

	//--hide particles
	yield WaitForSeconds(2);
	
	SpecialParticleObj.SetActive(false);

}