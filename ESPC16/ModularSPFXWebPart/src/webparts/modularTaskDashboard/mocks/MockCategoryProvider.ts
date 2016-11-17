import { ICategoryProvider } from '../providers';

export class MockCategoryProvider implements ICategoryProvider
{
  public getNames(): Promise<string[]>
  {
    return new Promise<string[]>((resolve, reject) => {
      const categories = [
        "Project Management",
        "Specifications",
        "Development",
        "Testing",
        "Training",
        "Other"
      ];
      setTimeout(() => { resolve(categories); }, 500);
    });
  }
}