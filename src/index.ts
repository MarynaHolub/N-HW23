// Задание 1
// Обработка цепочки промисов с `async/await`
// Создайте несколько функций, которые возвращают промисы с разным временем выполнения.
// Напишите функцию, которая вызывает эти промисы поочерёдно, используя `await`, и обрабатывает результаты каждой операции.
// Убедитесь, что цепочка промисов выполняется последовательно.

function first(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('first');
    }, 1000);
  });
}

function second(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('second');
    }, 3000);
  });
}

function third(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('third');
    }, 2000);
  });
}

async function run(): Promise<void> {
  try {
    const res1 = await first();
    console.log(res1);
    const res2 = await second();
    console.log(res2);
    const res3 = await third();
    console.log(res3);
  } catch (error) {
    console.error('Произошла ошибка при выполнении задач:', error);
  }
}

run();
// Функция run() объявлена с async, поэтому она всегда возвращает Promise.
// Promise { <pending> }
first;
second;
third;

// Задание 2
// Асинхронная обработка данных из массива
// Напишите функцию, которая принимает массив строк.
// Каждая строка будет асинхронно обрабатываться (например, преобразовываться в верхний регистр с задержкой).
// Используйте `Promise.all` для выполнения всех операций параллельно и вывода всех результатов.

const arr = ['apple', 'banana', 'orange'];

const changeString = (str: string) => str.toUpperCase();

async function arrString(arr: string[]): Promise<void> {
  try {
    const promises = arr.map((item) => {
      // map() создаёт массив Promise
      return new Promise<string>((resolve) => {
        // map() получает Promise от каждой итерации.
        setTimeout(() => {
          resolve(changeString(item)); // resolve() передаёт преобразованную строку
        }, 4000);
      });
    });
    const result = await Promise.all(promises); // Promise.all() дожидается завершения всех операций.
    console.log(result);
  } catch (error) {
    console.error('Произошла ошибка при выполнении задач:', error);
  }
}

arrString(arr);

// Задание 3
// Обработка ошибки в параллельных промисах
// Напишите функцию, которая вызывает три промиса параллельно с помощью `Promise.all`.
// Один из промисов должен намеренно завершиться с ошибкой через `reject`.
// Обработайте эту ошибку с использованием `try/catch` и выведите соответствующее сообщение.

function firsT(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('first');
    }, 1000);
  });
}

function seconD(): Promise<object> {
  return new Promise((reject) => {
    setTimeout(() => {
      reject(new Error('Error'));
    }, 3000);
  });
}

function thirD(): Promise<string> {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve('third');
    }, 2000);
  });
}

async function parallelPromise(
  firsT: Promise<string>,
  seconD: Promise<object>,
  thirD: Promise<string>,
): Promise<void> {
  try {
    const result = await Promise.all([firsT, seconD, thirD]);
    console.log(result);
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    console.error('Произошла ошибка при выполнении задач:', error);
  }
}

parallelPromise(firsT(), seconD(), thirD());

// Задание 4
// Асинхронная функция с динамическим временем выполнения
// Напишите асинхронную функцию, которая принимает массив чисел.
// Для каждого числа создайте промис, который будет завершаться через количество миллисекунд, равное значению числа.
// Используйте `Promise.all` для ожидания завершения всех промисов и вывода результатов в консоль.

const numbers = [2000, 4000, 3000, 1000];

async function timerPromise(arr: number[]): Promise<void> {
  try {
    const promises = arr.map((num) => {
      return new Promise((resolve) => {
        setTimeout(() => {
          resolve(`Через ${num} милисекунд`);
        }, num);
      });
    });

    const result = await Promise.all(promises);
    console.log(result);
  } catch (error) {
    console.error('Произошла ошибка при выполнении задач:', error);
  }
}

timerPromise(numbers);
