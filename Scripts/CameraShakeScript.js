#pragma strict

//--shakes the camera - BUT doesn't work well when camera is following player

public var customIntensity : float = .11;
public var customDecay : float = 0.005;

private var originPosition:Vector3;
private var originRotation:Quaternion;
private var shake_decay: float;
private var shake_intensity: float;
public var constantShaking: boolean = false;
private var constantShakeIntensity: float;
 
// function OnGUI () {
//    if (GUI.Button (Rect (20,40,80,20), "Shake")) {
//       Shake();
//    }
// }
 
function Update(){

   originPosition = transform.position;

   if(shake_intensity > 0){
      originPosition = transform.position;
      transform.position = originPosition + Random.insideUnitSphere * shake_intensity;
      transform.rotation = Quaternion(
         originRotation.x + Random.Range(-shake_intensity,shake_intensity)*.2,
         originRotation.y + Random.Range(-shake_intensity,shake_intensity)*.2,
         originRotation.z + Random.Range(-shake_intensity,shake_intensity)*.2,
         originRotation.w + Random.Range(-shake_intensity,shake_intensity)*.2
      );
      shake_intensity -= shake_decay;
   }

   if(constantShaking == true){

      transform.position = originPosition + Random.insideUnitSphere * constantShakeIntensity;
      transform.rotation = Quaternion(
         originRotation.x + Random.Range(-constantShakeIntensity,constantShakeIntensity)*.2,
         originRotation.y + Random.Range(-constantShakeIntensity,constantShakeIntensity)*.2,
         originRotation.z + Random.Range(-constantShakeIntensity,constantShakeIntensity)*.2,
         originRotation.w + Random.Range(-constantShakeIntensity,constantShakeIntensity)*.2
      );
      
      constantShakeIntensity += 0.00002;
   }
}
 
function Shake(){
   // originPosition = transform.position;
   originRotation = transform.rotation;
   shake_intensity = customIntensity;
   shake_decay = customDecay;
}

function LongShake(){
   constantShaking = true;
   originRotation = transform.rotation;
   constantShakeIntensity = 0.001;
}