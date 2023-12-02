import { FormatarTextoPipe, FormatarValorPipe } from './formatar-dados.pipe';

describe('FormatarNumeroPipe', () => {
  it('create an instance texto', () => {
    const pipe = new FormatarTextoPipe();
    expect(pipe).toBeTruthy();
  });

  it('create an instance valor', () => {
    const pipe = new FormatarValorPipe();
    expect(pipe).toBeTruthy();
  });
});
