import k8s from "npm:@kubernetes/client-node";
const kc = new k8s.KubeConfig();

// Handling loading different contexts either can be from a file or not
export const loadDefaultKubeConfig = () =>{
    kc.loadFromDefault();
    return kc
}

//TODO: Handle Client Updates
