declare namespace SignQuoteModuleCssNamespace {
  export interface ISignQuoteModuleCss {
    account: string;
    buttonsLine: string;
    cancel: string;
    container: string;
    costs: string;
    detailName: string;
    detailOwnValue: string;
    detailValue: string;
    details: string;
    heading: string;
    label: string;
    name: string;
    password: string;
    passwordLine: string;
    subline: string;
    submit: string;
    tartan: string;
  }
}

declare const SignQuoteModuleCssModule: SignQuoteModuleCssNamespace.ISignQuoteModuleCss & {
  /** WARNING: Only available when `css-loader` is used without `style-loader` or `mini-css-extract-plugin` */
  locals: SignQuoteModuleCssNamespace.ISignQuoteModuleCss;
};

export = SignQuoteModuleCssModule;