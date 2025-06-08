import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'pipeexample'
})
export class PipeexamplePipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
