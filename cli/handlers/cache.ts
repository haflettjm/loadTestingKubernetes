export const cache: {
  store: {[key: string]: any};
  save(this:any, key:string, value:any): void,
  load(this:any, key:string): any,
} = {
  store = {},

  save(this, key:string, value:any){
   this.store[key] = value;
  },

  load(this,key:string){
    return this.store[key];
  } 
}