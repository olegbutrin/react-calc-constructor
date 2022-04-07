# ПримерноТак Калькулятор

Простой и изящный пример Single Page Application с использованием стека технологий ReactJS

![Иллюстрация к проекту](https://github.com/olegbutrin/react-calc-constructor/blob/stage-1/images/RC.png)

[ПримерноТак Калькулятор](https://olegbutrin.github.io/react-calc-constructor/) на GithubPages.

Проект выполнен в качестве тестового задания по предоставленному [шаблону в Figma](https://www.figma.com/file/pdYzuOkvXY3Q00YRAMsLuz/Calculator-Constructor?node-id=625%3A1493)

Единственное заметное отклонение в ненавязчивом отображении высчитываемого выражения вне поля диспрея калькулятора (иначе показалось не вполне понятным). Для отключения требуется минимальная правка кода и стилей.

## Почему ПримерноТак?

Все дело в ограниченном размере дисплея калькулятора. Чтобы сэкономить место, калькулятор отображает только два знака после запятой. Если целочисленная часть не помещается в окне дисплея, то та часть, которая не поместилась, отсекается и заменяется знаком многоточия. В обоих этих случаях в левой части дисплея отображается знак "~" (тильда).

## Как пользоваться калькулятором

Изначально калькулятор находится в режиме конструктора. Для сборки калькулятора перенесите виджеты из левой части в правую и разместите так, как вам хочется. Дисплей может размещаться только в верхней части конструктора. Для удаления виджетов используется двойной клик.

Для переключения режимов используются кнопки Runtime и Constructor.

Вычисления доступны только в режиме Runtime. Для обнуления вычислений используется неочевидное, но доступное решение: двойной клик на дисплее.

## Используемые технологии и запуск

Этот проект был создан с использованием [Create React App](https://github.com/facebook/create-react-app).

### Что внутри

+ ReactJS 18
+ Typescript
+ Redux/Redux Thunk
+ React DnD
+ Eslint

Для запуска используйте стандартные команды CRA

**Внимание!**
На React 18 возможна ошибка сборки, связанная с React DND. Для исправления понадобится изменить конфигурацию Webpack для CRA, добавив две строки в alias. Смотрите webpack.config.fix.txt
