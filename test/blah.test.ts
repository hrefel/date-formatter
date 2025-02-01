import { format, IOptions, DateFormatOptions } from '../src';

describe('format function', () => {

  const date = new Date('2025-02-01T10:00:00Z'); // 1 Februari 2025, 10:00 UTC

  it('should format ISO correctly', () => {
    const result = format(date, 'ISO');
    expect(result).toBe('2025-02-01');
  });

  it('should format ISO_WITH_TIMEZONE correctly', () => {
    const result = format(date, 'ISO_WITH_TIMEZONE');
    expect(result).toBe('2025-02-01T10:00:00.000Z');
  });

  it('should format DD MM YYYY correctly', () => {
    const result = format(date, 'DD MM YYYY');
    expect(result).toBe('01 02 2025');
  });

  it('should format YYYY MM DD correctly', () => {
    const result = format(date, 'YYYY MM DD');
    expect(result).toBe('2025 02 01');
  });

  it('should format DD MMM YYYY correctly', () => {
    const result = format(date, 'DD MMM YYYY');
    expect(result).toBe('01 Feb 2025');
  });

  it('should format MMM YYYY correctly', () => {
    const result = format(date, 'MMM YYYY');
    expect(result).toBe('Feb 2025');
  });

  it('should format YYYY DD MM correctly', () => {
    const result = format(date, 'YYYY DD MM');
    expect(result).toBe('2025 01 02');
  });

  it('should format DD MM YYYY HH:mm correctly', () => {
    const result = format(date, 'DD MM YYYY HH:mm');
    expect(result).toBe('01 02 2025 10:00');
  });

  it('should format DD MM YYYY hh:mm A correctly', () => {
    const result = format(date, 'DD MM YYYY hh:mm A');
    expect(result).toBe('01 02 2025 10:00 AM');
  });

  it('should format FULL_DATE correctly', () => {
    const result = format(date, 'FULL_DATE');
    expect(result).toBe('Saturday, 01 February 2025');
  });

  it('should format FULL_DATE_TIME_24 correctly', () => {
    const result = format(date, 'FULL_DATE_TIME_24');
    expect(result).toBe('01 February 2025 10:00');
  });

  it('should format FULL_DATE_TIME_12 correctly', () => {
    const result = format(date, 'FULL_DATE_TIME_12');
    expect(result).toBe('01 February 2025 10:00 AM');
  });

  it('should format FULL_DATE_WITH_TZ correctly', () => {
    const result = format(date, 'FULL_DATE_WITH_TZ');
    expect(result).toBe('01 February 2025 10:00:00 AM UTC');
  });

  it('should handle invalid date gracefully', () => {
    const invalidDate = new Date('invalid-date');
    const result = format(invalidDate);
    expect(result).toBe('Invalid Date');
  });

  it('should use custom separator for numeric formats', () => {
    const options: IOptions = { locale: 'id-ID', separator: '.' };
    const result = format(date, 'DD MM YYYY', options);
    expect(result).toBe('01.02.2025');
  });

  it('should handle custom locale', () => {
    const options: IOptions = { locale: 'id-ID', separator: ' ' };
    const result = format(date, 'DD MMM YYYY', options);
    expect(result).toBe('01 Feb 2025');
  });

  it('should throw an error for an invalid format type', () => {
    const invalidFormat = 'INVALID_FORMAT' as DateFormatOptions;
    expect(() => format(date, invalidFormat)).toThrowError('Invalid Format: INVALID_FORMAT');
  });
});
