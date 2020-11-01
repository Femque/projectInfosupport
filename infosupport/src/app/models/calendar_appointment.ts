export class Calendar_appointment {

  title: string;
  start: Date;
  end: Date;

  constructor(title: string, start: Date, end: Date) {
    this.title = title;
    this.start = start;
    this.end = end;
  }
}
