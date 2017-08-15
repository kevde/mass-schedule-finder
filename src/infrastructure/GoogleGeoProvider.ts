import * as _ from 'lodash';

export default class GoogleGeoProvider {
  apiKey: any;
  googleDistanceApi: any;

  constructor(apiKey, googleDistanceApi) {
    this.apiKey = apiKey;
    this.googleDistanceApi = googleDistanceApi;
  }

  createGeoOptions(sourcePoint, destinationPoint): GeoOption {
    const sourceWord = `${sourcePoint.x},${sourcePoint.y}`;
    const destinationWord = `${destinationPoint.x},${destinationPoint.y}`;
    return new GeoOption(this.apiKey, [sourceWord], [destinationWord]);
  }

  queryPlugin(geoOption: GeoOption) {
    return this.googleDistanceApi(geoOption).then((results) => _.head(results));
  }
}

class GeoOption {
  key: any;
  origins: any[];
  destinations: any[];

  constructor(apiKey, origins, destinations) {
    this.key = apiKey;
    this.origins = origins;
    this.destinations = destinations;
  }
}