import { EnvironmentType } from '@microsoft/sp-client-base';

import {
  BaseClientSideWebPart,
  IPropertyPaneSettings,
  IWebPartContext,
} from '@microsoft/sp-webpart-base';

import {
  IModularTaskDashboardWebPartProps,
  getPropertyPaneSettings
} from './settings';

import { default as HtmlRenderer } from './renderers/HtmlRenderer';
import { Category } from './TaskCategory';
import { RuleProcessor } from './RuleProcessor';
import * as rules from './rules';

import {
  ICategoryProvider,
  CategoryProvider,
  ITaskProvider,
  TaskProvider
} from './providers';

import {
  MockCategoryProvider,
  MockTaskProvider
} from './mocks';


export default class ModularTaskDashboardWebPart extends BaseClientSideWebPart<IModularTaskDashboardWebPartProps> {

  public renderer: HtmlRenderer;
  public categoryNameProvider: ICategoryProvider;
  public taskProvider: ITaskProvider;

  private categories: Category[];
  private ruleProcessor = new RuleProcessor();

  public constructor(context: IWebPartContext) {
    super(context);

    // Bootstrap services
    // - Simple DI / Poor Man's DI
    const useMocks = (this.context.environment.type == EnvironmentType.Test || this.context.environment.type == EnvironmentType.Local);
    this.renderer = new HtmlRenderer(context.domElement);
    this.categoryNameProvider = (useMocks) ?  new MockCategoryProvider() : new CategoryProvider(this.context.httpClient, this.context.pageContext.web.absoluteUrl);
    this.taskProvider = (useMocks) ? new MockTaskProvider() : new TaskProvider(this.context.httpClient, this.context.pageContext.web.absoluteUrl);

    // Configure our rules
    this.ruleProcessor.addRule(rules.DefaultOkMessages);
    this.ruleProcessor.addRule(rules.TasksShouldBeAssigned);
    this.ruleProcessor.addRule(rules.TasksShouldHaveDeadlines);
    this.ruleProcessor.addRule(rules.TasksMayNotBeLate);
  }

  public render(): void {
    this.categoryNameProvider.getNames()
      .then((categoryNames) => {
        this.categories = categoryNames.map((value) => {return new Category(value); });
        this.renderer.RenderWebpart(this.categories);
        return this.taskProvider.getTasks();
      })
      .then((tasks) => {
        for(const category of this.categories)
        {
          const categoryTasks = tasks.filter((value, index, array) => { return value.category === category.name; });
          const ruleResult = this.ruleProcessor.process(categoryTasks);
          category.status = ruleResult.status;
          category.message = ruleResult.message;
          this.renderer.updateCategory(category);
        }
      });
  }

  protected get propertyPaneSettings(): IPropertyPaneSettings {
    return getPropertyPaneSettings();
  }
}
