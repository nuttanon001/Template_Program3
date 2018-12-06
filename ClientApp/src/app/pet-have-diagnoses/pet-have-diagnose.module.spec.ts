import { PetHaveDiagnoseModule } from './pet-have-diagnose.module';

describe('PetHaveDiagnoseModule', () => {
  let petHaveDiagnoseModule: PetHaveDiagnoseModule;

  beforeEach(() => {
    petHaveDiagnoseModule = new PetHaveDiagnoseModule();
  });

  it('should create an instance', () => {
    expect(petHaveDiagnoseModule).toBeTruthy();
  });
});
