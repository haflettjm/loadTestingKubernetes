//TODO: Handle File Walking Here
import {parse} from "https://deno.land/std@0.207.0/yaml/mod.ts";
import * as fs from "https://deno.land/std@0.217.0/fs/mod.ts";

export const loadFile = async(filePath: string) =>{
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

export const  loadYaml = async(filePath: string)  =>{
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
      return
  }
  
}