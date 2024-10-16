export interface ICalendarEvent {
  id: number;
  start: string;
  end: string;
  title?: string;
  people?: string[];
  location?: string;
  description?: string;
  calendarId?: string;
  _customContent?: {
    timeGrid?: string;
    dateGrid?: string;
    monthGrid?: string;
    monthAgenda?: string;
  };
  _options?: CalendarEventOptions;
  [key: string]: any;
}

type CalendarEventOptions = {
  disableDND?: boolean;
  disableResize?: boolean;
  additionalClasses?: string[];
};
