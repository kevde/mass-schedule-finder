import * as Geo from 'geo-nearby';
import * as _ from 'lodash';

export default class ChurchLocator {

  getNearestChurch(point, churches, range) {
    const geoDataSet = this.createGeoDataSet(churches);
    const nearestGeoData =  geoDataSet.nearBy(point.x, point.y, range);
    return _.find(churches, (church) => church.name === _.get(nearestGeoData, '0.i'));
  }

  createGeoDataSet(churches) {
    const dataSet = Geo.createCompactSet(churches, { id: 'name', lat: ['location', 'x'], lon: ['location', 'y'] });
return new Geo(dataSet, { sorted: true });
  }
}