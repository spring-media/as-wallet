import { Meta } from '@storybook/react';
import { MemoryRouter, Route } from 'react-router-dom';
import BN from 'bn.js';

import { accountsMock as accounts } from '../../testing/AccountsProviderMock';
import { paths } from '../paths';

import { ReviewTransaction } from './ReviewTransaction';

export default {
  title: 'Views/ReviewTransaction',
  component: ReviewTransaction,
} as Meta;

export function Template(): JSX.Element {
  return (
    <MemoryRouter
      initialEntries={[
        '/account/4tJbxxKqYRv3gDvY66BKyKzZheHEH8a27VBiMfeGX2iQrire/send/review',
      ]}
    >
      <Route path={paths.account.send.review}>
        <ReviewTransaction
          account={accounts['4tJbxxKqYRv3gDvY66BKyKzZheHEH8a27VBiMfeGX2iQrire']}
          recipient="4p1VA6zuhqKuZ8EdJA7QtjcB9mVLt3L31EKWVXfbJ6GaiQos"
          amount={new BN((120e15).toString())}
          fee={new BN(1.25e7)}
          tip={new BN(0.01e15)}
        />
      </Route>
    </MemoryRouter>
  );
}