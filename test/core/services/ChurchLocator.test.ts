import 'mocha';
import ChurchLocator from '../../../src/core/services/ChurchLocator';
import Church from '../../../src/core/entities/Church';
import Point from '../../../src/core/entities/Point';

describe('ChurchLocator', () => {
  let churchLocator;
  const ADDRESS = 'Manila';
  const NEAR_CHURCH_NAME = 'Manila Church';
  const FAR_CHURCH_NAME = 'Malate Church';

  beforeEach(() => {
    churchLocator = new ChurchLocator();
  });

  it('should find nearest Church', () => {
    // given
    const currentPoint = new Point(10, 10);
    const nearestPoint = new Point(10.01, 10.01);
    const farthestPoint = new Point(10.02, 100.02)
    const nearestChurch = new Church(NEAR_CHURCH_NAME, ADDRESS, nearestPoint);
    const farthestChurch = new Church(FAR_CHURCH_NAME, ADDRESS, farthestPoint);
    const churches = [farthestChurch, nearestChurch];

    // when
    const church = churchLocator.getNearestChurch(currentPoint, churches, 50000);

    // then
    church.should.be.deep.equals(nearestChurch);
  });
});