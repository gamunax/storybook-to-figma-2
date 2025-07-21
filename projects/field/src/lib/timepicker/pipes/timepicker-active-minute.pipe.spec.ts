import { TimepickerActiveMinutePipe } from './timepicker-active-minute.pipe';

describe('TimepickerActiveMinutePipe', () => {
    const pipe = new TimepickerActiveMinutePipe();

    it('should create an instance', () => {
        expect(pipe).toBeTruthy();
    });

    it('should return false when minute null or undefined', () => {
        const minutesGap = 5;
        const clockFaceDisabled = false;
        const currentMinute = 5;

        expect(pipe.transform(undefined, currentMinute, minutesGap, clockFaceDisabled)).toBeFalsy();
        expect(pipe.transform(null, currentMinute, minutesGap, clockFaceDisabled)).toBeFalsy();
    });

    it('should return false when isClockFaceDisabled is true', () => {
        const minutesGap = 5;
        const clockFaceDisabled = true;
        const minute = 5;

        expect(pipe.transform(minute, minute, minutesGap, clockFaceDisabled)).toBeFalsy();
    });

    it('should return false when currentMinute is the same as provided minute,' +
        ' but minutesGap is not appropriate', () => {
        const minutesGap = 5;
        const clockFaceDisabled = false;
        const minute = 3;

        expect(pipe.transform(minute, minute, minutesGap, clockFaceDisabled)).toBeFalsy();
    });

    it('should return true when currentMinute is the same as provided minute and minutesGap is appropriate', () => {
        const minutesGap = 5;
        const clockFaceDisabled = false;
        const minute = 5;

        expect(pipe.transform(minute, minute, minutesGap, clockFaceDisabled)).toBeTruthy();
    });
});
