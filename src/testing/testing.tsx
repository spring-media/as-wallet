export * from '@testing-library/react';
export { waitForElementToBeRemoved } from '@testing-library/dom';
import { act, render as externalRender } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import dialogPolyfill from 'dialog-polyfill';

import { ConfigurationProvider } from '../configuration/ConfigurationContext';
import { IdentitiesProviderMock } from '../utilities/identities/IdentitiesProvider.mock';
import { mockBalanceChangeChannel } from '../channels/balanceChangeChannel/mockBalanceChangeChannel';

export {
  IdentitiesProviderMock,
  identitiesMock,
  moreIdentitiesMock,
} from '../utilities/identities/IdentitiesProvider.mock';

jest.mock('@kiltprotocol/core', () => ({}));
jest.mock('@kiltprotocol/core/lib/balance/Balance.chain', () => ({}));

jest.mock('../components/Avatar/Identicon', () => ({
  Identicon: () => 'Identicon',
}));

mockBalanceChangeChannel();

export function render(
  ui: Parameters<typeof externalRender>[0],
  options?: Parameters<typeof externalRender>[1],
): ReturnType<typeof externalRender> {
  return externalRender(
    <ConfigurationProvider>
      <IdentitiesProviderMock>
        <MemoryRouter>{ui}</MemoryRouter>
      </IdentitiesProviderMock>
    </ConfigurationProvider>,
    options,
  );
}

const dialogPromise = Promise.resolve();
(dialogPolyfill.registerDialog as jest.Mock).mockReturnValue(dialogPromise);

export async function waitForDialogUpdate(): Promise<void> {
  await act(() => dialogPromise);
}

// this declaration is not present in the TS anymore (https://github.com/DefinitelyTyped/DefinitelyTyped/pull/54052)
// but for us the implementation is provided by the dialog-polyfill
declare const HTMLDialogElement: {
  new (): HTMLDialogElement;
  readonly prototype: HTMLDialogElement;
};
export function mockDialogShowModal(): void {
  (
    HTMLDialogElement.prototype as unknown as {
      showModal: () => void;
    }
  ).showModal = jest.fn();
}

/** Helps against the warning `Not implemented: HTMLFormElement.prototype.submit`
 * in JSDom: https://github.com/jsdom/jsdom/issues/1937 */
export async function runWithJSDOMErrorsDisabled(
  callback: () => void,
): Promise<void> {
  const console = (
    window as unknown as {
      _virtualConsole: { emit: () => void };
    }
  )._virtualConsole;

  const { emit } = console;
  console.emit = jest.fn();

  await callback();

  console.emit = emit;
}
