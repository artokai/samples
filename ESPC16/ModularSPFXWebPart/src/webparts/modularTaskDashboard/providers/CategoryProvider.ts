import {HttpClient} from '@microsoft/sp-client-base';

export interface ICategoryProvider
{
  getNames(): Promise<string[]>;
}

export class CategoryProvider implements ICategoryProvider
{
  constructor(private httpClient: HttpClient, protected webAbsoluteUrl: string)
  {
  }


  public getNames(): Promise<string[]>
  {
    const listTitle = "Tasks";
    const fieldTitle = "Category";
    const url = this.webAbsoluteUrl + `/_api/web/lists/getbytitle('${listTitle}')/Fields/getbytitle('${fieldTitle}')?$select=Choices`;

    return this.httpClient.get(url)
      .then ((response: Response) => {
        return response.json();
      })
      .then( (json: any) => {
        return json.Choices;
      });
  }
}

