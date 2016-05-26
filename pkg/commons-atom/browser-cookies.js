'use babel';
/* @flow */

/*
 * Copyright (c) 2015-present, Facebook, Inc.
 * All rights reserved.
 *
 * This source code is licensed under the license found in the LICENSE file in
 * the root directory of this source tree.
 */

import remote from 'remote';

export default {
  getCookies(domain: string): Promise<{[key: string]: string}> {
    return new Promise((resolve, reject) => {
      remote.getCurrentWindow().webContents.session.cookies.get({
        domain,
      }, (error, cookies) => {
        if (error) {
          reject(error);
        } else {
          const cookieMap = {};
          cookies.forEach(cookie => {
            cookieMap[cookie.name] = cookie.value;
          });
          resolve(cookieMap);
        }
      });
    });
  },

  setCookie(url: string, domain: string, name: string, value: string): Promise<void> {
    return new Promise((resolve, reject) => {
      remote.getCurrentWindow().webContents.session.cookies.set({
        url,
        domain,
        name,
        value,
      }, error => {
        if (error) {
          reject(error);
        } else {
          resolve();
        }
      });
    });
  },
};
