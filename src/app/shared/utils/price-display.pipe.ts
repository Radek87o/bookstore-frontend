import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'priceDisplay'
})
export class PriceDisplayPipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    let stringNumber = value ? value.toFixed(2).replace('.',',') : '';
    if(stringNumber.length===2) {
      return stringNumber+',00';
    } else if(stringNumber.length===4  && (stringNumber.indexOf(',')===3 || stringNumber.indexOf(',')===4)){
      return stringNumber+'0';
    } else {
      return stringNumber;
    }
  }

}
