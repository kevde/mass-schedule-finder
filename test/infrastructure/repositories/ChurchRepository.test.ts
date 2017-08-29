import 'mocha';
import * as Q from 'q';
import * as sinon from 'sinon';
import * as moment from 'moment';
import * as GoogleDistanceApi from 'google-distance-api';
import Point from '../../../src/core/entities/Point';
import ChurchRepository from '../../../src/infrastructure/repositories/ChurchRepository';
import GeoInformation from '../../../src/infrastructure/entities/GeoInformation';

xdescribe('ChurchRepository', () => {
  let repository, googleDistanceApi, geoInformation;
  const source = new Point(51.5033640, -0.1276250);
  const destination = new Point(51.5033640, -0.96100);
  const destinations = [new Point(51.5033640, -0.96100), new Point(51.5033640, -0.9700)];
  const googleApiKey = 'AIzaSyCL_logO-qxMA7CAaqqRxjzmJAwSvlkdIA';

  beforeEach(() => {
    googleDistanceApi = Q.denodeify(GoogleDistanceApi.distance);
    repository = new ChurchRepository();
    geoInformation = sinon.createStubInstance(GeoInformation);
  });

  it('should get all nearby churches', () => {
    // given

    // when
    const geoOptions = repository.createGeoOptions(source, destination);

    // then
    geoOptions.key.should.be.equals(googleApiKey);
    geoOptions.origins[0].should.be.equals(`${source.x},${source.y}`);
    geoOptions.destinations[0].should.be.equals(`${destination.x},${destination.y}`);
  });
});