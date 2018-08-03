import Notification from 'rc-notification';

let instance = null;

let lastId = null;

Notification.newInstance({
  style: {
    top: 0,
    right: 0,
    left: 0
  }
}, notification => {
  instance = notification;
});

export default () => {
  return {
    show(options) {
      instance.removeNotice(lastId);
      lastId = instance.notice({
        duration: 2.5,
        ...options,
        style: {}
      })
    },
    remove(key) {
      instance.removeNotice(key);
    }
  }
};