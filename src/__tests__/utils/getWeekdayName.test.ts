import getWeekdayName from '../../utils/getWeekdayName';

describe('getWeekdayName', () => {
  beforeAll(() => {
    jest.useFakeTimers();
  });

  afterAll(() => {
    jest.useRealTimers();
  });

  it('返回週日的名稱', () => {
    jest.setSystemTime(new Date('2025-03-16T00:00:00Z'));
    const date = new Date();
    expect(getWeekdayName(date)).toBe('sunday');
  });

  it('返回週一的名稱', () => {
    jest.setSystemTime(new Date('2025-03-17T00:00:00Z'));
    const date = new Date();
    expect(getWeekdayName(date)).toBe('monday');
  });
});