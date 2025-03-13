


const scriptsInEvents = {

	async Es_pages_Event68_Act1(runtime, localVars)
	{
function getRandomColor() {
    // Генерируем случайные значения для R, G и B
    const r = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const g = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');
    const b = Math.floor(Math.random() * 256).toString(16).padStart(2, '0');

    // Возвращаем цвет в формате #RRGGBB
    return `#${r}${g}${b}`;
}

localVars.randomColor = getRandomColor();
	}

};

self.C3.ScriptsInEvents = scriptsInEvents;

