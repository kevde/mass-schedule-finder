import 'mocha';
import User from '../../../src/core/entities/User';

describe('User', () => {
  let user;
  const NAME = 'user1';

  beforeEach(() => {
    user = new User(NAME);
  });

  it('should have name', () => {
    // given
    // when 
    // then
    user.should.have.property('name');
    user.name.should.be.equals(NAME);
  });
});
