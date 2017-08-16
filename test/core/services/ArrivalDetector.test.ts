import 'mocha';
import * as sinon from 'sinon';
import ArrivalDetector from '../../../src/core/services/ArrivalDetector';
import GoogleGeoProvider from '../../../src/infrastructure/GoogleGeoProvider';
import Church from '../../../src/core/entities/Church';
import Point from '../../../src/core/entities/Point';
import GeoInformation from "../../../src/infrastructure/entities/GeoInformation";

describe('ArrivalDetector', async() => {
  it('should get estimated time of arrival', () => {
    // given
    const source = new Point(10, 10);
    const destination = new Point(10.1, 10.1);
    const currentTime = new Date('1 Jan 1900 09:00:00');
    const geoProvider = sinon.createStubInstance(GoogleGeoProvider);
    const geoInformation = sinon.createStubInstance(GeoInformation);
    geoProvider.queryGeoInformation.withArgs(source, destination).resolves(geoInformation);

    // when
    const arrivalDetector = new ArrivalDetector(geoProvider);
    const arrivalPromise = arrivalDetector.getEstimatedTimeOfArrival(source, destination, currentTime);

    // then
    return arrivalPromise.then(() => {
      geoProvider.queryGeoInformation.should.be.calledWith(source, destination);
      geoInformation.getArrivalTime.should.be.calledWith(currentTime);
    });
  });
});