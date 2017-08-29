import * as Geo from 'geo-nearby';
import * as _ from 'lodash';
import ScheduleFinder from './ScheduleFinder';

export default class ChurchLocator {
  scheduleFinder: ScheduleFinder;

  constructor(scheduleFinder) {
    this.scheduleFinder = scheduleFinder;
  }

  getNearest(point, churches, range) {
    const nearestGeoData = this.getNearestGeoData(point, churches, range);
    return _.find(churches, (church) => church.name === _.get(nearestGeoData, '0.i'));
  }

  getNearbyChurchesWithSchedule(point, churches, range, startTime) {
    const nearByChurches = this.getNearbyChurches(point, churches, range);
    return this.getChurchesWithSchedule(nearByChurches, startTime);
  }

  getChurchesWithSchedule(churches, startTime) {
    return _.filter(churches, (church) => this.scheduleFinder.getNextSchedule(church.schedule, startTime));
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

  sortByArrivalTime(churches) {
    return _.sortBy(churches, ['arrivalTime']);
  }

  getNearestByArrivalTime(churches) {
    return _.head(this.sortByArrivalTime(churches));
  }

  getArrivableChurches(churches, startTime) {
    const churchesWithSchedules = _.filter(churches, (church) => church.hasSchedule(startTime));
    const possibleChurches = _.filter(churchesWithSchedules, (church) => church.arrivalTime < startTime);
    return this.sortByArrivalTime(possibleChurches);
  }
}