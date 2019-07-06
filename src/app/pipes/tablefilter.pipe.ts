import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'tablefilter'
})
export class TablefilterPipe implements PipeTransform {

    transform(pagedItems: any[], rowData: any[], rowNsearches: [], search): any {
        let products = [];
        if (!pagedItems) {
            return [];
        }
        if (search == '') {
            products = pagedItems
        }
        else {
            rowData.filter(singleItem => {
                let match;;
                for (let i = 0; i < rowNsearches.length - 1; i++) {
                    if (search) {
                        match = match || String(singleItem[rowNsearches[i]['bodyTitle']]).toLowerCase().includes((String(search).toLowerCase()))
                    } else {
                        match = true;
                    }
                }
                console.log('this is match', singleItem)
                if (match) {
                    products.push(singleItem)
                }
            })
        }


        return products;
    }
}

@Pipe({
    name: 'multiselectfilter'
})
export class MultiSelectFilterPipe implements PipeTransform {

    transform(allOptions: any, searchString): any {
        let filteredOptions = [];
        if (searchString) {
            console.log('entering into if', searchString)
            filteredOptions = allOptions.filter((singleItem, i) => {
                console.log(singleItem && singleItem.module_name.toLowerCase().includes(String(searchString && searchString.toLowerCase())), 'index', i)
                return (singleItem && singleItem.module_name.toLowerCase()).includes(String(searchString && searchString.toLowerCase()))
            })
        } else {
            filteredOptions = allOptions
        }
        console.log('filteredOptions', searchString, filteredOptions)
        return filteredOptions;
    }
}
