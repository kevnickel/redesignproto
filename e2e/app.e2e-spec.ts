import { RedesignprotoPage } from './app.po';

describe('redesignproto App', () => {
  let page: RedesignprotoPage;

  beforeEach(() => {
    page = new RedesignprotoPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
