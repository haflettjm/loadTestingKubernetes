import {
  Select,
  // Input,
  // Confirm
} from "https://deno.land/x/cliffy@v1.0.0-rc.3/prompt/mod.ts";
import { newCache } from './cache.ts';
import { scale } from './k8.ts';
import * as mod from "https://deno.land/std@0.206.0/fs/ensure_dir.ts";

const appCache = newCache();

const runScale = (appCache:object) =>{
  
  scale();
  console.log('Running k8s')
}

runScale(appCache);
