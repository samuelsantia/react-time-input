export const validTimePropsArgs = [
  [{ value: new Date() }, 'value', 'Date'],
  [{ value: '12:00' }, 'value', 'hh:mm Format'],
  [{ value: '12:00:23' }, 'value', 'hh:mm:ss Format'],
  [{ value: '12:00:23.234' }, 'value', 'hh:mm:ss.SSS Format'],
  [{ value: { hours: 23, minutes: 59 } }, 'value', 'plainObject with valid hours and minutes'],
  [{ value: { hours: 23, minutes: 59, seconds: 59 } }, 'value', 'plainObject with valid hours, minutes, seconds'],
  [{ value: { hours: 23, minutes: 59, seconds: 59, millis: 999 } }, 'value', 'plainObject with valid hours, minutes, seconds, millis']
];

export const invalidTimePropsArgs = [
  [{ value: 'fake' }, 'value', 'InvalidString' ],
  [{ value: '12' }, 'value', 'InvalidFormatString'],
  [{ value: '12.234' }, 'value', 'InvalidFormatString'],
  [{ value: '12:23.234' }, 'value', 'InvalidFormatString'],
  [{ value: '1:3:24' }, 'value', 'Invalid1DigitsString'],
  [{ value: '12:00:' }, 'value', 'InvalidTimeString'],
  [{ value: '24:00:00' }, 'value', 'OutOfRangeTime'],
  [{ value: '00:65:00' }, 'value', 'OutOfRangeTime'],
  [{ value: '00:00:65' }, 'value', 'OutOfRangeTime'],
  [{ value: '12:00:00:00' }, 'value', 'TooManyTimesSeparatorString'],
  [{ value: {} }, 'value', 'InvalidTypeOfProp'],
  [{ value: { hours: 24, minutes: 12 } }, 'value', 'InvalidTimeShapeHours'],
  [{ value: { hours: 12, minutes: 60 } }, 'value', 'InvalidTimeShapeMinutes'],
  [{ value: { hours: 12, minutes: 20, seconds: 60 } }, 'value', 'InvalidTimeShapeSeconds'],
  [{ value: { hours: 12, minutes: 20, seconds: 60, millis: 1000 } }, 'value', 'InvalidTimeShapeMillis'],
  [{ value: { hours: 12, minutes: 20, foo: 15 } }, 'value', 'InvalidTimeShapeKey'],
  [{ value: { hours: 'a', minutes: 'b' } }, 'value', 'InvalidTimeShapeUnit']
];
