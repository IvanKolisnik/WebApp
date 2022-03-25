//створення елементу HTML з вказаним тегом, класом та атрибутами
export function createElement({ tagName, className, attributes = {} }) {
    const element = document.createElement(tagName);

    if (className) {
        const classNames = className.split(' ').filter(Boolean);
        element.classList.add(...classNames);
    }

    Object.keys(attributes).forEach((key) =>
        element.setAttribute(key, attributes[key]),
    );

    return element;
}
