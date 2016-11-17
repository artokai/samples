import {
  IPropertyPaneSettings,
  PropertyPaneTextField,
} from '@microsoft/sp-webpart-base';

import * as strings from 'modularTaskDashboardStrings';

export function getPropertyPaneSettings(): IPropertyPaneSettings {
  return {
    pages: [
      {
        header: {
          description: strings.PropertyPaneDescription
        },
        groups: [
          {
            groupName: strings.BasicGroupName,
            groupFields: [
              PropertyPaneTextField('description', {
                label: strings.DescriptionFieldLabel
              })
            ]
          }
        ]
      }
    ]
  };
}
