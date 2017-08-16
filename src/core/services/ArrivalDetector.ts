import GoogleGeoProvider from 'src/infrastructure/GoogleGeoProvider';

export default class ArrivalDetector {
  geoProvider: GoogleGeoProvider;

  constructor(geoProvider) {
    this.geoProvider = geoProvider;
  }
  async getEstimatedTimeOfArrival(source, destination, currentTime) {
    const geoInformation = await this.geoProvider.queryGeoInformation(source, destination);
    return geoInformation.getArrivalTime(currentTime);
  }
}