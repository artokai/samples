import styles from '../ModularTaskDashboard.module.scss';
import {Category} from '../TaskCategory';

export default class HtmlRenderer
{
  constructor(public domElement: HTMLElement) {
  }

  public RenderWebpart(categories: Category[]): void {
    const containerElem = document.createElement("div");
    containerElem.className = styles.modularTaskDashboard;
    containerElem.innerHTML = "<h1>Task Dashboard</h1>";

    const listElem = document.createElement("ul");
    listElem.className = styles.categoryList;
    containerElem.appendChild(listElem);

    categories.forEach(category => {
      const itemElem = document.createElement("li");
      itemElem.classList.add(styles.categoryItem);
      itemElem.setAttribute("data-taskcategory", category.name);
      containerElem.appendChild(itemElem);
      this.renderCategory(itemElem, category);
    });

    this.domElement.innerHTML = "";
    this.domElement.appendChild(containerElem);
  }

  public updateCategory(category: Category)
  {
    const itemElem = this.domElement.querySelector(`li[data-taskcategory="${category.name}"]`);
    if (itemElem)
      this.renderCategory(itemElem, category);
  }

  private renderCategory(itemElem: Element, category: Category)
  {
    itemElem.innerHTML = `<div class="${styles.statusIndicator} ${styles['statuscolor_' + category.status]}"></div>
              <div class="${styles.categoryTitle}">${category.name}</div>
              <div class="${styles.statusText}">${category.message}</div>
    `;
  }
}