import { AccountsProviderMock, render } from '../../testing';
import { Stats } from './Stats';

describe('Stats', () => {
  it('should not render for no accounts', async () => {
    const { container } = render(
      <AccountsProviderMock accounts={{}}>
        <Stats />
      </AccountsProviderMock>,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('should not render for single account', async () => {
    const accounts = {
      '4tJbxxKqYRv3gDvY66BKyKzZheHEH8a27VBiMfeGX2iQrire': {
        name: 'My Sporran Account',
        address: '4tJbxxKqYRv3gDvY66BKyKzZheHEH8a27VBiMfeGX2iQrire',
        index: 1,
      },
    };
    const { container } = render(
      <AccountsProviderMock accounts={accounts}>
        <Stats />
      </AccountsProviderMock>,
    );
    expect(container).toBeEmptyDOMElement();
  });

  it('should render for at least two accounts', async () => {
    const { container } = render(<Stats />);
    expect(container).toMatchSnapshot();
  });
});