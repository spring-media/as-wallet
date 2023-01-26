import {browser} from 'webextension-polyfill-ts';
import {Link, useHistory} from 'react-router-dom';

import * as styles from './SaveBackupPhrase.module.css';

import {LinkBack} from '../../components/LinkBack/LinkBack';
import {paths} from '../paths';

interface Props {
  backupPhrase: string;
}

export function SaveBackupPhrase({backupPhrase}: Props): JSX.Element {
  const words = backupPhrase.split(/\s+/);
  const t = browser.i18n.getMessage;

  const orderedWordListForDownload = words.map((word, index) => `${index+1}: ${word}`).join("\n")

  return (
    <section className={styles.container}>
      <h1 className={styles.heading}>{t('view_SaveBackupPhrase_explanation')} <a download="as_wallet_words.txt" href={"data:text/plain;charset=utf-8,"+ encodeURIComponent(orderedWordListForDownload)}>{t('view_SaveBackupPhrase_download')}</a></h1>
      <ol className={styles.items}>
        {words.map((word, index) => (
          <li key={index} className={styles.item}>
            <span className={styles.word}>{word}</span>
          </li>
        ))}
      </ol>

      <div className={styles.buttons}>
        <Link to={paths.identity.create.start} className={styles.create}>
          {t('common_action_back')}
        </Link>
        <Link to={paths.identity.create.verify} className={styles.create}>
          {t('common_action_next')}
        </Link>
      </div>

      {/*<LinkBack/>*/}
    </section>
  );
}
