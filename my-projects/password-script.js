// Наборы символов для генерации
const LETTERS_AND_NUMBERS = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
const SPECIAL_SYMBOLS = '!@#%^&*-_?';

// Находим элементы в DOM
const lenInput = document.getElementById('len');
const lenVal = document.getElementById('lenVal');
const symCheckbox = document.getElementById('sym');
const outSpan = document.getElementById('pass');
const hintParagraph = document.getElementById('hint');
const genButton = document.getElementById('gen');
const copyButton = document.getElementById('copy');

// Живое обновление цифры длины при движении ползунка
lenInput.oninput = () => {
    lenVal.textContent = lenInput.value;
};

// Функция выбора случайного символа из строки
function getRandomChar(str) {
    return str[Math.floor(Math.random() * str.length)];
}

// Логика кнопки «Сгенерировать»
genButton.onclick = () => {
    // Собираем доступные символы в зависимости от чекбокса
    const availableChars = LETTERS_AND_NUMBERS + (symCheckbox.checked ? SPECIAL_SYMBOLS : '');
    
    let password = '';
    const targetLength = parseInt(lenInput.value); // Берем выбранную пользователем длину

    // Генерируем пароль нужной длины
    for (let i = 0; i < targetLength; i++) {
        password += getRandomChar(availableChars);
    }
    
    // Выводим результат на экран
    outSpan.textContent = password;
    outSpan.classList.remove('placeholder'); // Убираем стиль плейсхолдера
    
    // Активируем кнопку копирования
    copyButton.disabled = false;

    // Оценка надежности в зависимости от длины
    if (targetLength >= 16) {
        hintParagraph.textContent = '🔥 Сверхнадёжный пароль!';
        hintParagraph.style.color = '#00e676';
    } else if (targetLength >= 10) {
        hintParagraph.textContent = '✨ Хороший, надёжный пароль';
        hintParagraph.style.color = '#b388ff';
    } else {
        hintParagraph.textContent = '⚠️ Коротковат, лучше сделать длиннее';
        hintParagraph.style.color = '#ff9100';
    }
};

// Логика кнопки «Скопировать»
copyButton.onclick = () => {
    const passwordText = outSpan.textContent;
    
    // Используем встроенное Clipboard API для копирования текста
    navigator.clipboard.writeText(passwordText).then(() => {
        const originalText = copyButton.textContent;
        copyButton.textContent = 'Скопировано! ✓';
        copyButton.style.background = '#00e676';
        copyButton.style.color = '#0f111a';
        
        // Через 1.5 секунды возвращаем кнопке прежний вид
        setTimeout(() => {
            copyButton.textContent = originalText;
            copyButton.style.background = '';
            copyButton.style.color = '';
        }, 1500);
    });
};
