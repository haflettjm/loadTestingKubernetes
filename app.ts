import Kia from "https://deno.land/x/kia@0.4.1/mod.ts";
import { comK8 } from "./cli/commands/k8Command.ts";
import { Quit } from "./cli/commands/quit.ts";
import { k6Menu } from './cli/handlers/k6Handler/k6.ts';
import {
    Select,
    Input,
    Confirm
  } from "https://deno.land/x/cliffy@v1.0.0-rc.3/prompt/mod.ts";
// import { cache } from './cli/handlers/cache.ts';
import k8s, { AppsV1Api } from "npm:@kubernetes/client-node";
import chalk from 'npm:chalk@5.3.0';
import { stringify } from 'https://deno.land/std@0.207.0/yaml/stringify.ts';
import {parse} from "https://deno.land/std@0.207.0/yaml/mod.ts";
import * as fs from "https://deno.land/std@0.217.0/fs/mod.ts";

const cache: {
  store: {};
  save(this:any, key:string, value:any): void,
  load(this:any, key:string): any,
} = {
  store: {},

  save(this, key:string, value:any){
   this.store[key] = value;
  },

  load(this,key:string){
    return this.store[key];
  } 
}

const loadFile = async(filePath: string) =>{
  console.log("loading file....")
  try {
      const isThere = await fs.exists(filePath)
      if(isThere){
          const file = Deno.open(filePath, {read: true, write: true})
          return file
      }else{
          throw new Error("File Does not exist!")
      }
  } catch (e) {
      return e.message
  }
}

const  loadYaml = async(filePath: string)  =>{
  const decoder = new TextDecoder("utf-8");
  console.log("loading file....")
  try {
      const isThere = await fs.exists(filePath)
      if(isThere){
          const ofile:Uint8Array = await Deno.readFileSync(filePath)
          const file:object = parse(decoder.decode(ofile));
          return file
      }else{
          throw new Error("File Does not exist!")
      }
  } catch (e) {
      console.log(e.message)
      return {}
  }
  
}


// Is storing application state a good idea globablly? Who knows?



export const loadConfig = async() =>{
  const k8 = new k8s.KubeConfig();
  try {
    if(await Confirm.prompt("Use default kubernetes configuration?")){
      await k8.loadFromDefault();
    }else{
      const filePath:string = await Input.prompt({
          message:`Please input the file path for the config you wish to load:`,
      })
      try {
        k8 = await loadYaml(filePath);
        if(Object.keys(k8).length > 0){
          throw Error('Kubernetes config could not be loaded.')
        }
        return k8
      } catch (error) {
        console.error(error)
      }
    
  }
  } catch (e) {
    console.error(`Error loading kubernetes config: ${e}`)
    return
  }

}

const getApiClient = async(k8) =>{
  try {
    const k8api = await new k8.makeApiClient(k8s.CoreV1Api);
    return k8api;
  } catch (err) {
    console.error(`Error retrieving namespace deployment: ${err}`);
  }
}

const scaleDeployment = async(appCache: typeof cache, replicaScale:number, k8:any) => {
  // See if there is anything in the cache for the namespace
  const k8api = await new k8.AppsV1Api(k8.getCurrentCluster().server());;

  try {
      const deploymentsList = await k8api.listNamespacedDeployment('default');
      const deploymentName = deploymentsList.body.items[0].metadata?.name;
      let deployment = await k8api.readNamespacedDeployment(deploymentName, 'default');
      console.log(deployment)
      // console.log('Current replica count:', deployment.body.spec.replicas);
      // console.log(`Scaling to this many replicas: ${replicaScale}`)
      // await deployment.replaceNamespacedDeployment(name, namespace, deployment);

      // const k8sAppsApi = k8.makeApiClient(k8s.AppsV1Api);

      // deployment.body.spec.replicas = replicaScale;

      // const response = await k8sAppsApi.replaceNamespacedDeployment(
      //   deployment.metadata.name, 
      //   'default', 
      //   deployment.body
      // );
      // console.log(
      // 'Deployment scaled up successfully. New replica count:', 
      // response.body.spec.replicas
      // );
    }catch(err){
      console.log('Error scaling deployment:', err)
  }
}

export const loadTest = async (appCache:object, k8) =>{

  console.log(`Testing.....`);
  let replicas = 0;
  const input:string = await Input.prompt({message:`Please input the desired load:`,})
  replicas = parseInt(input);
  await scaleDeployment(appCache, replicas, k8)
}

export const runCLI = async () =>{
  const appCache = cache;
  const genericOptions:object= {
    LOAD_TEST: {},
    EXIT: {},
  } = {
      LOAD_TEST: {
        name:"Load testing Menu !!Will test against Default K8 Cluster unless configured!!", 
        value:"lt"},
      EXIT: {name:"Exit", value:"q"},
  }
  
  let choice = ""

  // Placeholder switch
  while(choice != "q"){
      choice = await Select.prompt({
          message: chalk.inverse("====== Main Menu: ======="),
          options: [
              genericOptions.LOAD_TEST,
              genericOptions.EXIT,
          ],
      });
      switch(choice){
          case 'lt':
            let k8 = await loadConfig();
            let results = await loadTest(appCache, k8);
            appCache.save('results', results); 
            continue;
          case 'exit':
            Quit();
            break;
          default:
            continue;
      }
  }
}

runCLI();
