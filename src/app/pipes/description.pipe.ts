import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'description'
})
export class DescriptionPipe implements PipeTransform {

  transform(description:string):string {
    if (description.length >70) return `${description.substring(0,70)} ...` 
    return description;
  }
}
