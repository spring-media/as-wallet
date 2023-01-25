import {browser} from 'webextension-polyfill-ts';
import {Link} from 'react-router-dom';

import * as styles from './Warning.module.css';

import {LinkBack} from '../../components/LinkBack/LinkBack';
import {paths} from '../paths';

export function Warning(): JSX.Element {
  const t = browser.i18n.getMessage;

  return (
    <div className={styles.container}>
      <h2 className={styles.important}>{t('view_Warning_emphasis')}</h2>
      <p className={styles.info}>{t('view_Warning_explanation')}</p>
      <section className={styles.actionSection}>
        <Link to={paths.home} className={styles.confirm}>
          {t('common_action_back')}
        </Link>
        <Link to={paths.identity.create.backup} className={styles.confirm}>
          {t('view_Warning_CTA')}
        </Link>
      </section>

      <LinkBack/>
    </div>
  );
}
