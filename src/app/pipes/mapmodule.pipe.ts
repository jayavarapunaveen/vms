import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'mapmodule'
})
export class MapmodulePipe implements PipeTransform {

  transform(items: any, allItems: any[]): any {

    // console.log('items',items,'allitems',allItems)
    var modulesArr=[]
    var modulesName=[]

    if(items.includes(",")){
      modulesArr=(items.split(","))
      for(let i=0;i<modulesArr.length;i++){
        let x = allItems.filter(singleItem=>{
        return singleItem.module_id == modulesArr[i]
        }) 
        if(x){
        modulesName.push({"id":x[0].module_id,"name":x[0].module_name})
        }
      }
      return modulesName
    }
    else{
      if(items){
        let x = allItems.filter(singleItem=>{
          return singleItem.module_id == items
          }) 
          if(x){
            modulesName.push({"id":x[0].module_id,"name":x[0].module_name})
            return modulesName
          }
      }
    }
    return null;
  }

}
