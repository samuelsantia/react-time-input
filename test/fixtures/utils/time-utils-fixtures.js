export const validTimePropsArgs = [
  [{ value: new Date() }, 'value', 'Fake'],
  [{ value: '12' }, 'value', 'Fake'],
  [{ value: '12:00' }, 'value', 'Fake'],
  [{ value: '12:00:23' }, 'value', 'Fake'],
  [{ value: '12.234' }, 'value', 'Fake'],
  [{ value: '12:00.234' }, 'value', 'Fake'],
  [{ value: '12:00:23.234' }, 'value', 'Fake']
];

export const invalidTimePropsArgs = [
  [{ value: 'fake' }, 'value', 'InvalidString' ],
  [{ value: '1:3:24' }, 'value', 'Invalid1DigitsString'],
  [{ value: '12:00:' }, 'value', 'InvalidTimeString'],
  [{ value: '12:00:00:00' }, 'value', 'TooManyTimesSeparatorString'],
  [{ value: {} }, 'value', 'InvalidTypeOfProp']
];
