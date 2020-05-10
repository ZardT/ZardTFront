//fn是传入要执行的函数,delay是间隔,immediate是判断是否第一次就执行
const debounce = (fn, delay, immediate) => {
  let timer = null;

  return function() {
    const context = this;
    const args = arguments;

    return new Promise((resolve, reject) => {
      timer && clearTimeout(timer);

      if (immediate) {
        const doNow = !timer;

        timer = setTimeout(() => {
          timer = null;
        }, delay);

        doNow && resolve(fn.apply(context, args));
      } else {
        timer = setTimeout(() => {
          resolve(fn.apply(context, args));
        }, delay);
      }
    });
  };
};
export default debounce;
