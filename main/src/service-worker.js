import { precacheAndRoute } from 'workbox-precaching/precacheAndRoute';
import { clientsClaim } from 'workbox-core';
import { BackgroundSyncPlugin } from 'workbox-background-sync';
import { registerRoute } from 'workbox-routing';
import { NetworkFirst, NetworkOnly } from 'workbox-strategies';
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import {
  pageCache,
  imageCache,
  staticResourceCache,
  googleFontsCache,
  offlineFallback,
} from 'workbox-recipes';

// eslint-disable-next-line no-underscore-dangle,no-restricted-globals
precacheAndRoute(self.__WB_MANIFEST);

// eslint-disable-next-line no-restricted-globals
self.skipWaiting();
clientsClaim();

// TODO ignore localhost
// const localMatchCallback = (destinations) => ({ request }) =>
//   destinations.includes(request.destination);

// cache first
imageCache();
googleFontsCache();

// stale while revalidate
staticResourceCache({
  // matchCallback: localMatchCallback
});

// network first
pageCache();

registerRoute(
  /.*\.json/,
  new NetworkFirst({
    cacheName: 'json',
  })
);

const isApiCall = ({ request }) => {
  // console.log('request:', request);
  // /api-*-service/
  if (request.url.includes('/api-') || request.url.includes('execute-api')) {
    return true;
  }
  return false;
};

registerRoute(
  isApiCall,
  new NetworkFirst({
    cacheName: 'gets',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [0, 200],
      }),
      new ExpirationPlugin({
        // maxEntries,
        maxAgeSeconds: 45 * 24 * 60 * 60,
      }),
    ],
  }),
  'GET'
);

// catch
offlineFallback({ pageFallback: 'index.html' });

// ------
// outbox
// ------

const bgSyncPlugin = new BackgroundSyncPlugin('outbox', {
  maxRetentionTime: 24 * 60, // Retry for max of 24 Hours (specified in minutes)
});

const statusPlugin = {
  fetchDidSucceed: ({ response }) => {
    if (response.status >= 500) {
      // Throwing anything here will trigger fetchDidFail.
      throw new Error(`Service error: ${response.status}`);
    }
    // If it's not 5xx, use the response as-is.
    return response;
  },
};

registerRoute(
  isApiCall,
  new NetworkOnly({
    plugins: [statusPlugin, bgSyncPlugin],
  }),
  'PUT'
);

registerRoute(
  isApiCall,
  new NetworkOnly({
    plugins: [statusPlugin, bgSyncPlugin],
  }),
  'DELETE'
);
