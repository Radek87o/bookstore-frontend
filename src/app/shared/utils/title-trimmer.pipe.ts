import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'titleTrimmer'
})
export class TitleTrimmerPipe implements PipeTransform {

  transform(value: string, ...args: unknown[]): unknown {
    if(value.length<=30) {
      return value;
    } else {
      let trimmedTitle = value.substring(0,30); 
      return trimmedTitle.substring(0, trimmedTitle.lastIndexOf(' '))+'(..)';
    }
    
  }

}
