import 'mocha';
import * as Q from 'q';
import * as sinon from 'sinon';
import * as moment from 'moment';
import * as GoogleDistanceApi from 'google-distance-api';
import Point from '../../../src/core/entities/Point';
import GoogleGeoProvider from '../../../src/infrastructure/services/GoogleGeoProvider';
import GeoInformation from '../../../src/infrastructure/entities/GeoInformation';

describe('GoogleGeoProvider', () => {
  let provider, googleDistanceApi, geoInformation;
  const source = new Point(51.5033640, -0.1276250);
  const destination = new Point(51.5033640, -0.96100);
  const destinations = [new Point(51.5033640, -0.96100), new Point(51.5033640, -0.9700)];
  const googleApiKey = 'AIzaSyCL_logO-qxMA7CAaqqRxjzmJAwSvlkdIA';

  beforeEach(() => {
    googleDistanceApi = Q.denodeify(GoogleDistanceApi.distance);
    provider = new GoogleGeoProvider(googleApiKey, googleDistanceApi);
    geoInformation = sinon.createStubInstance(GeoInformation);
  });

  it('should create geo options', () => {
    // given

    // when
    const geoOptions = provider.createGeoOptions(source, destination);

    // then
    geoOptions.key.should.be.equals(googleApiKey);
    geoOptions.origins[0].should.be.equals(`${source.x},${source.y}`);
    geoOptions.destinations[0].should.be.equals(`${destination.x},${destination.y}`);
  });

  it('should create geo options with multiple destinations', () => {
    // given

    // when
    const geoOptions = provider.createGeoOptionsWithDestions(source, destinations);

    // then
    geoOptions.key.should.be.equals(googleApiKey);
    geoOptions.origins[0].should.be.equals(`${source.x},${source.y}`);
    geoOptions.destinations[0].should.be.equals(`${destinations[0].x},${destinations[0].y}`);
    geoOptions.destinations[1].should.be.equals(`${destinations[1].x},${destinations[1].y}`);
  });

  it.skip('should provide real communication from api', () => {
    // given
    const provider = new GoogleGeoProvider(googleApiKey, googleDistanceApi);

    // when
    const geoOptions = provider.createGeoOptions(source, destination);
    const queryPromise = provider.queryGeoInformationByOptions(geoOptions);

    // then
    return queryPromise.then((geoResult) => {
      geoResult.should.be.instanceof(Array);
      geoResult.should.all.be.instanceof(Object);
    })
  });

  it.skip('should provide real communication from api with multiple destinations', () => {
    // given
    const provider = new GoogleGeoProvider(googleApiKey, googleDistanceApi);

    // when
    const geoOptions = provider.createGeoOptionsWithDestions(source, destinations);
    const queryPromise = provider.queryGeoInformationByOptions(geoOptions);

    // then
    return queryPromise.then((geoResult) => {
      geoResult.should.be.instanceof(Array);
      geoResult.should.all.be.instanceof(Object);
    });
  });

  it('should query results from geoOptions', () => {
    // given
    const distanceStub = sinon.stub();
    const provider = new GoogleGeoProvider(googleApiKey, distanceStub);
    const geoOptions = provider.createGeoOptions(source, destination);
    distanceStub.withArgs(geoOptions).resolves({});

    // when
    const queryPromise = provider.queryGeoInformationByOptions(geoOptions);

    // then
    return queryPromise.then(() => {
      distanceStub.should.be.calledWith(geoOptions);
    })
  });

  it('should query results from source point and destination point', () => {
    // given
    const distanceStub = sinon.stub();
    const provider = new GoogleGeoProvider(googleApiKey, distanceStub);
    const createGeoOptionStub = sinon.stub(provider, 'createGeoOptions');
    distanceStub.resolves(geoInformation);

    // when
    const queryPromise = provider.queryGeoInformation(source, destination);

    // then
    return queryPromise.then(() => {
      createGeoOptionStub.should.be.called;
      distanceStub.should.be.called;
    })
  });
});