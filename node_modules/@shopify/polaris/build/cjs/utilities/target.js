'use strict';

const isServer = typeof window === 'undefined' || typeof document === 'undefined';

exports.isServer = isServer;
