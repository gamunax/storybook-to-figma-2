import { TimepickerUnits } from '../models/timepicker-units.enum';
import { TimepickerTimeFormatterPipe } from './timepicker-time-formatter.pipe';

describe('TimepickerTimeFormatterPipe', () => {
    let pipe: TimepickerTimeFormatterPipe;

    beforeEach(() => {
        pipe = new TimepickerTimeFormatterPipe();
    });

    it('should do nothing if time undefined', () => {
        expect(pipe.transform(undefined, TimepickerUnits.HOUR)).toBeUndefined();
        expect(pipe.transform(null, TimepickerUnits.HOUR)).toBeNull();
        expect(pipe.transform('', TimepickerUnits.HOUR)).toBe('');
    });

    it('should transform hour \'5\' to \'05\'', () => {
        expect(pipe.transform(5, TimepickerUnits.HOUR)).toBe('05');
    });

    it('should transform minute \'9\' to \'09\'', () => {
        expect(pipe.transform(9, TimepickerUnits.MINUTE)).toBe('09');
    });

    it('should throw error if unknown TimepickerUnits', () => {
        expect(() => pipe.transform(20, undefined)).toThrowError('no such time unit');
    });
});
