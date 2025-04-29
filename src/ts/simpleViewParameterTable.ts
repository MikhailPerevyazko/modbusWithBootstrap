// ====================================================================================================
// ====================================================================================================
// ПРИМЕР ОПЦИЙ ДЛЯ ТАБЛИЦЫ КОНТРОЛЯ ПАРАМЕТРОВ
const tableCPDefaultOptions = {
  // id - идентификатор таблицы
  // В случае если он не задан, идентификатор генерируется автоматически и имеет
  // вид "vega-control-parameter-table-x", где x - номер, который увеличивается на единицу при каждом вызове.
  id: "table_CP",
  // colGroup - параметр, для того, чтоб задать ширину столбцов таблицы
  // Если не задан (undefined), то ширина столбца формируется автоматически, либо массив с заданной шириной для столбцов в %.
  colGroup: undefined, // [15, 45, 40],
  // caption - заголовок столбцов таблицы
  // Если не задан (undefined), заголовка столбцов нет, либо массив с заголовками столбцов.
  caption: undefined, // ["id", "описание", "значение"],
};

// ====================================================================================================
// ====================================================================================================
// СТИЛИ ПО УМОЛЧАНИЮ ДЛЯ ТАБЛИЦЫ КОНТРОЛЯ ПАРАМЕТРОВ
const tableCPDefaultStyles = `
/* стиль для таблицы */
.vega-component.vega-contol-parameter-table {
    border-collapse: collapse;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
    font-size: .8rem;
    min-width: 400px;
    width: 100%;
    overflow: hidden;
    /*    margin-top: 10px; */
    }
  
  .vega-component.vega-contol-parameter-table thead th {
    background-color: rgb(59, 120, 190);
    font-size: large;
    color: white;
    text-align: center;
    padding: 4px 6px;
    border-right: 1px solid #FFF;
    }
    
  .vega-component.vega-contol-parameter-table thead th:last-of-type,
  .vega-component.vega-contol-parameter-table tbody td:last-of-type {
    border-right: none;
    }
    
    .vega-component.vega-contol-parameter-table tbody td {
      background-color: #fff;
      padding: 3px 9px;
      border-right: 1px solid #FFF;
      color: #222;
      }
      
  .vega-component.vega-contol-parameter-table tbody tr:last-of-type {   
    border-bottom: 2px solid rgb(59, 120, 190);
  }
  
  .vega-component.vega-contol-parameter-table tr:nth-of-type(even)
  {
    /*background-color: rgba(165, 181, 199, 0.25);*/
    box-shadow: 0px 0px 999px 999px rgba(220,220,220, 0.5) inset;
  }
`;

// ====================================================================================================
// ====================================================================================================
// КЛАСС ДЛЯ СОЗДАНИЯ ТАБЛИЦЫ С ИСПОЛЬЗОВАНИЕМ BOOTSTRAP 5.X
// ПРИМЕР ОПЦИЙ ПРИ СОЗДАНИИ ТАБЛИЦЫ И ДЕФОЛТНЫЙ СТИЛЬ ПРЕДСТАВЛЕННЫ ВЫШЕ
export class SimpleViewParameterTable {
  // приватные поля
  #options;
  #parentElement;
  #tbody;

  #parameterTableValueCells;

  // Конструктор для создания аккордиона:
  // 1) parentElement - родительский элемент, в который будет добавлена таблица.
  // 2) options - объект с указанием различных опций, например: идентификатора или заголовка.
  constructor(parentElement: any, options = {}) {
    // инициализация компонента при его первом использовании
    SimpleViewParameterTable.#initComponent();

    this.#parentElement = parentElement;

    this.#options = {
      ...tableCPDefaultOptions,
      ...{ id: SimpleViewParameterTable.#getNextId() },
      ...options,
    };

    this.#tbody = this.#createSimpleViewParameterTable();

    // ссылки на ячейки в таблице, в которых выводятся значение параметра
    this.#parameterTableValueCells = new Map();
  }

  // возвращается ссылка на таблицу (а именно на область, в которой выводятся данные)
  get tbody() {
    return this.#tbody;
  }

  // cоздаем таблицу и возвращаем ссылки на таблицу и область (tbody), содержащую параметры
  #createSimpleViewParameterTable() {
    // таблица
    const table = document.createElement("table");
    this.#parentElement.append(table);
    table.id = this.#options.id;

    table.classList.add("vega-component", "vega-contol-parameter-table");

    // формирование ширины столбцов, если надо
    if (this.#options.colGroup !== undefined) {
      const colGroup = document.createElement("colgroup");
      table.append(colGroup);
      this.#options.colGroup.forEach((colWidth: any) => {
        const col = document.createElement("col");
        colGroup.append(col);
        col.style = `width: ${colWidth}%`;
      });
    }

    // формирование заголовков столбцов, если надо
    if (this.#options.caption !== undefined) {
      const thead = document.createElement("thead");
      table.append(thead);
      this.#options.caption.forEach((colCaption: any) => {
        const th = document.createElement("th");
        thead.append(th);
        th.textContent = colCaption;
      });
    } else {
      // если нет заголовка, вывести рамку сверху таблицы
      table.style.borderTop = " 2px solid rgb(59, 120, 190)";
    }

    // tbody
    const tbody = document.createElement("tbody");
    table.append(tbody);
    return tbody;
  }

  // добавление строки
  addParameter(id: string, caption: number) {
    // если не передан id, то выйти
    if (id === undefined) {
      return;
    }

    // строка
    const row = document.createElement("tr");
    this.#tbody.append(row);

    // первый столбец = идентификатор
    const colTdId = document.createElement("td");
    row.append(colTdId);
    colTdId.textContent = id;

    // второй столбец = описание
    const colTdCaption = document.createElement("td");
    row.append(colTdCaption);
    colTdCaption.textContent = caption || "---------";

    // остальные столбца заполняются пока пробелами
    const colTdValue = document.createElement("td");
    row.append(colTdValue);
    colTdValue.textContent = "---------";
    this.#parameterTableValueCells.set(id, colTdValue);
  }

  // редактирование значения параметра
  setValue(id: string, value: number) {
    // ячейка таблицы, куда выводятся данные
    const dataWidget = this.#parameterTableValueCells.get(id);
    // если не удалось найти, то выйти
    if (!dataWidget) {
      return;
    }

    // если данные не переданы, то вывести в таблицу "-------" красным цветом и выйти
    if (value === undefined) {
      dataWidget.textContent = "---------";
      dataWidget.style.color = "red";
      return;
    }

    // вывод корректных данных
    dataWidget.textContent = value;
    dataWidget.style.color = "#222";
  }

  // ====================================================================================================
  // ====================================================================================================
  // Флаг, отвечающий за инициализацию компонента (true - компонент уже инициализированн).
  static #initFlag = false;

  // Инициализация компонента при первом использовании данного компонента.
  // Преимущественно происходит добавление стиля по умолчанию.
  static #initComponent() {
    // один раз, при первом использовании компонента он инициализируется
    if (!SimpleViewParameterTable.#initFlag) {
      SimpleViewParameterTable.#initFlag = true;

      // добавляем дефолтный стиль для данного компонента
      let styleSheet = document.createElement("style");
      styleSheet.innerText = tableCPDefaultStyles;
      document.head.appendChild(styleSheet);
    }
  }

  // Счетчик для генерации идентификаторов таблицы по умолчанию.
  static #defaultIdCounter = 0;

  // Получение нового идентификатора для таблицы в ввиде "vega-control-parameter-simple-table-x",
  // где x - номер, который увеличивается на единицу при каждом вызове.
  static #getNextId() {
    return `vega-control-parameter-simple-table-${SimpleViewParameterTable
      .#defaultIdCounter++}`;
  }

  // ====================================================================================================
  // ====================================================================================================
}
