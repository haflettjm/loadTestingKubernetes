import * as kc from 'npm:@kubernetes/client-node';
export const loadKC =()=> {
  const k8 = new kc.KubeConfig();
  k8.loadFromDefault();
  return k8
}

export const makeK8api = (k8:any) => {
  return k8.makeApiClient(kc.CoreV1Api); 
} 

export const scale =  async() =>{
  const k8 = loadKC();
  const k8Api = makeK8api(k8);
  const namespace = 'default';

  try {
    const podsRes = await k8Api.listNamespacedPod(namespace);
    console.log(podsRes)
  }catch(e){
    console.error(`Error Processing Scale Request: ${e}`);
    
    return
  }
  console.log('loaded successfully.')
}
