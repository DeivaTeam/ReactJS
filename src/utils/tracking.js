import { TRACK_FROM_GIFT_GUIDE } from '../redux/modules/wizard/actions';

export const trackPageView = () => {
  if (window.analytics) {
    window.analytics.page();
  }
}

export const trackSubscribe = (email, gid) => {
  if (window.analytics) {
    window.analytics.identify(gid, {
      email,
      track_from: TRACK_FROM_GIFT_GUIDE
    });
  }
}
