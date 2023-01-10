import { Route, Switch } from 'react-router-dom';

import { AuthorizeDApp } from '../AuthorizeDApp/AuthorizeDApp';
import { SaveCredential } from '../SaveCredential/SaveCredential';
import { ShareCredential } from '../ShareCredential/ShareCredential';
import { ImportCredentials } from '../ImportCredentials/ImportCredentials';
import { paths } from '../paths';

export function PopupsRouter(): JSX.Element {
  return (
    <Switch>
      <Route path={paths.popup.access}>
        <AuthorizeDApp />
      </Route>
      <Route path={paths.popup.save}>
        <SaveCredential />
      </Route>
      <Route path={paths.popup.share.start}>
        <ShareCredential />
      </Route>
      <Route path={paths.popup.import}>
        <ImportCredentials />
      </Route>
    </Switch>
  );
}
