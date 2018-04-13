import { Subject } from 'rxjs/Subject';

export class UiService {
  public loadingStateChanged: Subject<boolean> = new Subject<boolean>()
}
