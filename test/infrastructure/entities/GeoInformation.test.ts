  import 'mocha';
  import * as sinon from 'sinon';
  import GeoInformation from '../../../src/infrastructure/entities/GeoInformation';
  import MomentToDateConverter from '../../../src/infrastructure/services/MomentToDateConverter';

  describe('GeoInformation', () => {
    it('should convert arrival time from words', () => {
      // given
      const dateConverter = sinon.createStubInstance(MomentToDateConverter);
      const currentTime = new Date('1 Jan 1900 09:00:00')
      const firstDurationWord = '3 days 1 hour 2 mins';
      const secondDurationWord = '2 hours 1 min';

      // when 
      const firstInformation = new GeoInformation(dateConverter, firstDurationWord);
      const secondInformation = new GeoInformation(dateConverter, secondDurationWord);
      firstInformation.getArrivalTime(currentTime);
      secondInformation.getArrivalTime(currentTime);

      // then
      dateConverter.getTimeFromDuration.should.be.calledWith(firstDurationWord, currentTime);
      dateConverter.getTimeFromDuration.should.be.calledWith(secondDurationWord, currentTime);
    });
  });