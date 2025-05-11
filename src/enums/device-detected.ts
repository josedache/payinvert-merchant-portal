export const DeviceDetected = {
  ANDROID: navigator.userAgent.match(/Android/i),
  IPHONE: navigator.userAgent.match(/iPhone/i),
  IPAD: navigator.userAgent.match(/iPad/i),
  IOS: navigator.userAgent.match(/iPhone|iPad/i),
};
