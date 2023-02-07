import React, { useMemo } from 'react';
import { browser } from 'webextension-polyfill-ts';
import { Redirect, useParams } from 'react-router-dom';

import * as styles from './IdentityOverview.module.css';

import { Identity } from '../../utilities/identities/identities';
import { generatePath, paths } from '../paths';

import { useIdentityCredentials } from '../../utilities/credentials/credentials';

import { CredentialCard } from '../../components/CredentialCard/CredentialCard';

interface Props {
  identity: Identity;
}

export function IdentityOverview({ identity }: Props): JSX.Element | null {
  const t = browser.i18n.getMessage;
  const params = useParams() as { type?: 'created' | 'imported' | 'pwreset' };

  const { address, did } = identity;

  const identityCredentials = useIdentityCredentials(did);

  const credentials = useMemo(
    () => identityCredentials?.concat().reverse(),
    [identityCredentials],
  );

  if (params.type) {
    return <Redirect to={generatePath(paths.identity.overview, { address })} />;
  }

  if (!credentials) {
    return null; // storage data pending
  }

  console.log(identity);
  return (
    <main className={styles.container}>
      <header>
        <h1 className={styles.heading}>{t('view_IdentityOverview_title')}</h1>
      </header>
      {credentials.length && (
        <div className={styles.credentials}>
          <CredentialCard sporranCredential={credentials[0]}></CredentialCard>
        </div>
      )}
      {/* <CredentialCard sporranCredential={credentials[0]}></CredentialCard> */}
    </main>
  );
}
