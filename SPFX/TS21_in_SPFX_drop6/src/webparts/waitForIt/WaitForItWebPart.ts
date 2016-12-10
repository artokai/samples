import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext
} from '@microsoft/sp-webpart-base';

import styles from './WaitForIt.module.scss';
import { IWaitForItWebPartProps } from './IWaitForItWebPartProps';

export default class WaitForItWebPart extends BaseClientSideWebPart<IWaitForItWebPartProps> {

  public constructor(context: IWebPartContext) {
    super(context);
  }

public async render() {
  const fact = await this.getFact();
  this.domElement.innerHTML = `
    <div class="${styles.fact}">
      ${fact}
      <cite>The Internet Chuck Norris Database</cite>
    </div>`;
}

protected getFact() : Promise<string>
{
  const url: string = 'https://api.icndb.com/jokes/random';
  return new Promise<string>((resolve, reject) => {
      var xhr = new XMLHttpRequest();
      xhr.open("GET", url, true );
      xhr.onload = () => { 
        const response: any = JSON.parse(xhr.responseText);
        resolve(response.value.joke); 
      } ;
      xhr.onerror = reject;
      xhr.send();
  });
}

  protected get propertyPaneSettings(): IPropertyPaneSettings {
    return {
      pages: []
    };
  }
}
