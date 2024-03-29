import { displayDeployments } from '../../kube/k8.ts';

// Will have a menu dedicated to switching between k8 resources.
import {
    Select,
  } from "https://deno.land/x/cliffy@v1.0.0-rc.3/prompt/mod.ts";
import chalk from 'npm:chalk@5.3.0';
import { loadConfig } from '../../kube/k8.ts';



export const comK8 = async(appCache: object) =>{
  const k8Options = {
      LOAD: {name:"Load a new config", value:"load"},
      RETURN: {name:"Return to Main Menu", value:"q"}
  }
  const choice: string = await Select.prompt ({
      message: `====== ${chalk.blueBright("K8 Menu")}: =======`,
      options: [
          k8Options.LOAD,
          k8Options.RETURN,
      ],
  })
  // Placeholder switch

  switch(choice){
      case 'load':
          await loadConfig(appCache);
          break;
      case 'q':
          break;
  }
}