import { BreedModule } from './breed.module';

describe('BreedModule', () => {
  let breedModule: BreedModule;

  beforeEach(() => {
    breedModule = new BreedModule();
  });

  it('should create an instance', () => {
    expect(breedModule).toBeTruthy();
  });
});
