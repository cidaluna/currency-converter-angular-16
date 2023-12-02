import { FormatarNumeroPipe } from '../pipes/formatar-numero.pipe';

describe('FormatarNumeroPipe', () => {
  it('create an instance', () => {
    const pipe = new FormatarNumeroPipe();
    expect(pipe).toBeTruthy();
  });
});
