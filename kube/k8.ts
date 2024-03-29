import { Spinners } from 'https://deno.land/x/kia@0.4.1/spinners.ts';
import { loadDefaultKubeConfig } from "./handlers/kubeconfig.ts";
import Kia from 'https://deno.land/x/kia@0.4.1/kia.ts';
import chalk from 'npm:chalk@5.3.0';
import { loadYaml } from '../cli/helper/filepath.ts';
import {
    Input,
    Confirm
  } from "https://deno.land/x/cliffy@v1.0.0-rc.3/prompt/mod.ts";
import { comK8 } from '../cli/commands/k8Command.ts';
import { stringify } from "https://deno.land/std@0.207.0/yaml/mod.ts";


export const loadConfig = async(appCache: object) =>{
  let k8:object
  try {
    if(await Confirm.prompt("Use default kubernetes configuration?")){
      k8 = await loadDefaultKubeConfig();
      
  }else{
      const filePath:string = await Input.prompt({
          message:`Please input the file path for the config you wish to load:`,
      })
      k8 = await loadYaml(filePath); 
  }
  } catch (e) {
    console.error(`Error loading kubernetes config: ${e}`)
    return
  }
  await appCache.save("k8", k8)
}

// Define the generic methods to facilitate using K8s

const getDeploymentName = async(appCache) =>{
  try {
    if (!appCache.store['k8']){
      loadConfig(appCache);
    }
    deployment = appCache.store['k8'].makeApiClient()
    
  } catch (err) {
    console.error(`Error retreiving namespace deployment: ${err}`)
  }
}



// export const displayPods = async() =>{
//   const start = performance.now();
//   let currentPods = await k8.performRequest({
//       method: 'GET',
//       path: `/api/v1/namespaces/default/pods`,
//       expectJson: true, // run JSON.parse on the response body
//   });
//   console.log("Current Pods are: \n")
//   let count = 0;
//   for(const item of currentPods.items){
//       count++
//       console.log(`>(${count}): ${item}`)
//   }
//   const stop = performance.now();
//   console.log(`Time run command: ${stop - start} milliseconds.`)
// }

// export const displayDeployments = async() =>{
//   const start = performance.now()
//   let count = 0;
//   let currentDeployments = await k8.performRequest({
//       method:'GET',
//       path: `/apis/apps/v1/namespaces/default/deployments`,
//       expectJson: true,
//   });
//   for(const item of currentDeployments.items){
//       count++
//       console.log(`>(${count}):`)
//       console.log(item.status)
//       console.log("\n")
//   }
//   const stop = performance.now();
//   console.log(`Time run command: ${stop - start} milliseconds.`)
// }



// export const displayReplicasList = async() =>{
//   const start = performance.now();
//   let replicaSetList:object = await k8.performRequest({
//       method: 'GET',
//       path: `/apis/apps/v1/watch/namespaces/default/replicasets`,
//       expectJson: true
//   });;
//   console.log("Current replicas are: \n")
//   let count = 0;
//   for(const item of replicaSetList.items){
//       count++
//       console.log(`>(${count}): ${item.metadata.name} \n`)
//   }
//   const stop = performance.now();
//   console.log(`Time run command: ${stop - start} milliseconds.`)
// }

// export const spinPods = async(scale: number) =>{
//   /*
//   * How the patch should be processed in the request.
//   *curl -X PATCH  --cacert /var/run/secrets/kubernetes.io/serviceaccount/ca.crt -H "Authorization: Bearer $(cat /var/run/secrets/kubernetes.io/serviceaccount/token)" \
// https://$KUBERNETES_SERVICE_HOST:$KUBERNETES_PORT_443_TCP_PORT/apis/extensions/v1beta1/namespaces/{NAMESPACE}/deployments/{NAME} \
// -H 'Content-Type: application/strategic-merge-patch+json' \
// -d '{"spec":{"replicas":1}}'
//   */
//   const start = performance.now()
//   const spinner = new Kia(`Spinning Pods....`);
//   spinner.start();
//   try {
//       let scaleResponse = await k8.performRequest({
//           method: 'PATCH',
//           path: `/apis/apps/v1/namespaces/default/replicasets/kubernetes-bootcamp-f95c5b745/scale`,
//           expectJson: true, // run JSON.parse on the response body
//       });
//       if (scaleResponse === null || scaleResponse || undefined){
//           throw new Error("Issue getting any response for scaling action.")
//       }
//       if (!scaleResponse.ok || scaleResponse?.status !== 201) {
//           throw new Error(`Issue getting Scale Response ${scaleResponse?.status}`);
//       }
      
//   } catch (e) {
//       console.log(chalk.redBright(e.Message));
//   }

// }




// export const scaleDeployment = async(appCache:object, replicas:number, deployment:object) => {
//   // See if there is anything in the cache for the namespace
//   let k8;
//   if(!deployment){
//       k8 = await loadConfig(appCache)
//       deployment = {}
//   }

//   try{
//       console.log('Current replica count:', deployment.body.spec.replicas);


//       await deployment.replaceNamespacedDeployment(name, namespace, deployment);

      
      
  
//       const k8sAppsApi = kc.makeApiClient(k8s.AppsV1Api);
  
//       const deployment = await k8sAppsApi.readNamespacedDeployment(deploymentName, 'default');
      
  
//       deployment.body.spec.replicas = replicaCount;
  
//       const response = await k8sAppsApi.replaceNamespacedDeployment(deploymentName, 'default', deployment.body);
//       console.log('Deployment scaled up successfully. New replica count:', response.body.spec.replicas);
//     } catch (err) {
//       console.error('Error scaling deployment:', err);
//     }
//   }catch(err){
//     console.log('Error scaling deployment:', err)
//   }
// }