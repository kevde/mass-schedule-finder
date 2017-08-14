import * as Geo from 'geo-nearby';
import * as _ from 'lodash';
import ScheduleFinder from './ScheduleFinder';

export default class ChurchLocator {
  scheduleFinder: ScheduleFinder;

  constructor(scheduleFinder) {
    this.scheduleFinder = scheduleFinder;
  }

  getNearestChurch(point, churches, range) {
    const nearestGeoData = this.getNearestGeoData(point, churches, range);
    return _.find(churches, (church) => church.name === _.get(nearestGeoData, '0.i'));
  }

  getNearbyChurchesWithSchedule(point, churches, range, startTime) {
    const nearByChurches = this.getNearbyChurches(point, churches, range);
    return _.filter(nearByChurches, (church) => this.scheduleFinder.getNextSchedule(church.schedule, startTime));
  }

  createGeoDataSet(churches) {
    const dataSet = Geo.createCompactSet(churches, { id: 'name', lat: ['location', 'x'], lon: ['location', 'y'] });
    return new Geo(dataSet, { sorted: true });
  }

  getNearbyChurches(point, churches, range) {
    const nearestGeoData = this.getNearestGeoData(point, churches, range);
    return _.map(nearestGeoData, (data) => _.find(churches, ['name', data.i]));
  }

  getNearestGeoData(point, churches, range) {
    const geoDataSet = this.createGeoDataSet(churches);
    return geoDataSet.nearBy(point.x, point.y, range);
  }
}