import { Pipe, PipeTransform } from '@angular/core';
import { UserData } from '../core/models/api-response.model';

@Pipe({
  name: 'filterByText'
})
export class FilterByTextPipe implements PipeTransform {

  transform(allUsers: UserData[], inputText: string): unknown {
    return null;
  }

}
