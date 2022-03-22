import { Pipe, PipeTransform } from '@angular/core';
import { Unit } from 'src/app/enums/unit';

@Pipe({name: 'unitPipe'})
export class UnitPipe implements PipeTransform {
  transform(value: number): string {
    return Unit[value];
  }
}