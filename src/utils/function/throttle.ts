export function throttle<C extends () => any>(callback: C, wait = 0) {
  let throttleTimer: any;
  let triggerArgs: any;
  let triggerThis: any;
  function trigger(this: any, ...arg: any[]) {
    triggerArgs = arg;
    triggerThis = this;
    if (throttleTimer) return;
    throttleTimer = true;
    setTimeout(() => {
      callback.apply(triggerThis, triggerArgs);
      throttleTimer = false;
    }, wait);
  }

  trigger.cancel = () => clearTimeout(throttleTimer);
  trigger.flush = () => {
    clearTimeout(throttleTimer);
    callback.apply(triggerThis, triggerArgs);
  };

  return trigger;
}

export default throttle;
