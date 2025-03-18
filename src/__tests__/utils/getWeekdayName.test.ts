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
    expect(getWeekdayName(date)).toBe('週日');
  });

  it('返回週一的名稱', () => {
    jest.setSystemTime(new Date('2025-03-17T00:00:00Z'));
    const date = new Date();
    expect(getWeekdayName(date)).toBe('週一');
  });

  it('返回週二的名稱', () => {
    jest.setSystemTime(new Date('2025-03-18T00:00:00Z'));
    const date = new Date();
    expect(getWeekdayName(date)).toBe('週二');
  });
});