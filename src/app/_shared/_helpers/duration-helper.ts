import * as moment from 'moment';

export function durationHoursMinutes(hours: number, minutes: number) {
  const duration = moment.duration(hours, 'hours');
  const durationM = moment.duration(minutes, 'minutes');

  return sumDurations(duration, durationM).toISOString();
}

export function sumDurations(...durations: moment.Duration[]): moment.Duration {
  return durations.reduce((total, duration) => total.add(duration), moment.duration(0));
}
