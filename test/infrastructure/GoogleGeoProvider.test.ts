import 'mocha';
import * as Q from 'q';
import * as sinon from 'sinon';
import * as GoogleDistanceApi from 'google-distance-api';
import GoogleGeoProvider from '../../src/infrastructure/GoogleGeoProvider';
import Point from '../../src/core/entities/Point';

describe('GoogleGeoProvider', () => {
  let provider, googleDistanceApi;
  const source = new Point(51.5033640, -0.1276250);
  const destination = new Point(51.5033640, -0.1276251);
  const googleApiKey = 'AIzaSyCL_logO-qxMA7CAaqqRxjzmJAwSvlkdIA';

  beforeEach(() => {
    googleDistanceApi = Q.denodeify(GoogleDistanceApi.distance);
    provider = new GoogleGeoProvider(googleApiKey, googleDistanceApi);
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

  it('should provide real communication from api', () => {
    // given
    const provider = new GoogleGeoProvider(googleApiKey, googleDistanceApi);

    // when
    const geoOptions = provider.createGeoOptions(source, destination);
    const queryPromise = provider.queryPlugin(geoOptions);

    // then
    return queryPromise.then((geoResult) => {
      geoResult.should.be.instanceof(Object);
    })
  });

  it('should provide results from geoOptions', () => {
    // given
    const distanceStub = sinon.stub();
    const provider = new GoogleGeoProvider(googleApiKey, distanceStub);
    const geoOptions = provider.createGeoOptions(source, destination);
    distanceStub.withArgs(geoOptions).resolves({});
    
    // when
    const queryPromise = provider.queryPlugin(geoOptions);

    // then
    return queryPromise.then(() => {
      distanceStub.should.be.calledWith(geoOptions);
    })
  });
});