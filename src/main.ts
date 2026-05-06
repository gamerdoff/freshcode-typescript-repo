enum PageThemeHex {
    Default = "#f3f4f6",
    ShadowGrey = "#0f172a",
    SoftPeach = "#ffedd5"
}

interface UserProfile {
    name: string;
    age: number;
    hobby: string;
    experience: number;
}

function generateGreeting(user: UserProfile): string {
    let greeting = `Привіт, ${user.name}! Тобі ${user.age} років. Твоє хобі - ${user.hobby}. `;
    
    if (user.experience > 5) {
        greeting += `Вау, ти справжній експерт у сфері: ${user.hobby}!`;
    } else if (user.experience >= 1) {
        greeting += `Чудово, ти вже маєш досвід у такому занятті як ${user.hobby}.`;
    } else {
        greeting += `Все попереду! Починати нове хобі - це дуже цікаво.`;
    }
    
    return greeting;
}

document.addEventListener("DOMContentLoaded", () => {
    const runBtn = document.getElementById('runBtn') as HTMLButtonElement | null;
    const resultContainer = document.getElementById('result-container') as HTMLDivElement | null;

    if (!runBtn || !resultContainer) return;

    runBtn.addEventListener('click', () => {
        const nameInput = document.getElementById('userName') as HTMLInputElement;
        const ageInput = document.getElementById('userAge') as HTMLInputElement;
        const hobbyInput = document.getElementById('userHobby') as HTMLInputElement;
        const expInput = document.getElementById('userExperience') as HTMLInputElement;
        const themeSelect = document.getElementById('themeSelect') as HTMLSelectElement;

        resultContainer.innerHTML = "";

        const nameValue = nameInput.value.trim();
        const hobbyValue = hobbyInput.value.trim();
        const ageValue = parseInt(ageInput.value);
        const expValue = parseInt(expInput.value);

        if (!nameValue || !hobbyValue || isNaN(ageValue) || isNaN(expValue)) {
            resultContainer.innerHTML = `
                <div class="error-box">
                    <strong>Помилка!</strong>
                    <p>Будь ласка, заповніть усі поля форми перед виконанням скрипта.</p>
                </div>`;
            return;
        }

        const isNameValid = /^[a-zA-Zа-яА-ЯіІїЇєЄґҐ\s\'-]+$/.test(nameValue);
        if (!isNameValid) {
            resultContainer.innerHTML = `
                <div class="error-box">
                    <strong>Некоректно введене поле!</strong>
                    <p>В імені знайдено числа або недопустимі символи. Будь ласка, використовуйте тільки букви.</p>
                </div>`;
            return; 
        }

        if (ageValue < 0 || expValue < 0) {
            resultContainer.innerHTML = `
                <div class="error-box">
                    <strong>Критична помилка валідації!</strong>
                    <p>Вік або досвід не можуть бути від'ємними (менше 0).</p>
                    <p>Ви ввели: Вік = ${ageValue}, Досвід = ${expValue}.</p>
                    <p>Будь ласка, виправте значення та спробуйте знову.</p>
                </div>`;
            return;
        }

        const user: UserProfile = {
            name: nameValue,
            age: ageValue,
            hobby: hobbyValue,
            experience: expValue
        };

        const selectedThemeKey = themeSelect.value;
        document.documentElement.setAttribute('data-theme', selectedThemeKey);

        const successBox = document.createElement('div');
        successBox.className = "result-box";

        const greetingText = document.createElement('p');
        greetingText.innerHTML = `<strong>Результат:</strong> ${generateGreeting(user)}`;
        successBox.appendChild(greetingText);

        const listTitle = document.createElement('p');
        listTitle.style.marginTop = "15px";
        listTitle.innerHTML = "<strong>Доступні теми з Enum:</strong>";
        successBox.appendChild(listTitle);

        const ul = document.createElement('ul');
        for (const key in PageThemeHex) {
            const li = document.createElement('li');
            const hexColor = PageThemeHex[key as keyof typeof PageThemeHex];
            li.textContent = `${key} - ${hexColor}`; 
            ul.appendChild(li);
        }
        successBox.appendChild(ul);

        resultContainer.appendChild(successBox);
    });
});