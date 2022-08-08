import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

 
  transform(value: any, arg: any): any {
    if (arg === '' || arg.length < 1) return value;
    const resultPosts = [];
    for (const val of value) {
      if (val.name.toLowerCase().indexOf(arg.toLowerCase()) > -1) {
        resultPosts.push(val);
      };
    };
    return resultPosts;
  }

}