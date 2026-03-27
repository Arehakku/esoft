function proveritSkobki(stroka) {
    if (stroka === "") {
        return true;
    }
    let stek = [];
    let skobki = {
        ")": "(",
        "]": "[",
        "}": "{"
    };
    for (let i = 0; i < stroka.length; i++) {
        let bukva = stroka[i];
        if (bukva === "(" || bukva === "[" || bukva === "{") {
            stek.push(bukva);
        }
        else if (bukva === ")" || bukva === "]" || bukva === "}") {
            if (stek.length === 0) {
                return false;
            }
             let poslednyaya = stek.pop();
             if (poslednyaya !== skobki[bukva]) {
                 return false;
            }
        }
         else {
             return false;
        }
    }
    if (stek.length !== 0) {
         return false;
    }
    return true;
}

console.log("НАЧАЛО ТЕСТА");
console.log("=====================================\n");

let test1 = "()";
let result1 = proveritSkobki(test1);
console.log("Тест 1: строка =", test1);
console.log("Результат:", result1);
console.log("Правильно должно быть: true");
if (result1 === true) {
    console.log("ХОРОШО!");
} else {
    console.log("ОШИБКА!");
}
console.log("");

let test2 = "()[]{}";
let result2 = proveritSkobki(test2);
console.log("Тест 2: строка =", test2);
console.log("Результат:", result2);
console.log("Правильно должно быть: true");
if (result2 === true) {
    console.log("ХОРОШО!");
} else {
    console.log("ОШИБКА!");
}
console.log("");

let test3 = "(]";
let result3 = proveritSkobki(test3);
console.log("Тест 3: строка =", test3);
console.log("Результат:", result3);
console.log("Правильно должно быть: false");
if (result3 === false) {
    console.log("ХОРОШО!");
} else {
    console.log("ОШИБКА!");
}
console.log("");

let test4 = "([)]";
let result4 = proveritSkobki(test4);
console.log("Тест 4: строка =", test4);
console.log("Результат:", result4);
console.log("Правильно должно быть: false");
if (result4 === false) {
    console.log("ХОРОШО!");
} else {
    console.log("ОШИБКА!");
}
console.log("");

let test5 = "{[]}";
let result5 = proveritSkobki(test5);
console.log("Тест 5: строка =", test5);
console.log("Результат:", result5);
console.log("Правильно должно быть: true");
if (result5 === true) {
    console.log("ХОРОШО!");
} else {
    console.log("ОШИБКА!");
}
console.log("");

console.log("ЕЩЕ ТЕСТЫ\n");

let test6 = "";
console.log("Тест 6: пустая строка");
console.log("Результат:", proveritSkobki(test6));
console.log("Должно быть: true");
console.log("");

let test7 = "(((";
console.log("Тест 7: строка =", test7);
console.log("Результат:", proveritSkobki(test7));
console.log("Должно быть: false");
console.log("");

let test8 = ")))";
console.log("Тест 8: строка =", test8);
console.log("Результат:", proveritSkobki(test8));
console.log("Должно быть: false");
console.log("");

let test9 = "(([]){})";
console.log("Тест 9: строка =", test9);
console.log("Результат:", proveritSkobki(test9));
console.log("Должно быть: true");
console.log("");

let test10 = "(([)]{})";
console.log("Тест 10: строка =", test10);
console.log("Результат:", proveritSkobki(test10));
console.log("Должно быть: false");
console.log("");

let test11 = "";
for (let i = 0; i < 100; i++) {
    test11 = test11 + "(";
}
for (let i = 0; i < 100; i++) {
    test11 = test11 + ")";
}
console.log("Тест 11: очень много скобок (200 штук)");
console.log("Результат:", proveritSkobki(test11));
console.log("Должно быть: true");
console.log("");

let test12 = "{[()]}";
console.log("Тест 12: строка =", test12);
console.log("Результат:", proveritSkobki(test12));
console.log("Должно быть: true");
console.log("");

console.log("ТЕСТИРОВАНИЕ ЗАКОНЧЕНО");

console.log("\nКороткая версия\n");

function korotkayaProverka(str) {
    let stack = [];
    let p = {')':'(', ']':'[', '}':'{'};
    
    for (let s of str) {
        if (s === '(' || s === '[' || s === '{') {
            stack.push(s);
        } else {
            if (stack.length === 0 || stack.pop() !== p[s]) {
                return false;
            }
        }
    }
    return stack.length === 0;
}

console.log("Короткая версия работает:");
console.log("() ->", korotkayaProverka("()"));
console.log("([)] ->", korotkayaProverka("([)]"));
console.log("{[]} ->", korotkayaProverka("{[]}"));

console.log("\nВСЕ РАБОТАЕТ");