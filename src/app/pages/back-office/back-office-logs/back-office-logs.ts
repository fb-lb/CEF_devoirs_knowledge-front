import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { firstValueFrom } from 'rxjs';
import { ApiResponse, LOG_EVENTS, LOG_LEVELS, LOG_TYPES, LogEvent, LogLevel, LogType, StoredLog } from '../../../core/models/api-response.model';
import { environment } from '../../../../environments/environment';
import { FontAwesomeModule, IconDefinition } from '@fortawesome/angular-fontawesome';
import { faCaretDown, faCaretRight } from '@fortawesome/free-solid-svg-icons';
import { FormsModule } from "@angular/forms";

@Component({
  selector: 'app-back-office-logs',
  imports: [FontAwesomeModule, FormsModule],
  templateUrl: './back-office-logs.html',
  changeDetection: ChangeDetectionStrategy.Eager,
  styleUrl: './back-office-logs.scss',
})
export class BackOfficeLogs {

  allLogs: StoredLog[] = [];
  allLogsContent: string[] = [];
  openedLog: Map<string, boolean> = new Map();

  searchTextInput: string = "";

  notConnectedUserText: string = 'Utilisateur non connecté';

  faCaretRight:IconDefinition = faCaretRight;
  faCaretDown: IconDefinition = faCaretDown;

  readonly logLevels = LOG_LEVELS;
  readonly logTypes = LOG_TYPES;
  readonly logEvents = LOG_EVENTS;

  logLevelSelected: 'all'|LogLevel = 'all';
  logTypeSelected: 'all'|LogType = 'all';
  logEventSelected: 'all'|LogEvent = 'all';

  constructor(private http: HttpClient) {}

  async ngOnInit() {
    try {
      const response = await firstValueFrom(this.http.get<ApiResponse<StoredLog[]>>(environment.backUrl + '/api/logs/getAll'));

      if (response.data) this.allLogs = structuredClone(response.data);

      // Sort logs by descending date order
      this.allLogs.sort((a,b) => 
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
      );

      // Modify createdAt value from ISO 8601 UTC to local hour and format
      this.allLogs = this.allLogs.map(l => {
        this.openedLog.set(l._id, false);
        l.createdAt = new Date(l.createdAt).toLocaleString('fr-FR', {timeZone: 'Europe/Paris'});
        return l;
      });

      // Recover all logs content in an string array where each string have all the values. This will be used to filter logs by search text
      this.allLogsContent = this.stringifyArrayOfObjectsContent(this.allLogs.map(l => {
          if (!l.userId) l.userId = this.notConnectedUserText;
          const { _id, ...logWithNoId } = l as any;
          return logWithNoId; 
        }));
    } catch (error) {
      console.error(error);
      // add external service like Sentry to save the error 
    }
  }

  toogleMetadataDisplaying(logId: string) {
    if (this.openedLog.has(logId)) {
      const newState = !this.openedLog.get(logId);
      this.openedLog.set(logId, newState);
    }
  }

  // Extract all values of the provided object into one string
  stringifyArrayOfObjectsContent(array: Object[]): string[]{
    const arrayOfObjectsContentStringified: string[] = [];
    const objectContent: string[] = [];

    function stringifyObjectContent(value: any): string {
      if (value !== null && typeof value === 'object' ) {
        if (Array.isArray(value)) {
          value.forEach(v => stringifyObjectContent(v));
        } else {
          Object.values(value).forEach(v => stringifyObjectContent(v));
        }
      } else {
        objectContent.push(String(value).toLowerCase());
      }

      return objectContent.join(' ');
    }
    
    array.forEach(o => {
      objectContent.splice(0);
      const  objectContentStringified = stringifyObjectContent(o);
      arrayOfObjectsContentStringified.push(objectContentStringified);
    });

    return arrayOfObjectsContentStringified;
  }

  filterLogs() {
    let filteredLogs = this.allLogs;
    
    const allWordsInput = this.searchTextInput.split(' ');
    filteredLogs = filteredLogs.filter((l, i) => allWordsInput.every(w => this.allLogsContent[i].includes(w.toLowerCase())));

    this.logLevelSelected === 'all' ? 
      filteredLogs = filteredLogs :
      filteredLogs = filteredLogs.filter(l => l.level === this.logLevelSelected);

    this.logTypeSelected === 'all' ?
      filteredLogs = filteredLogs :
      filteredLogs = filteredLogs.filter(l => l.type === this.logTypeSelected);

    this.logEventSelected === 'all' ?
      filteredLogs = filteredLogs :
      filteredLogs = filteredLogs.filter(l => l.event === this.logEventSelected);
  
    return filteredLogs;
  } 
}