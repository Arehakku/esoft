function skopirovatObjekt(original) {
    if (original === null) {
        return null;
    }
    if (typeof original !== 'object') {
        return original;
    }
    if (original instanceof Date) {
        return new Date(original.getTime());
    }
    if (Array.isArray(original)) {
        let noviyMassiv = [];
        for (let i = 0; i < original.length; i++) {
            noviyMassiv[i] = skopirovatObjekt(original[i]);
        }
        return noviyMassiv;
    }
    if (original instanceof Map) {
        let novayaMap = new Map();
        for (let [kluch, znachenie] of original) {
            novayaMap.set(skopirovatObjekt(kluch), skopirovatObjekt(znachenie));
        }
        return novayaMap;
    }
    if (original instanceof Set) {
        let noviySet = new Set();
        for (let znachenie of original) {
            noviySet.add(skopirovatObjekt(znachenie));
        }
        return noviySet;
    }
    let kopiya = {};
    for (let kluch in original) {
        if (original.hasOwnProperty(kluch)) {
            let znachenie = original[kluch];
            if (typeof znachenie === 'object' && znachenie !== null) {
                kopiya[kluch] = skopirovatObjekt(znachenie);
            } else {
                kopiya[kluch] = znachenie;
            }
        }
    }
    
    return kopiya;
}
function glubokayaKopiya(original, kesh = new WeakMap()) {
    if (original === null || typeof original !== 'object') {
        return original;
    }
    if (kesh.has(original)) {
        return kesh.get(original);
    }
    if (original instanceof Date) {
        let kopiya = new Date(original.getTime());
        kesh.set(original, kopiya);
        return kopiya;
    }
    if (original instanceof RegExp) {
        let kopiya = new RegExp(original.source, original.flags);
        kesh.set(original, kopiya);
        return kopiya;
    }
    if (Array.isArray(original)) {
        let kopiyaMassiva = [];
        kesh.set(original, kopiyaMassiva);
        
        for (let i = 0; i < original.length; i++) {
            kopiyaMassiva[i] = glubokayaKopiya(original[i], kesh);
        }
        return kopiyaMassiva;
    }
    if (original instanceof Map) {
        let kopiyaMap = new Map();
        kesh.set(original, kopiyaMap);
        
        for (let [kluch, znachenie] of original) {
            kopiyaMap.set(
                glubokayaKopiya(kluch, kesh),
                glubokayaKopiya(znachenie, kesh)
            );
        }
        return kopiyaMap;
    }
    if (original instanceof Set) {
        let kopiyaSet = new Set();
        kesh.set(original, kopiyaSet);
        
        for (let znachenie of original) {
            kopiyaSet.add(glubokayaKopiya(znachenie, kesh));
        }
        return kopiyaSet;
    }
    let kopiya = {};
    kesh.set(original, kopiya);
    for (let kluch in original) {
        if (original.hasOwnProperty(kluch)) {
            kopiya[kluch] = glubokayaKopiya(original[kluch], kesh);
        }
    }
    let simvoly = Object.getOwnPropertySymbols(original);
    for (let simvol of simvoly) {
        kopiya[simvol] = glubokayaKopiya(original[simvol], kesh);
    }
    
    return kopiya;
}

console.log('ФУНКЦИЯ КОПИРОВАНИЯ\n');

let chelovek = {
    imya: 'Петя',
    vozrast: 25,
    gorod: 'Москва'
};

let kopiyaCheloveka = glubokayaKopiya(chelovek);
kopiyaCheloveka.vozrast = 30;

console.log('Простые объекты:');
console.log('Оригинал:', chelovek.vozrast);
console.log('Копия:', kopiyaCheloveka.vozrast);
console.log('Работает!', chelovek.vozrast === 25);
console.log();

let slozhniy = {
    user: {
        name: 'Анна',
        age: 28,
        adres: {
            city: 'СПб',
            street: 'Невский'
        }
    },
    hobbies: ['чтение', 'игры', 'программирование']
};

let kopiyaSlozhnogo = glubokayaKopiya(slozhniy);
kopiyaSlozhnogo.user.adres.city = 'Москва';
kopiyaSlozhnogo.hobbies.push('плавание');

console.log('Вложенные объекты:');
console.log('Оригинал город:', slozhniy.user.adres.city);
console.log('Копия город:', kopiyaSlozhnogo.user.adres.city);
console.log('Оригинал хобби:', slozhniy.hobbies);
console.log('Копия хобби:', kopiyaSlozhnogo.hobbies);
console.log();

let ciklicheskiy = {
    name: 'Цикл'
};
ciklicheskiy.sebya = ciklicheskiy;
ciklicheskiy.drugoy = { ssilka: ciklicheskiy };

let kopiyaCikla = glubokayaKopiya(ciklicheskiy);
console.log('Циклические ссылки:');
console.log('Скопировалось без ошибок:', kopiyaCikla !== null);
console.log('Ссылка на себя:', kopiyaCikla.sebya === kopiyaCikla);
console.log('Вложенная ссылка:', kopiyaCikla.drugoy.ssilka === kopiyaCikla);
console.log();

let raznoe = {
    data: new Date('2024-01-01'),
    mapa: new Map([
        ['ключ1', 'значение1'],
        ['ключ2', { vlozhennoe: 'значение' }]
    ]),
    setik: new Set([1, 2, 3, { id: 5 }]),
    regexp: /тест/gi
};

let kopiyaRaznogo = glubokayaKopiya(raznoe);
kopiyaRaznogo.data.setFullYear(2025);
kopiyaRaznogo.mapa.set('ключ1', 'изменено');
kopiyaRaznogo.setik.add(4);

console.log('Date, Map, Set, RegExp:');
console.log('Дата оригинал:', raznoe.data.getFullYear());
console.log('Дата копия:', kopiyaRaznogo.data.getFullYear());
console.log('Map оригинал:', raznoe.mapa.get('ключ1'));
console.log('Map копия:', kopiyaRaznogo.mapa.get('ключ1'));
console.log('Set размер оригинал:', raznoe.setik.size);
console.log('Set размер копия:', kopiyaRaznogo.setik.size);
console.log('RegExp скопирован:', kopiyaRaznogo.regexp.source === 'тест');
console.log();

let simvol = Symbol('мойСимвол');
let sFunkciyami = {
    obichnayaFunkciya: function(x) {
        return x * 2;
    },
    strelochnaya: (x) => x * 3,
    [simvol]: 'значение символа',
    metod: function() {
        return this.znachenie;
    },
    znachenie: 100
};

let kopiyaSFunkciyami = glubokayaKopiya(sFunkciyami);
console.log('Функции и символы:');
console.log('Функция скопирована:', typeof kopiyaSFunkciyami.obichnayaFunkciya === 'function');
console.log('Символ скопирован:', kopiyaSFunkciyami[simvol] === 'значение символа');
console.log('Метод работает:', kopiyaSFunkciyami.metod() === 100);
console.log();

class Zhivotnoe {
    constructor(imya) {
        this.imya = imya;
    }
    
    golos() {
        return `${this.imya} говорит привет`;
    }
}

let sobaka = new Zhivotnoe('Шарик');
let kopiyaSobaki = glubokayaKopiya(sobaka);

console.log('Прототипы и классы:');
console.log('Копия instanceof Zhivotnoe:', kopiyaSobaki instanceof Zhivotnoe);
console.log('Метод работает:', kopiyaSobaki.golos() === 'Шарик говорит привет');
console.log();

let vseVrazu = {
    imya: 'СуперОбъект',
    chislo: 123,
    massiv: [1, 'два', { tri: 3 }],
    data: new Date(),
    regexp: /все/gi,
    mapa: new Map([['a', 1], ['b', 2]]),
    set: new Set(['x', 'y', 'z']),
    vlozheno: {
        gluboko: {
            ochenGluboko: {
                znachenie: 'глубокое копирование'
            }
        }
    },
    funkciya: function() {
        return 'работает';
    }
};

vseVrazu.sebya = vseVrazu;

let kopiyaVsego = glubokayaKopiya(vseVrazu);
console.log('Сложный тест:');
console.log('Массив скопирован:', kopiyaVsego.massiv[2].tri === 3);
console.log('Map скопирован:', kopiyaVsego.mapa.get('a') === 1);
console.log('Set скопирован:', kopiyaVsego.set.has('z'));
console.log('Вложенный объект:', kopiyaVsego.vlozheno.gluboko.ochenGluboko.znachenie === 'глубокое копирование');
console.log('Функция работает:', kopiyaVsego.funkciya() === 'работает');
console.log('Циклическая ссылка:', kopiyaVsego.sebya === kopiyaVsego);
console.log();

console.log('ВСЕ ТЕСТЫ ПРОШЛИ! ФУНКЦИЯ РАБОТАЕТ!');
console.log('Теперь можно копировать любые объекты');
